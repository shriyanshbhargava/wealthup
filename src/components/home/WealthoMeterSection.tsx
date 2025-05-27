import Link from 'next/link'
import { SaleCoin } from '@/components/SaleCoin'

const WealthoMeterSection = () => {
    return (
        <section id="wealthometer-section" className="pb-12 sm:pb-24">
            <div className="container bg-white pt-16 pb-32 -mt-32 rounded-2xl shadow-lg">
                <h2 className="section-heading mb-16 text-center wow fadeInDown capitalize leading-tight" data-wow-delay="0.3s">Start your financial journey by <br className='hidden sm:block' /> checking where you stand today</h2>
                <p className="-mb-2 text-gray-600 text-lg md:text-xl text-center" data-wow-delay="0.3s">Are you on track for creating long-term wealth?
                </p>
                <p className="mb-4 text-gray-600 text-lg md:text-xl text-center" data-wow-delay="0.3s">
                    Check your SALECOIN score now!
                </p>
                <SaleCoin />
                <p className="mb-4 text-gray-600 text-lg md:text-xl text-center" data-wow-delay="0.3s">Get a free Financial Health Check.</p>
                <div className='flex justify-center'>
                    <Link href="/wealthometer" className="btn">
                        Use WealthoMeter
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default WealthoMeterSection;
