'use client'

import { useEffect, useRef, useState } from "react";

import { useScreenType } from "@/hooks/useScreenType";

const Meter = ({showBg=true, showText=true, arraySize=10, stopAt=null, duration=1000}) => {
  const [isPageLoaded, setPageLoaded] = useState(false);

  const array = Array.from({ length: arraySize }, (_, index) => index);
  const colors1 = ['#D42929', '#d42929de', '#D15200', '#D15200', '#FA8D33', '#FA8D33', '#FAD225', '#FAD225', '#00C9A7', 'green']
  const colors2 = ['#d42929de', '#D15200', '#FA8D33', '#FAD225', '#00C9A7']

  const [activeBar, setActiveBar] =  useState(0);
  const [colors, setColors] = useState(colors1);
  const screenSize = useScreenType();
  const componentRef = useRef(null);

  useEffect(()=>{
    setTimeout(()=>{
      setPageLoaded(true);
    }, 1000)
  })



  useEffect(()=>{
    if(screenSize === 'mobile' || arraySize === 5){
      setColors(colors2);
    }else{
      setColors(colors1);
    }
  },[screenSize, arraySize])


  useEffect(() => {
    if(isPageLoaded){
      const observer = new IntersectionObserver(entries => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          const timer = setInterval(() => {
            setActiveBar(prevState => {
              if (prevState >= (stopAt ? stopAt : arraySize-1)) {
                clearInterval(timer);
                return prevState;
              }
              return prevState + 1;
            });
          }, duration);
        }
      });
  
      if (componentRef.current) {
        observer.observe(componentRef.current);
      }
  
      return () => {
        observer.disconnect();
      };
    }
  }, [colors, isPageLoaded]);



  
  return (
    <section className={`  ${showText? 'py-8 md:pt-20' : ''}`} ref={componentRef}>
        <div className={`flex w-full lg:w-3/5 items-center justify-center m-auto  ${showText? 'block' : 'hidden'}`}>
          <p className="basis-1/3 text-lg font-medium text-left">Financially Vulnerable</p>
          <p className="basis-1/3 text-lg font-medium">Financially Coping</p>
          <p className="basis-1/3 text-lg font-medium text-right">Financially  Healthy</p>
        </div>
        <div className={`meter-div w-full  h-6  m-auto flex items-center justify-around px-2  ${showBg ? 'wealthometer lg:w-3/5 md:h-8' : ''}`}>
            {array.map(i => {
              return <div key={i} className={` rounded ${activeBar === i ? ` active-bar` : ''} ${i>4  ? `hidden md:block` : ''} ${arraySize>5 ? 'meter-bar' : 'w-1/6'}`}
              style={{backgroundColor: activeBar === i ? colors[i] : '#035782bf'}}></div>
            })}
        </div>
    </section>
  )
}

export default Meter