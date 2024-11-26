import { UserProfile } from '@clerk/nextjs'
import React from 'react'

function page() {
  return (
    <div className='flex justify-center items-center'>
        <UserProfile routing="hash"  />
    </div>
  )
}

export default page