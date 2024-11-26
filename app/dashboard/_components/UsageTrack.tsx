"use client"
import { UpdateCreditUsageContext } from '@/app/(context)/pdateCreditUsageContent';
import { TotalUsageContext } from '@/app/(context)/TotalUsageContext';
import { UserSubscriptionContext } from '@/app/(context)/UserSubscriptionContext';
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db';
import { AIOutput, UserSubscription } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { currentUser, User } from '@clerk/nextjs/server'
import { eq } from 'drizzle-orm';
import React, { useContext, useEffect, useState } from 'react'

export default function UsageTrack() { 

  const { user }= useUser();
  const {totalUsage, setTotalUsage} = useContext(TotalUsageContext);
  const {userSubscription, setUserSubscription} = useContext(UserSubscriptionContext)
  const {updateCreditUsage, setUpdateCreditUsage} = useContext<any>(UpdateCreditUsageContext)

  const Getdata = async () => {
    {/* @ts-ignore */} 
    const result = await db.select().from(AIOutput).where(eq(AIOutput.createdBy,user?.primaryEmailAddress?.emailAddress))

    GetTotalUsage(result)
  }

  const IsUserSubscription = async () => {
    // @ts-ignore
    const result = await db.select().from(UserSubscription).where(eq(UserSubscription.email,user?.primaryEmailAddress?.emailAddress));

    if(result){
      setUserSubscription(true);
    }
  }

  useEffect(() => {
    user && Getdata();
    user && IsUserSubscription();
  }, [user])
  useEffect(() => {
    user && Getdata();
  }, [updateCreditUsage&&user])

  const GetTotalUsage =async (result: any) => {
    let total = 0;
    result.forEach((element: any) => {
      total= total + Number(element.aiResponse?.length)
    });
    // console.log(total)
    await setTotalUsage(total)
  }

  return (
    <div className='m-5'>
      <div className='bg-primary text-white rounded-lg p-3'>
        <h2 className='font-medium'>Credits</h2>
        <div className='h-2 bg-[#9981f9] w-full rounded-full mt-3'>
            <div className='h-2 bg-white rounded-full' style={{
                width: (totalUsage/10000)*100+"%"
            }}>
                
            </div>
        </div>
            <h2 className='text-sm my-2' >{totalUsage}/{userSubscription ? '1,00,000' : '10,000'} Credits used</h2>
      </div>
        <Button variant={'secondary'} className='w-full my-3 text-primary'>Upgrade</Button>
    </div>
  )
}
