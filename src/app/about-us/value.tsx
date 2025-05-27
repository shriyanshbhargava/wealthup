export const Value = () => {
    return (
        <section className="bg-[#0A5783] py-10">
            <div className="container">
                <h2 className='text-white text-3xl sm:text-3xl lg:text-[2.5rem] font-semibold capitalize leading-10 text-center'>Our Values</h2>
            <p className='text-white text-base sm:text-2xl lg:text-2xl font-light text-center mb-0'>
                &quot;Values are like fingerprints. Nobody&apos;s are the same, but <br className="br-show-xl" /> you leave them all over everything you do.&quot;
            </p>
            <p className='text-white text-base sm:text-2xl lg:text-2xl font-medium text-center'>~ Elvis Prestley</p>
            </div>
            <div className="flex justify-center container">
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10 max-w-6xl">
                    <ValueCard title="Reliability" description="A friend who will be with you through market’s ups and downs and your changing situations." />
                    <ValueCard title="Approchability" description="A friend who will be with you through market’s ups and downs and your changing situations." />
                    <ValueCard title="Simplicity" description="A friend who will be with you through market’s ups and downs and your changing situations." />
                </div>
            </div>
        </section>
    )
}

const ValueCard: React.FC<{
    title: string;
    description: string;
}> = ({ title, description }) => {
    return (
        <div className="bg-white rounded-2xl p-10">
            <h3 className='text-2xl sm:text-xl font-semibold leading-6 text-left text-[#035782]'>{title}</h3>
            <p className="text-left w-84 h-32 sm:text-[1.15rem] font-normal mt-2 xxsm:text-[1.4rem] text-[#035782] mb-0">
                {description}
            </p> 
        </div>
    )
}
