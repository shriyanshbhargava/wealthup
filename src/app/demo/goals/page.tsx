"use client"

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Investment, MutualFund } from '@/components/MyAccount/Dashboard/investment-table'
import React, { useEffect, useState } from 'react'

import AddGoalForm from '@/components/MyAccount/Goals/AddGoalForm'
import ChooseGoals from '@/components/MyAccount/Goals/ChooseGoals'
import Goals from '@/components/MyAccount/Goals/Goals'
import HeaderNav from '@/components/MyAccount/MutualFundsAnalyser/HeaderNav'
import Image from 'next/image'
import InvestmentChart from '@/components/MyAccount/Goals/InvestmentChart'
import { MdInfoOutline } from 'react-icons/md'
import MobileTab from '@/components/MyAccount/Goals/MobileTab'
import NetworthChart from '@/components/MyAccount/Goals/NetworthChart'
import SelectGoalModal from '@/components/MyAccount/Goals/SelectGoalModal'
import Storage from '@/utils/storage';
import { UserApi } from '@/api/services/user/UserApi'
import { apiUrl } from '@/utils/constants';
import dynamic from 'next/dynamic'
import editIcon from "@/assets/icons/editIcon.svg"
import { formatIndianNumber } from '@/components/MyAccount/Dashboard/mfpa/mfpa-static-table'
import saveIcon from "@/assets/icons/saveIcon.svg"
import { usePathname } from 'next/navigation'

const NavItemPopOver = dynamic(() => import('@/components/Navbar').then((mod) => mod.NavItemPopOver), { ssr: false });

export interface IAllGoals {
    goals: Goal[]
    availableBalance: number
}

export interface Goal {
    _id: string
    user_id: string
    total_investment_allocated: number
    total_sip_allocated: number
    name: string
    target_date: string
    target_amount: number
    projected_amount: ProjectedAmount
    total_projected_amount: number
    shortfall_amount: ShortfallAmount
    total_shortfall_amount: number
    rate: number
    createdAt: string
    updatedAt: string
    __v: number
    time_left?: number
    current_value?: number
    goal_image?: number
}

export interface ProjectedAmount {
    sip: number
    lumpsum: number
}

export interface ShortfallAmount {
    sip?: number
    lumpsum: number
}


