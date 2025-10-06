import { getDashboardData, getUserAccounts } from '@/actions/dashboard'
import CreateAccountDrawer from '@/components/create-account-drawer'
import { Card, CardContent } from '@/components/ui/card'
import { Plus } from 'lucide-react'
import React, { Suspense } from 'react'
import AccountCard from './_components/accountCard'
import { getCurrentBudget } from '@/actions/budget'
import BudgetProgress from './_components/budgetProgress'
import DashboardOverview from './_components/dashboardOverview'

async function DashboardPage() {

  const accounts = await getUserAccounts()

  const defaultAccount = accounts?.find((account) => account.isDefault)

  let budgetData = null
  if(defaultAccount)
  {
    budgetData = await getCurrentBudget(defaultAccount.id)
  }

  const transactions = await getDashboardData()

  return (
    <div className='px-5 space-y-5'>
      {/*Budget Progress */}
      {defaultAccount && <BudgetProgress
      initialBudget = {budgetData?.budget}
      currentExpenses = {budgetData?.currentExpenses || 0}
      />}


      {/*Overview */}
      <Suspense fallback={"Loading Overview..."}>
        <DashboardOverview accounts={accounts} transactions={transactions} />
      </Suspense>


      {/*Account Grids */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <CreateAccountDrawer>
          <Card className='hover:shadow-md transition-shadow cursor-pointer border-dashed'>
            <CardContent className='flex flex-col items-center justify-center text-muted-foreground h-full '>
              <Plus className='h-7 w-7 mb-2'/>
              <p className='text-sm font-medium'>Add New Account</p>
            </CardContent>
          </Card>
        </CreateAccountDrawer>

        {accounts.length > 0 && 
        accounts.map((account) => {
          return <AccountCard key={account.id} account={account}/>
        })}

        
      </div>

    </div>
  )
}

export default DashboardPage