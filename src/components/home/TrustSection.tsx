import React from 'react'
import { Carousel } from 'react-responsive-carousel'

const TrustSection = () => {
  return (
    <div className="p-4 md:px-16 bg-sky-800 py-2">
        <div className='w-full flex flex-col xl:flex-row justify-between items-center my-auto bg-sky-800 h-full md:gap-[40px] xl:-gap-[20px] py-5'>
            <div className="text-white text-center md:text-left text-3xl sm:text-3xl font-semibold capitalize leading-10 ">
                Trusted By <br className='hidden xl:block' /> Clients From <br className='hidden xl:block' /> 60+ Companies
            </div>
        
            <div>
                <div className='hidden md:flex md:gap-[40px] lg:gap-[48px] xl:border-2 xl:border-r-0 xl:border-y-0 sm:border-l-1 xl:pl-[80px] sm:border-white'>
                <div className='flex flex-col gap-4 text-white w-56 lg:w-72'>
        <div className='w-56 lg:w-72 h-40 rounded-2xl overflow-hidden relative bg-black'>
            <iframe
             className="absolute top-0 left-0 w-full h-full"
             src="https://www.youtube.com/embed/HnW3TspUegc"
             title="YouTube video"
             frameBorder="0"
             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
             allowFullScreen
        ></iframe>
        </div>
        <div className='text-white leading-relaxed px-2'>
            <h5 className='text-[1.2rem] lg:text-xl'>Pooja Srivatsav</h5>
            <p className='text-base mb-0'>Product Manager, Cure.Fit</p>
        </div>
        </div>
        
                        <div className='flex flex-col gap-4 text-white w-56 lg:w-72'>
                            <div className='w-56 lg:w-72 h-40 rounded-2xl overflow-hidden relative bg-black'>
            <iframe
             className="absolute top-0 left-0 w-full h-full"
             src="https://www.youtube.com/embed/F_-POT-iHXw?si=YTa591IUpZu15aSo"
             title="YouTube video"
             frameBorder="0"
             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
             allowFullScreen
        ></iframe>
        </div>
        
        
                                <div className='text-white leading-relaxed px-2'>
                                <h5 className='text-[1.2rem] lg:text-xl'>Ishan Roy</h5>
                                    <p className='text-base mb-0'>First Officer, Camper & Nicholsons Crew</p>
                                </div>
                        </div>
                        
        <div className='flex flex-col gap-4 text-white w-64 lg:w-72'>
        <div className='w-56 lg:w-72 h-40 rounded-2xl overflow-hidden relative '>
            <iframe
             className="absolute top-0 left-0 w-full h-full"
             src="https://www.youtube.com/embed/e6bzn-F6shk?si=S26wvlIUGvfkOiqc"
             title="YouTube video"
             frameBorder="0"
             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
             allowFullScreen
        ></iframe>
        </div>
                                <div className='text-white leading-relaxed px-2'>
                                <h5 className='text-[1.2rem] lg:text-xl'>Saakshi Shrivastava
                                  </h5>
                                  <p className='text-base mb-0'>HR Generalist, CareerNinja</p>
                                </div>
                                </div>
                        </div>
                        <div className='md:hidden sm:w-[500px] mx-auto block xxsm:w-[350px] xsm:w-[450px]'>
        <Carousel showThumbs={false} showStatus={false}>
            <div className='flex justify-center items-center mt-[30px] sm:mt-[65px] flex-col  text-white mb-[50px]'>
                <div className='text-white text-base text-left font-medium leading-tight flex flex-col gap-4'>
                    <div className=' w-80 xsm:w-96  lg:w-72 h-56 rounded-2xl bg-white'>
                        <div className='w-80 xsm:w-96 lg:w-72 h-56 rounded-2xl overflow-hidden relative bg-black'>
                            <iframe
                                className="absolute top-0 left-0 w-full h-full"
                                src="https://www.youtube.com/embed/HnW3TspUegc"
                                title="YouTube video"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                    <div className='text-white leading-relaxed px-2'>
                        <h5 className='text-[1rem] sm:text-[1.5rem]'>Pooja Srivatsav</h5>
                        <p className='text-[0.75rem] sm:text-base'>Product Manager, Cure.Fit</p>
                    </div>
                </div>
            </div>
        
            <div className='flex justify-center items-center mt-[30px] sm:mt-[65px] flex-col  text-white mb-[50px]'>
                <div className='text-white text-base text-left font-medium leading-tight flex flex-col gap-4'>
                    <div className=' w-80 xsm:w-96  lg:w-72 h-56 rounded-2xl bg-white'>
                        <div className='w-80 xsm:w-96 lg:w-72 h-56 rounded-2xl overflow-hidden relative bg-black'>
                            <iframe
                                className="absolute top-0 left-0 w-full h-full"
                                src="https://www.youtube.com/embed/F_-POT-iHXw?si=YTa591IUpZu15aSo"
                                title="YouTube video"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                    <div className='text-white leading-relaxed px-2'>
                        <h5 className='text-[1rem] sm:text-[1.5rem]'>Ishan Roy</h5>
                        <p className='text-[0.75rem] sm:text-base'>First Officer, Camper & Nicholsons Crew</p>
                    </div>
                </div>
            </div>
        
            <div className='flex justify-center items-center mt-[30px] sm:mt-[65px] flex-col  text-white mb-[50px]'>
                <div className='text-white text-base text-left font-medium leading-tight flex flex-col gap-4'>
                    <div className=' w-80 xsm:w-96  lg:w-72 h-56 rounded-2xl bg-white'>
                        <div className='w-80 xsm:w-96 lg:w-72 h-56 rounded-2xl overflow-hidden relative bg-black'>
                            <iframe
                                className="absolute top-0 left-0 w-full h-full"
                                src="https://www.youtube.com/embed/e6bzn-F6shk?si=S26wvlIUGvfkOiqc"
                                title="YouTube video"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                    <div className='text-white leading-relaxed px-2'>
                        <h5 className='text-[1rem] sm:text-[1.5rem]'>Saakshi Shrivastava</h5>
                        <p className='text-[0.75rem] sm:text-base'>HR Generalist, CareerNinja</p>
                    </div>
                </div>
            </div>
        </Carousel>
        </div>
        
            </div>
        </div>
    </div>
  )
}

export default TrustSection
