'use client'

import Button from "@/components/ui/ButtonNew";
import Image from "next/image";
import Link from "next/link";
import checknoxoutlinedimg from '@/assets/images/wealthometer_main/checkboxoutlined.png';
import { useScreenType } from "@/hooks/useScreenType";

const HeaderIntro = ({ isMfpa,scrollToForm }) => {

  return (
    <section className="relative min-h-fit mb-4 w-full overflow-clip">
      <div className="p-4">
        {isMfpa ? <h1 className="m-0 px-0 py-8 md:px-8 sm:pt-12 leading-[1.1] text-[32px] sm:text-[50px] xl:text-[64px]">
          Check Your <br className="block" /> Portfolio{"'"}s Performance
        </h1> : <h1 className="m-0 px-0 py-8 md:px-8 sm:pt-20 leading-[1.1]">
          Check Your <br className="block sm:hidden" /> Financial Health
        </h1>}
        {isMfpa ? <h3 className="font-normal text-[21px] sm:text-[28px] -mb-2 -mt-2">Get a detailed analysis of your mutual fund portfolio within 1 minute!</h3> : <h3 className="px-2 pt-2 mx-auto mb-0">
          Use WeathoMeter to get a free <br className="block sm:hidden" /> report <br className="hidden sm:block" />  card for your finances-<br className="block sm:hidden" /> within
          minutes!
        </h3>}
        <div className="pt-8 pb-2 lg:pt-14 lg:pb-16 hidden md:block">
        {isMfpa ? <Button onClick={scrollToForm}>Check Now</Button> : <Link href={'/wealthometer'}><Button>GET STARTED</Button></Link>}
        </div>

      </div>

      {!isMfpa && <div className="lg:flex font-normal md:font-semibold text-left w-full justify-between md:p-8 md:pt-1 lg:p-1 text-2xl ">
        <section className="w-max m-auto md:relative lg:right-20">
          <div className="flex items-center md:p-2 justify-start">
            <Image src={checknoxoutlinedimg} alt="checkbox" width={30} />
            <div className="mx-2 lg:flex-1">
              <p className="m-0 py-4 font-medium  md:font-semibold" style={{ lineHeight: 1 }}>Expected Retirement Age</p>
            </div>
          </div>
          <div className="flex items-center md:p-2 justify-start">
            <Image src={checknoxoutlinedimg} alt="checkbox" width={30} />
            <div className="mx-2 lg:flex-1">
              <p className="m-0  py-4 font-medium md:font-semibold" style={{ lineHeight: 1 }}>Identify Mistakes</p>
            </div>
          </div>
        </section>

        <section className="w-max m-auto md:relative lg:left-20">
          <div className="text-lg flex items-center md:p-2 justify-start mr-2">
            <Image src={checknoxoutlinedimg} alt="checkbox" width={30} />
            <div className="mx-2 lg:flex-1">
              <p className="m-0  py-4  font-medium  md:font-semibold" style={{ lineHeight: 1 }}>Personalized Roadmap</p>
            </div>
          </div>
          <div className="text-lg flex items-center md:p-2 justify-start mr-2">
            <Image src={checknoxoutlinedimg} alt="checkbox" width={30} />
            <div className="mx-2 lg:flex-1">
              <p className="m-0  py-4 font-medium md:font-semibold" style={{ lineHeight: 1 }}>Tips To Improve</p>
            </div>
          </div>
        </section>
      </div>}

      <div className="px-4">
        <div className="py-10 block md:hidden">
          {isMfpa ? <Link href={'/myaccount/mutualfundanalyser '}><Button>Check Now</Button></Link> : <Link href={'/wealthometer'}><Button>GET STARTED</Button></Link>}
        </div>
      </div>

    </section>
  );
};

export default HeaderIntro;