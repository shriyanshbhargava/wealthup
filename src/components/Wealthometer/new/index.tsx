"use client"
import React, { useEffect, useState } from 'react'
import type { JSX } from 'react'
import { usePathname, useRouter } from 'next/navigation';

import DoughnutComponent from '@/components/MyAccount/Dashboard/doughnut';
import FAQAccordion from '../../MyAccount/Dashboard/FAQAccordion';
import { FinancialFreedom } from '../../MyAccount/Dashboard/FinancialFreedom';
import HeaderNav from '@/components/MyAccount/MutualFundsAnalyser/HeaderNav';
import { InvestmentScoreCard } from '../../MyAccount/Dashboard/InvestmentScoreCard'
import { ProfileContext } from '@/components/DashboardLayout';
import ProsAndCons from '@/components/MyAccount/MutualFundsAnalyser/components/ProsAndCons';
import ScoreAnalysis from './ScoreAnalysis';
import { ScoreCard } from '../../MyAccount/Dashboard/ScoreCard'
import { Spinner } from '@/components/ui/Spinner';
import Storage from '@/utils/storage';
import { UserApi } from '@/api/services/user/UserApi';
import { WealthometerRating } from "../../MyAccount/Dashboard/WealthometerRating";
import dynamic from 'next/dynamic';
import PieChart from '@/components/MyAccount/Dashboard/PieChart';
import WealthometerTestModal from '../WealthometerTestModal';

const NavItemPopOver = dynamic(() => import('@/components/Navbar').then((mod) => mod.NavItemPopOver), { ssr: false });


const demoPages = [
    {
        to: "/demo/profile",
        name: "My Profile",
    },
    {
        to: "#",
        name: "Logout",
    },
]

export const dashboardPages = [
    {
        to: "/myaccount/profile",
        name: "My Profile",
    },
    {
        to: "/logout",
        name: "Logout",
    },
];

interface FinancialStatusProps {
    score: number | undefined;
    percentile: number | undefined;
}

const FinancialStatus: React.FC<FinancialStatusProps> = ({ score, percentile }) => {
    let status = '';
    let details: JSX.Element | null = null;
    const { wealthometerData: data } =
        React.useContext(ProfileContext);


    if (score !== undefined && percentile !== undefined) {
        const roundedPercentile = percentile.toFixed(2);
        if (score < 30) {
            status = 'Financially Struggling';
            details = (
                <>
                    {data.result.age ? (
                        <li className='text-[12px] sm:text-[14px] xl:text-[16px] font-medium text-[#035782] m-0 p-0'>You are expected to retire at {data?.result?.retirementAge}.</li>
                    ) : (
                        null
                    )}
                    <li className='text-[12px] sm:text-[14px] xl:text-[16px] font-medium text-[#035782] m-0 p-0 leading-6'>You are <a href="#faq-financially-struggling" className="text-blue-500">{status}</a>. Speak to a financial expert to prioritize urgent areas and find solutions to improve your financial health.</li>
                    <li className='text-[12px] sm:text-[14px] xl:text-[16px] font-medium text-[#035782] m-0 p-0 '>{(100 * (1 - parseFloat(roundedPercentile))).toFixed(0)}% of wealthup users are managing their finance better than you.</li>
                </>
            );
        } else if (score >= 31 && score <= 70) {
            status = 'Financially Coping';
            details = (
                <>
                    {data.result.age ? (
                        <li className='text-[12px] sm:text-[14px] xl:text-[16px] font-medium text-[#035782] m-0 p-0 '>You are expected to retire at {data?.result?.retirementAge}.</li>
                    ) : (
                        null
                    )}
                    <li className='text-[12px] sm:text-[14px] xl:text-[16px] font-medium text-[#035782] m-0 p-0 leading-6'>You are <a href="#faq-financially-struggling" className="text-blue-500">{status}.</a> Speak to a financial expert to tweak your plan and enhance your overall financial health.</li>
                    <li className='text-[12px] sm:text-[14px] xl:text-[16px] list-disc space-y-0 font-medium'>{(100 * (1 - parseFloat(roundedPercentile))).toFixed(0)}% of wealthup users are managing their finance better than you.</li>
                </>
            );
        } else if (score > 70) {
            status = 'Financially Thriving';
            details = (
                <>
                    {data.result.age ? (
                        <li className='text-[12px] sm:text-[14px] xl:text-[16px] font-medium text-[#035782] m-0 p-0 '>You are expected to retire at {data?.result?.retirementAge}.</li>
                    ) : (
                        null
                    )}
                    <li className='text-[12px] sm:text-[14px] xl:text-[16px] font-medium text-[#035782] m-0 p-0  leading-6'>Great job! You are <a href="#faq-financially-struggling" className="text-blue-500">{status}!</a> Keep up your momentum by consulting a financial expert to explore new opportunities and ensure continued success.</li>
                    <li className='text-[12px] sm:text-[14px] xl:text-[16px] font-medium text-[#035782] m-0 p-0 '>You are among the top {(100 * (1 - parseFloat(roundedPercentile))).toFixed(0)}% people.</li>
                </>
            );
        }
    }

    return (
        <div className='bg-white rounded-2xl flex flex-col gap-3 p-6 max-w-[520px]' style={{ boxShadow: "0px 4px 4px 0px rgba(3, 87, 130, 0.50)" }}>
            <p className='text-[15px] sm:text-[18px]  font-bold text-[#035782] m-0 p-0'>
                Insights
            </p>
            <div className='flex flex-col gap-2'>
                {details}
            </div>
        </div>
    );
};

