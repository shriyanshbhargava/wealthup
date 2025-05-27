"use client"
import * as Popover from '@radix-ui/react-popover';
import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';



const PopupFinance: React.FC<{
    children:React.ReactNode,
    text:string
}> = ({children,text}) => {

    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const handlePopoverOpen = () => {
        setIsPopoverOpen(true);
    };
    
    const handlePopoverClose = () => {
        setIsPopoverOpen(false);
    };

    const sm = useMediaQuery({ maxWidth: 700 })
    return (
        <Popover.Root open={isPopoverOpen} >
            <Popover.Trigger asChild>
                <div onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose} >
                    {children}
                </div>
            </Popover.Trigger>
            <Popover.Anchor />
            <Popover.Portal>
                <Popover.Content align='start' side={`${sm ? "bottom": "right"}`} className="bg-[white] border-none rounded-lg text-black p-6 w-full max-w-sm relative ">
                <div className='absolute top-0 -left-4'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="19" viewBox="0 0 21 19" fill="none">
                    <path d="M0.0237917 9.58876L20.2543 0.425492L20.2943 18.6632L0.0237917 9.58876Z" fill="white"/>
                    </svg>
                </div>
                <div className='flex flex-col flex-wrap'>
                    <h5 className='text-lg font-bold'>How is it calculated?</h5>
                    <p className='text-sm' >It’s based on 3 factors - current expenses, current value of investments and monthly SIPs.</p>
                    <h5 className='text-lg font-bold'>This is the age at which your investments earn you enough return to:</h5>
                    <p className='text-sm'>
                        1) Cover your expenses (adjusted to inflation every year)
                        <br/>
                        2) Increase the value of the principal amount by the inflation rate so that it allows you to withdraw inflation-adjusted expenses.
                    </p>
                    <p className='text-sm'>
                        <h5 className='text-lg font-bold'>Assumptions made:</h5>
                        It assumes a similar lifestyle is maintained throughout life. 
                        <br/>
                        <h5 className='text-lg font-bold'>Important:</h5> 
                        This is an estimation based on your lifestyle today. You need to update this as your life changes (e.g. marriage, kids, promotions etc.)
                        <br/>
                        As you use this tool regularly, the score’s accuracy increases. Chat with a Wealthup Pro to understand more.
                    </p>

                </div>
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}


export default PopupFinance;
