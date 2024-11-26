'use client';
import React, { useContext, useState } from 'react'
import axios from 'axios'
import { LoaderPinwheel } from 'lucide-react';
import { db } from '@/utils/db';
import { UserSubscription } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { UserSubscriptionContext } from '@/app/(context)/UserSubscriptionContext';

export default function billing() {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const {userSubscription, setUserSubscription} = useContext(UserSubscriptionContext)
  const createSubscription = async () => {
    try {
      const response = await axios.post("/api/create-subscription", {});
      setLoading(true);
      // console.log("Subscription created:", response.data);
      OnPayment(response.data.id)
    } catch (error) {
      // console.log(false)
      console.error("Error creating subscription:", error);
    }
  };

  const OnPayment = (subId: string) => {
    const options = {
      "key": process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      "Subscription": subId,
      "name":"Ai content",
      description: 'Monthly Subscription',
      handler:async(res:any)=> {
        // console.log(res);
        if(res){
          saveSubscription(res?.razorpay_payment_id)
        }
        setLoading(false);
      }
    }
    // @ts-ignore
    const rzp = new window.Razorpay(options);
    rzp.open();

    const saveSubscription = async(paymentId:string) => {
      const result = await db.insert(UserSubscription).values({
        email:user?.primaryEmailAddress?.emailAddress,
        username:user?.fullName,
        active: true,
        paymentId:paymentId,
        joinDate:moment().format('DD/MM/yyyy')
        
      });

      console.log(result)
      if(result){
        window.location.reload();
      }
    }


  }
  
  return (
    <div className="flex justify-center items-center w-full  h-screen bg-gray-50">
      <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-4xl w-full">
        <h2 className="text-center text-3xl font-semibold mb-8">
          Upgrade With Monthly Plan
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Free Plan */}
          <div className="p-6 border rounded-lg text-center">
            <h3 className="text-xl font-semibold">Free</h3>
            <p className="text-4xl font-bold my-4">0₹<span className="text-lg font-medium">/month</span></p>
            <ul className="text-gray-600 space-y-2 mb-6">
              <li>10,000 Words/Month</li>
              <li>50+ Content Templates</li>
              <li>Unlimited Download & Copy</li>
              <li>1 Month of History</li>
            </ul>
            <button className="w-full py-2 text-white bg-gray-500 rounded-full cursor-not-allowed">
              Currently Active Plan
            </button>
          </div>

          {/* Monthly Plan */}
          <div className="p-6 border rounded-lg text-center bg-gray-50 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold">Monthly</h3>
            <p className="text-4xl font-bold my-4">
              <span className="text-blue-500">100.00₹</span>
              <span className="text-lg font-medium">/month</span>
            </p>
            <ul className="text-gray-600 space-y-2 mb-6">
              <li>1,000,000 Words/Month</li>
              <li>50+ Template Access</li>
              <li>Unlimited Download & Copy</li>
              <li>1 Year of History</li>
            </ul>
            <button disabled={loading} onClick={createSubscription} className="w-full py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600">
              {loading && <LoaderPinwheel className='animate-spin'/>}
              {userSubscription ? "Active Plan" :"Get Started"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}





