import { useState } from "react";
import { IoMdArrowDropup } from "react-icons/io"

const saleCoin = [
  {
    char: 'sa',
    term: 'Savings',
    description: 'The portion of income not spent on monthly expenditures. It\'s the money set aside for future use.',
  },
  {
    char: 'l',
    term: 'Liquidity',
    description: "Expenses vary every month. This is the amount you should keep in your savings bank account for day-to-day expenses.",
  },
  {
    char: 'e',
    term: 'Emergency Fund',
    description: "A financial safety net for future mishaps and/or unexpected expenses. You can fall back on this fund at the hour of crisis.",
  },
  {
    char: 'co',
    term: 'Coverage',
    description: "Health and life insurance to cover your risk and protect you and your loved ones in unforeseen mishaps.",
  },
  {
    char: 'in',
    term: 'Investments',
    description: "This includes all your investments across stocks, mutual funds, bonds, gold (excluding jewellery), real estate, emergency fund, bank balance and cash.",
  },
]

export const SaleCoin = () => {
  const [selectedCircle, setSelectedCircle] = useState('sa');

  return (
    <div className="my-6 mb-16 flex justify-center">
      <div className='sm:w-[30rem] flex flex-col items-center'>
        <div className='flex gap-4'>
          {saleCoin.map(it => (
            <div className='relative' key={it.char}>
              <span className={`${selectedCircle === it.char ? 'bg-primary text-white' : 'bg-[#E2E8F0] text-primary-black'} cursor-pointer w-12 sm:w-16 lg:w-20 h-12 sm:h-16 lg:h-20  uppercase flex justify-center items-center text-xl sm:text-2xl font-bold rounded-full`} onClick={() => setSelectedCircle(it.char)}>{it.char}</span>
              {it.char === selectedCircle &&
                <div className='-my-5'>
                  <IoMdArrowDropup className="text-primary text-5xl" />
                </div>
              }
            </div>
          ))}
        </div>
        <div className='rounded-2xl bg-primary p-3 sm:p-6 text-white h-[165px]'>
          <h3 className='mb-0 text-2xl'>{saleCoin.find(it => it.char === selectedCircle)?.term}</h3>
          <p className='mb-0'>
            {saleCoin.find(it => it.char === selectedCircle)?.description}
          </p>
        </div>
      </div>
    </div>
  )
}
