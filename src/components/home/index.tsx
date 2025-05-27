"use client"
import '@/styles/newstyles.css'

import Backings from "@/components/wealthometer-new/Backings";
import ClientCompanies from "@/components/wealthometer-new/ClientCompanies";
import CustomerFeedback from './CustomerFeedback';
import EventDetails from './EventDetails';
import Header from '@/components/ui/header';
import { HelpSection } from './HelpSection'
import { HeroSection } from './HeroSection'
import InterestSection from './InterestSection';
import InvestBanking from './InvestBanking';
import NewBlogSection from './NewBlogSection';
import NewFaqSection from './NewFaqSection';
import NewHelpSection from './NewHelpSection';
import NewHeroSection from './NewHeroSection';
import NewIsThisYou from './NewIsThisYou';
import Popup from '@/components/ui/popup';
import Testimonies from "@/components/wealthometer-new/Testimony";
import TrustSection from './TrustSection';
import dynamic from 'next/dynamic';
import { useState } from 'react';

// import TrustSection from '../../landing-page/TrustSection';














// import '@/styles/globals.css'


const WealthoMeterSection = dynamic(() => import("./WealthoMeterSection"));
const IsThisYouSection = dynamic(() => import("./IsThisYouSection"));
const BlogInvSection = dynamic(() => import("./BlogInvSection"));
const TransformSection = dynamic(() => import("./TransformSection"));
const FaqSection = dynamic(() => import("./FaqSection"));
const Footer = dynamic(() => import("@/components/ui/footer"));


const HomePage = () => {

  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [videoLink, setVideoLink] = useState('');

  function handleOpenVideoPlayer(link: React.SetStateAction<string>) {
    setVideoLink(link);
    setShowVideoPlayer(true);
  }

  // function handleCloseVideoPlayer() {
  //   setVideoLink('');
  //   setShowVideoPlayer(false);
  // }

  // const handleVideoClick = (e: any) => {
  //   e.target.controls = true;
  //   e.target.style.width = "";
  // };

  return (
    <div className='overflow-x-hidden'>
      {/* <!-- Header Area wrapper Starts --> */}
      <Header />
      
      {/* <!-- Header Area wrapper End --> */}

      {/* <!-- Hero Area Start --> */}
      {/* <HeroSection /> */}
      <div>
        <NewHeroSection />
      </div>
     
      {/* <!-- Hero Area End --> */}

      <TrustSection />
      <NewIsThisYou/>
      <NewHelpSection/>
      <InvestBanking/>
      <div className="text-center w-full text-white">
        <Backings />
      </div>
      
      <div className="text-center w-full text-white" style={{ backgroundColor: "rgb(3, 87, 130)" }}>
        <Testimonies handleOpenVideoPlayer={handleOpenVideoPlayer} loop={!showVideoPlayer} />
      </div>

      <div className='text-white text-center sm:text-left'>
        <ClientCompanies />
      </div>

      <InterestSection/>
      <EventDetails/>

      <NewBlogSection/>


      <NewFaqSection/>
      
      {/* WealthoMeterSection Start */}
      {/* <WealthoMeterSection /> */}
      {/* WealthoMeterSection End */}

      {/* Is This You Section */}
      {/* <IsThisYouSection /> */}
      { /* Is This You Section End */}

      {/* <!-- Feature Section Start --> */}
      {/* <HelpSection /> */}
      {/* <!-- Feature Section End --> */}

      {/* TransformSection Start */}
      {/* <TransformSection /> */}
      {/* TransformSection End */}

      {/* Blog Inv Section Start */}
      {/* <BlogInvSection /> */}
      {/* Blog Inv Section End */}

      {/* Faq Section Start */}
      {/* <FaqSection /> */}
      {/* Faq Section End */}

      {/* <!-- Contact Section Start --> */}
      {/* <ContactSection /> */}
      {/* <!-- Contact Section End --> */}

      {/* <!-- Footer Section Start --> */}
      <Footer />
      {/* <!-- Footer Section End --> */}

    </div>
  )
}

export default HomePage
