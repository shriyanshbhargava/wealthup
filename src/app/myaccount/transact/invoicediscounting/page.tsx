"use client";

import React, { useEffect, useState } from "react";
import { Slide, ToastContainer } from "react-toastify";
import { usePathname, useRouter } from "next/navigation";

import { AuthApi } from "@/api/services/auth/AuthApi";
import DetailsCard from "@/components/Onboarding/TapAndInvestment/DetailsCard";
import Footer from "@/components/ui/footer";
import HeaderNav from "@/components/MyAccount/MutualFundsAnalyser/HeaderNav";
import Link from "next/link";
import { PrefetchKind } from "next/dist/client/components/router-reducer/router-reducer-types";
import SideBar from "@/components/ui/Sidebar";
import { Sidebar as SidebarMobile } from "@/components/Sidebar";
import Storage from "@/utils/storage";
import TapAndInvestmentCard from "@/components/Onboarding/TapAndInvestment/TapAndInvestmentCard";
import { apiUrl } from "@/utils/constants";
import { useSidebarContext } from "@/components/ui/Sidebar/sidebar-context";

export interface iInvestmentsData {
    title: string;
    description: string;
    percentage: string;
    xirr: string;
    tenure: string;
    invest: string;
    img: any;
}


type User = {
    _id: string | null;
    calls_booked: number | null;
    first_name: string | null;
    last_name: string | null;
    email: string | null;
    phone: string | null;
    city: string | null;
    dob: string | null;
    coins: string | null;
    cas_updated_at: string | null;
    sub_end_date: string | null;
    tier: 'gold' | 'base' | 'silver' | null,
    subscriptionStatus: 'active' | 'inactive' | null,
    token: string | null;
};

export interface Document {
    name: string;
    size?: string;
    type?: string;
    publicLink?: string;
    s3Link?: string;
    text?: string;
    link?: string;
}

export interface Meta {
    documents?: Document[];
    tags?: string;
    isin?: string;
    trusteeName?: string;
    rating?: string;
    ownership?: string;
    ratingAgency?: string;
    interest?: string;
    principle?: string;
    about?: string;
    [key: string]: any;
}

export interface MinInvestment {
    amount: number;
    grossIRR: number;
    netIRR: number;
    returnAmount: number;
}

export interface Company {
    registeredName: string;
    logoUrl: string;
    brandName: string;
    reinvestment: boolean;
}

export interface Deal {
    id: number;
    name: string;
    logo: string;
    fullImage: string;
    financeType: string;
    miniSummary: string;
    tags: string;
    status: string;
    listingCategory: string;
    meta: Meta;
    tenure: number;
    idealTenure: number;
    tenurePeriod: string;
    minInvestment: MinInvestment;
    isSoldOut: boolean;
    soldOutIn?: number;
    successfullyAmountRaise?: number;
    targetAmountToRaise?: number;
    closeRaiseDate: string;
    startRaiseDate: string;
    company: Company;
    maturityDate?: string | null;
    dealWeight?: number;
    startDate?: string;
    targetUnitRaised?: number;
    successfulUnitRaised?: number;
    isPtcDeal?: boolean;
}

export type InvestDeals = Deal[];

