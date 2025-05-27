import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import React from 'react'
import { goals } from "./components/goals"

export const GoalsModal: React.FC<{
  setCurrentModal: React.Dispatch<React.SetStateAction<"options" | "custom" | "retirement" | "house" | "education"|"travel"|"loans"| null>>
  open: boolean
}> = ({ setCurrentModal, open }) => {
  return (
    <Dialog open={open} onOpenChange={() => setCurrentModal(null)}>
  <DialogContent className="p-6">
    <DialogHeader>
      <DialogTitle className="text-center text-2xl">Choose your goal</DialogTitle>
    </DialogHeader>
    <div className="mt-6 flex flex-wrap">
        <div className="w-1/2 flex flex-col items-center justify-center mb-12">
      <button onClick={() => setCurrentModal("retirement")}>
          <div className="mb-8">
            {goals.retirement}
          </div>
          <span className="text-base">Retirement</span>
      </button>
        </div>
        <div className="w-1/2 flex flex-col items-center justify-center mb-12">
      <button onClick={() => setCurrentModal("house")}>
          <div className="scale-60 -mt-24 text-base">
            {goals.investment}
          </div>
          <span className="block -mt-12">Investment</span>
      </button>
        </div>
        <div className="w-1/2 flex flex-col items-center justify-center mb-12">
      <button onClick={() => setCurrentModal("travel")}>
          <div className="mb-8">
            {goals.travel}
          </div>
          <span className="text-base">Travel</span>
      </button>
        </div>
        <div className="w-1/2 flex flex-col items-center justify-center mb-12">
      <button onClick={() => setCurrentModal("education")}>
          <div className="mb-7">
            {goals.education}
          </div>
          <span className="block text-base">Education</span>
      </button>
        </div>  
        <div className="w-1/2 flex flex-col items-center justify-center">
      <button onClick={() => setCurrentModal("loans")}>
          <div className="mb-7">
            {goals.money}
          </div>
          <span className="block text-base">Loans</span>
      </button>
        </div>
        <div className="w-1/2 flex flex-col items-center justify-center">
      <button onClick={() => setCurrentModal("custom")}>
          <div>
            {goals.custom}
          </div>
          <span className="block -mt-3 text-base">Custom</span>
      </button>
        </div>
    </div>
  </DialogContent>
</Dialog>

    // <dialog open className=''>
    //     <div className=''>
    //         <div className='bg-[rgba(3,87,130,0.90)] shadow-[4px_4px_4px_0px_#035782] backdrop:blur-lg'>
    //             <div className='p-8 text-white'>
    //                 <h3 className='font-semibold text-center'>Choose your goal</h3>
    //             </div>
    //         </div>
    //     </div>
    // </dialog>
  )
}
