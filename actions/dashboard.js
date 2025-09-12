"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

const serializeTransaction = (obj) => {
    const serialized = { ...obj }

    if(obj.balance) 
    {
        serialized.balance = obj.balance.toNumber()
    }
    if(obj.amount) 
    {
        serialized.amount = obj.amount.toNumber()
    }

    return serialized
}

export async function createAccount(data) {
    try {

        const {userId} = await auth()

        if(!userId) throw new Error("Unauthorized")

        const user = await db.user.findUnique({
            where: { clerkUserId: userId },
        })

        if(!user)
        {
                 throw new Error("User not found")
        }

        //converting balance to float before saving

        const balanceFloat = parseFloat(data.balance)
        if(isNaN(balanceFloat)) 
        {
            throw new Error("Invalid balance amount")
        }

        //checker if this is user's first acc
        const existingAccounts = await db.account.findMany({
            where: { userId: user.id },
        })

        const shouldBeDefault = existingAccounts.length === 0? true:data.isDefault

        //if this acc should be default, unset other default accs
        if(shouldBeDefault)
        {
            await db.account.updateMany({
                where: {userId: user.id, isDefault:true},
                data: {isDefault: false}
            })
        }

        const account = await db.account.create({
            data: {
                ...data,
                balance: balanceFloat,
                userId: user.id,
                isDefault: shouldBeDefault,
            }
        })

        const serializeAccount = serializeTransaction(account);   //nextjs cant take decimal values, 
                                                                // hence need to convert to number to send through

        revalidatePath("/dashboard")
        return {success: true, data: serializeAccount}

    } catch (error) {
        throw new Error(error.message)
    }
}


export async function getUserAccounts() {
    const {userId} = await auth()

    if(!userId) throw new Error("Unauthorized")

    const user = await db.user.findUnique({
        where: { clerkUserId: userId },
    })

    if(!user)
    {
         throw new Error("User not found")
    }

    const accounts = await db.account.findMany({
        where:{ userId: user.id },
        orderBy: { createdAt: "desc" },
        include: {
            _count: {
                select: {
                    transactions: true
                },
            },
        },
    })

    const serializeAccount = accounts.map(serializeTransaction);

    return serializeAccount
}