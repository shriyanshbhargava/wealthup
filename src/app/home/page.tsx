import '@/styles/newstyles.css'

import Backings from '@/components/wealthometer-new/Backings';
import { Client } from './client';
import ClientCompanies from '@/components/wealthometer-new/ClientCompanies';
import { Faq } from '@/app/home/faq';
import { FinancialSuccess } from './financial-success';
import Footer from '@/components/ui/footer';
import Header from '@/components/ui/header';
import { HeroSection } from './hero-section';
import { HowCanWeHelp } from './how-can-we-help';
import { IsThisYou } from './is-this-you';
import NavBar from '@/components/Navbar';
import React from 'react'
import  {Reasons}  from '@/app/home/reasons'
import { Testimonials } from './testimonials';
import { Blog } from './blog';

const Page = () => {
  return (
    <React.Fragment>
      {/* <NavBar headerSolid /> */}
      <Header/>
      <main className='w-full text-white primaryBackground min-h-fit'>
          <HeroSection />
          <div className='text-center'>
              <Client />
              <IsThisYou />
              <HowCanWeHelp />
              <FinancialSuccess />
              <Backings />
              <Testimonials />
              <ClientCompanies />
              <Reasons />
              <Blog />
              <Faq />
          </div>
      </main>
      <Footer />
    </React.Fragment>
  )
}

export default Page
