"use client"
import React, { useState } from 'react'
import { TEMPLATE } from '../../_components/TemplateListSection';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { LoaderPinwheel } from 'lucide-react';
interface PROPS{
    selectedTemplate?:TEMPLATE;
    userFormInput: any;
    loading: boolean;
}

export default function FormSection({selectedTemplate, userFormInput, loading}:PROPS) {

  const [formdata, setFormData] = useState<any>();
  const handleInputChange= (event: any) => {
    event.preventDefault();
    const {name, value } = event.target;
    setFormData({...formdata, [name]:value})
  }

  const onSubmit = (e: any) => {
    e.preventDefault();
    // console.log(formdata)
    userFormInput(formdata)// passing dqta to parent component
  }
  return (
    <div className='p-5 shadow-md border rounded-lg bg-white'>
      {/* // will ignore the src issue here */}
      {/* @ts-ignore */} 
      {selectedTemplate?.icon && (
        <Image
          src={selectedTemplate.icon}
          alt='icon'
          width={70}
          height={70}
          priority={true}
        />
      )}
      <h2 className='font-bold text-2xl mb-2 text-primary'>{selectedTemplate?.name}</h2>
      <p className='text-gray-500 text-sm'>{selectedTemplate?.desc}</p>
      <form className='mt-6' onSubmit={onSubmit}>
        {
          selectedTemplate?.form?.map((item, index) => (
            <div key={index} className='my-2 flex flex-col gap-2 mb-7'>
              <label className='font-bold'>{item.label}</label>
              {
                item.field == 'input' ? 
                    <Input name={item.name} required={!!item?.required} onChange={handleInputChange}/>
                    : item.field == 'textarea' ? 
                        <Textarea name={item.name} required={!!item?.required} onChange={handleInputChange}/> : null
              }
            </div>
          ))
        }
        <Button type='submit' className='w-full py-6' disabled={loading}>
          {loading && <LoaderPinwheel className='animate-spin'/>}
          Generate Content
          </Button>
      </form>
    </div>
  )
}
