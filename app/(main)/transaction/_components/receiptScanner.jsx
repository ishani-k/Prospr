"use client"

import { scanReceipt } from '@/actions/transaction'
import { Button } from '@/components/ui/button'
import useFetch from '@/hooks/useFetch'
import { Camera, Loader2 } from 'lucide-react'
import React, { useEffect, useRef } from 'react'
import { toast } from 'sonner'
import { LucideSparkles } from 'lucide-react'

const ReceiptScanner = ({onScanComplete}) => {

    const fileInputRef = useRef()

    const {
        loading: scanReceiptLoading,
        fn: scanReceiptFn,
        data: scannedData
    } = useFetch(scanReceipt)

    const handleReceiptScan = async (file) => {
        if(file.size > 5 * 1024 * 1024)
        {
            toast.error("File size should be less than 5MB")
            return
        }

        await scanReceiptFn(file)
    }
    
    useEffect(() => {
        if(scannedData && !scanReceiptLoading)
        {
            onScanComplete(scannedData)
            toast.success("Receipt scanned successfully !!")
        }
    }, [scanReceiptLoading, scannedData])
  return (
    <div>
        <input type="file" ref={fileInputRef} className="hidden" accept='image/*' capture='environment' 
         onChange = {(e) => {
            const file = e.target.files?.[0]
            if(file) handleReceiptScan(file)
         }}/>

         <Button type='button' variant='outline'
          className='w-full h-10 bg-gradient-to-br from-[#393d58] via-[#5c707c] to-[#393d58] animate-gradient hover:opacity-90 transition-opacity text-white hover:text-gray-100 cursor-pointer'
          onClick = {() => fileInputRef.current?.click()}
          disabled = {scanReceiptLoading}
          >
            {scanReceiptLoading? (
            <>
                <Loader2 className="mr-2 animate-spin"/>
                <span>Scanning Receipt...</span>
            </>
         ) : (
            <>
                <Camera/>
                <span className='flex'>Scan Receipt with AI ✨ {/*<LuSparkles/>*/}  </span>
            </>
         )}</Button>

    </div>
  )
}

export default ReceiptScanner