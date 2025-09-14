"use client";

import { Checkbox } from '@/components/ui/checkbox'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { format } from 'date-fns/format';
import { categoryColors } from '@/data/categories';
import React from 'react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import {  Calendar1Icon, Clock } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const RECURRING_INTERVALS = { 
    DAILY: "Daily",
    WEEKLY: "Weekly",
    MONTHLY: "Monthly",
    YEARLY: "Yearly"
}

const TransactionTable = ({transactions}) => {

    const filteredAndSortedTransactions = transactions

    const handleSort = () => {}



    return (
    <div className='space-y-4 '>
        {/* Filters for trsctn table */}

        {/* Transactions */}
        <div className='rounded-md border'>
        <Table>
            <TableHeader>
                <TableRow>
                <TableHead className="w-[50px]"><Checkbox/></TableHead>
                <TableHead className="cursor-pointer" onClick={()=> handleSort("date")}><div className="flex items-center">Date</div></TableHead>
                <TableHead className="cursor-pointer" onClick={()=> handleSort("description")}><div className="flex items-center">Description</div></TableHead>
                <TableHead className="cursor-pointer" onClick={()=> handleSort("category")}><div className="flex items-center">Category</div></TableHead>
                <TableHead className="cursor-pointer" onClick={()=> handleSort("amount")}><div className="flex items-center justify-end">Amount</div></TableHead> 
                <TableHead className="cursor-pointer">Recurring</TableHead> 
                <TableHead/>
                </TableRow>
            </TableHeader>
            <TableBody>
                {filteredAndSortedTransactions.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={7} className='text-center text-muted-foreground'>
                            No Transactions Found
                        </TableCell>
                    </TableRow>
                ) : (
                    filteredAndSortedTransactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                            <TableCell><Checkbox/></TableCell>
                            <TableCell>{format(new Date(transaction.date), "PP")}</TableCell>
                            <TableCell> {transaction.description}</TableCell>
                            <TableCell className='capitalize'>
                                <span 
                                style={{
                                    background: categoryColors[transaction.category],
                                }}
                                className='px-2 py-1 rounded text-white text-sm'>
                                {transaction.category}
                                </span>
                                </TableCell>
                            <TableCell className="text-right font-medium"
                            style={{
                                color: transaction.type === "EXPENSE" ? "red" : "green",
                            }}>
                                {transaction.type === "EXPENSE" ? "- " : "+ "}
                                ₹{transaction.amount.toFixed(2)} 
                            </TableCell>
                            <TableCell>
                                {transaction.isRecurring? (
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Badge variant='outline' className='gap-1 bg-purple-100 text-purple-800 hover:bg-purple-200'><Calendar1Icon/>{RECURRING_INTERVALS[transaction.recurringInterval]}</Badge>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <div className='text-sm'>
                                                <div className='font-medium'>Next Date:</div>
                                                <div>{format(new Date(transaction.nextRecurringDate),"PP")}</div>
                                            </div>
                                        </TooltipContent>
                                    </Tooltip>
                                ):(
                                    <Badge variant='outline' className='text-xs'><Clock/>One-time</Badge>
                                )}
                            </TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>Profile</DropdownMenuItem>
                                        <DropdownMenuItem>Billing</DropdownMenuItem>
                                        <DropdownMenuItem>Team</DropdownMenuItem>
                                        <DropdownMenuItem>Subscription</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
        </div>

    </div>
  )
}

export default TransactionTable