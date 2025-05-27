import React from 'react'

export const HowCanWeHelp = () => {
  return (
    <section className='bg-primary-blue py-8 lg:py-12 w-full'>
        <h2 className='capitalize font-semibold mb-6'>How can we help</h2>
        <h3>Wealthup creates and helps you execute a comprehensive <br />plan for all your finances.</h3>
        <div className='container'>
            <div className='w-full flex flex-wrap justify-center gap-11 mt-12'>
                <Card title="Investment Management" description='Investing lumpsum and SIP as per your risk profile to achieve your financial goals.'/>
                <Card title="Life Insurance" description='Identifying the right life insurance policy to protect your loved ones.'/>
                <Card title="Health Insurance" description='Selecting the best health insurance policy for you and your family.'/>
                <Card title="Tax Savings" description='Selecting the best tax regime and tax saving options as per your need.'/>
            </div>
        </div>
    </section>
  )
}

const Card: React.FC<{
    title: string;
    description: string;
}> = ({ title, description }) => {
    return (
        <div className='text-left w-[280px] h-[254px] rounded-2xl p-6 backdrop-blur-sm ' style={{
            border: '1px solid rgba(12, 186, 184, 0.09)',
            background: "linear-gradient(45deg, #0CBAB817, #0CBAB899, #0CBAB817)"
        }}>
            <div className='flex gap-4 mb-6'>
                <span className='flex-shrink-0 block w-12 h-12 rounded-full bg-gray-200'></span>
                <h4 className='text-2xl font-semibold mb-0'>{title}</h4>
            </div>
            <p className='text-xl mb-0'>{description}</p>
        </div>
    )
}
