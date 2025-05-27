import { ClientCarousel } from '@/components/ClientCarousel'
import Image from "next/legacy/image"
import InfiniteLooper from '@/components/ui/InfiniteLooper'
import Link from 'next/link'
import { WealthoMeterButton } from '../MyAccount/Dashboard/WealthoMeterButton'

const TransformSection = ({ wealthometer = false }: { wealthometer?: boolean }) => {
    return (
        <section id={`${wealthometer ? '' : "transform"}`} className="py-24 text-center">
            <div className="container">
                <div className="text-center">
                    <h2 className="mb-12 section-heading wow fadeInDown capitalize" data-wow-delay="0.3s">Transforming lives - financially!</h2>
                </div>

                {/* <div className='bg-gray-400 h-96'>Slider</div> */}
                <div className='my-8 flex justify-center mx-4'>
                    <div className='w-full md:w-2/3'>
                        <ClientCarousel />
                    </div>
                </div>
                {!wealthometer && (
                    <>
                        <p className="mb-4 text-gray-600 text-xl text-center" data-wow-delay="0.3s">Ready to transform your finances?</p>
                        <div className='flex justify-center'>
                            <Link href="/wealthometer" className='btn'>
                                Get Started
                            </Link>
                        </div>
                    </>
                )}
                {wealthometer && (
                    <>
                        <p className="mb-4 text-gray font-bold text-lg md:text-xl text-center" data-wow-delay="0.3s">Trusted By Clients From 50+ Companies </p>
                    </>
                )}
                <div className="max-w-screen-xl flex overflow-hidden mt-12">
                    <InfiniteLooper direction='left' speed={40}>
                        <div className="flex flex-wrap justify-center">
                            {Array(30).fill(0).map((_, i) => (
                                <div className="w-32 md:w-40 lg:w-40" key={i}>
                                    <div className="m-2 wow" data-wow-delay="0.6s">
                                        <Image
                                            width={126}
                                            height={50}
                                            className=""
                                            src={`/assets/img/clients/companies/${i + 1}.png`}
                                            alt=""
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </InfiniteLooper>
                </div>
                {wealthometer && (
                    <>
                        <p className="mb-4 mt-8 font-bold text-gray text-lg md:text-xl text-center" data-wow-delay="0.3s">Ready to say no to financial stress?</p>
                        <div className="flex justify-center mt-4 w-full">
                            <WealthoMeterButton />
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}

export default TransformSection;
