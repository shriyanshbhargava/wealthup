'use client'

import React, { useEffect, useState } from 'react'

import { Accordion } from '@/components/ui/Accordion'
import Button from '@/components/ui/ButtonNew'
import HOWITWORKS from '@/assets/images/MutualFundsAnalyser/howitworks.png'
import Image from 'next/image'
import { UploadModal } from '@/components/MyAccount/Portfolio/components/UploadModal'
import checkbox from '@/assets/images/MutualFundsAnalyser/checkbox.png'
import { useRouter } from 'next/navigation'
import { whatsappLinkPortfolioAnalyserFirst } from '@/utils/constants'

const BeforeCas = () => {
//   const [show, setShow] = useState(false);
//   const [fetchAgain, setFetchAgain] = useState(false);

//   const router = useRouter();

//   useEffect(() => {
//     if (fetchAgain) {
//         setFetchAgain(false);
//         router.push("/myaccount/portfolio-analyser/summary")
//     }
//   }, [fetchAgain])

  return (
    <section className=''>
        <div className='w-full dashboard-card text-center my-8'>
            <div className='w-11/12 m-auto py-4'>
                <h3 className='font-semibold text-4xl'>Free Portfolio <br className='sm:hidden' /> Health Check</h3>
                <p className='text-xl font-medium'>Get a detailed analysis of <br className='sm:hidden' /> your portfolio</p>
                <ol className='sm:flex w-fit sm:w-4/5 justify-center gap-10 items-center m-auto py-4'>
                    <li className='flex gap-3 items-center'>
                        <Image src={checkbox} width={100} height={100} alt='check' className='w-8'/>
                        <span className='text-lg font-semibold'>Performance</span>
                    </li>
                    <li className='flex gap-3 items-center'>
                        <Image src={checkbox} width={100} height={100} alt='check' className='w-8'/>
                        <span className='text-lg font-semibold'>Diversification</span>
                    </li>
                    <li className='flex gap-3 items-center'>
                        <Image src={checkbox} width={100} height={100} alt='check' className='w-8'/>
                        <span className='text-lg font-semibold'>Risk</span>
                    </li>
                </ol>
                <div className='py-4'>
                    <Button boxShadow={false} onClick={() => setShow(true)}>Get Started</Button>
                </div>
            </div>
        </div>

        <div className='w-full dashboard-card text-center my-8'>
            <div className='w-11/12 m-auto py-4'>
                <h3 className='font-semibold text-4xl'>How It Works?</h3>
                <p className='text-xl font-medium'>Get a detailed analysis of <br className='sm:hidden' /> your portfolio</p>
                <div className='w-4/5 m-auto'>
                    <Image src={HOWITWORKS} alt='how it works' width={2000} height={187} className='w-full'/>
                    <ol className='flex pb-4 items-center'>
                        <li className='basis-1/3 list-none text-left'><span className='basis-1/3 list-none'>Upload CAS</span></li>
                        <li className='basis-1/3 list-none '><span className='basis-1/3 list-none'>Enter PAN</span></li>
                        <li className='basis-1/3 list-none text-right relative xl:right-8'><span className='basis-1/3 list-none'>Check Result</span></li>
                    </ol>
                </div>
                <div className='py-4'>
                    <Button boxShadow={false} onClick={() => setShow(true)}>Upload CAS</Button>
                </div>
            </div>
        </div>

        <div className='w-full dashboard-card text-center my-8'>
            <div className='w-11/12 m-auto py-4'>
                <h3 className='font-semibold text-4xl'>Need Help?</h3>
                <div className='pb-4'>
                    <Accordion
                        title="1. What is CAS?"
                        bordercolor='border-[#01C8A9]'
                        titlestyle='font-semibold'
                        content={
                        <p className="text-sm sm:text-base md:text-lg text-primary-blue text-left font-normal">
                            CAS, or Consolidated Account Statement, is a secure PDF document summarizing your investments in various financial instruments like mutual funds, stocks, and bonds.
                        </p>
                        }
                    />
                    <Accordion
                        title="2. How to access CAS?"
                        bordercolor='border-[#01C8A9]'
                        titlestyle='font-semibold'
                        content={
                            <p className="text-sm sm:text-base md:text-lg text-primary-blue text-left font-normal">
                            Search &quot;NSDL CAS&quot; or &quot;CDSL CAS&quot; in your primary email inbox, open the latest email, and download the attachment. The file is password-protected; use your PAN as the password.
                        </p>
                        }
                    />
                    <Accordion
                        title="3. Is my information safe?"
                        bordercolor='border-[#01C8A9]'
                        titlestyle='font-semibold'
                        content={
                            <p className="text-sm sm:text-base md:text-lg text-primary-blue text-left font-normal">
                            Rest assured, we prioritize your data security. Our stringent measures, including firewall, encryption and access controls, ensure your information remains confidential and protected.
                        </p>
                        }
                    />
                    <Accordion
                        title="4. My question is not listed here."
                        bordercolor='border-[#01C8A9]'
                        titlestyle='font-semibold'
                        content={
                        <p className="text-sm sm:text-base md:text-lg text-primary-blue text-left font-normal">
                            Please let us know your question <a href={whatsappLinkPortfolioAnalyserFirst} className="underline">here</a> and we shall get back to you in 24 hours.
                        </p>
                        }
                    />
                </div>
                <div className='py-4'>
                    <Button boxShadow={false} onClick={() => setShow(true)}>Upload CAS</Button>
                </div>
            </div>
        </div>
        <UploadModal open={show} onClose={() => setShow(false)} setFetchAgain={setFetchAgain} />
    </section>
  )
}

export default BeforeCas