"use client"

import { cn } from '@/utils'
import React, { useEffect, useRef, useState } from 'react'

export const TilePopover: React.FC<{
    evenOrOdd: "even" | "odd"
    setActiveTile: React.Dispatch<React.SetStateAction<number | null>>
    setDefaultActive: React.Dispatch<React.SetStateAction<number | null>>
}> = ({ evenOrOdd, setActiveTile, setDefaultActive }) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!popoverRef.current) return;

      if (event.target === popoverRef.current) return;

      setOpen(false)
      setActiveTile(null)
      setDefaultActive(null)
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        // Handle outside click logic here
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [setActiveTile, setDefaultActive]);

  if (!open) return null;

  return (
    <div ref={popoverRef} className={cn(
        "w-[236px] relative rounded-2xl stroke-[#035782] stroke-2 drop-shadow-[3px_2px_19.5px_#035782] bg-white z-50",
        "before:absolute before:-top-3.5 before:w-8 before:h-8 before:[border-width:22px_15px_0_0] before:[border-color:transparent_#fff_transparent_transparent]",
        evenOrOdd === "even" ? "before:left-0" : "before:right-0"
    )}>
      <div className='p-4 text-brand-blue'>
        <p className='text-base'><strong className='font-bold'>Boost your returns:</strong><br /> Improve your returns by removing underperforming investments.</p>
        <div className='mt-8'>
          <button className='h-[40px] rounded-md bg-[#FB7306] shadow-[0px_3px_4px_0px_#074553] text-white text-base px-6'>
            Upload CAS
          </button>
        </div>
      </div>
    </div>
  )
}