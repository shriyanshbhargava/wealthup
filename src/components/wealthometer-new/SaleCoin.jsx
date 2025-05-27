import { useEffect, useState } from "react";
import { IoMdArrowDropup } from "react-icons/io"

const saleCoin = [
  {
    char: 'sa',
    term: 'Savings',
    description: 'It is the amount left after making all your monthly expenses and paying your EMIs. Are you saving enough to start planning your finances?',
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

  useEffect(() => {
    const timer = setTimeout(() => {
      const itemIndex = saleCoin.indexOf(saleCoin.find(el => el.char === selectedCircle))
      let currentIndex = itemIndex + 1;
      if (currentIndex >= saleCoin.length) {
        currentIndex = 0
      }

      setSelectedCircle(saleCoin[currentIndex].char)
    }, 3000)

    return () => {
      clearTimeout(timer)
    }
  }, [selectedCircle])

  return (
    <div className="my-6 mb-12 flex justify-center">
      <div className='sm:w-[30rem] flex flex-col items-center'>
        <div className='flex gap-2 sm:gap-4 p-4 sale-coin'>
          {saleCoin.map(it => (
            <div className='relative progress sale-coin' key={it.char}>

              <svg className={`${selectedCircle === it.char ? 'fill-[#E8F8F5]  selected' : 'fill-[#00C9A7] '} salecoin circle`} 
                  onClick={() => setSelectedCircle(it.char)} >
                <circle className="progress-circle" cx="50%" cy="50%" r="48%" ></circle>
                <circle className="progress-circle" cx="50%" cy="50%" r="48%"></circle>
                <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill={selectedCircle === it.char ? '#035782' : '#E8F8F5'}
                  className={`text-xl sm:text-2xl font-semibold ` }>
                    {it.char}
                </text>
              </svg>

            </div>
          ))}
        </div>
        <div className=' bg-[#E8F8F5] text-[#035782] mt-2 p-3 sm:p-6 h-[165px] text-left flex flex-col justify-center  rounded-lg'>
          <h3 className='mb-2 text-2xl font-semibold'>{saleCoin.find(it => it.char === selectedCircle)?.term}</h3>
          <p className='mb-0 text-base md:text-lg font-medium'>
            {saleCoin.find(it => it.char === selectedCircle)?.description}
          </p>
        </div>
      </div>
    </div>
  )
}
