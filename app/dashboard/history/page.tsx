"use client"
import React, { useEffect, useState } from 'react';
import { db } from '@/utils/db';
import { AIOutput } from '@/utils/schema';
import { LoaderPinwheel } from 'lucide-react';
import Templates from '@/app/(data)/Templates';
import Image from 'next/image';
// import { getAllAIOutputs } from './path-to-your-fetch-function';

// Utility function to get the icon based on the template slug
const getIconBySlug = (slug: string): string | null => {
  const template = Templates.find(template => template.slug === slug);
  return template ? template.icon : null;
};

export default function page() {
  const [historyData, setHistoryData] = useState<any[]>([]);

//   import { db } from './path-to-your-db-instance';

const getAllAIOutputs = async () => {
  try {
    const result = await db.select().from(AIOutput); // Adjust based on your ORM syntax
    return result;
  } catch (error) {
    console.error("Error fetching AI output history:", error);
    return [];
  }
};


  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllAIOutputs();
      setHistoryData(data);
    };

    fetchData();
  }, []);

  

  return (
    <div className='m-5 p-5'>
      <div>
        <div className='font-bold text-2xl'>History</div>
        <p>Search your previously generated AI content</p>
      </div>
      <div className='p-5 gap-5 grid grid-cols-5 my-5 bg-gray-300 rounded-lg items-center'>
        <p className='font-bold text-xl'>TEMPLATE</p>
        <p className='font-bold text-xl'>AI RESPONSE</p>
        <p className='font-bold text-xl'>DATE</p>
        <p className='font-bold text-xl'>WORDS</p>
        <p className='font-bold text-xl'>COPY</p>
      </div>
      <div>
        {historyData.length ? (
            historyData.map((item, index) => (
                <div key={index} className='p-5 gap-5 grid grid-cols-5 items-center my-2'>
                              <p className="overflow-hidden font-semibold">
                {/* @ts-ignore */} 
                <Image src={getIconBySlug(item.templateSlug)} alt="icon" className="w-16 h-16 inline mr-2" width={200} height={100}/>
                {item.templateSlug}
              </p>

                <p className='overflow-hidden font-semibold'>{item.aiResponse.split(' ').slice(0,20).join(' ') + "..."}</p>
                <p className='overflow-hidden font-semibold'>{item.createdAt}</p>
                <p className='overflow-hidden font-semibold'>{item.aiResponse.split('').length}</p>
                <p className='text-blue-400' onClick={() => (navigator.clipboard.writeText(item.aiResponse) , alert("Response copied to Clipboard"))}>Copy</p>
                <hr />
            </div>
            ))
        ) : (
            <p className='text-center'>No history available.<LoaderPinwheel width={100} height={100} className='animate-spin mx-auto  mt-48'/></p>
        )}
        </div>
    </div>
  );
};
