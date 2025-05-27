import InvestedNumbers from '@/components/InvestedNumbers'
import Link from 'next/link'

export const HeroSection = () => {
    return (
        <section id="hero-area" className="bg-[#ecdfea] pt-48 pb-64">
            <div className="container">
                <div className="flex justify-between">
                    <div className="w-full text-center">
                        <h1 className="uppercase text-3xl md:text-5xl font-bold leading-snug mb-2 text-primary-black">
                            Financial Planning Made Easy
                        </h1>
                        <p className='text-2xl md:text-3xl font-normal leading-snug text-gray-800'>Get guidance on every aspect of your finances to achieve your financial goals quickly.</p>
                        <div className='flex justify-center'>
                            <Link href="/wealthometer" className='btn'>
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='mt-24'>
                    <InvestedNumbers />
                </div>
            </div>
        </section>
    );
}
