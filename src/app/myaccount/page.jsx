'use client'
import { useState, useEffect } from 'react'
import {useRouter, usePathname} from 'next/navigation'

const PortfolioAnalyser = () => {
  const router = useRouter();

  const pathname = usePathname();

  useEffect(() => {
    router.push(`/myaccount/dashboard`)
  }, [router])
  return(<div></div>) 
}

export default PortfolioAnalyser