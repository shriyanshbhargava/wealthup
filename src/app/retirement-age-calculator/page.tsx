"use client"

import React, { useEffect, useState } from 'react'

import { CalculationTable } from './CalculationTable';
import Footer from '@/components/ui/footer';
import Header from '@/components/ui/header';
import NavBar from './Navbar';
import { RetirementAge } from './RetirementAge';
import { useMediaQuery } from 'react-responsive';
import { useRouter } from 'next/navigation'
import SideBarMobile from '@/components/SideBarMobile/SideBarMobile';

const Page = () => {
    const [age, setAge] = useState<number | null>(null)

    const { push } = useRouter()

    useEffect(() => {
        if (window != undefined) {
            if (
                !localStorage.getItem("token")
            ) {
                push('/login?next=/retirement-age-calculator')
            }
        }
    }, [push]);


    const smallScreen = useMediaQuery({ maxWidth: 992 })

    return (
        <div className="flex w-full layout-gradient max-w-[100vw] overflow-clip">
            {smallScreen ? <SideBarMobile showUser={false} /> : <SideBarMobile />}
            <div className='grow max-w-full'>
                <Header/>
                <div className="mx-4 md:mx-auto max-w-2xl mt-28 mb-6">
                    <h1 className='text-2xl md:text-4xl'>In how many years will you retire?</h1>
                    <div>
                        <CalculationTable setAge={setAge} />
                    </div>
                    <div className='p-4 w-full'>
                        <RetirementAge age={age} />
                    </div>
                </div>
                <div>
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default Page
