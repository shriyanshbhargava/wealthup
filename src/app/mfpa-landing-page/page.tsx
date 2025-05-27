"use client"

import React, { useRef, useState } from 'react'

import Backings from '@/components/wealthometer-new/Backings';
import ClientCompanies from '@/components/wealthometer-new/ClientCompanies';
import Footer from '@/components/ui/footer'
import { GtmNoScript } from '@/components/GoogleTagManager';
import Header from '@/components/ui/header'
import HeaderIntro from '@/components/wealthometer-new/HeaderIntro'
import HowItWorks from '@/components/wealthometer-new/HowItWorks';
import Image from 'next/image';
import MobileFrame from '@/components/wealthometer-new/MobileFrame'
import Modal from '@/components/ui/Modal';
import { Spinner } from '@/components/ui/Spinner';
import StepLoader from '@/components/ui/stepLoader';
import Storage from '@/utils/storage';
import Testimonies from '@/components/wealthometer-new/Testimony';
import VideoPlayerModal from '@/components/wealthometer-new/VideoPlayerModal';
import desktopHeroImg from "@/assets/images/mfpa/mfpa-hero-desktop.png"
import mfpaWorksImg from "@/assets/images/mfpa-works-img.png"
import mobileHeroImg from "@/assets/images/mfpa/mfpa-hero-mobile.png"
import mobileImg from "@/assets/images/mfpa/mfpa-mobile.png"
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";

const howItWorksData = {
  stepOne: {
    lineOne: "Enter Pan &",
    lineTwo: "Phone Number",
  },
  stepTwo: {
    lineOne: "Enter OTP",
    lineTwo: "",
  },
  stepThree: {
    lineOne: "Check Result",
    lineTwo: "",
  },
  img: mfpaWorksImg
}

