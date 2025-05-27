'use client'

import '@/styles/newstyles.css'

import { useEffect, useMemo, useState } from 'react';

import GlossaryTerm from './GlossaryTerm'
import Image from "next/image";
import { MdClose } from "react-icons/md";
import {usePathname} from 'next/navigation'
import { useRouter } from "next/navigation";
import { useScreenType } from '@/hooks/useScreenType';

function getRandomElements(arr, count) {
    let shuffled = arr.slice();
    let result = [];
    let i = arr.length;
    let min = i - count;
    while (i-- > min) {
      let index = Math.floor((i + 1) * Math.random());
      let temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
      result.push(shuffled.pop());
    }
    return result;
  }

const GlossaryTermModal = ({term, others}) => {


    const screenSize = useScreenType();
    const router = useRouter();
    const [cardCount, setCardCount] = useState(3)
    const [selectedTerm, setSelectedTerm] = useState(null);
    const [loading, setLoading] = useState(false);
    const pathname = usePathname()

    const array = Array.from({ length: cardCount }, (_, index) => index);
    
    useEffect(()=>{
        setLoading(true);
        const recommendations = others.filter((item)=>{
            return item.id !== term[0].id
        })
        
        const elementsToKeep = getRandomElements(recommendations, cardCount-1);
        const middleIndex = Math.floor(elementsToKeep.length / 2);
        elementsToKeep.splice(middleIndex, 0, term[0]);
        setSelectedTerm(elementsToKeep)
        setLoading(false);
    },[cardCount,screenSize, others, term])

    useEffect(()=>{
        if(screenSize === 'mobile' || screenSize === 'fullscreen'){
            setCardCount(1);
        }else{
            setCardCount(5);
        }
    },[screenSize])

    return(
        <>
           <div className={`bg-[#E7F9F2]`}>
                <div className={`transition-opacity duration-500 flex flex-col min-h-screen`}>
                    <div className="pt-4 pb-4 px-20 hidden w-full  sm:flex justify-between items-center fixed">
                        <Image
                            src="/assets/img/wealthup-bluelogo.png"
                            alt="wealthup.me logo"
                            height={145}
                            width={145}
                            priority
                            className="Logo lg:pb-3 cursor-pointer"
                            onClick={()=>{router.push('/')}}
                        />
                        <div className='w-8 h-8'>
                            <MdClose  size={'2rem'} cursor={'pointer'} color='#045783' onClick={()=>{router.push('/resources/school-of-finance')}}/>
                        </div>
                    </div>
                    <div className='sm:px-6 lg:px-12 sm:pt-[70px] lg:pb-10 w-full h-screen sm:h-full min-h-fit flex items-center '>
                        <div className="flex items-center sm:h-[600px] min-h-fit h-full w-full">
                            {array.map((item,index) =>
                                    <div key={item} className={`w-full ${item===parseInt(cardCount/2)? 'm-0 sm:w-2/6':'sm:w-1/6'}  flex flex-grow items-center justify-center relative h-full min-h-fit`}>
                                        {(selectedTerm && !loading) && 
                                            <GlossaryTerm 
                                                active={item === parseInt(cardCount/2)} 
                                                slug={selectedTerm[index]?.slug} 
                                                next={selectedTerm[selectedTerm.length -1]?.slug} 
                                                back={selectedTerm[0]?.slug} 
                                                layouts={selectedTerm[index]?.layout} 
                                                term={selectedTerm[index]?.term} 
                                                pathname={pathname}
                                            /> }
                                    </div>
                                
                            )}
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    );
}

export default GlossaryTermModal;