export default function Page() {
    const { isCollapsed } = useSidebarContext();
    const [isLoading, setIsLoading] = useState(false);
    const [allDeals, setAllDeals] = useState<InvestDeals>();
    const [remainingDeals, setRemainingDeals] = useState<InvestDeals>();
    const [soldOutDeals, setSoldOutDeals] = useState<InvestDeals>();
    const [walletBalance, setWalletBalance] = useState<number | undefined>();
    const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
    const pathname = usePathname();
    const [access_token, setAccessToken] = useState<string>();
    const router = useRouter();

    useEffect(() => {
        router.prefetch("/myaccount/transact/digitalgold", { kind: PrefetchKind.FULL });
    }, [router])


    const demo = pathname?.includes('demo');

    console.log('gdbbdbdfbbb', demo);

    const [queryParams, setQueryParams] = useState({
        dealId: "",
        amount: "",
        orderId: "",
        financeType: "",
    });



    useEffect(() => {
        const tokenData = Storage.getToken();
        setAccessToken(tokenData?.access_token);
        const parseQueryParams = () => {
            setIsLoading(true);
            if (typeof window !== 'undefined') {
                const url = window.location.href;
                const normalizedUrl = url.replace(/\?/g, (match, offset) =>
                    offset === url.indexOf("?") ? "?" : "&"
                );

                const queryParams = new URLSearchParams(normalizedUrl.split("?")[1]);
                setQueryParams({
                    dealId: queryParams.get("dealId") ?? "",
                    amount: queryParams.get("amount") ?? "",
                    orderId: queryParams.get("order_id") ?? "",
                    financeType: queryParams.get("financeType") ?? "",
                });
            }
            setIsLoading(false);
        };
        parseQueryParams();
    }, []);

    useEffect(() => {
        if (!access_token) return;
        const fetchAllData = async () => {
            setIsLoading(true);
            try {
                const [dealsRes, userRes] = await Promise.all([
                    fetch(`${apiUrl}/api/v1/tapinvest/deals`, {
                        headers: {
                            "Content-Type": "application/json",
                            authorization: `Bearer ${access_token}`,
                        },
                    }),
                    fetch(`${apiUrl}/api/v1/tapinvest/user/get-data?options=details,va_balance`, {
                        headers: {
                            "Content-Type": "application/json",
                            authorization: `Bearer ${access_token}`,
                        },
                    }),
                ]);
                const dealsData = await dealsRes.json();
                const userData = await userRes.json();
                setAllDeals(dealsData?.data ?? []);
                const soldOut = dealsData?.data?.filter((deal: Deal) => deal.isSoldOut);
                const remaining = dealsData?.data?.filter((deal: Deal) => !deal.isSoldOut);

                setSoldOutDeals(soldOut);
                setRemainingDeals(remaining);
                setWalletBalance(userData?.client_details_v2?.data?.balance);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllData();
    }, [access_token]);

    useEffect(() => {
        if (queryParams.dealId && allDeals && allDeals?.length > 0) {
            const deal = allDeals?.find((deal) => deal.id.toString() === queryParams.dealId);
            setSelectedDeal(deal || null);
        }
    }, [queryParams.dealId, allDeals]);
    const redirectToLogin = () => {
        const pathname = window.location.pathname;
        window.location.href = `/login?next=${pathname}`;
    };

    const getUser = async () => {
        const token = Storage.getToken();
        console.log({ token })
        if (token != null) {
            const authApiClient = new AuthApi(token.access_token);

            const res: Response = await authApiClient.me();

            if (res.status === 200) {
                const data = (await res.json()) as User;

                const tier = data.tier;
                return;
            } else {
                Storage.removeToken();
                if (!demo) {
                    redirectToLogin();
                }
                return;
            }
        } else {
            Storage.removeToken();
            if (!demo) {
                redirectToLogin();
            }
            return;
        }
    };

    React.useEffect(() => {
        getUser();
    }, []);


    useEffect(() => {
        if (selectedDeal) {
            // Disable scrolling
            document.body.style.overflow = "hidden";
        } else {
            // Enable scrolling
            document.body.style.overflow = "auto";
        }

        // Cleanup function to ensure proper state handling
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [selectedDeal]);
    if (demo) {
        return (
            <div>demo</div>
        )
    }




    return (
        <section className="flex w-full layout-gradient overflow-clip">
            <div className="hidden lg:block">
                <SideBar />
            </div>
            <div className="lg:hidden">
                <SidebarMobile />
            </div>
            <div className={`grow text-primary-blue ${isCollapsed ? "lg:pl-[70px]" : "lg:pl-[250px]"} w-full`}>
                {
                    pathname === "/myaccount/transact/invoicediscounting" &&
                    <HeaderNav
                        showBtn={true}
                        showNotification={true}
                        whatsapp={false}
                        beta={false}
                        title="Transact"
                    />
                }
                <div className="px-10 py-8 bg-[#FBFBF6]">
                    {selectedDeal ? (
                        <DetailsCard
                            dealData={selectedDeal}
                            onClose={() => { window.location.href = '/myaccount/transact/invoicediscounting' }}
                            walletBalance={walletBalance || 0}
                            dealId={queryParams.dealId ?? ""}
                            balance={queryParams.amount ?? ""}
                            orderId={queryParams.orderId ?? ""}
                            financeType={queryParams.financeType ?? ""}
                        />
                    ) : (
                        <>
                            {isLoading ? (
                                <div className="flex justify-center items-center h-32">
                                    <div className="loader"></div>
                                </div>
                            ) : (
                                <>
                                    <div>
                                        <p className='text-[#565656] font-semibold  text-base sm:text-[6px] md:text-[1.25rem]'>Handpicked Investment Products</p>
                                        <div className="flex gap-4">
                                            <Link
                                                href="/myaccount/transact/mutualfunds"
                                                className="text-white text-base sm:text-[6px] md:text-[18px] bg-gray-500 w-fit py-1 px-4 my-2 md:my-8 rounded-full font-semibold"
                                            >
                                                Mutual Funds
                                            </Link>
                                            <Link
                                                href="/myaccount/transact/invoicediscounting"
                                                className="text-white text-base sm:text-[6px] md:text-[18px]  bg-green-800 w-fit py-1 px-4 my-2 md:my-8 rounded-full font-semibold"
                                            >
                                                Invoice Discounting
                                            </Link>
                                            <Link
                                                href="/myaccount/transact/digitalgold"
                                                className="text-white text-base sm:text-[6px] md:text-[18px] bg-gray-500 w-fit py-1 px-4 my-2 md:my-8 rounded-full font-semibold"
                                            >
                                                Digital Gold/Silver
                                            </Link>
                                            {/* <Link
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    toast.info("Coming Soon!");
                                                }}
                                                className="text-white text-base sm:text-[6px] md:text-[18px] bg-gray-500 w-fit py-1 px-4 my-2 md:my-8 rounded-full font-semibold"
                                            >
                                                Digital Gold/Silver
                                            </Link> */}
                                            {
                                                remainingDeals?.length === 0 &&
                                                <Link href='/myaccount/onboarding' className='text-white text-base sm:text-[6px] md:text-[1.25rem] bg-[#FF7300] w-fit py-2 px-4 my-2 md:my-5 rounded-full font-semibold ml-auto'>Complete Your KYC </Link>
                                            }
                                        </div>
                                        {allDeals?.length === 0 ? (
                                            <p>No deals available at the moment. Please check back later.</p>
                                        ) : (
                                            <div>
                                                <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-10 md:gap-10">
                                                    {
                                                        remainingDeals?.length === 0 ?
                                                            <p className="text-[#565656] font-semibold mt-4 text-base sm:text-[6px] md:text-[1.25rem]">There are no deals active right now</p>
                                                            :
                                                            remainingDeals?.map((deal, index) => (
                                                                <TapAndInvestmentCard
                                                                    key={index}
                                                                    investmentsData={deal}
                                                                    walletBalance={walletBalance || 0}
                                                                />
                                                            ))
                                                    }
                                                </div>
                                                {
                                                    soldOutDeals?.length != 0 &&
                                                    <div>
                                                        <p className='text-[#565656] font-semibold mt-4 text-base sm:text-[6px] md:text-[1.25rem]'>Deal Closed</p>
                                                        <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-10 md:gap-10">
                                                            {soldOutDeals?.map((deal, index) => (
                                                                <TapAndInvestmentCard
                                                                    key={index}
                                                                    investmentsData={deal}
                                                                    walletBalance={walletBalance || 0}
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </div>
                <Footer />
            </div>
            <ToastContainer position="bottom-center" transition={Slide} />
        </section>
    );
}
