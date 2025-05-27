import '@/styles/newstyles.css'

import React, { useEffect, useRef, useState } from 'react'

import People from '@/components/wealthometer-new/People';

export const RetirementAge = ({ age }: { age: number | null }) => {
    const colors = ['#00C9A7', '#FAD225', '#FA8D33', '#D15200', '#D42929']
    const height = ['37px', '40px', '44px', '47px', '50px'] // change the height properly...
    const array = Array.from({ length: 5 }, (_, index) => index);
    const [active, setActive] = useState(0);
    const elementRef = useRef(null);
    const [isVisible, setIsVisible] = useState(true);
    const className = isVisible ? 'selected meter' : '';

    useEffect(() => {
        const currentElement = elementRef.current;
        const observer = new IntersectionObserver((entries) => {
            const [entry] = entries;
            if (entry.isIntersecting) {
                setTimeout(() => {
                    setIsVisible(true);
                }, 1000)
            }
        });

        if (currentElement) {
            observer.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                observer.unobserve(currentElement);
            }
        };
    }, []);

    return (
        <div className='flex flex-col items-center justify-center w-full'>
            <p className='text-lg font-medium pt-2 m-0'>You are expected to retire in</p>
            {/* <Image src={ageImage} alt='image' width={100} height={100}/> */}
            {/* <div className='w-[120px] h-[55px] flex items-end'>
                {array.map((index) => {
                    return (
                        <div key={index} className={`basis-1/5 `} style={{ height: height[index] }}>
                            <People color={active === index ? colors[index] : '#035782'} height={height[index]} />
                        </div>
                    )
                })}
            </div> */}
            <div className='relative'>
                <svg className={`${className} fill-[#E8F8F5] salecoin circle frame-circle`}>
                    <defs>
                        <linearGradient id="myGradient" x1="0%" y1="30%" x2="100%" y2="0%">
                            <stop offset="20%" stopColor="rgba(255,115,0,0.9332983193277311)" />
                            <stop offset="80%" stopColor="rgba(254,255,0,0.8352591036414566)" />
                        </linearGradient>
                    </defs>
                    <circle className={`progress-circle circle1`} cx="50%" cy="50%" r="48%" ></circle>
                    <circle className={`progress-circle ${className}`} cx="50%" cy="50%" r="48%"></circle>
                </svg>
                <div className='absolute top-1/2 right-1/2 translate-x-[50%] translate-y-[-50%]'>
                    <div className="flex flex-col items-center justify-center">
                        <span className='text-xl font-bold'>{age}</span>
                        <span className='text-lg medium'>Years</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
