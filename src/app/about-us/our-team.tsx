import Image, { StaticImageData } from "next/image"

import { BsLinkedin } from "react-icons/bs"
import ankit from "@/assets/images/investbanking/Ankit Photos.jpg"
import medha from '@/assets/images/medha.png'

export const OurTeam = () => {
    return (
        <section className="bg-[#159C98] py-10 pb-24">
            <div className="container">
                <h2 className='text-white text-3xl sm:text-3xl lg:text-[2.5rem] font-semibold capitalize leading-10 text-center'>Our Team</h2>
                <p className='text-white text-base sm:text-2xl lg:text-2xl font-light text-center mb-0'>
                    We’re on a mission to help you improve your chemistry with money.
                </p>
                <div className="flex justify-center mt-6">
                <div className="max-w-[1000px] pl-[100px] w-full flex flex-wrap justify-between gap-10 mt-10">
                   <TeamCard image={ankit} />
                   <TeamCard image={medha} first={{ heading: '12+', description: 'Marketing Experience' }} second={{ heading: '6+', description: 'In Customer Delight'}} third={{ heading: '3+', description: 'Working in FinTech'}} />
                </div>
                </div>
            </div>
        </section>
    )
}

const TeamCard: React.FC<{
    image: StaticImageData,
    first?: {
        heading: string;
        description: string;
    },
    second?: {
        heading: string;
        description: string;
    },
    third?: {
        heading: string;
        description: string;
    },
}> = ({ image, first, second, third }) => {
    return (
         <div className="bg-[#D9D9D9] h-[400px] w-[360px] rounded-2xl relative flex flex-col justify-end">
            <Image src={image} alt="Medha" fill className="rounded-2xl"  objectFit="cover" objectPosition="top center" />
                        <div className="max-w-[200px] md:max-w-[240px] w-full absolute top-6 -left-24 md:-left-40 bg-[linear-gradient(240.34deg,#035782_2.27%,rgba(12,186,184,0.8)_95.63%)] p-4 rounded-xl shadow-md backdrop:blur-sm drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
                            <h3 className="text-white text-xl font-medium mb-0 text-center">
                                <span className="text-3xl">{first?.heading ?? '6+'}</span> Years
                            </h3>
                            <p className="text-white text-center text-xs md:text-sm mb-0">{first?.description ?? 'As Investment Banker, Swiss <br /> Bank (UBS) New York'}</p>
                            <p className="text-white text-center text-xs md:text-sm mb-0">{first?.description ?? 'As Investment Banker, Swiss Bank (UBS) New York'}</p>
                        </div>
                        <div className="max-w-[200px] md:max-w-[240px] w-full absolute top-40 -left-24 md:-left-40 bg-[linear-gradient(240.34deg,#035782_2.27%,rgba(12,186,184,0.8)_95.63%)] p-4 rounded-xl shadow-md backdrop:blur-sm drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
                            <h3 className="text-white text-xl font-medium mb-0 text-center">
                                <span className="text-3xl">{second?.heading ?? '14+'}</span> Years
                            </h3>
                            <p className="text-white text-center text-xs md:text-sm mb-0">{second?.description ?? 'of Proven Investing Excellence'}</p>
                        </div>
                        <div className="max-w-[200px] md:max-w-[240px] w-full absolute top-[240px] -left-24 md:-left-40 bg-[linear-gradient(240.34deg,#035782_2.27%,rgba(12,186,184,0.8)_95.63%)] p-4 rounded-xl shadow-md backdrop:blur-sm drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
                            <h3 className="text-white text-xl font-medium mb-0 text-center">
                                <span className="text-3xl">{third?.heading ?? '29'}</span> Years
                            </h3>
                            <p className="text-white text-center text-xs md:text-sm mb-0">{third?.description ?? 'Attained Financial Freedom'}</p>
                        </div>
                        <div className="p-4 flex gap-2 items-center">
                            <p className="text-[#035782] font-medium mb-0">Ankit Agarwal</p>
                            <BsLinkedin className="text-[#035782]" />
                        </div>
                    </div>
    )
}
