'use client'

import React, {useEffect, useRef, useState} from 'react';

import Image from 'next/image';
import People from './People';
import mobileframe from '@/assets/images/wealthometer_main/mobileframenew.png';
import shadow from '@/assets/images/wealthometer_main/shadow.png'

const MobileFrame = () => {

    const elementRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const[active, setActive] = useState(0);
    const [isPageLoaded, setPageLoaded] = useState(false);
    const colors = ['#FAD225','#00C9A7','#FA8D33', '#D15200', '#D42929']
    const height = ['50px','55px','60px','65px','73px']

    const array = Array.from({ length: 5 }, (_, index) => index);

    useEffect(()=>{
      setTimeout(()=>{
        setPageLoaded(true);
      }, 1000)
    })
    

    useEffect(()=>{
      if(isPageLoaded && isVisible){
        const timer = setInterval(() => {
          setActive(prevState => {
            if (prevState >= 1) {
              clearInterval(timer);
              return prevState;
            }
            return prevState + 1;
          });
        }, 1000);
      }
    },[isPageLoaded, isVisible])

  

    useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setTimeout(()=>{
            setIsVisible(true);
          }, 1000)
        }
      });
  
      if (elementRef.current) {
        observer.observe(elementRef.current);
      }
  
      return () => {
        if (elementRef.current) {
          observer.unobserve(elementRef.current);
        }
      };
    }, []);
  
    const className = isVisible ? 'selected meter green' : '';

    


  return (
        <div className='w-full  relative z-10 '>
            <div className='bg-cover rounded-t-[50px] max-h-[440px] min-h-[364px] lg:h-[436px] flex items-center'  style={{backgroundImage: `url(${mobileframe.src})`}} >
                <div className=' text-[#035782] text-left p-[5%] lg:pl-[10%] w-11/12 m-auto'>
                    <h3 className='text-xl font-semibold pt-10  pb-2 m-0'>WealthoMeter predicts <br /> your retirement age</h3>
                    
                    <div className='flex mt-5 md:mt-3 lg:mt-6' >
                        <div className='basis-3/5'>
                            <p className='text-sm lg:text-lg font-bold pt-2 m-0 leading-[1.3] '>You are expected <br /> to retire at</p>
                            <p className='text-xs lg:text-sm p-1 my-3 rounded-xl bg-[#FF7300] text-white text-center w-fit'>Explore my roadmap</p>
                        </div>
                        <div className='basis-2/5 flex items-center' >
                            <svg className={`${className} fill-[#E8F8F5] salecoin circle frame-circle`}>
                              
                                <circle className={`progress-circle circle1`} cx="50%" cy="50%" r="48%" ></circle>
                                <circle className={`progress-circle ${className}`} cx="50%" cy="50%" r="48%"></circle>
                                <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill={'#035782'}
                                className={`text-xl sm:text-2xl font-semibold ` } ref={elementRef}>
                                    45
                                </text>
                            </svg>
                        </div>
                    </div>
                    <div className='w-[190px] h-[100px] gap-1 m-auto flex  items-end'>
                        {array.map((index)=>{
                          return(
                            <div key={index} className={`basis-1/5 `} style={{height:height[index]}}>
                              <People color={active === index ? colors[index] : '#035782'} height={height[index]}/>
                            </div>
                          )
                        })}
                    </div>
                </div>
                <Image src={shadow} className='absolute -top-[1.7rem] left-full z-1 md:hidden' alt='shadow'/>
            </div>
        </div>
  )
}

export default MobileFrame