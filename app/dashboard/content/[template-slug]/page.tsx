'use client';
import React, { useContext, useEffect, useState } from 'react'
import FormSection from '../_components/FormSection';
import OutputSection from '../_components/OutputSection';
import { TEMPLATE } from '../../_components/TemplateListSection';
import Templates from '@/app/(data)/Templates';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { chatSession } from '@/utils/AiModel';
import { AIOutput } from '@/utils/schema';
import { db } from '@/utils/db';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { TotalUsageContext } from '@/app/(context)/TotalUsageContext';
import { UserSubscriptionContext } from '@/app/(context)/UserSubscriptionContext';
import { UpdateCreditUsageContext } from '@/app/(context)/pdateCreditUsageContent';

interface PROPS{
    params:{
        'template-slug':string
    };
}

function CreateNewContent(props: PROPS){
  const params = useParams();
  const router = useRouter();
  const { user } = useUser();
  const [selectedTemplate, setSelectedTemplate] = useState<TEMPLATE | undefined>(undefined);
  const [loading, setloading] = useState(false);
  const [aiOutput, setAiOutput] = useState<string>("");
  const {totalUsage, setTotalUsage} = useContext<any>(TotalUsageContext)
  const {userSubscription, setUserSubscription} = useContext(UserSubscriptionContext);
  const {updateCreditUsage, setUpdateCreditUsage} = useContext<any>(UpdateCreditUsageContext)

  const GenerateAiContent=async(formdata: any)=> {
      if(totalUsage >= 10000 && !userSubscription){
          alert("Lower credits");
          router.push('/dashboard/billing')
          return;
      }
      setloading(true);
      const selectedPronpt = selectedTemplate?.aiPrompt;
      const FinalAIPrompt = JSON.stringify(formdata)+", "+selectedPronpt;
      const result = await chatSession.sendMessage(FinalAIPrompt);
      // console.log((result.response.text()));
      setAiOutput(result?.response.text());
      // await SaveInDb(formdata, selectedTemplate?.slug, aiOutput)
      await SaveInDb(formdata, selectedTemplate?.slug, result?.response.text())
      setloading(false);

      setUpdateCreditUsage(Date.now())
  }

  const SaveInDb = async(formData:any, slug:any, aiOutput:string)=> {
    const result = await db.insert(AIOutput).values({
      formData:formData,
      templateSlug: slug,
      aiResponse: aiOutput,
      createdBy: user?.primaryEmailAddress?.emailAddress,
      createdAt: moment().format('DD/MM/yyyy'),

    });

    console.log(result)
  }

  useEffect(() => {
    if (params && 'template-slug' in params) {
      const template = Templates.find((item) => item.slug === params['template-slug']);
      setSelectedTemplate(template);
    }
  }, [params]);

  return (
    <div className='p-10'>
      <Link href={"/dashboard"}>
      <Button><ArrowLeft />Back</Button>
      </Link>
    <div className='grid grid-cols-1 md:grid-cols-2 gap-5 py-5'>
      {/* Form Section */}
        <FormSection selectedTemplate={selectedTemplate} userFormInput={(v:any)=>GenerateAiContent(v)} loading={loading}/>
      {/* Output Section */}
      <div className='cols-span-2'>

        <OutputSection aiOutput={aiOutput}/>
      </div>
    </div>
    </div>
  )
}

export default CreateNewContent


