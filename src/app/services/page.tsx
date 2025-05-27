import Backings from '@/components/wealthometer-new/Backings'
import ClientCompanies from '@/components/wealthometer-new/ClientCompanies'
import Footer from '@/components/ui/footer'
import Header from '@/components/ui/header'
import { HeroSection } from './hero-section'
import { Insurance } from './insurance'
import { Investments } from './investments'
import React from 'react'
import { TaxPlanning } from './tax-planning'
import { Testimonials } from './testimonials'

const Services = () => {
  return (
    <>
        <Header />
        <HeroSection />
        <div className='py-12 bg-brand-sky-blue'>
            <div className='container flex justify-center'>
                <p className='max-w-6xl text-center text-white text-3xl font-medium leading-tight md:text-[1.60rem] xsm:text-[1.15rem] xxsm:text-base mb-0'>Welcome to Wealthup, where your financial well-being is our top priority. We offer a range of services designed to empower you on your journey to financial freedom. </p>
            </div>
        </div>
        <Investments />
        <Insurance />
        <TaxPlanning />
        <div className="text-center w-full text-white">
            <Backings />
        </div>
        <Testimonials />
        <div className='text-white text-center sm:text-left'>
            <ClientCompanies />
        </div>
        <Footer />
    </>
  )
}

export default Services
