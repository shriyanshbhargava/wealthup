"use client"

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

import { AuthApi } from '@/api/services/auth/AuthApi'
import logo from '@/assets/logo/wealthup-new-whitelogo.png'
import Footer from '@/components/ui/footer'
import { Spinner } from '@/components/ui/Spinner'
import Storage from '@/utils/storage'
import { toast } from 'react-toastify'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'

// Define NetworkInformation interface for TypeScript
interface NetworkInformation {
  saveData: boolean;
  effectiveType: string;
  downlink: number;
  rtt: number;
}

// Extend Navigator interface to include connection property
declare global {
  interface Navigator {
    connection?: NetworkInformation;
  }
}

const AuthPage = () => {
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'auth'>('auth')
  const [innerScreen, setInnerScreen] = useState("phone");
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [showOtp, setShowOtp] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [invalidOTP, setInvalidOTP] = useState(false);
  const [expiredOTP, setExpiredOTP] = useState(false);
  const [onboarding, setOnboarding] = useState(false);

  // Background media state
  const [backgroundReady, setBackgroundReady] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [useVideo, setUseVideo] = useState(false);
  const [connectionType, setConnectionType] = useState<'fast' | 'slow' | 'unknown'>('unknown');

  const AuthApiClient = new AuthApi()
  const router = useRouter()
  const [error, setError] = useState(false);
  const otpRef = useRef<HTMLInputElement>(null);
  
  // We'll store the next parameter in state instead of using useSearchParams
  const [nextParam, setNextParam] = useState<string | null>(null);

  // Detect connection speed
  useEffect(() => {
    const detectConnectionSpeed = () => {
      if (navigator.connection) {
        const connection = navigator.connection;
        const isSlowConnection = connection.saveData ||
          ['slow-2g', '2g', '3g'].includes(connection.effectiveType);

        setConnectionType(isSlowConnection ? 'slow' : 'fast');
        return;
      }

      // Fallback speed test
      const startTime = Date.now();
      fetch('/api/connection-test?_=' + new Date().getTime(), { cache: 'no-store' })
        .then(() => {
          const duration = Date.now() - startTime;
          setConnectionType(duration > 200 ? 'slow' : 'fast');
        })
        .catch(() => {
          setConnectionType('slow');
        });
    };

    detectConnectionSpeed();
  }, []);

  // Preload static image immediately to ensure background is always available
  useEffect(() => {
    const img = new window.Image();
    img.src = "/assets/login-bg-image.jpg";
    img.onload = () => {
      setBackgroundReady(true);
    };

    // If image fails to load, still set background as ready so we don't block rendering
    img.onerror = () => {
      console.error("Background image failed to load");
      setBackgroundReady(true);
    };
  }, []);

  // Only try to load video if connection is fast
  useEffect(() => {
    if (connectionType === 'fast') {
      const video = document.createElement('video');
      video.preload = 'auto';

      const source = document.createElement('source');
      source.src = "/assets/login-bg.mp4";
      source.type = "video/mp4";

      video.appendChild(source);

      // Set timeout for video loading
      const videoTimeout = setTimeout(() => {
        console.log('Video load timeout reached');
        // We still have the static image as fallback
      }, 5000);

      video.onloadeddata = () => {
        clearTimeout(videoTimeout);
        setVideoLoaded(true);
        setUseVideo(true);
      };

      video.onerror = () => {
        clearTimeout(videoTimeout);
        console.error("Video failed to load");
        // We still have the static image as fallback
      };
    }
  }, [connectionType]);

  // Get the 'next' parameter from URL safely
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Parse URL search params directly instead of using useSearchParams
      const urlParams = new URLSearchParams(window.location.search);
      const next = urlParams.get('next');
      
      if (next) {
        localStorage.setItem('next', next);
        setNextParam(next);
      }
    }
  }, []);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentScreen('auth')
    }
  }, []);

  const sendOTP = async (e: any, resent?: boolean) => {
    e.preventDefault()
    setOtpLoading(true);
    setError(false);

    const body: any = {
      phone: `91${phone}`,
      method: 'login'
    };

    try {
      const res: Response = await AuthApiClient.sendOTP(JSON.stringify(body));
      setOtpLoading(false);
      const json = await res.json();
      if (res.status === 200) {
        toast.success(`${resent ? "OTP Resent" : "OTP sent successfully. Check your phone."}`);
        setInnerScreen("otp");
        setTimeout(() => {
          otpRef.current?.focus();
        }, 100);
      } else {
        setError(true);
        toast.error(json?.message ?? "Something went wrong while sending OTP");
      }
    } catch (err) {
      console.error(err);
      setOtpLoading(false);
      setError(true);
      toast.error("Something went wrong while sending OTP");
    }
  };

  const verifyOTPAndSubmit = async (e: any) => {
    e.preventDefault()
    setSubmitting(true);
    setInvalidOTP(false);
    setExpiredOTP(false);

    const body: any = {
      phone: `91${phone}`,
      otp: otp,
    };

    try {
      const response: Response = await AuthApiClient.login(
        JSON.stringify(body)
      );

      const json: any = await response.json();

      if (response.ok && response.status === 200) {
        setSubmitting(false);
        Storage.storeToken(json.tokens);
        const next = localStorage.getItem('next')
        if (next) {
          router.push(next)
          localStorage.removeItem('next')
          setOnboarding(true);
        } else {
          router.push("/myaccount/dashboard");
        }
      } else {
        setSubmitting(false);
        if (json.status === "invalid") {
          setInvalidOTP(true);
        } else if (json.status === "expired") {
          setExpiredOTP(true);
        } else {
          setInvalidOTP(true);
        }
      }
    } catch (err) {
      setSubmitting(false);
      console.error(err);
      toast.error("Something went wrong while verifying OTP");
    }
  };

  return (
    <>
      <div
        className={`relative xl:h-screen min-h-screen w-full overflow-hidden bg-gray-900`}
      >
        {/* Static background image (always present) */}
        <div
          className={`absolute inset-0 bg-[url("/assets/login-bg-image.jpg")] bg-cover bg-no-repeat transition-opacity duration-500 ${useVideo ? 'opacity-0' : 'opacity-100'}`}
        />

        {/* Video background (shown only if loaded successfully and connection is fast) */}
        {connectionType === 'fast' && (
          <div className={`absolute inset-0 transition-opacity duration-500 ${useVideo ? 'opacity-100' : 'opacity-0'}`}>
            <video
              autoPlay
              muted
              loop
              playsInline
              className="min-w-full min-h-full h-full w-full object-cover"
              onLoadedData={() => {
                setVideoLoaded(true);
                setUseVideo(true);
              }}
              onError={() => {
                console.error("Video playback error");
                setUseVideo(false);
              }}
            >
              <source src="/assets/login-bg.mp4" type="video/mp4" />
            </video>
          </div>
        )}

        {currentScreen === "welcome" ? (
          <div className='relative w-full h-full flex items-center justify-center text-white'>
            <div className="flex flex-col items-center gap-8 mt-[200px]">
              <div onClick={() => router.push("/")} style={{ cursor: "pointer" }}>
                <Image src={logo} alt="Logo" height={60} width={180} />
              </div>
              <button onClick={() => setCurrentScreen('auth')} className='w-[198px] h-[51px] flex items-center justify-center
              border-white border rounded-lg text-2xl font-light hover:bg-[#FF7300] hover:border-[#FF7300] transition-colors duration-300'>Get
                started</button>
              <p className="text-2xl font-light text-center px-2">Your journey to financial freedom starts here.</p>
            </div>
          </div>
        ) : (
          <div className='relative w-full h-full flex items-start justify-center text-white'>
            <div className='flex flex-col items-center gap-8 mt-24' style={{ width: "100%", margin: "100px 0" }}>
              <div onClick={() => router.push("/")} style={{ cursor: "pointer" }}>
                <Image src={logo} alt="Logo" height={60} width={180} />
              </div>

              <div className="max-sm:mx-4 sm:w-[466px] h-[376px] bg-[rgba(255,255,255,0.17)] rounded-xl backdrop-blur-md">
                <div className='max-sm:px-4 w-full h-full bg-[rgba(213,213,213,0.22)] rounded-xl grid place-items-center'>
                  <div className="flex flex-col py-8">
                    <span className='text-center text-[20px]'>
                      {innerScreen === "phone" ? "Log in using your phone number" : innerScreen === "otp" ? "Enter OTP" : ""}
                    </span>
                    {innerScreen === "phone" ? (
                      <form onSubmit={sendOTP} className='flex flex-col items-center gap-5 my-4'>
                        <div
                          className='w-[289px] h-[50px] rounded-[4px] border-white border pl-3 text-[20px] flex items-center'>
                          <div className='mr-2'>
                            <svg width="20" height="20" viewBox="0 0 44 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M41.5626 29.846L31.0951 25.162C30.6894 24.9864 30.2462 24.9147 29.8057 24.9534C29.3653 24.9921 28.9414 25.14 28.5725 25.3837C28.543 25.4024 28.5148 25.4231 28.4882 25.4457L22.9907 30.1319C22.8684 30.2066 22.7295 30.2498 22.5864 30.258C22.4434 30.2661 22.3005 30.2388 22.1705 30.1785C18.5705 28.4406 14.8442 24.743 13.1062 21.1852C13.0448 21.0561 13.0162 20.9139 13.0232 20.7711C13.0302 20.6284 13.0724 20.4896 13.1461 20.3672L17.8456 14.7788C17.8678 14.7522 17.8878 14.7233 17.9077 14.6945C18.1507 14.3261 18.2981 13.903 18.3368 13.4634C18.3755 13.0238 18.3042 12.5815 18.1294 12.1763L13.4365 1.72657C13.21 1.19731 12.8178 0.755839 12.319 0.468444C11.8202 0.18105 11.2415 0.0632482 10.67 0.132728C7.88042 0.50053 5.32008 1.87124 3.46724 3.98884C1.61439 6.10643 0.595755 8.8261 0.601587 11.6399C0.601587 28.7531 14.5227 42.6743 31.636 42.6743C34.4498 42.6801 37.1694 41.6615 39.287 39.8086C41.4046 37.9558 42.7753 35.3954 43.1431 32.6058C43.2121 32.0369 43.0955 31.461 42.8107 30.9637C42.5259 30.4664 42.0882 30.0744 41.5626 29.846ZM41.3897 32.3842C41.0767 34.7466 39.9139 36.9142 38.1188 38.4817C36.3237 40.0491 34.0191 40.9091 31.636 40.9009C15.5025 40.9009 2.37498 27.7733 2.37498 11.6399C2.36673 9.25673 3.22672 6.95219 4.79418 5.15708C6.36163 3.36197 8.52923 2.1992 10.8917 1.88617C10.9272 1.88397 10.9627 1.88397 10.9981 1.88617C11.1731 1.88766 11.3436 1.94087 11.4884 2.03908C11.6332 2.1373 11.7456 2.27615 11.8117 2.43814L16.4912 12.8879C16.5458 13.0156 16.5696 13.1544 16.5608 13.293C16.5519 13.4316 16.5106 13.5662 16.4402 13.6859L11.7429 19.2721C11.7208 19.3009 11.6986 19.3275 11.6787 19.3586C11.4284 19.7412 11.281 20.182 11.2507 20.6382C11.2205 21.0945 11.3083 21.5508 11.5058 21.9632C13.4321 25.9068 17.4045 29.8504 21.3924 31.7768C21.8077 31.973 22.2666 32.0583 22.7246 32.0245C23.1826 31.9907 23.6241 31.8389 24.006 31.5839L24.088 31.5218L29.5922 26.8401C29.7099 26.7681 29.8431 26.7252 29.9807 26.7148C30.1182 26.7044 30.2563 26.7268 30.3836 26.7802L40.8488 31.4709C41.0254 31.5444 41.1735 31.673 41.271 31.8376C41.3685 32.0022 41.4101 32.1939 41.3897 32.3842Z"
                                fill="white" />
                            </svg>
                          </div>
                          <input placeholder='Enter Phone Number' value={phone} maxLength={10} onChange={(e) => {
                            setError(false);
                            const input = e.target.value;
                            const regex = /^[0-9]*$/;
                            if (regex.test(input) || input === "") {
                              setPhone(input);
                            }
                          }}
                            type="tel"
                            name="phone"
                            className='w-full h-full bg-transparent focus:outline-none text-xl pr-3 autofill:bg-transparent'
                          />
                        </div>
                        {phone.length !== 10 && (
                          <div style={{ color: 'white', fontSize: "1rem" }}>Please enter a 10-digit phone number.</div>
                        )}
                        {error && (
                          <div style={{ color: 'white', fontSize: "1rem" }}>Something went wrong while sending OTP.</div>
                        )}

                        {phone.length === 10 && <button type="submit"
                          className="bg-[#FB7306] w-[151px] h-[40px] flex items-center justify-center rounded-[4px] text-white text-lg mt-12 drop-shadow-xl">
                          {otpLoading ?
                            <Spinner /> : "Send OTP"}
                        </button>}
                      </form>
                    ) : (
                      <form onSubmit={verifyOTPAndSubmit} className='flex flex-col items-center gap-5 my-8'>
                        <span className='text-center text-[16px]'>An OTP has been sent to your phone number<br />{phone}</span>
                        <div className='w-full h-full flex relative rounded-md border-white border px-6'>
                          <div className='w-[289px] h-[50px] text-[20px] flex items-center'>
                            <input
                              ref={otpRef}
                              value={otp}
                              max={999999}
                              min={0}
                              placeholder='Enter OTP'
                              onChange={(e) => {
                                setInvalidOTP(false);
                                setExpiredOTP(false);
                                if (e.target.value.toString().length > 6) {
                                  return false;
                                }
                                setOtp(e.target.value)
                              }}
                              type={showOtp ? "text" : "password"}
                              onKeyDown={(evt) => ["e", "E", "+", "-", "."].includes(evt.key) && evt.preventDefault()}
                              name="otp"
                              className='w-full h-full bg-transparent focus:outline-none text-center'
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => setShowOtp((prev) => !prev)}
                            className="absolute right-2 top-1/2 px-4 -translate-y-1/2 text-white"
                          >
                            {showOtp ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                        {otp.length !== 6 && (
                          <div style={{ color: 'white', fontSize: "1rem" }}>Please enter a 6-digit OTP.</div>
                        )}
                        {invalidOTP && (
                          <div style={{ color: 'white', fontSize: "1rem" }}>Invalid OTP.</div>
                        )}
                        {expiredOTP && (
                          <div style={{ color: 'white', fontSize: "1rem" }}>OTP has expired.</div>
                        )}
                        {otp.length == 6 && !invalidOTP && !expiredOTP && (
                          <button type="submit"
                            className="bg-[#FB7306] w-[151px] h-[40px] flex items-center justify-center rounded-md text-white text-lg">
                            {submitting ? <Spinner /> : "Submit"}
                          </button>
                        )}
                        <div onClick={(e) => sendOTP(e, true)} className='hover:underline cursor-pointer'>Resend OTP</div>
                      </form>
                    )}
                  </div>
                </div>
              </div>
              <Link href={"/demo/dashboard"}>
                <button className='underline'>Or See What&apos;s Inside First</button>
              </Link>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  )
}

export default AuthPage