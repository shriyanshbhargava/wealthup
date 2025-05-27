'use client'

import { BsArrowBarUp, BsEye, BsEyeSlash, BsPlusCircle } from "react-icons/bs";
import InvestmentTable, { Investment, InvoiceDiscountingData, MutualFund } from "@/components/MyAccount/Dashboard/investment-table";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import React, { useContext, useEffect, useState } from "react";

import Breadcrumbs from "@/components/Breadcrumbs";
import Button from "@/components/ui/ButtonNew";
import { CASModal } from "./components/CasMode";
import { CashOrFD } from "./components/CashInBank";
import DoughnutChart from "@/components/MyAccount/Dashboard/doughnut-chart";
import FAQAccordion from "@/components/MyAccount/Dashboard/FAQAccordion";
import HeaderNav from "@/components/MyAccount/MutualFundsAnalyser/HeaderNav";
import { Insights } from "./components/Insights";
import { InvestmentsData } from "./types";
import Modal from "@/components/ui/Modal";
import { OverallInvestmentCard } from "./components/OverallInvestmentCard";
import { PortfolioBreakdown } from "./components/PortfolioBreakdown";
import { ProfileContext } from "@/components/DashboardLayout";
import { Spinner } from "@/components/ui/Spinner";
import Storage from "@/utils/storage";
import { UploadModal } from "./components/UploadModal";
import { UserApi } from "@/api/services/user/UserApi";
import WalkthroughDemo from "@/components/MyAccount/Dashboard/walkthroughDemo";
import { differenceInCalendarMonths } from "date-fns";
import dynamic from "next/dynamic";
import { investmentsCrumbs } from "@/utils/Breadcrumbs";
import { toast } from "react-toastify";
import { usePathname } from "next/navigation";

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
const Investments = () => {
  const pathname = usePathname();

  const demo = pathname?.includes('demo');
  const [investments, setInvestments] = useState<InvestmentsData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [hidden, setHidden] = useState<boolean>(true);
  const [showCasModel, setShowCasModel] = useState<boolean>(false);
  const [showUploadPopup, setShowUploadPopup] = useState<boolean>(false);
  const [casNotUploded, setCasNotUploded] = useState<boolean>(false);
  const [showUpdateCasBtn, setShowUpdateCasBtn] = useState<boolean>(false);
  const [fetchAgain, setFetchAgain] = useState<boolean>(false);
  const [totalCurrent, setTotalCurrent] = useState<number>()
  const [mutualFunds, setMutualFunds] = useState<MutualFund[]>([]);
  const [invoiceDiscountingData, setInvoiceDiscountingData] = useState<InvoiceDiscountingData[]>([]);
  const [investmentData, setInvestmentData] = useState<Investment[]>([]);
  const [showDemoModal, setShowDemoModal] = useState<boolean>(false);
  const [showCasModal, setShowCasModal] = useState(false);
  const [name, setName] = useState("");


  const { user } = useContext(ProfileContext)!;

  const { investments: invs } = useContext(ProfileContext);

  useEffect(() => {
    if (user?.cas_updated_at !== null) {
      const differenceInMonths = differenceInCalendarMonths(
        Date.now(),
        Date.parse(user!?.cas_updated_at)
      );

      if (differenceInMonths >= 1) {
        setShowCasModel(true);
        setShowUpdateCasBtn(true);
      }
    }

    setLoading(true);
    const tokens = Storage.getToken()!;
    const userApiClient = new UserApi(tokens.access_token);

    const fetchData = async () => {
      // const res: Response = await userApiClient.getInvestments();

      // if (res.status === 200) {
      //   const json = await res.json();
      //   setInvestments(json);
      //   setLoading(false);
      // } else if (res.status === 404) {
      //   setShowCasModel(true);
      //   setCasNotUploded(true);
      // } else {
      //   console.log("i",res)
      //   toast.error("Something went wrong.");
      //   setLoading(false);
      // }
    };

    if (invs === null || fetchAgain === true) {
      fetchData();
      setFetchAgain(false);
      setLoading(false)
    } else {
      setInvestments(invs);
      setLoading(false);
    }
  }, [fetchAgain]);

  const handleShowUploadPopup = () => setShowUploadPopup(true);

  const handleTotalCurrentChange = (tc: number) => {
    setTotalCurrent(tc);
  };
  const allInvesements = (tc: Investment[]) => {
    setInvestmentData(tc);
  };
  const allMutualFund = (tc: MutualFund[]) => {
    setMutualFunds(tc);
  };
  const allInvoiceDiscountingData = (tc: InvoiceDiscountingData[]) => {
    setInvoiceDiscountingData(tc);
  };

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
      {showDemoModal ?
        <UploadModal setFetchAgain={setFetchAgain} open={showDemoModal} onClose={() => setShowDemoModal(false)} />
        :
        <UploadModal setFetchAgain={setFetchAgain} open={showCasModal} onClose={() => setShowCasModal(false)} investment={true} />
      }
      <div className="bg-[#baeee5] pb-1">
        <HeaderNav
          showBtn={false}
          showNotification={true}
          whatsapp={false}
          beta={false}
          title="Investments"
        />
        {/* <div className="flex justify-between items-center font-semibold text-base   py-3  md:text-[1.75rem] lg:px-8 px-3 bg-[#a7e5e3] z-50">
          <div className="text-[#035782] ">My Investments</div>
          <div className="flex gap-6" >

          
          
                    <Button  size='small' padding={'p-2 px-5 sm:px-4 sm:py-2 max-w-fit'} boxShadow={false} onClick={() => setShowCasModal(true)}>
                    <div style={{lineHeight:"1px"}}  className='text-sm sm:text-base sm:px-2  font-medium'>Refresh MF Portfolio</div>
                  </Button>

          <div className='w-8 h-8 sm:w-12  mr-3 lg:mr-8 lg:mt-0 mt-2 sm:h-12 bg-primary-blue rounded-full'>
                        <NavItemPopOver user title={name} items={demo ? demoPages : dashboardPages} navbar={false} />

                    </div>
          </div>

        </div> */}
        {loading ?
          <div className="bg-[#bdefe6] flex justify-center items-center h-[70vh] w-full z-[999]">
            <div className="relative h-20 w-20 rounded-full">
              <div className="absolute inset-0 rounded-full bg-transparent border-[4px] border-transparent"></div>
              <div className="h-full w-full rounded-full border-[4px] border-transparent border-t-[#035782] animate-spin"></div>
            </div>
          </div>
          :
          <>
            <DoughnutChart totalCurrent={totalCurrent ?? 0} mutualFunds={mutualFunds} invoiceDiscountingData={invoiceDiscountingData} investmentData={investmentData} />
            <InvestmentTable onTotalCurrentChange={handleTotalCurrentChange} allInvesements={allInvesements} allMutualFund={allMutualFund} allInvoiceDiscountingData={allInvoiceDiscountingData} setDemoModal={() => setShowDemoModal(true)} />
          </>}
        <div className="mx-auto p-4 pb-6 md:p-8 md:pt-1">
          <FAQAccordion investmentFaq={true} />
        </div>
      </div>
      {/* <div className="w-full h-full">
        <div className="relative bg-primary-light w-full h-[25rem]">
        <h1 className="text-white font-medium text-4xl font-robo mx-4">
          My Investments
        </h1>
        <div className="flex items-center justify-center">
          <div className="flex flex-col items-center justify-center text-white text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium font-robo">
            <div className="flex gap-2 items-center">
              <span className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">
                {hidden ? (
                  <>----</>
                ) : (
                  <>
                    {Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "INR",
                      maximumFractionDigits: 0,
                    }).format(investments?.net_worth ?? 0)}
                  </>
                )}
              </span>
              {hidden ? (
                <BsEyeSlash
                  className="cursor-pointer"
                  onClick={() => setHidden(!hidden)}
                />
              ) : (
                <BsEye
                  className="cursor-pointer"
                  onClick={() => setHidden(!hidden)}
                />
              )}
            </div>
            Total Assets
            <div className="mt-4 flex flex-col items-center">
              <div
                className={`flex text-2xl md:text-3xl lg:text-4xl xl:text-5xl gap-2 items-center text-white`}
              >
                <span className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">
                  {hidden ? (
                    <>---</>
                  ) : (
                    <>
                      {Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                        maximumFractionDigits: 0,
                      }).format(investments?.day_return ?? 0)}
                    </>
                  )}
                </span>
                {(investments?.day_return ?? 0) > 0 ? (
                  <IoMdArrowDropup />
                ) : (
                  <IoMdArrowDropdown />
                )}
              </div>
              Day Change
            </div>
          </div>
        </div>
        <div className="absolute bottom-5 right-10">
          <Button color="white" onClick={handleShowUploadPopup}>
            Update CAS
          </Button>
        </div>
      </div> */}

      {/* <div className="w-full h-full px-4 py-4">
        <div className="mb-4"><Breadcrumbs crumbs={investmentsCrumbs} /></div>
        {loading ? (
          <div className="w-full h-[25rem]">
            <Spinner color="black" size="8" />
          </div>
        ) : null}
        {investments !== null ? (
          <div className="flex flex-col md:flex-row gap-12 justify-between">
            <div className="w-full md:w-1/2">
              <div className="mb-4">
                <p className="font-robo font-bold text-2xl">
                  Portfolio Breakdown
                </p>
                <PortfolioBreakdown
                  key={investments?.net_worth}
                  investmentsData={investments?.data}
                  netWorth={investments?.net_worth}
                />
              </div>
              <div className="hidden md:block">
                <Insights suggestions={investments?.suggestions ?? []} />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="">
                <p className="text-2xl font-bold font-robo">Investments</p>
                <CashOrFD type="cash_in_bank" num={investments?.cash_in_bank} setFetchAgain={setFetchAgain} />
                {investments?.data.slice(0, 3).map((it, index) => (
                  <OverallInvestmentCard item={it} key={index} setFetchAgain={setFetchAgain} />
                ))}
              </div>
            </div>
            <div className="block md:hidden">
              <Insights suggestions={investments?.suggestions ?? []} />
            </div>
          </div>
        ) : null}
      </div> */}
      {/* <CASModal
        open={showCasModel}
        onClose={() => setShowCasModel(false)}
        casNotUploded={casNotUploded}
      /> */}
      {/* <UploadModal
        open={showUploadPopup}
        setFetchAgain={setFetchAgain}
        onClose={() => setShowUploadPopup(false)}
      /> */}
      {/* </div > */}
    </>
  );
};

export default Investments;
