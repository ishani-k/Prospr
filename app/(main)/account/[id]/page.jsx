import { getAccountsWithTransaction } from '@/actions/accounts'
import { notFound } from 'next/navigation'
import React from 'react'

const AccountsPage = async ({params}) => {

    const accountData = await getAccountsWithTransaction(params.id)

    if(!accountData){
        notFound()
    }

    const { transactions, ...account } = accountData

  return (
    <div>
        <div>
            <h2>{account.name}</h2>
            <p>{account.type.charAt(0) + account.type.slice(1).toLowerCase()} Account</p>
        </div>

        <div>
            <div>₹{parseFloat(account.balance).toFixed(2)}</div>
            <p>{account._count.transactions} Transactions</p>
        </div>

        {/* Chart */}
        {/* Transaction Table */}
    </div>
  )
}

export default AccountsPage