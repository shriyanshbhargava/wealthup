import React from 'react'

export const Disclaimer: React.FC<{
    setShowDisclaimer: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ setShowDisclaimer }) => {
  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 h-full w-full backdrop-blur-sm'>
                <div className='absolute px-3 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'>
                <div className='w-full sm:max-w-[414px] md:max-w-[660px] h-[360px] rounded-[27px] bg-brand-blue text-white shadow-[0px_5px_4px_2px_rgba(0,179,176,0.80)] border-[#01C8A9] border'>
                    <div className='flex flex-col justify-between h-full px-6 md:px-14 pt-6 md:pt-12 pb-12'>
                        <div>
                            <p className='text-xl mb-1'>Heads-up! The results you&apos;re about to see are based on the info you&apos;ve shared. For more accurate results, enter your precise details. If you need more clarity, feel free to chat with a Wealthup pro anytime!</p>
                        </div>
                        <div className='flex justify-center'>
                        <button
                          onClick={() => setShowDisclaimer(false)} 
                          className='w-[275px] h-[56px] rounded-md bg-[#FB7306] shadow-[0px_3px_4px_0px_#074553] text-white text-xl'>
                            Understood
                        </button>
                        </div>
                    </div>
                </div>
                </div>
            </div>
  )
}
