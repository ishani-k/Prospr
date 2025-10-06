"use client";

import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import React, { useState } from 'react'

const DashboardOverview = ({ accounts, transactions }) => {
    const [selectedAccountId, setSelectedAccountId] = useState(
        accounts.find((a) => a.isDefault)?.id || accounts[0]?.id
    )

    //filter transactions for selected account
    const accountTransactions = transactions.filter(
        (t) => t.accountId === selectedAccountId
    )

    const recentTransactions = accountTransactions
        .sort((a,b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5)

  return (
    <div className='grid gap-4 md:grid-cols-2'>
        <Card>
            <CardHeader>
                <CardTitle className='text-base font-normal'>Recent Transactions</CardTitle>
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent>
                <p>Card Content</p>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card Description</CardDescription>
                <CardAction>Card Action</CardAction>
            </CardHeader>
            <CardContent>
                <p>Card Content</p>
            </CardContent>
        </Card>
    </div>
  )
}

export default DashboardOverview