import { Faq } from './faq'
import Footer from '@/components/ui/footer'
import Header from '@/components/ui/header'
import React from 'react'

const PricingPage = () => {
  return (
    <>
        <Header />
        <section className='bg-[#EBF8F5] border-b'>
            <div className='container  pt-32 flex flex-col items-center'>
                <div className='flex flex-col '>
                    <h1 className='text-[#24567E] text-4xl sm:text-5xl text-center xsm:text-4xl xxsm:text-3xl font-semibold capitalize md:leading-[50px]'>
                Service Tiers
                    </h1>
                    <p className='text-[#38658A] text-center xl:ml-0 text-3xl font-normal leading-tight md:mx-auto md:text-[1.60rem]  xsm:text-[1.15rem]  xxsm:text-base ml-14'>
                     Effective from 1st October 2024
                    </p>
                     {/* <p className='text-white text-center xl:ml-0 text-3xl font-normal leading-tight md:mx-auto md:text-[1.60rem]  xsm:text-[1.15rem]  xxsm:text-base ml-4'>
                     Service list as per relationship value with Wealthup
                    </p> */}
                </div>
                <div className='mt-10 flex flex-col items-start w-full'>
                   
                    <div className='mt-2 w-full'>
                        
                        <div className='bg-[#4FAFB1] py-8  text-white flex flex-col border-x-2 border-t-2 border-[#38658A] items-center w-full'>
                            <h3 className=' text-2xl mb-0 font-semibold'>Relationship Value with Wealthup*</h3>
                            <p className=' text-2xl mb-0'>= current value of investments + 5 times monthly investments (SIP) + 5 times annual insurance premium paid**</p>
                        </div>
                    </div>
                    <div className='w-full overflow-x-auto text-white'>
                        <table className='w-full'>
                            <thead>
                                <tr className='bg-sky-900'>
                                    <th className='text-xl text- bg-[#5BC6A8] text-white py-6 border-2 border-[#38658A] font-semibold'>Tier</th>
                                    <th className='text-xl bg-[#90C8EB] text-white py-6 border-2 border-[#38658A] font-semibold'>Bronze</th>
                                    <th className='text-xl bg-[#90C8EB] text-white py-6 border-2 border-[#38658A] font-semibold'>Silver</th>
                                    <th className='text-xl bg-[#5F92BC] text-white py-6 border-2 border-[#38658A] font-semibold'>Gold</th>
                                    <th className='text-xl bg-[#346CA8] text-white py-6 border-2 border-[#38658A] font-semibold'>Platinum</th>
                                    <th className='text-xl bg-[#0F212F] text-white py-6 border-2 border-[#38658A] font-semibold'>Black</th>
                                </tr>
                                   <tr className='bg-sky-800'>
                                    <th className='text-xl bg-[#5BC6A8] text-white py-6 border-2 border-[#38658A] font-semibold'>Annual Support</th>
                                    <th className='text-xl bg-[#90C8EB] text-white py-6 bborder-2 border-[#38658A] font-semibold'>Less Than 10L</th>
                                    <th className='text-xl bg-[#90C8EB] text-white py-6 border-2 border-[#38658A] font-semibold'>10L - 25L</th>
                                    <th className='text-xl bg-[#5F92BC] text-white py-6 border-2 border-[#38658A] font-semibold'>25L - 50L</th>
                                    <th className='text-xl bg-[#346CA8] text-white py-6 border-2 border-[#38658A] font-semibold'>50L - 1Cr</th>
                                    <th className='text-xl bg-[#0F212F] text-white py-6 border-2 border-[#38658A] font-semibold'>Above 1Cr</th>
                                </tr>
                            </thead>
                            <tbody>
                                  <tr className='bg-white text-[#010102]'>
                                    <td className='text-center text-xl py-4 border-2 border-[#38658A]'>Point of contact (POC)</td>
                                    <td colSpan={2} className='text-center text-xl py-4 border-2 border-[#38658A]'> Medha</td>
                                    <td colSpan={3} className=' text-center text-xl py-4 border-2 border-[#38658A]'> Ankit</td>

                                </tr>
                                <tr className='bg-white text-[#010102]'>
                                    <td className=' text-center text-xl py-4 border-2 border-[#38658A]'>Market alerts</td>
                                    <td colSpan={5} className=' text-center text-xl py-4 border-2 border-[#38658A]'> Over WhatsApp</td>
                                </tr>
                                  <tr className='bg-white text-[#010102]'>
                                    <td className=' text-center text-xl py-4 border-2 border-[#38658A]'>Performance review</td>
                                    <td colSpan={5} className=' text-center text-xl py-4 border-2 border-[#38658A]'>Quarterly webinar</td>
                                </tr>
                                  <tr className='bg-white text-[#010102]'>
                                    <td className=' text-center text-xl py-4 border-2 border-[#38658A]'>Transaction Calls</td>
                                    <td colSpan={5} className='text-center text-xl py-4 border-2 border-[#38658A]'>Unlimited - on need basis</td>
                                </tr>
                                                               <tr className='bg-white text-[#010102]'>
                                    <td className=' text-center text-xl py-4 border-2 border-[#38658A]'>Portfolio
rebalancing</td>
                                    <td colSpan={2} className='text-center text-xl py-4 border-2 border-[#38658A]'> As per market movement, <br/>details sent on WhatsApp</td>
                                    <td colSpan={3} className='text-center text-xl py-4 border-2 border-[#38658A]'> As per market movement, details sent on<br/>WhatsApp + google meet support</td>

                                </tr>
                                <tr className="bg-white text-[#010102]">
                                    <td className="text-center text-xl py-4 border-2 border-[#38658A]">Portfolio review <br/>with Ankit</td>
                                    <td className="text-center text-xl py-4 border-2 border-[#38658A]">0</td>
                                    <td className=" text-center text-xl py-4 border-2 border-[#38658A]">1</td>
                                    <td className="text-center text-xl py-4 border-2 border-[#38658A]">2</td>
                                    <td className="text-center text-xl py-4 border-2 border-[#38658A]">2</td>
                                    <td className="text-center text-xl py-4 border-2 border-[#38658A]">2</td>
                                </tr>
                                <tr className='bg-white text-[#010102]'>
                                    <td className="text-center text-xl py-4 border-2 border-[#38658A]">On demand calls<br/> with POC</td>
                                    <td className="text-center text-xl py-4 border-2  border-[#38658A]">1</td>
                                    <td className=" text-center text-xl py-4 border-2  border-[#38658A]">1</td>
                                    <td className="text-center text-xl py-4 border-2 border-[#38658A]">1</td>
                                    <td className=" text-center text-xl py-4 border-2  border-[#38658A]">2</td>
                                    <td className="text-center text-xl py-4 border-2 border-[#38658A]">4</td>
                                </tr>
                                <tr className="bg-white text-[#010102]">
                                    <td className=" text-center text-xl py-4 border-2 border-[#38658A]">Tax planning call <br/>with Ankit***</td>
                                    <td colSpan={2} className="text-center text-xl py-4 border-2 border-[#38658A]">Rs. 8,000/call</td>
                                    <td  colSpan={3} className=" text-center text-xl py-4 border-2 border-[#38658A]">1 free call every financial year</td>
                             
                                </tr>
                                   <tr className="bg-white text-[#010102]">
                                    <td className=" text-center text-xl py-4 border-2 border-[#38658A]">Access to offline events</td>
                                    <td colSpan={2} className=" text-center text-xl py-4 border-2 border-[#38658A]">Paid</td>
                                    <td  colSpan={3} className=" text-center text-xl py-4 border-2 border-[#38658A]">Free</td>
                             
                                </tr>
                                   <tr className="bg-white text-[#010102]">
                                    <td className=" text-center text-xl py-4 border-2 border-[#38658A]">Tax filing</td>
                                    <td colSpan={2} className=" text-center text-xl py-4 border-2 border-[#38658A]">To be announced in June 2025</td>
                                    <td  colSpan={3} className="text-center text-xl py-4 border-2 border-[#38658A]">Filing with one Form 16 is free</td>
                             
                                </tr>
                          
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='flex flex-col items-start w-full mt-10 mb-16'>
                    
                    <ul className="text-[#010102] text-xl font-medium list-none">
         <li>
    <span className="text-[#010102] font-bold">*</span> Includes transactions made via Wealthup only.
  </li>
         <li>
    <span className="text-[#010102] font-bold">**</span> Includes life and health insurance purchased for yourself or anyone in your family.
  </li>
        <li>
    <span className="text-[#010102] font-bold">***</span> Book here for tax planning. Ask us if there are any discounts running.
  </li>
</ul>     
                </div>
            </div>
        </section>
        <Faq />
        <Footer />
    </>
  )
}

export default PricingPage