const Page = () => {
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [videoLink, setVideoLink] = useState('');
  const [mobile, setMobile] = useState('')
  const [panNo, setPanNo] = useState('')
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setLoading] = useState(false)
  const [otpSentLoading, setOtpSentLoading] = useState(false)
  const [isOtpSent, setOtpSent] = useState(false)
  const router = useRouter()
  const formRef = useRef<HTMLDivElement>(null);
  const { push } = useRouter();

  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOtpSent = async () => {
    if (!panNo || !mobile) {
      toast.error("Please fill all the fields")
      return
    }
    if (!/^[A-Z]{5}\d{4}[A-Z]$/.test(panNo.toUpperCase())) {
      toast.error("Invalid pan number")
      return
    }
    if (mobile.length !== 10) {
      toast.error("Invalid mobile number")
      return
    }
    const data = {
      pan: panNo.toUpperCase(),
      pekrn: '',
      mobile: mobile,
      email: '',
      detailCas: false,
      fromDate: undefined,
      toDate: undefined
    };
    try {
      setLoading(true)
      const res = await fetch("https://api.wealthup.me/api/v1/casRequest/casRequest", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      });

      if (res.status === 200) {
        toast.success("OTP sent to your mobile. Please verify.");
        setOtpSent(true);
      } else {
        const json = await res.json();
        toast.error(json.error ?? "Something went wrong.");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async () => {
    if (!panNo || !mobile) {
      toast.error("Please fill all the fields")
      return
    }
    if (!/^[A-Z]{5}\d{4}[A-Z]$/.test(panNo.toUpperCase())) {
      toast.error("Invalid pan number")
      return
    }
    if (mobile.length !== 10) {
      toast.error("Invalid mobile number")
      return
    }
    const data = {
      mobile: mobile,
      enteredOtp: otp,
      detailCas: false
    };
    try {
      setOtpSentLoading(true)
      const res = await fetch("https://api.wealthup.me/api/v1/casRequest/validateOtp", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      });
      const json: any = await res.json();
      console.log("res", res, "status", res.status)
      if (res.status === 200) {
        toast.success("OTP has been verified successfully.")
        Storage.storeToken(json.tokens);
        const next = localStorage.getItem('next')
        if (next) {
          push(next)
          localStorage.removeItem('next')
        } else {
          push("/myaccount/mutualfundanalyser ");
        }
        return
      } else {
        const json = await res.json();
        toast.error(json.error ?? "Something went wrong.");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false)
    }
  }

  function handleOpenVideoPlayer(link: any) {
    setVideoLink(link);
    setShowVideoPlayer(true);
  }

  function handleCloseVideoPlayer() {
    setVideoLink('');
    setShowVideoPlayer(false);
  }

  return (
    <React.Fragment>
      <main className="w-full text-white text-center primaryBackground min-h-fit">
        <Header />
        <div className="relative gradientbg1 pt-20 overflow-clip">
          <HeaderIntro isMfpa={true} scrollToForm={scrollToForm} />
          {/* <MobileFrame isMfpa={true} /> */}
          <div className='absolute w-full flex'>
            <div className='hidden md:block relative w-10/12 mx-auto h-[630px] max-w-[800px]'>
              <Image src={desktopHeroImg} alt='' fill loading='eager' />
            </div>
            <div className='block md:hidden relative w-10/12 mx-auto h-[500px] max-w-[500px]'>
              <Image src={mobileHeroImg} alt='' fill loading='eager' />
            </div>
          </div>
          <div className="relative mt-[35rem] md:mt-[38rem]">
            <div className='relative z-20'>
              <HowItWorks isMfpa={true} data={howItWorksData} scrollToForm={scrollToForm} />
            </div>
            <div className='absolute -top-[11rem] sm:-top-[15rem] md:-top-[18rem] w-full z-10'>
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 1501 790" fill="none">
                <path d="M1002.95 172C687.448 62 449.336 124 296.547 282C181.413 401.06 54.8946 419.449 -3.07864 413.383V790H1501V0C1269.24 187.2 1072.4 192.667 1002.95 172Z" fill="#0A5783" />
              </svg>
            </div>
          </div>
        </div>
        <Backings />
        <Testimonies handleOpenVideoPlayer={handleOpenVideoPlayer} loop={!showVideoPlayer} />
        <ClientCompanies />
        {
       
          <Modal
  show={isLoading || otpSentLoading} 
  onClose={() => {
    setLoading(false); 
    setOtpSentLoading(false);
  }}
  bg="bg-white"
  width="[200%]"
  textColor="text-primary-blue-dark"
  titleClass="font-semibold text-[19px] h-fit"
>
  {isLoading ? (
    <div className="w-full h-full flex justify-center items-center">
      <div>
        <p>Your report is being generated</p>
        <div className="flex justify-center">
          <Spinner size="8" color="white" />
        </div>
      </div>
    </div>
  ) : otpSentLoading ? (
    <StepLoader />
  ) : null}
</Modal>

        }
        <div ref={formRef} className='py-4 sm:py-12 bg-[#1EE7C8B2]'>
          <div className='flex flex-col md:flex-row gap-12 w-10/12 mx-auto max-w-[1700px]'>
            <div className='flex flex-col gap-8 items-center md:items-start md:justify-center md:w-7/12'>
              <h2 className='text-white font-bold text-2xl lg:text-[32px] xxl:text-[40px] text-center md:text-left'>Check your mutual fund <br />portfolio{"'"}s health now</h2>
              <div className='flex flex-col gap-8 justify-start items-start mx-auto md:mx-0 max-w-[350px] md:max-w-[500px] w-full'>
                <div className='flex flex-col gap-2 justify-start items-start w-full'>
                  <label className='text-xl font-medium text-white'>PAN*</label>
                  <input type='text' className='w-full bg-transparent outline-none py-1.5 px-2 border-2 border-white rounded-lg' onChange={(e) => {
                    setPanNo(e.target.value)
                  }} />
                </div>
                <div className='flex flex-col gap-2 justify-start items-start w-full'>
                  <label className='text-xl font-medium text-white'>Phone Number*</label>
                  <input type='text' className='w-full bg-transparent outline-none py-1.5 px-2 border-2 border-white rounded-lg' onChange={(e) => {
                    setMobile(e.target.value)
                  }} />
                </div>
                {isOtpSent && <div className='flex flex-col gap-2 justify-start items-start w-full md:max-w-[500px]'>
                  <label className='text-xl font-medium text-white'>Enter OTP*</label>
                  <input type='number' className='w-full bg-transparent outline-none py-1.5 px-2 border-2 border-white rounded-lg' onChange={(e) => setOtp(e.target.value)} />
                  <p className='text-white font-normal text-base'>Didn{"'"}t receive the OTP? <span className='font-medium cursor-pointer' onClick={handleOtpSent}>Request again.</span></p>
                </div>}
                {error && <p className='text-red-500 text-sm font-medium'>{error}</p>}
              </div>
              <button onClick={() => {
                if (!isOtpSent) {
                  handleOtpSent()
                } else {
                  handleSubmit()
                }
              }} className='bg-[#FB7306] w-full max-w-[350px] mx-auto md:mx-0 md:w-1/2 md:max-w-[250px] flex justify-center items-center h-12 text-xl font-medium text-white'>{isOtpSent ? "Submit OTP" : "Get OTP"}</button>
            </div>
            <div className='hidden md:block relative w-5/12 h-[450px] xl:h-[500px] 2xl:h-[600px] max-w-[700px]'>
              <Image src={mobileImg} alt='' fill />
            </div>
          </div>
        </div>
        <VideoPlayerModal isOpen={showVideoPlayer} onClose={handleCloseVideoPlayer} url={videoLink} />
        {/* <AboutPage />
      <SaleCoinSection /> */}
      </main>
      <Footer />
    </React.Fragment>
  )
}

export default Page
