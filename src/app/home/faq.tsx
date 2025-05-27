"use client"

import { Accordion } from '@/components/ui/Accordion'
import React from 'react'
import { whatsappLinkPortfolioAnalyserFirst } from '@/utils/constants'

export const Faq = () => {
  return (
    <section className='bg-primary-blue py-8 lg:py-12 w-full'>
        <div className='container'>
            <h2 className='font-semibold capitalize mb-12'>Frequently asked questions</h2>
            <div className='max-w-4xl mx-auto'>
                <Accordion
                    title="1. What is CAS?"
                    bordercolor='border-white'
                    titlestyle='font-semibold'
                    content={
                    <p className="text-sm sm:text-base md:text-lg text-white text-left font-normal">
                        CAS, or Consolidated Account Statement, is a secure PDF document summarizing your investments in various financial instruments like mutual funds, stocks, and bonds.
                    </p>
                    }
                />
                <Accordion
                    title="2. How to access CAS?"
                    bordercolor='border-white'
                    titlestyle='font-semibold'
                    content={
                        <p className="text-sm sm:text-base md:text-lg text-white text-left font-normal">
                        Search &quot;NSDL CAS&quot; or &quot;CDSL CAS&quot; in your primary email inbox, open the latest email, and download the attachment. The file is password-protected; use your PAN as the password.
                    </p>
                    }
                />
                <Accordion
                    title="3. Is my information safe?"
                    bordercolor='border-white'
                    titlestyle='font-semibold'
                    content={
                        <p className="text-sm sm:text-base md:text-lg text-white text-left font-normal">
                        Rest assured, we prioritize your data security. Our stringent measures, including firewall, encryption and access controls, ensure your information remains confidential and protected.
                    </p>
                    }
                />
                <Accordion
                    title="4. My question is not listed here."
                    bordercolor='border-white'
                    titlestyle='font-semibold'
                    content={
                    <p className="text-sm sm:text-base md:text-lg text-white text-left font-normal">
                        Please let us know your question <a href={whatsappLinkPortfolioAnalyserFirst} className="underline">here</a> and we shall get back to you in 24 hours.
                    </p>
                    }
                />
            </div>
            {/* <div className='py-4'>
                <Button boxShadow={false} onClick={() => setShow(true)}>Upload CAS</Button>
            </div> */}
        </div>
    </section>
  )
}
