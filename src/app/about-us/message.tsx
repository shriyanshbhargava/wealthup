export const Message = () => {
    return (
        <section className="bg-[#0A5783] flex justify-center py-12">
            <div className="container">
                <h2 className="text-white text-3xl sm:text-3xl lg:text-5xl font-semibold capitalize leading-10 text-center">A message from the founders</h2>
                <div className="mt-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-gradient-to-bl from-[#035782] to-[rgba(12,186,184,0.6)] rounded-2xl p-10 shadow-md">
                        <div className="">
                            <p className="text-white text-left w-84 sm:text-3xl font-normal  mt-2 xxsm:text-[1.4rem]">Procrastinating because you feel overwhelmed with all the financial knowledge available online? Sick of dragging through self-paced courses and enduring endless videos? FOMOing about investing? We feel you.</p>
                            <p className="text-white text-left w-84 sm:text-3xl font-normal  mt-2 xxsm:text-[1.4rem]">Uncertain about which financial product is right for you? Making haphazard investments without a plan? Trapped in bad insurance products &apos;someone-you-know&apos; sold
to you? We hear you.</p>
                        </div>
                        <div className="rounded-2xl bg-gray-200 w-full h-full min-h-[400px]"></div>
                    </div>
                </div>
            </div>
        </section>
    )
}