const Page = () => {
    const [isEdit, setEdit] = useState(false)
    const [activeTab, setActiveTab] = useState<"networth" | "monthly">("networth");
    const [showAddGoalForm, setShowAddGoalForm] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [allGoals, setAllGoals] = useState<Goal[]>([])
    const [availableBalance, setAvailableBalance] = useState<number>()
    const [showMaxGoalsAlert, setShowMaxGoalsAlert] = useState(false)
    const [showGoalsBox, setShowGoalsBox] = useState(false)
    const [selectedGoal, setSelectedGoal] = useState('')
    const [mutualFunds, setMutualFunds] = useState<MutualFund[]>([]);
    const [investments, setInvestments] = useState<Investment[]>([]);

    const [name, setName] = useState("");
    const pathname = usePathname();

    const demo = pathname?.includes('demo');

    const demoPages = [
        {
            to: "/demo/profile",
            name: "My Profile",
        },
        {
            to: "#",
            name: "Logout",
        },
    ];

    const dashboardPages = [
        {
            to: "/myaccount/profile",
            name: "My Profile",
        },
        {
            to: "/logout",
            name: "Logout",
        },
    ];

    const mfTotalCurrent = mutualFunds.reduce((acc, mf) => acc + mf.current_amount, 0)

    const invTotalCurrent = investments.reduce((acc, inv) => acc + inv.invested, 0)
    useEffect(() => {
        const updatedInvestments = mutualFunds.map(mf => {
            const returnAmount = mf.current_amount - mf.invested_amount;
            const returnPercentage = mf.current_amount ? (returnAmount / mf.current_amount) * 100 : 0;
            const formattedReturn = `${returnAmount >= 0 ? '₹' : '-₹'} ${formatIndianNumber(Math.abs(returnAmount))} | ${returnPercentage >= 0 ? '+' : ''}${returnPercentage?.toFixed(1)}%`;

            return {
                ...mf,
                percentage: mfTotalCurrent ? (mf.current_amount / mfTotalCurrent * 100) : 0,
                return: formattedReturn,
            };
        });
        setMutualFunds(updatedInvestments);
    }, [mfTotalCurrent, mutualFunds]);

    useEffect(() => {
        const loadMutualFunds = async () => {
            try {
                const funds = await fetchMutualFunds();
                setMutualFunds(funds);
            } catch (error) {
                console.error('Failed to load mutual funds:', error);
            }
        };

        loadMutualFunds();
    }, []);

    const totalCurrent = mutualFunds.reduce((acc, mf) => acc + mf.current_amount, 0)
        + investments.reduce((acc, inv) => acc + inv.current, 0);

    const allocatedAmount = allGoals?.reduce((sum, goal) => sum + goal.total_investment_allocated, 0);
    const unallocatedAmount = Math.max(0, totalCurrent - allocatedAmount);

    const fetchMutualFunds = async () => {
        const url = `${apiUrl}/api/v1/investments/user`;
        const { access_token } = Storage.getToken()!;

        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            const data = result.data;

            if (!Array.isArray(data)) {
                throw new Error('API response does not contain an array');
            }

            return data as MutualFund[];
        } catch (error) {
            console.error("Error fetching mutual funds:", error);
            throw error;
        }
    };

    const fetchInvestmentData = async () => {
        const { access_token } = Storage.getToken()!;
        try {
            const userApiClient = new UserApi(access_token);
            const res = await userApiClient.getPortfolio();
            if (res.ok) {
                const responseData = await res.json();
                if (Array.isArray(responseData.data) && responseData.data.length > 0) {
                    const formattedData = responseData.data.map((item: any) => ({
                        id: item._id,
                        name: item.name,
                        invested: Number(item.invested),
                        current: Number(item.current),
                        percentage: Number(item.percentage),
                        subData: item.subData?.map((sub: any) => ({
                            id: sub._id,
                            name: sub.name,
                            invested: Number(sub.invested),
                            current: Number(sub.current),
                            percentage: Number(sub.percentage)
                        }))
                    }));
                    setInvestments(formattedData);
                } else {
                    // If no portfolio exists, an empty one will be created
                    setInvestments([]);
                }
            } else {
                console.error("HTTP Error:", res.status, res.statusText);
            }
        } catch (error) {
            console.error("Error fetching investment data:", error);
        }
    };

    useEffect(() => {
        fetchInvestmentData();
    }, []);

    const tokenData = Storage.getToken();
    const access_token = tokenData?.access_token;

    const fetchData = async () => {
        setIsLoading(true);
        setAllGoals([])
        setAvailableBalance(undefined)
        const res = await fetch(`${apiUrl}/api/v1/goals`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${access_token}`
            },
        });
        const data = await res.json();
        setAllGoals(data?.goals ?? [])
        setAvailableBalance(data?.availableBalance)
        setIsLoading(false);
    };

    useEffect(() => {
        if (allGoals?.length && availableBalance !== undefined) {
            setIsLoading(false);
        }
    }, [allGoals, availableBalance]);

    useEffect(() => {
        fetchData()
    }, [access_token])

    const handleDone = () => {
        fetchData();
    }

    const handleAddDone = () => {
        fetchData();
        setShowAddGoalForm(false);
    }

    const canAddGoal = allGoals?.length < 5;

    const handleAddGoalClick = () => {
        if (canAddGoal) {
            setShowGoalsBox(true);
        } else {
            setShowMaxGoalsAlert(true);
            setTimeout(() => setShowMaxGoalsAlert(false), 5000);
        }
    };

    const handleGoalClick = (goalText: string) => {
        setSelectedGoal(goalText);
        setShowGoalsBox(false);
        setShowAddGoalForm(true);
    };

    const AddGoalButton = () => (
        <div className="relative group">
            <button
                className={`px-4 text-lg font-medium text-white py-2 rounded ${canAddGoal ? 'bg-[#FB7306]' : 'bg-gray-400'}`}
                onClick={handleAddGoalClick}
                disabled={!canAddGoal}
            >
                Add Goal
            </button>
            {!canAddGoal && (
                <div className="absolute -ml-24 md:-ml-40 mt-2 hidden group-hover:flex bg-gray-700 text-white text-sm p-2 rounded whitespace-nowrap max-w-screen overflow-hidden">
                    Maximum 5 goals can be added at a time
                </div>
            )}
        </div>
    );
    const totalAvailableBalance = availableBalance && (totalCurrent - availableBalance);


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

    useEffect(() => {
        fetchData();
    }, [mutualFunds]);
    

    return (
        <div className="relative">

            <HeaderNav
                showBtn={true}
                showNotification={true}
                whatsapp={false}
                beta={false}
                title="My Goals"
            />
            {/* <div className="header w-full mb-10 h-18 py-2 bg-[rgba(0,178,178,0.40)] text-[20px] lg:text-[30px] text-[#035782] font-semibold flex  items-center top-0 right-0 z-30 transition-all duration-300">
      <div className="heading flex-1  px-6 self-start lg:ml-12 lg:px-12">My Goals</div>
      <div className="flex-1 items-end justify-end">

      <div className='w-8 h-8 self-end  absolute top-3 lg:right-16  right-8  sm:w-12  sm:h-12 bg-primary-blue rounded-full'>
                        <NavItemPopOver user title={name} items={demo ? demoPages : dashboardPages} navbar={false} />
                    </div> 
      </div>

    </div> */}



            {/* <div className="bg-[#00B2B266] px-8 py-6">
                <h2 className="text-[#035782] font-semibold text-2xl mb-0">My Goals</h2>
            </div> */}
            {showGoalsBox ? (
                <ChooseGoals onClose={() => setShowGoalsBox(false)} handleClick={handleGoalClick} />
            ) :
                showAddGoalForm ? (
                    <AddGoalForm onClose={() => setShowAddGoalForm(false)} handleDone={handleAddDone} availableBalance={unallocatedAmount} selectedGoal={selectedGoal} />
                ) :
                    (
                        <div className="w-full min-h-screen bg-[#E7F9F2] py-6">
                            {showMaxGoalsAlert && (
                                <div>

                                </div>
                                // <Alert variant="destructive" className="mb-6 mx-auto w-full max-w-4xl bg-[#FFDDDD] border border-[#FF9999] text-[#CC0000]">
                                //     <AlertDescription>
                                //         You&apos;ve reached the maximum limit of 5 goals. To add a new goal, please remove an existing one.
                                //     </AlertDescription>
                                // </Alert>
                            )}
                            <div className="flex flex-col md:flex-row gap-8 justify-between  mx-auto">
                                <div className="w-5/12 max-w-[400px] hidden md:flex flex-col px-8 gap-12">
                                    <div className='flex gap-2 items-center'>
                                        <p className='m-0 text-[#035782] font-semibold'>Current Investments</p>
                                        <div className='relative group'>
                                            <MdInfoOutline className='text-2xl' />
                                            <div className='hide ease-in-out hidden group-hover:block w-0 h-0 border-t-[15px] border-b-[15px] border-r-[15px] border-t-transparent border-b-transparent border-r-teal-500 absolute -top-1 left-[22px]'></div>
                                            <div className='hide ease-in-out hidden group-hover:block font-normal w-[350px] text-base text-white absolute left-10 -top-[4px] z-50'>
                                                <div className='w-full h-full p-4 relative bg-teal-500 rounded-lg rounded-tl-[4px]'>
                                                    Details of how all your current investments are allocated across various goals                                         </div>
                                            </div>
                                        </div>
                                    </div>
                                    <NetworthChart
                                        availableBalance={totalCurrent || 0}
                                        goals={allGoals}
                                    />
                                    <div className='flex gap-2 items-center'>
                                        <p className="m-0 text-[#035782] font-semibold">Monthly Investments</p>
                                        <div className='relative group'>
                                            <MdInfoOutline className='text-2xl' />
                                            <div className='hide ease-in-out hidden group-hover:block w-0 h-0 border-t-[15px] border-b-[15px] border-r-[15px] border-t-transparent border-b-transparent border-r-teal-500 absolute -top-1 left-[22px]'></div>
                                            <div className='hide ease-in-out hidden group-hover:block font-normal w-[350px] text-base text-white absolute left-10 -top-[4px] z-50'>
                                                <div className='w-full h-full p-4 relative bg-teal-500 rounded-lg rounded-tl-[4px]'>
                                                    Details of how all your SIPs are allocated across various goals
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <InvestmentChart goals={allGoals} />
                                </div>
                                <MobileTab activeTab={activeTab} setActiveTab={setActiveTab} />
                                <div className="md:hidden">
                                    {activeTab === "networth" ? (
                                        <NetworthChart
                                            availableBalance={totalCurrent || 0}
                                            goals={allGoals}
                                        />
                                    ) : (
                                        <InvestmentChart goals={allGoals} />
                                    )}
                                </div>
                                <div className="relative flex md:hidden justify-center items-center">
                                    <AddGoalButton />
                                </div>
                                <div className="flex flex-col px-8 gap-8 flex-grow w-full">
                                    <div className="hidden md:flex self-end gap-3 justify-end">
                                        <AddGoalButton />
                                    </div>
                                    <Goals allGoals={allGoals} availableBalance={availableBalance} handleDone={handleDone} isLoading={isLoading} />
                                </div>
                            </div>
                        </div>
                    )}
        </div>
    )
}

export default Page
