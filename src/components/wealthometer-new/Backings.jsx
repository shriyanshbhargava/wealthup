import Image from 'next/image';
import React from 'react'
import levelupimg from "@/assets/images/wealthometer_main/levelup.png";
import razorpayimg from "@/assets/images/wealthometer_main/razorpay.png";

const Backings = () => {
  return (
    <section className="flex-center flex-col gap-5  px-8 p-12 bg-[#019596]">
  
        <div className="pb-4 ">
          <h2 className="text-white text-3xl sm:text-4xl lg:text-[2.5rem] font-semibold capitalize  leading-10 mb-0">
            Backed By The Best
          </h2>
          <h3 className="leading-9 md:my-3 sm:text-2xl xxsm:text-base">
            Wealthup is backed and supported by
          </h3>
        </div>

        <div className="flex flex-row items-center justify-center gap-5 ">
          <Image src={razorpayimg} alt="Razorpay Rize" width={"250"} className="md:w-[250px] w-[150px]"/>
          <Image
            src={levelupimg}
            alt="LevelUp image"
            width={"250"}
            className="md:w-[250px] w-[150px]"
          />
        </div>

    </section>
  )
}

export default Backings