const financePartnerLink = (
    <a href="https://api.whatsapp.com/send?phone=+917704047770&text=Hi%20Medha,%20I%20need%20help%20with%20my%20financial%20planning." target='_blank' className='text-blue-500 underline'>
        here
    </a>
);

const insuranceLink = (
    <a
        href="https://api.whatsapp.com/send?phone=+917704047770&text=Hi%20Medha,%20I%20took%20the%20Wealthometer%20and%20need%20help%20with%20insurance."
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline"
    >
        here
    </a>
);
const investmentsLink = (
    <a
        href="https://api.whatsapp.com/send?phone=+917704047770&text=Hi%20Medha,%20I%20took%20the%20Wealthometer%20and%20need%20help%20with%20investments."
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline"
    >
        here
    </a>
);

const WealthoMeter = () => {

    const pathname = usePathname();

    const demo = pathname?.includes('demo');
    const { wealthometerData: data, wealthometerLoaded } =
        React.useContext(ProfileContext);
    const { push } = useRouter();
    const finalText = ScoreAnalysis(data?.result);
    let message = '';
    if (data?.result && data?.result?.total >= 70) {
        message = 'You are financially thriving! Keep it up!';
    } else if (data?.result && data?.result?.total >= 30 && data?.result?.total < 70) {
        message = 'You are financially coping.{.break} Improve your SALECOIN score to enhance your overall financial health.';
    } else if (data?.result && data?.result?.total < 30) {
        message = 'You are financially struggling.{.break} Your finances are in critical condition. Improve your SALECOIN score to enhance your overall financial health.';
    }

    let performanceMsg = '';
    if (data?.performance_count && data.performance_count >= 8 && data.performance_count <= 10) {
        performanceMsg = 'Nice work! Your investments are performing well.';
    } else if (data?.performance_count && data.performance_count >= 4 && data.performance_count <= 7) {
        performanceMsg = 'Ouch! It looks like your investments are not performing too well.';
    } else if (data?.performance_count && data.performance_count >= 0 && data.performance_count <= 3) {
        performanceMsg = 'Oh no! Your investments are in pretty bad shape and not performing well at all.';
    }

    let investmentMsg = '';
    if (data?.result && data?.result?.In >= 8 && data?.result?.In <= 10) {
        investmentMsg = 'Wow! Good work! Your investments are in great shape.';
    } else if (data?.result && data?.result?.In >= 4 && data?.result?.In <= 7) {
        investmentMsg = 'Ouch! It looks like your investments need some attention.';
    } else if (data?.result && data?.result?.In >= 0 && data?.result?.In <= 3) {
        investmentMsg = 'Woah! Your investments are in a pretty bad shape and need immediate attention!';
    }

    const [pushDown1, setPushDown1] = useState("pushDown-1-a");
    const [pushDown2, setPushDown2] = useState("pushDown-2-a");
    const [pushDown3, setPushDown3] = useState("pushDown-3-a");
    const [pushDown4, setPushDown4] = useState("pushDown-4-a");

    const [savingDetails, setSavingDetails] = useState(false);
    const [name, setName] = useState("");
    const [emergencyFundDetails, setEmergencyFundDetails] = useState(false);
    const [liquidityDetails, setLiquidityDetails] = useState(false);
    const [healthInsuranceDetails, setHealthInsuranceDetails] = useState(false);
    const [lifeInsuranceDetails, setLifeInsuranceDetails] = useState(false);
    const [investmentDetails, setInvestmentDetails] = useState(false);

    const savingDetailsBtn = () => {
        setSavingDetails(savingDetails ? false : true);
        setEmergencyFundDetails(false);
        setLiquidityDetails(false);
        setHealthInsuranceDetails(false);
        setLifeInsuranceDetails(false);
        setInvestmentDetails(false);
    }

    const liquidityDetailsBtn = () => {
        setLiquidityDetails(liquidityDetails ? false : true);
        setHealthInsuranceDetails(false);
        setLifeInsuranceDetails(false);
        setInvestmentDetails(false);
        setSavingDetails(false);
        setEmergencyFundDetails(false);

    }

    const emergencyFundDetailsBtn = () => {
        setEmergencyFundDetails(emergencyFundDetails ? false : true);
        setLiquidityDetails(false);
        setHealthInsuranceDetails(false);
        setLifeInsuranceDetails(false);
        setInvestmentDetails(false);
        setSavingDetails(false);

    }

    const healthInsuranceDetailsBtn = () => {
        setHealthInsuranceDetails(healthInsuranceDetails ? false : true);
        setLifeInsuranceDetails(false);
        setInvestmentDetails(false);
        setSavingDetails(false);
        setEmergencyFundDetails(false);
        setLiquidityDetails(false);
    }

    const lifeInsuranceDetailsBtn = () => {
        setLifeInsuranceDetails(lifeInsuranceDetails ? false : true);
        setInvestmentDetails(false);
        setSavingDetails(false);
        setEmergencyFundDetails(false);
        setLiquidityDetails(false);
        setHealthInsuranceDetails(false);
    }

    const investmentDetailsBtn = () => {
        setInvestmentDetails(investmentDetails ? false : true);
        setSavingDetails(false);
        setEmergencyFundDetails(false);
        setLiquidityDetails(false);
        setHealthInsuranceDetails(false);
        setLifeInsuranceDetails(false);
    }

    console.log("data", data?.result)
    const colors = ["#39CEF3", "#0CBBB8", "#037E95", "#2E87B9", "#006699"]
    const labels = ["Savings", "Liquidity", "Emergency Funds", "Coverage", "Investment"];

    // Extract the amounts excluding the total
    const amounts = [data?.result?.Sa, data?.result?.L, data?.result?.E, data?.result?.Co, data?.result?.In];

    // Calculate the values as percentages
    const total = data?.result?.total;
    const values = amounts.map(amount => amount / total);

    useEffect(() => {
        (async () => {
            const tokens = Storage.getToken();
            if (tokens !== null) {
                const userApiClient = new UserApi(tokens.access_token);
                const res = await userApiClient.getMe();
                if (res.status === 200) {
                    const data = await res.json();
                    let initials = ''
                    initials += (data?.first_name?.split('')[0] ?? '')
                    initials += (data?.last_name?.split('')[0] ?? '')
                    if (initials.length === 0) {
                        initials = 'U'
                    }
                    setName(initials);
                }
            }
        })();
    }, []);
    return (
        <>
            {<main className='layout-gradient text-primary-blue'>

                   <HeaderNav
                    showBtn={true}
                    showNotification={true}
                    whatsapp={false}
                    beta={false}
                    title=" My Financial Health"
                />
                {/* <div className='flex justify-between items-center headerDiv  px-8 py-2'>
                    <div className="text-[#035782] font-semibold text-2xl lg:text-[32px]">
                        My Financial Health
                    </div>
                    <div className='w-8 h-8 sm:w-12 sm:h-12 lg:mr-8 bg-primary-blue rounded-full'>
                        <NavItemPopOver user title={name} items={demo ? demoPages : dashboardPages} navbar={false} />
                    </div>
                </div> */}
                <div className='w-full mt-8 mb-0'>
                    <div className='w-full p-4 md:pb-0 md:px-8 py-0 mx-auto flex flex-col gap-8 '>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 w-full'>
                            <div className='flex flex-col gap-6'><h3 className='p-0 m-0 text-[#035782] text-[18px] lg:text-[23px] font-semibold text-center lg:text-left'>Financial Health <br className='sm:hidden' />Score Breakdown</h3>   <div className='middleDiv mb-0'>
                                <div className='justify-center self-center middleDiv-1'>
                                    {data?.result ? <PieChart data={data?.result} /> : <Spinner />}
                                    <div className='hover-Sa'>
                                        {data?.result?.Sa ? <div className='hover-Sa-text' style={{ textAlign: "center" }}>
                                            {data?.result?.Sa}
                                            <span style={{ display: 'block' }}>Savings</span>
                                        </div> : <div className='hover-Sa-text' style={{ textAlign: "center", opacity: "0" }}>
                                            {data?.result?.Sa}
                                            <span style={{ display: 'block' }}>Savings</span>
                                        </div>}
                                    </div>
                                    <div className='hover-li'>
                                        {data?.result?.L ? <div className='hover-li-text' style={{ textAlign: "center" }}>
                                            {data?.result?.L}
                                            <span style={{ display: 'block' }}>Liquidity</span>
                                        </div> : <div className='hover-li-text' style={{ textAlign: "center", opacity: "0" }}>
                                            {data?.result?.L}
                                            <span style={{ display: 'block' }}>Liquidity</span>
                                        </div>}
                                    </div>
                                    <div className='hover-Ef'>
                                        {data?.result?.E ? <div className='hover-Ef-text' style={{ textAlign: "center" }}>
                                            {data?.result?.E}
                                            <span className="efdesign">Emergency Fund</span>
                                        </div> : <div className='hover-Ef-text' style={{ textAlign: "center", opacity: "0" }}>
                                            {data?.result?.E}
                                            <span>Emergency Fund</span>
                                        </div>}
                                    </div>
                                    <div className='hover-Co'>
                                        {data?.result?.Co ? <div className='hover-Co-text' style={{ textAlign: "center" }}>
                                            {data?.result?.In}
                                            <span style={{ display: 'block' }}>Investment</span>
                                        </div> : <div className='hover-Co-text' style={{ textAlign: "center", opacity: "0" }}>
                                            {data?.result?.In}
                                            <span style={{ display: 'block' }}>Investment</span>
                                        </div>}
                                    </div>
                                    <div className='hover-In'>
                                        {data?.result?.In ? <div className='hover-In-text' style={{ textAlign: "center" }}>
                                            {data?.result?.Co}
                                            <span style={{ display: 'block' }}>Coverage</span>
                                        </div> : <div className='hover-In-text' style={{ textAlign: "center", opacity: "0" }}>
                                            {data?.result?.Co}
                                            <span style={{ display: 'block' }}>Coverage</span>
                                        </div>}
                                    </div>
                                </div>
                            </div></div>
                            <div className="flex flex-col gap-8 items-center lg:items-end justify-center">
                                <div className='bg-white rounded-2xl flex flex-col gap-3 p-6 max-w-[520px]' style={{ boxShadow: "0px 4px 4px 0px rgba(3, 87, 130, 0.50)" }}>
                                    <p className='text-[15px] sm:text-[18px]  font-bold text-[#035782] m-0 p-0'>
                                        How is the score calculated?
                                    </p>
                                    <p className='text-[12px] sm:text-[14px] xl:text-[16px] font-medium text-[#035782] m-0 p-0 leading-6' >
                                        Based on our proprietary <a href="#faq-salecoin" className="text-blue-500">SALECOIN</a> framework, your score is calculated for each of the 5 factors listed below.
                                        The score of each factor is added to get your overall financial health score.
                                    </p>
                                </div>
                                <FinancialStatus score={data?.result?.total} percentile={data?.percentile} />
                            </div>
                        </div>
                        <div className=' block px-4 py-8  bg-white rounded-2xl overflow-x-auto shadow-md shadow-[#60a1c2] min-w-full' style={{ boxShadow: "0px 4px 4px 0px rgba(3, 87, 130, 0.50)" }}>
                            <table className="w-full">
                                <thead className='hidden md:block'>
                                    <tr className='text-[16px] font-semibold text-[#035782]'>
                                        <th className="px-4 border-b text-start font-semibold w-[10%] md:w-[20%]  md:min-w-0">
                                            Factors
                                        </th>
                                        <th className="px-4 border-b text-start font-semibold w-[7px] md:w-[10%] md:whitespace-nowrap md:min-w-0">
                                            Your Value
                                        </th>
                                        <th className="px-4 border-b text-start font-semibold w-[10px] md:w-[20%]  md:min-w-0">
                                            Ideal Range
                                        </th>
                                        <th className="px-4 border-b text-start font-semibold w-[7px] md:w-[10%] md:whitespace-nowrap md:min-w-0">
                                            Your Score
                                        </th>
                                        <th className="px-4 border-b text-start font-semibold w-[150px] md:w-auto  md:min-w-0">
                                            Action Required
                                        </th>
                                    </tr>
                                </thead>
                            </table>
                            <div className="md:h-[500px] w-full overflow-y-auto">
                                <table className="w-full">
                                    <thead className='md:hidden'>
                                        <tr className='text-[16px] font-semibold text-[#035782]'>
                                            <th className="px-4 border-b text-start font-semibold w-[10%] md:w-[20%]  md:min-w-0">
                                                Factors
                                            </th>
                                            <th className="px-4 border-b text-start font-semibold w-[7px] md:w-[10%] md:whitespace-nowrap md:min-w-0">
                                                Your Value
                                            </th>
                                            <th className="px-4 border-b text-start font-semibold w-[10px] md:w-[20%]  md:min-w-0">
                                                Ideal Range
                                            </th>
                                            <th className="px-4 border-b text-start font-semibold w-[7px] md:w-[10%] md:whitespace-nowrap md:min-w-0">
                                                Your Score
                                            </th>
                                            <th className="px-4 border-b text-start font-semibold w-[150px] md:w-auto  md:min-w-0">
                                                Action Required
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b leading-6">
                                            <td valign='top' scope="row" className='px-2 w-[10%] md:w-[20%] sm:px-4 py-3'>
                                                <ul className='pl-6'>
                                                    <li className='text-[#4A5151] text-[12px] sm:text-[16px]  font-semibold list-disc bullet-color1'>Savings<br /><span className='font-normal text-[14px]'>(as a % of net monthly income)</span></li>
                                                </ul>
                                            </td>
                                            <td valign='top' className="text-[12px] sm:text-[16px] w-[7px] md:w-[12%] min-[1400px]:w-[8%] text-[#232323] px-2 sm:px-4 py-3">
                                                {(data?.result?.savingsRate * 100)?.toFixed(1)}%
                                                {/* <WealthometerRating score={data?.result?.Sa} totalScore={20} /> */}
                                            </td>
                                            <td valign='top' className="text-[12px] sm:text-[16px] w-[10px] md:w-[20.5%] 2xl:w-[20%] text-[#232323] px-2 sm:px-4 py-3">

                                                {
                                                    "At least 20%, Ideally above 50%"
                                                }
                                            </td>
                                            <td valign='top' className="text-[12px] sm:text-[16px] w-[7px] md:w-[12%] min-[1400px]:w-[8%] text-[#232323] px-2 sm:px-4 py-3">
                                                {data?.result?.Sa}/20<br />
                                                {/* <WealthometerRating score={data?.result?.Sa} totalScore={20} /> */}
                                                {(data?.result?.savingsRate * 100) < 20 ? 'Bad' :
                                                    (data?.result?.savingsRate * 100) >= 20 && (data?.result?.savingsRate * 100) <= 50 ? "Average"
                                                        : 'Good'}
                                            </td>
                                            <td valign='top' className="text-[12px] w-[150px] md:w-auto sm:text-[16px] text-[#232323] px-2 sm:px-4 py-3">
                                                {
                                                    (data?.result?.savingsRate * 100) < 20
                                                        ? "Aim to save at least 20% of your income. Consider cutting back on discretionary spending like eating out,shopping or subscriptions you don’t need."
                                                        : (data?.result?.savingsRate * 100) >= 20 && (data?.result?.savingsRate * 100) <= 50
                                                            ? "Consider saving more than 50% by controlling expenses as your income grows. Setting up automated investments can help make saving easier."
                                                            : "Continue saving well and invest the savings properly to generate good returns."
                                                }
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b leading-6">
                                            <td valign='top' scope="row" className='px-2 sm:px-4 py-3'>
                                                <ul className='pl-6'>
                                                    <li className='text-[#4A5151] text-[12px] sm:text-[16px]  font-semibold list-disc bullet-color2'>Liquidity<br /><span className='font-normal text-[14px]'>(as a multiple of average monthly expense)</span></li>
                                                </ul>
                                            </td>
                                            <td valign='top' className="text-[12px] sm:text-[16px] text-[#232323] px-2 sm:px-4 py-3">

                                                {(data?.result?.liquidityFactor)?.toFixed(1)}x
                                                {/* <WealthometerRating score={data?.result?.L} totalScore={10} /> */}
                                            </td>
                                            <td valign='top' className="text-[12px] sm:text-[16px] text-[#232323] px-2 sm:px-4 py-3">

                                                {
                                                    "2-3x"
                                                }
                                            </td>
                                            <td valign='top' className="text-[12px] sm:text-[16px] text-[#232323] px-2 sm:px-4 py-3">

                                                {data?.result?.L}/10<br />
                                                {/* <WealthometerRating score={data?.result?.L} totalScore={10} /> */}
                                                {data?.result?.liquidityFactor < 1 || data?.result?.liquidityFactor > 5 ? 'Bad' :
                                                    data?.result?.liquidityFactor >= 1 && data?.result?.liquidityFactor <= 2 ||
                                                        data?.result?.liquidityFactor >= 3 && data?.result?.liquidityFactor <= 5 ? 'Average' : 'Good'}
                                            </td>
                                            <td valign='top' className="text-[12px] sm:text-[16px] text-[#232323] px-2 sm:px-4 py-3">
                                                {
                                                    data?.result?.liquidityFactor < 0.5
                                                        ? "You are keeping too little money in the bank and may face challenges in taking care of your regular expenses. Aim to keep at least 1 month's expenses in your bank account."
                                                        : data?.result?.liquidityFactor > 5
                                                            ? <>You&apos;re keeping too much money in the bank and losing out on earning better returns. Keep a maximum of 3 months of expenses in your account and invest the excess cash. To start investing, talk to your finance partner {financePartnerLink}.</>
                                                            : data?.result?.liquidityFactor >= 0.5 && data?.result?.liquidityFactor < 1
                                                                ? "You are keeping too little money in the bank and may face challenges in taking care of your regular expenses. Aim to keep at least 2 month's expenses in your bank account."
                                                                : data?.result?.liquidityFactor >= 1 && data?.result?.liquidityFactor < 2
                                                                    ? "You are keeping too little money in the bank and may face challenges in taking care of your regular expenses. Aim to keep at least 2 month's expenses in your bank account"
                                                                    : data?.result?.liquidityFactor >= 2 && data?.result?.liquidityFactor <= 3 ?
                                                                        'You are maintaining the right amount of money in the bank. Continue maintaining 2 to 3 months of expenses in your bank account.'
                                                                        : data?.result?.liquidityFactor > 3 && data?.result?.liquidityFactor <= 5
                                                                            ? <>You&apos;re keeping too much money in the bank and losing out on earning better returns. Keep a maximum of 3 months of expenses in your account and invest the excess cash. To start investing, talk to your finance partner {financePartnerLink}.</>
                                                                            : ""
                                                }
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b leading-6">
                                            <td valign='top' scope="row" className='px-2 sm:px-4 py-3 h-fit'>
                                                <ul className='pl-6 h-fit'>
                                                    <li className='text-[#4A5151] text-[12px] sm:text-[16px] h-fit font-semibold list-disc bullet-color3'>Emergency Fund<span className='font-normal text-[14px]'><br /><span className='font-normal text-[14px]'>(as a multiple of average monthly expense)</span></span></li>
                                                </ul>
                                            </td>
                                            <td valign='top' className="text-[12px] sm:text-[16px] text-[#232323] px-2 sm:px-4 py-3">

                                                {(data?.result?.emergencyCoverage)?.toFixed(1)}x
                                                {/* <WealthometerRating score={data?.result?.E} totalScore={10} /> */}
                                            </td>
                                            <td valign='top' className="text-[12px] sm:text-[16px] text-[#232323] px-2 sm:px-4 py-3">

                                                {
                                                    "6-12x"
                                                }
                                            </td>
                                            <td valign='top' className="text-[12px] sm:text-[16px] text-[#232323] px-2 sm:px-4 py-3">

                                                {data?.result?.E}/20<br />
                                                {/* <WealthometerRating score={data?.result?.E} totalScore={10} /> */}
                                                {data?.result?.emergencyCoverage < 3 || data?.result?.emergencyCoverage > 18 ? 'Bad' :
                                                    data?.result?.emergencyCoverage >= 3 && data?.result?.emergencyCoverage <= 6 || data?.result?.emergencyCoverage >= 12 && data?.result?.emergencyCoverage <= 18 ? 'Average'
                                                        : 'Good'
                                                }
                                            </td>
                                            <td valign='top' className="text-[12px] sm:text-[16px] text-[#232323] px-2 sm:px-4 py-3">
                                                {
                                                    data?.result?.emergencyCoverage < 3
                                                        ? <>You’re underprepared to take care of unexpected expenses. Aim to save at least 6 months&apos; worth of living expenses in your emergency fund. Invest this money in a low-risk debt fund to earn some interest while keeping it safe and accessible.</>
                                                        : data?.result?.emergencyCoverage > 18
                                                            ? <>You are keeping too much money for emergencies, which means you’re losing out on higher potential returns. Consider investing the excess amount beyond 12 months of expenses in a low-risk debt fund. This will help your money grow better than inflation while remaining accessible. To start investing, talk to your finance partner {financePartnerLink}.</>
                                                            : data?.result?.emergencyCoverage >= 3 && data?.result?.emergencyCoverage <= 6
                                                                ? <>You’re underprepared to take care of unexpected expenses. Aim to save at least 6 months&apos; worth of living expenses in your emergency fund. Invest this money in a low-risk debt fund to earn some interest while keeping it safe and accessible.</>
                                                                : data?.result?.emergencyCoverage > 6 && data?.result?.emergencyCoverage <= 12
                                                                    ? <>You have a well-funded emergency buffer. Invest this money in a low-risk debt fund to help it grow better than inflation while remaining accessible for emergencies. To start investing, talk to your finance partner {financePartnerLink}.</>
                                                                    : data?.result?.emergencyCoverage > 12 && data?.result?.emergencyCoverage <= 18
                                                                        ? <>You are keeping more money than necessary for emergencies, potentially missing out on higher returns. Keep a maximum of 12 months&apos; worth of expenses in your emergency fund and invest the excess in a low-risk debt fund. This ensures growth while maintaining accessibility. To start investing, talk to your finance partner {financePartnerLink}.</>
                                                                        : ""
                                                }
                                            </td>
                                        </tr>
                                        <tr className="leading-6">
                                            <td valign='top' scope="row" className='px-2 sm:px-4 py-3'>

                                                <ul className='pl-6'>
                                                    <li className='text-[#4A5151] text-[12px] sm:text-[16px]  font-semibold list-disc bullet-color4'>Insurance Coverage</li>
                                                </ul>

                                            </td>
                                            <td valign='top' className="text-[12px] sm:text-[16px] text-[#232323] px-2 sm:px-4 py-3">

                                            </td>
                                            <td valign='top' className="text-[12px] sm:text-[16px] text-[#232323] px-2 sm:px-4 py-3">

                                            </td>
                                            <td valign='top' className="text-[12px] sm:text-[16px] text-[#232323] px-2 sm:px-4 py-3">

                                            </td>
                                            <td valign='top' className="text-[12px] sm:text-[16px] text-[#232323] px-2 sm:px-4 py-3">

                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b leading-6">
                                            <td valign='top' scope="row" className='pl-5 sm:pl-10 pr-2 sm:pr-4 py-1 sm:py-2'>
                                                <ul className='pl-4'>
                                                    <li className='text-[#4A5151] text-[12px] sm:text-[16px] font-medium bullet-color5' >Health Insurance
                                                        <br /><span className='font-normal text-[14px]'>(Having own health insurance policy)</span>
                                                    </li>
                                                </ul>
                                            </td>
                                            <td valign='top' className="text-[12px] sm:text-[16px] text-[#232323] px-2 sm:px-4 py-1 sm:py-2">
                                                {data?.result?.healthInsurancePointsUpdated > 0 ? 'Yes' : 'No'}

                                                {/* <WealthometerRating score={data?.result?.healthInsurancePointsUpdated} totalScore={10} /> */}
                                            </td>
                                            {<td valign='top' className="text-[12px] sm:text-[16px] text-[#232323] px-2 sm:px-4 py-1 sm:py-2">

                                                {
                                                    "You should have a personal health insurance policy."
                                                }
                                            </td>}
                                            <td valign='top' className="text-[12px] sm:text-[16px] text-[#232323] px-2 sm:px-4 py-1 sm:py-2">
                                                {data?.result?.healthInsurancePointsUpdated}/10<br />
                                                {/* <WealthometerRating score={data?.result?.healthInsurancePointsUpdated} totalScore={10} /> */}
                                                {data?.result?.healthInsurancePointsUpdated > 0 ? 'Good' : 'Bad'}
                                            </td>
                                            <td valign='top' className="text-[12px] sm:text-[16px] text-[#232323] px-2 sm:px-4 py-1 sm:py-2">
                                                {
                                                    data?.result?.healthInsurancePointsUpdated > 0
                                                        ? "Ensure you have at least 10 lakhs of base cover from a good health insurance company. Always keep a printed copy of the policy card in your wallet / purse"
                                                        : <>You should get a health insurance policy of your own with at least 10 lakhs of base cover from a good health insurance company. Contact your finance partner to find out the best health insurance policy for your needs {insuranceLink}</>
                                                }
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b leading-6">
                                            <td valign='top' scope="row" className='pl-5 sm:pl-10 pr-2 sm:pr-4 py-1 sm:py-2'>
                                                <ul className='pl-4'>
                                                    <li className='text-[#4A5151] text-[12px] sm:text-[16px] font-medium bullet-color5' >Life Insurance
                                                        <br /><span className='font-normal text-[14px]'>(total coverage as a multiple of annual income)</span>
                                                    </li>
                                                </ul>
                                            </td>
                                            <td valign='top' className="text-[12px] sm:text-[16px] text-[#232323] px-2 sm:px-4 py-1 sm:py-2">

                                                {(data?.result?.lifeCoverMultiple)?.toFixed(1)}x
                                                {/* <WealthometerRating score={data?.result?.lifeInsurancePoints} totalScore={10} /> */}
                                            </td>
                                            {<td valign='top' className="text-[12px] sm:text-[16px] text-[#232323] px-2 sm:px-4 py-1 sm:py-2">

                                                {
                                                    "You should have sufficient life insurance coverage."
                                                }
                                            </td>}
                                            <td valign='top' className="text-[12px] sm:text-[16px] text-[#232323] px-2 sm:px-4 py-1 sm:py-2">

                                                {data?.result?.lifeInsurancePoints}/10<br />
                                                {/* <WealthometerRating score={data?.result?.lifeInsurancePoints} totalScore={10} /> */}
                                                {data?.result?.lifeInsurancePoints < 3 ? 'Bad'
                                                    : data?.result?.lifeInsurancePoints > 3 && data?.result?.lifeInsurancePoints <= 7 ? 'Average' :
                                                        'Good'}
                                            </td>
                                            <td valign='top' className="text-[12px] sm:text-[16px] text-[#232323] px-2 sm:px-4 py-1 sm:py-2">
                                                {
                                                    data?.result?.lifeInsurancePoints >= 0 && data?.result?.lifeInsurancePoints <= 3
                                                        ? <>If people are financially dependent on you, you must have a term life insurance policy with sufficient coverage i.e. 20 times your annual income. Contact your finance partner to find out the best life insurance policy for your needs {insuranceLink}</>
                                                        : data?.result?.lifeInsurancePoints > 3 && data?.result?.lifeInsurancePoints <= 7
                                                            ? <>If people are financially dependent on you, you must have a term life insurance policy with sufficient coverage i.e. 20 times your annual income. Contact your finance partner to find out the best life insurance policy for your needs {insuranceLink}</>
                                                            : "You already have a good life cover, now ensure your nominee details are updated and accurate. Ideally you should inform your nominee about your life policy."
                                                }
                                            </td>
                                        </tr>
                                        <tr className='leading-6'>
                                            <td valign='top' className='px-2 sm:px-4 pt-3'>

                                                <ul className='pl-6'>
                                                    <li className='text-[#4A5151] text-[12px] sm:text-[16px]  font-semibold list-disc bullet-color6'>Investments
                                                        <br /><span className='font-normal text-[14px]'>(total investments as a multiple of annual income)</span>
                                                    </li>
                                                </ul>

                                            </td>
                                            <td valign='top' className="text-[12px] sm:text-[16px] text-[#232323] px-2 sm:px-4 pt-3" >

                                                {data?.result?.investmentMultiple?.toFixed(1)}x
                                                {/* <WealthometerRating score={data?.result?.In} totalScore={30} /> */}
                                            </td>
                                            <td valign='top' className="text-[12px] sm:text-[16px] text-[#232323] px-2 sm:px-4 pt-3" >
                                                <>{(data?.result?.INVESTMENT_CORPUS_min)?.toFixed(1)}x - {(data?.result?.INVESTMENT_CORPUS_max)?.toFixed(1)}x</>
                                            </td>
                                            <td valign='top' className="text-[12px] sm:text-[16px] text-[#232323] px-2 sm:px-4 pt-3" >
                                                {data?.result?.In}/30<br />
                                                {/* <WealthometerRating score={data?.result?.In} totalScore={30} /> */}
                                                {data?.result?.In >= 0 && data?.result?.In < 9 ? 'Bad'
                                                    : data?.result?.In >= 10 && data?.result?.In < 21 ? 'Average' : 'Good'}
                                            </td>
                                            <td valign='top' className="text-[12px] sm:text-[16px] text-[#232323] px-2 sm:px-4 pt-3" >
                                                {
                                                    data?.result?.In >= 0 && data?.result?.In <= 9
                                                        ? <>The value of your investments may be low because they are not generating good returns. To start investing, talk to your finance partner {investmentsLink}</>
                                                        : data?.result?.In >= 10 && data?.result?.In <= 21
                                                            ? <>The value of your investments may be low because they are not generating good returns. To start investing, talk to your finance partner {investmentsLink}</>
                                                            : <>You have worked hard for money both earning and saving it. Now it’s time for your money to work hard for you. To start investing, talk to your finance partner {investmentsLink}</>
                                                }
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className='pb-8'>
                            <FAQAccordion />
                        </div>
                        {/* <NameUpdateModal /> */}
                        <WealthometerTestModal />
                    </div>
                </div>

                {/* <div className="mx-4 lg:px-8 lg:container lg:mx-auto">
                    <div className='flex flex-col md:flex-row gap-10 mb-10'>
                        <FinancialFreedom age={data?.retiermentAge} />
                        <ScoreCard
                            total
                            title="Financial Health Score"
                            score={data?.result?.total}
                            small
                            description={message}
                            text="Calculated using our proprietary framework SA.L.E.CO.IN, your overall financial health depends on a number of factors mentioned below. {.break}By improving scores in each category you can improve your overall financial health."
                        />
                    </div>
                    <div className='mb-10'>
                        <ProsAndCons pros={[]} cons={[]} actionItems={[]} flex/>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-10'>
                        <ScoreCard
                            red={false}
                            title="Savings"
                            score={data?.result?.Sa}
                            text="SA is for Savings, it is the amount left after making all your monthly expenses and paying your EMIs.{.break} Savings form the foundation of your entire financial plan.{.break} Are you saving enough?"
                        />
                        <ScoreCard
                            red={false}
                            title="Liquidity"
                            score={data?.result?.L}
                            text="L is for Liquidity i.e. the amount of cash that is easily available to you e.g. in your bank account.{.break} This depends on the stability of your income and monthly expenses. Is it too little or too much?"
                        />
                        <div className='row-span-2 hidden md:block'>
                            <InvestmentScoreCard total={data?.result?.In} performance={data?.performance_count} performanceMsg={performanceMsg} investmentMsg={investmentMsg} />
                        </div>
                        <ScoreCard
                            red={false}
                            title="Emergency Fund"
                            score={data?.result?.E}
                            text="E is for Emergency Fund which is critical to protect yourself from unforeseen events.{.break} This is based on the number of dependents and the stability of your income - are you keeping enough?"
                        />
                        <ScoreCard
                            red={false}
                            title="Coverage"
                            score={data?.result?.Co}
                            text="CO is for Coverage - both life and health.{.break} Choosing the right policy is essential to building financial stability. Have you selected this correctly?"
                        />
                        <div className='row-span-2 md:hidden h-full'>
                            <InvestmentScoreCard total={data?.result?.In} performance={data?.performance_count} performanceMsg={performanceMsg} investmentMsg={investmentMsg} />
                        </div>
                    </div>
                </div> */}
            </main>}
        </>
    )
}

export default WealthoMeter