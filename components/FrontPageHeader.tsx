import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { Waypoints } from 'lucide-react'

const FrontPageHeader = () => {
  return (
    <div className='h-32 flex justify-between items-center p-6  border-b-2 border-gray-400'>
      <div className='flex items-center gap-5 pl-16'>
        <Image src='/logo.png' width={55} height={55} alt="logo" priority={true}/>
        <div className='font-semibold text-4xl'>AI</div>
      </div>
      <div className='border-l-2 pl-10 border-black '>
        <Link href={'/dashboard'}>
            <Button className='h-28 p-6 pr-16 text-2xl hover:scale-105' variant={'secondary'}><Waypoints /> Get Started</Button>
        </Link>
      </div>
    </div>
  )
}

export default FrontPageHeader
