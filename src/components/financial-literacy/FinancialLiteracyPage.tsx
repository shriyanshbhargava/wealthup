import "@/styles/newstyles.css";

import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import Link from "next/link";
import React from "react";
import { finknowmeterCrumbs } from "@/utils/Breadcrumbs";

const FinancialLiteracyPage = () => {

  return <>
    <Header />
    <div className="pt-24 pl-4 md:pl-8 lg:pl-12">
      <Breadcrumbs crumbs={finknowmeterCrumbs} />
    </div>
    <div className="flex items-center justify-center py-4 md:py-2">
      <div className="w-full mx-4 max-w-[1280px] md:mx-6">
        <h1 className="capitalize text-center text-2xl md:text-3xl font-medium font-robo text-secondary">
          Check your FinknowMeter Score
        </h1>
        <p className="text-base md:text-xl font-sans font-normal text-center text-secondary">
          Hey there,
        </p>
        <p className="text-base md:text-xl mb-6 font-sans font-normal text-center text-secondary">
          Whether you’re managing your own finances or consulting a financial
          expert, you must understand your level of financial knowledge.
          Assessing yourself will help you protect yourself from fraud and
          take the necessary steps to learn and be successful in your
          financial journey!
        </p>
        <div className="bg-[#E8F8F5] py-[2%] px-[5%] rounded-2xl mb-8">
          <p className="text-base md:text-xl my-6 text-center font-normal font-sans text-secondary">
            Financial decisions have a huge impact on your financial health
            and future. The world of finance is complex. You are often sold
            products that you don’t understand and many times you may not be
            aware of which products suit your specific needs. Taking this test
            will also help you understand if you are equipped to make your own
            decisions or need a helping hand to guide you while making your
            financial decisions.
          </p>
        </div>
        <p className="text-base md:text-xl mb-8 text-center text-normal font-sans text-secondary">
          Answer some questions about common financial decisions and see where
          you stand. Please answer all questions as honestly as you can.
        </p>
        <div className="flex items-center justify-center">
          <Link href="/financial-literacy/test">

            <Button size="bigger" custom>Check FinknowMeter</Button>

          </Link>
        </div>
      </div>
    </div>
    <Footer />
  </>;
};

export default FinancialLiteracyPage;
