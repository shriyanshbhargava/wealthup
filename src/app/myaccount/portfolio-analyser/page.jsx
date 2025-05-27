'use client'

import React, {useEffect} from 'react'
import { usePathname, useRouter } from 'next/navigation'

import BeforeCas from '@/components/MyAccount/MutualFundsAnalyser/BeforeCas'

const Page = () => {

  const router = useRouter();
  const pathname = usePathname();
  // useEffect(()=>{
  //   router.push(`${pathname}/performance`);
  // },[])
  return (
    <BeforeCas />
  )
}

export default Page