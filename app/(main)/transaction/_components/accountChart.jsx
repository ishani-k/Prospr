"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { endOfDay } from 'date-fns/endOfDay'
import { format } from 'date-fns/format'
import { startOfDay } from 'date-fns/startOfDay'
import { subDays } from 'date-fns/subDays'
import React, { useMemo, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const DATE_RANGES = {
    "7D": {label: "Last 7 days", days: 7},
    "1M": {label: "Last month", days: 30},
    "3M": {label: "Last 3 months", days: 90},
    "6M": {label: "Last 6 months", days: 180},
    ALL: {label: "All time", days: null}
}

const AccountChart = ({transactions}) => {
    const [dateRange, setDateRange] = useState("1M")

    const filteredData = useMemo(() => {
        const range = DATE_RANGES[dateRange]
        const now = new Date()
        const startDate = range.days ?
        startOfDay(subDays(now, range.days)) : startOfDay(new Date(0))

        //filter transactions within date range
        const filtered = transactions.filter(
            (t) => new Date(t.date) >= startDate && new Date(t.date) <= endOfDay(now)
        )

        const grouped = filtered.reduce((acc, transaction) => {
            const date = format(new Date(transaction.date), "MMM dd")

            if(!acc[date]) {
                acc[date] = { date, income: 0, expense: 0}
            }

            if(transaction.type === "INCOME")
            {
                acc[date].income += transaction.amount
            }
            else
            {
                acc[date].expense += transaction.amount
            }

            return acc
        }, {})

        //converting the grouped data to an array
        return Object.values(grouped).sort(
            (a,b) => new Date(a.date) - new Date(b.date)
        )

    }, [transactions, dateRange])


    const totals = useMemo(() => {
        return filteredData.reduce(
        (acc, day) => ({
            income: acc.income + day.income,
            expense: acc.expense + day.expense
        }),
        {income: 0, expense: 0}
        )
    }, [filteredData])


  return (
    <Card>
        <CardHeader>
            <CardTitle>Transaction Overview</CardTitle>
            <Select defaultValue = {dateRange} onValueChange = {setDateRange}>
                <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Select range" />
                </SelectTrigger>
                <SelectContent>
                    {Object.entries(DATE_RANGES).map(([key, { label }]) => {
                        <SelectItem key={key} value={key}>
                            {label}
                        </SelectItem>
                    })}
                </SelectContent>
            </Select>
        </CardHeader>
        <CardContent>
         <ResponsiveContainer width="100%" height="100%">
            <BarChart
                width={500}
                height={300}
                data={transactions.data}
                margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                <Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
            </BarChart>
        </ResponsiveContainer> 
        </CardContent>
    </Card>
  )
}

export default AccountChart