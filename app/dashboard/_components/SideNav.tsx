"use client";
import { BrainCircuit, FileClock, Home, Settings, WalletCards } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react'
import UseageTrack from './UsageTrack';
// import ChatComponent from '../AiChat/page';

const SideNav = () => {

  const MenuList = [
    {
        name: 'Home',
        icon: Home,
        path: '/dashboard'
    },
    {
        name: 'History',
        icon: FileClock,
        path: '/dashboard/history'
    },
    {
        name: 'Billing',
        icon: WalletCards,
        path: '/dashboard/billing'
    },
    {
        name: 'Setting',
        icon: Settings,
        path: '/dashboard/settings'
    },
  ]

  const path = usePathname();
  

//   useEffect(()=> {
//       console.log(path)

//   }, [])
  return (
    <div className='h-screen relative p-5 shadow-sm border bg-white'>
        <div className='flex justify-center'>
            <Link href={'/'}>
            <Image src='/logo.png' alt='logo' width={55} height={55} priority={true} />

            </Link>
        </div>
        <hr className='my-6 border'/>
        <div className='mt-3'>
            {
                MenuList.map((menu, index) => (
                    <Link key={index} href={menu.path} >

                        <div  className= {`flex gap-2 mb-2 p-3 hover:bg-primary hover:text-white rounded-lg cursor-pointer items-center
                        ${path == menu.path && 'bg-primary text-white'}`}>
                            <menu.icon className='h-6 w-6' />
                            <h2 className='text-lg'>{menu.name}</h2>
                        </div>
                    </Link>
                ))
            }
        </div>
        <div className='absolute bottom-10 left-0 w-full'>
        <Link href={'/dashboard/AiChat'}>
            <div className='text-center text-white rounded-lg gap-2 flex justify-center items-center bg-primary mx-6 p-5'>
            <BrainCircuit className=''/>  <span className='text-xl'>Ai Chat</span>
            </div>
        </Link>
            <UseageTrack />
        </div>
    </div>
  )
}

export default SideNav
