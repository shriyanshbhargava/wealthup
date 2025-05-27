"use client"

import * as Popover from '@radix-ui/react-popover';
import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';

const Popup: React.FC<{
  children: React.ReactNode,
  text: string
}> =  ({ children, text }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handlePopoverOpen = () => {
    setIsPopoverOpen(true);
  };

  const handlePopoverClose = () => {
    setIsPopoverOpen(false);
  };

  const sm = useMediaQuery({ maxWidth: 700 })
  return (
    <Popover.Root open={isPopoverOpen}>
      <Popover.Trigger asChild>
        <div onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>
          {children}
        </div>
      </Popover.Trigger>
      <Popover.Anchor />
      <Popover.Portal>
        <Popover.Content align='start' side={`${sm ? "bottom": "right"}`} className="bg-[#00B3B0] border-none rounded-lg text-white p-6 w-full max-w-sm relative ">
          {/* <Popover.Arrow height={20} width={10} color='#035782' /> */}
          <div className='absolute top-0 -left-4'>
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="19" viewBox="0 0 21 19" fill="none">
              <path d="M0.0237917 9.58876L20.2543 0.425492L20.2943 18.6632L0.0237917 9.58876Z" fill="#00B3B0"/>
            </svg>
          </div>
          {text.split('{.break}').map((line, index) => (
            <p key={index} className='text-base'>{line}</p>
          ))}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
};

export default Popup;
