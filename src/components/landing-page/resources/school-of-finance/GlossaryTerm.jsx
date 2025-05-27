import { BsChevronLeft, BsChevronRight, BsFillPlayFill } from 'react-icons/bs';
import { useEffect, useRef, useState } from 'react';

import {AiOutlinePause} from 'react-icons/ai'
import { FaRegPaperPlane } from 'react-icons/fa';
import Link from 'next/link';
import React from 'react'
import RichText from '@/components/ui/RichTextNew';
import ShareTerm from './ShareTerm';
import { useRouter } from "next/navigation";

const ProgressIndicator = ({length, activeIndex, progress, isPaused}) => {
  const array = Array.from({ length: length }, (_, index) => index);
  return(
    <div className=' w-full px-4 pt-4 pb-8 h-10 flex gap-1 progress-bar'>
      {array.map((index)=> (<div key={index} className={`w-full h-1 ${activeIndex === index ? 'bg-[#ffffff80]' : ' inactive'} `}>
        {index === activeIndex && 
            <div className={`${activeIndex === index ? 'block' : 'hidden'} progress  bg-white relative z-1 h-full ${isPaused? 'paused' : ''}`}></div>
        }
        </div>)
      )}
    </div>
)} 
    


const GlossaryTerm = ({active, term, slug, layouts, pathname, next, back}) => {
  const [index, setIndex] = useState(0);
  const [timing, setTiming] = useState(0);
  const [videoPaused, setVideoPaused] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const indexRef = useRef(index);
  const router = useRouter();
  const handleCloseShareTermModal = () => setShareModal(false);
  const timer = useRef()

  const progress = (timing / 20 ) *100

  useEffect(()=>{
    setTiming(0)
  },[index])

  useEffect(() => {
    if(active){
      const increaseTiming = () => {
        if (!videoPaused && timing <= 20) {
          setTiming((prevTiming) => prevTiming + 1);
        }
      };
  
      if (timing >= 20) {
        setTiming(0);
        handleIndex(1);
        clearInterval(timer.current);
      }
  
      if (!videoPaused && timing <= 20) {
        timer.current = setInterval(increaseTiming, 1000);
      }
  
    }
    return () => {clearInterval(timer.current)};
  }, [timing, videoPaused]);



  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  const handleIndex = (num) => {
    if (num < 0 && indexRef.current > 0) {
        setVideoPaused(false);
        setIndex(prevIndex => prevIndex - 1);
    }else if(num < 0) {
      router.push(`/resources/school-of-finance/${back || pathname}`);
    }
    else{
      if (num > 0 && indexRef.current<layouts?.length-1) {
          setVideoPaused(false);
          setIndex(prevIndex => prevIndex + 1);
  
      }else{
        router.push(next || pathname)
      }
    }
  }
  

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        handleIndex(-1);
      } else if (event.key === 'ArrowRight') {
        handleIndex(1)
      }else if(event.key === " "){
        setVideoPaused(prevState => ! prevState)
      }
    };
    if(active){
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []); 

  useEffect(() => {
    // some logic
  }, [active, handleIndex]);

  return (
    <div className={` card-gradient2 z-1 relative sm:rounded-lg text-white w-[full] h-full  max-w-[420px] px-4 md:px-8  m-auto ${active? ' w-full min-h-full' : 'h-4/6 w-11/12 max-w-[260px] flex items-center justify-center'} `}>
      {(active && layouts?.length > 1) && <ProgressIndicator length= {layouts?.length} activeIndex={index} progress={progress} isPaused={videoPaused}/>}

      {(layouts?.length > 1 && active) && (
        <div className="absolute left-[2px] top-1/2">
            <BsChevronLeft className={`text-white text-2xl font-bold ${index === 0 ? "cursor-not-allowed pointer-events-none opacity-40" : "cursor-pointer"}`} onClick={() => handleIndex(-1)} />
        </div>
      )}

      <div className='flex flex-col h-max max-w-full'>
        <h2 className={`text-left text-xl md:text-2xl   break-words max-w-full py-4  ${active && layouts?.length === 1 ? 'pt-16' : ''}`}>
          {!active && <Link href={`/resources/school-of-finance/${slug}`} className='max-w-full break-words'>{term}</Link>}
          {active && term}
        </h2>

        {(active && layouts?.length >= 1) && 
          <div className=''>
            <div className={`h-fit flex flex-col  ${layouts.length === 1? 'justify-start' : 'justify-start'}`}>
              <RichText financialGlossary content={layouts[index].richText} />
            </div>
          </div> 
        }
      </div>

      {active && 
        <div className='absolute bottom-4 left-5 flex items-center gap-2'>
          {(layouts?.length >1 && !videoPaused) &&
            <AiOutlinePause size={20} className='cursor-pointer' onClick={()=> setVideoPaused(true)}/>
          }
          {(layouts?.length >1 && videoPaused) &&
            <BsFillPlayFill size={25} color='white' className='cursor-pointer' onClick={()=> setVideoPaused(false)}/>
          }
          {(layouts?.length >=1) &&
            <FaRegPaperPlane className='cursor-pointer ' onClick={()=>{setShareModal(true)}}/>
          }
        </div>
      }

      {(layouts?.length > 1 && active) && (
        <div className="absolute right-[2px] top-1/2">
            <BsChevronRight className={`text-white text-2xl font-bold ${index === layouts?.length-1 ? "cursor-not-allowed pointer-events-none opacity-40" : "cursor-pointer"}`} onClick={() => handleIndex(1)} />
        </div>
      )}

      <ShareTerm pathname={pathname} openModal={shareModal} onClose={handleCloseShareTermModal} />
    </div>
  )
}

export default React.memo(GlossaryTerm);