import React, { FC, useState } from 'react'

import { Button } from '@/components/ui/Button';
import { UploadModal } from '@/components/MyAccount/Portfolio/components/UploadModal';

export const Header: FC<{
    annual_loss: number;
    total_funds: number;
    fund_size_message: string;
    setFetchAgain: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ annual_loss, total_funds, fund_size_message, setFetchAgain }) => {
    const [showUploadPopup, setShowUploadPopup] = useState(false);
    const handleShowUploadPopup = () => setShowUploadPopup(true);

    return (
        <div className='bg-primary-light h-[32rem] md:h-[25rem]'>
            {/* <div className='container flex items-end'>
                <h1 className='text-3xl md:text-4xl text-white mb-0'>My MF Portfolio Analyser</h1>
                <span className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">Beta</span>
            </div> */}
            <div className='w-full h-full flex items-center'>
                <div className='relative w-full h-full flex flex-wrap'>
                    <div className='relative w-full md:px-0 md:w-1/2 bg-[#006699] flex flex-col items-center justify-center md:pt-2 lg:pt-6'>
                        <div className='absolute left-4 top-4 flex items-end'>
                            <h1 className='inline text-2xl md:text-3xl lg:text-4xl text-white mb-0'>My MF Portfolio Analyser</h1>
                            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">Beta</span>
                        </div>
                        <div className='flex flex-col items-center justify-center pt-28 md:pt-0'>
                            <h2 className='text-xl md:text-2xl lg:text-3xl font-bold  text-white mb-0'>Annual Loss</h2>
                            <p className='text-lg lg:text-xl text-white'>{Intl.NumberFormat('en-IN', {
                                style: "currency",
                                currency: "INR",
                                maximumFractionDigits: 0,
                            }).format(annual_loss)}</p>
                            <p className='text-lg lg:text-xl text-white text-center'>
                                You are incurring an <span className='font-bold underline'>annual loss of {Intl.NumberFormat('en-IN', {
                                    style: "currency",
                                    currency: "INR",
                                    maximumFractionDigits: 0,
                                }).format(Math.abs(annual_loss))}</span> due to under performing funds.
                            </p>
                        </div>
                    </div>
                    <div className='w-full md:h-full bg-primary-light mt-4 md:mt-0 md:w-1/2 flex items-center justify-center'>
                        <div className='flex flex-col items-center justify-center'>
                            <h2 className='text-xl md:text-2xl lg:text-3xl font-bold  text-white mb-0'>Number of Funds</h2>
                            <p className='text-lg lg:text-xl text-white'>{total_funds}</p>
                            <p className={`text-lg lg:text-xl text-white text-center`}>{fund_size_message}</p>
                        </div>
                    </div>
                    <div className="absolute bottom-0 right-5 md:bottom-5 md:right-10">
                        <Button color="white" onClick={handleShowUploadPopup}>
                            Update CAS
                        </Button>
                    </div>
                </div>
            </div>
            <UploadModal
                open={showUploadPopup}
                setFetchAgain={setFetchAgain}
                onClose={() => setShowUploadPopup(false)}
            />
        </div >
    )
}
