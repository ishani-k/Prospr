"use client"

import { createTransaction } from '@/actions/transaction'
import { transactionSchema } from '@/app/lib/schema'
import CreateAccountDrawer from '@/components/create-account-drawer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import useFetch from '@/hooks/useFetch'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'

const AddTransactionForm = ({accounts, categories}) => {


  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
    reset
  } = useForm({
      resolver: zodResolver(transactionSchema),
      defaultValues: {
        type: "EXPENSE",
        amount: "",
        description: "",
        accountId: accounts.find((ac) => ac.isDefault)?.id,
        date: new Date(),
        isRecurring: false
      }
    })

  const {
    loading: transactionLoading,
    fn: transactionFn,
    data:transactionResult
  } = useFetch(createTransaction)

  const type = watch("type")
  const isRecurring = watch("isRecurring")
  const date = watch("date")

  const filteredCategories = categories.filter(
    (category) => category.type === type
  )

  return (
    <form className='space-y-6'>
      {/*AI Receipt Scanner */}

      {/*Type(inc/exp) */}
      <div className='space-y-2'>
        <label className='text-sm font-medium'>Type</label>
        <Select onValueChange = {(value) => setValue("type", value)}
          defaultValue={type}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="EXPENSE">Expense</SelectItem>
            <SelectItem value="INCOME">Income</SelectItem>
          </SelectContent>
        </Select>
        {errors.type && (
          <p className='text-sm text-red-600'>{errors.type.message}</p>
        )}
      </div>


      <div className='grid gap-6 md:grid-cols-2'>
        {/* Amount */}
        <div className='space-y-2'>
          <label className='text-sm font-medium pr-2'>Amount</label>
          <Input type="number" step='0.01' placeholder='0.00' {...register('amount')} className='w-full'/>

          {errors.amount && (
            <p className='text-sm text-red-600'>{errors.amount.message}</p>
          )}
        </div>

        {/*Account */}
        <div>
          <label className='text-sm font-medium'>Account</label>
          <Select onValueChange = {(value) => setValue("accountId", value)}
            defaultValue={ getValues('accountId') }>
            <SelectTrigger className='w-full'>
              <SelectValue placeholder="Select account" />
            </SelectTrigger>
            <SelectContent>
              {accounts.map((account) => (
                <SelectItem key={account.id} value={account.id}>
                  {account.name} (₹{parseFloat(account.balance).toFixed(2)})
                </SelectItem>
              ))}
              <CreateAccountDrawer>
                <Button variant='ghost' className='w-full select-none items-center text-sm outline-none'>
                  Create Account
                </Button>
              </CreateAccountDrawer>
            </SelectContent>
          </Select>

          {errors.accountId && (
          <p className='text-sm text-red-600'>{errors.accountId.message}</p>
          )}
        </div>
      </div>

      {/*Category */}
      <div>
        <label className='text-sm font-medium'>Category</label>
        <Select onValueChange = {(value) => setValue("category", value)}
          defaultValue={ getValues('category') }>
          <SelectTrigger>
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
              {filteredCategories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
        </Select>
        {errors.category && (
          <p className='text-sm text-red-600'>{errors.category.message}</p>
        )}
        
      </div>

      {/* Date */}
      <div>
        <label className='text-sm font-medium'>Date</label>
      </div>
     
    </form>
  )
}

export default AddTransactionForm