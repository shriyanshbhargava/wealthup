'use client'

import React,{useEffect, useState} from 'react'

import {AiOutlinePlayCircle} from 'react-icons/ai'
import { CmsApi } from "@/api/services/content/CmsApi";
import Image from 'next/image';
import Link from 'next/link';
import { Spinner } from "@/components/ui/Spinner";
import stackimage from '@/assets/images/financial-glossary/stack.png'

const Glossary = ({searchTerm, checkers}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);

  const cmsApiClient = new CmsApi();

  const getData = async () => {
    const data = await cmsApiClient.getFinancialGlossary();
    setData(data);
    setLoading(false);
  }


  const filter = () => {
    const regex = new RegExp(searchTerm, "i"); 
    let newData = data.filter(
      (item) =>
        regex.test(item.term)
    );

    if (!checkers.static) {
      newData = newData.filter((item) => item.layout?.length !== 1);
    }

    if (!checkers.carousels) {
      newData = newData.filter((item) => item.layout?.length <= 1);
    }

    if (!checkers.video) {
      newData = newData.filter((item) => item.layout?.length !== 0);
    }

    

    setFilteredData(newData);
  }

  useEffect(() => {
    setLoading(true);
    getData();
  }, []);

  useEffect(()=>{
    filter();
  },[checkers.static, checkers.carousels, checkers.video, data, searchTerm])

  useEffect(() => {
    // some logic
  }, [filter]);

  return (
    <div className='w-full md:w-4/5 max-w-[1030px] p-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 m-auto'>
        {loading && (
            <div className="col-span-12 flex items-center justify-center">
              <Spinner color="white" size="8" />
            </div>
          )}

        {!loading && data.length ? (
            filteredData.map((item,index)=>
                <Link href={`/resources/school-of-finance/${item.slug}`} className='min-h-[5rem] md:h-28 lg:h-32 tile  cursor-pointer' key={item.id}>
                  <div 
                    className=' flex items-center  py-8 pl-6 pr-2 justify-start relative h-full' 
                  >
                    {item.layout?.length >1 && 
                      <div className='absolute top-4 right-4 max-w-[20px]'>
                          <Image src={stackimage} alt='carousel tag' width={'100'} height={'100'}/>
                      </div>
                    }{(item.layout?.length ===0 || item.video) && 
                      <div className='absolute top-4 right-4'>
                          <AiOutlinePlayCircle color='white' size={20} />
                      </div>
                    }
                    <p className={`font-semibold text-lg sm:text-xl mb-0 break-words max-w-full py-2 text-left`}>{item.term}</p>
                  </div>
                </Link>
            )
        ) : !loading && !filteredData.length ? (
                <div className="col-span-12">
                <p className="font-sans text-xl " >Nothing found</p>
                </div>
        ) : null}
        
    </div>
  )
}

export default Glossary