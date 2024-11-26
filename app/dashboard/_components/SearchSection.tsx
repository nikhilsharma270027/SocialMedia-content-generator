'use client'
import { Search } from 'lucide-react'
import React from 'react'

export default function SearcSection({onSearchInput}: any) {

  
  return (
    <div className='p-10  flex flex-col bg-gradient-to-br bg-[#AD49E1] justify-center items-center text-white bg-white'>
      <h2 className='text-3xl font-bold'>Browse All Templates</h2>
      <p>What would you like to create today?</p>
      <div className='w-full flex justify-center'>
        <div className='flex gap-2 item-center p-2 border rounded-md bg-white my-5 w-[50%]'>
          <Search className='text-primary'/>
          <input type='text' placeholder='Search...' onChange={(event) => onSearchInput(event.target.value)} className='bg-transparent w-full outline-none text-black'/>
        </div>
      </div>

    </div>
  )
}
