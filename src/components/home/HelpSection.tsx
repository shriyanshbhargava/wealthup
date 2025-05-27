import Image, { StaticImageData } from "next/legacy/image";

import healthInsIcon from '@/assets/images/help-section/Health Insurance.png';
import invIcon from '@/assets/images/help-section/Investment Mgt.png';
import lifeInsIcon from '@/assets/images/help-section/Life Insurance.png';
import taxSavingIcon from '@/assets/images/help-section/Tax Saving.png';

export const HelpSection = () => {
    return (
        <div id="help" className="pt-16 pb-16 sm:pb-24">
            <div className="container">
                <div className='flex justify-center'>
                    <div className='w-full md:w-2/3 text-center mb-4'>
                        <h2 className="text-center mb-4 section-heading wow fadeInDown capitalize" data-wow-delay="0.3s">How we can help</h2>
                        <p className='section-description'>Wealthup creates a comprehensive step-by-step plan to help you emergencies achieve your financial goals and protect you and your investments from risks.</p>
                    </div>
                </div>
                <div className="flex flex-wrap items-center">
                    <div className="w-full lg:w-1/2">
                        <div className="mx-3 lg:mr-0 lg:ml-3 wow fadeInRight flex justify-center" data-wow-delay="0.3s">
                            <div className=''>
                                <Image src="/assets/img/salecoin.jpeg" alt="How we can help" width={470} height={340} />
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2">
                        <div className="mb-5 lg:mb-0">
                            <div className="flex flex-wrap">
                                <HelpCard icon={invIcon} title="Investment Management" description='Investing lumpsum and SIP as per your risk profile to achieve your financial goals.' />
                                <HelpCard icon={taxSavingIcon} title="Tax Savings" description='Selecting the best tax regime and tax saving options as per your need.' />
                                <HelpCard icon={lifeInsIcon} title="Life Insurance" description='Identifying the right life insurance policy to protect your loved ones.' />
                                <HelpCard icon={healthInsIcon} title="Health Insurance" description='Selecting the best health insurance policy for you and your family.' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


const HelpCard: React.FC<{ title: string; description: string; icon: StaticImageData }> = ({ title, description, icon }) => {
    return (
        <div className="w-full sm:w-1/2 lg:w-1/2">
            <div className="m-3">
                <div className="icon text-4xl">
                    <span className='rounded-lg w-12 h-12 flex items-center justify-center'>
                        <Image src={icon} width={50} height={50} alt={title} />
                    </span>
                </div>
                <div className="features-content">
                    <h4 className="feature-title">{title}</h4>
                    <p>{description}</p>
                </div>
            </div>
        </div>
    )
}
