'use client'
import React, { useState } from 'react'
import SearcSection from './_components/SearchSection'
import TemplateListSection from './_components/TemplateListSection'

export default function dashboard(){

    const [userSearchInput, setUserSearchInput] = useState<string>()
  return (
    <div>
        {/* {Search sectiom} */}
        <SearcSection onSearchInput={(value: string)=> setUserSearchInput(value)} />

        {/* {TemplateListSection} */}
        <TemplateListSection userSearchInput={userSearchInput}/>
      
    </div>
  )
}

