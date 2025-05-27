'use client'

import Button from '@/components/ui/ButtonNew'
import Link from 'next/link'
import { SaleCoin } from './SaleCoin'

const SaleCoinSection = () => {
    return (
        <section id="salecoin" className="gradientbg3">
            <div className="container pt-16 pb-16 rounded-2xl ">
                <h2 className="mb-4  wow fadeInDown capitalize leading-tight" data-wow-delay="0.3s">
                    WealthoMeter uses our <br className='hidden md:block'/>proprietary SALECOIN framework.</h2>
                <p data-wow-delay="0.3s">
                    When followed in a disciplined manner SALECOIN will help you <br className='hidden md:block' /> achieve your financial goals and create long-term wealth.
                </p>
                
                <SaleCoin />
                <p className="mb-2  font-semibold text-2xl md:text-[2rem] text-center" data-wow-delay="0.3s">Get a free <br className='block md:hidden' />Financial Health Check.</p>
                <div className='py-4'>
                    <Link href={'/wealthometer'}>
                        <Button>
                            GET STARTED
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default SaleCoinSection;