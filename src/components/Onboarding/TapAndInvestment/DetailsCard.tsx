"use client"

import React, { useCallback, useEffect, useRef, useState } from "react";

import Arrow from "@/assets/tapAndInvestment/left-arrow.svg";
import { Deal } from "@/app/myaccount/transact/invoicediscounting/page";
import Footer from "@/components/ui/footer";
import HeaderNav from "../../MyAccount/MutualFundsAnalyser/HeaderNav";
import Image from "next/image";
import InvestmentAmountCard from "./InvestmentAmountCard";
import { Spinner } from "@/components/ui/Spinner";
import Storage from '@/utils/storage';
import { apiUrl } from "@/utils/constants";

interface DetailsCardProps {
  dealData: Deal;
  onClose: () => void;
  walletBalance: number;
  dealId?: string
  orderId?: string
  financeType?: string
  balance?: string
}
interface MinMaxInvestment {
  amount: number;
  grossIRR: number;
  netIRR: number;
  returnAmount: number;
}

interface CompanyDetails {
  registeredName: string;
  logoUrl: string;
  brandName: string;
  reinvestment: boolean;
}

interface Document {
  href: string;
  linkText: string;
  type: string;
}

interface TabData {
  category?: string;
  titleIcon: string;
  type: string;
  title?: string;
  points?: string[];
  documents?: Document[];
  headerText?: string | null;
  footerText?: string | null;
}

interface Templates {
  multiAsset: boolean;
  tabNames: string[];
  tabData: TabData[][];
}

export interface IDealDetails {
  tenure: number;
  idealTenure: number;
  tenurePeriod: string;
  minInvestment: MinMaxInvestment;
  isSoldOut: boolean;
  soldOutIn: number;
  successfullyAmountRaise: number;
  targetAmountToRaise: number;
  closeRaiseDate: string;
  startRaiseDate: string;
  allowInvestment: boolean;
  maxInvestment: MinMaxInvestment;
  isMaxInvestmentAndMinInvestmentSame: boolean;
  company: CompanyDetails;
  id: number;
  name: string;
  fullImage: string;
  financeType: string;
  investmentBookingType: string;
  tags: string;
  listingCategory: string;
  templateName: string;
  templates: Templates;
  investors: number;
  purchaseFlow: string;
  miniSummary: string;
  maturityDate: string;
  commission: number;
  commissionPercentage: number;
}
interface RiskCardProps {
  text: string;
  title: string
}


export default function DetailsCard({ dealData, onClose, walletBalance, dealId, balance, orderId, financeType }: DetailsCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [dealDetail, setDealDetails] = useState<IDealDetails>();
  const [fileSizes, setFileSizes] = useState<{ [key: string]: string }>({});
  const [isCardRendered, setIsCardRendered] = useState(false);
  const hasCalledCheckStatus = useRef(false);


  const tokenData = Storage.getToken();
  const access_token = tokenData?.access_token;


  const fetchData = async () => {
    setIsLoading(true);
    const res = await fetch(`${apiUrl}/api/v1/tapinvest/deals/${dealData?.id}?type=${dealData?.financeType}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${access_token}`
      },
    });
    const data = await res.json();
    setDealDetails(data?.data ?? [])
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, [access_token])

  const tabData = dealDetail?.templates?.tabData || [];
  let documents = tabData[3]?.[0]?.documents || [];

  const formatToIndianNumbering = (num: number): string => {
    if (num >= 1_00_00_000) {
      return `₹${(num / 1_00_00_000).toFixed(2)} Cr`;
    } else if (num >= 1_00_000) {
      return `₹${(num / 1_00_000).toFixed(2)} L`;
    } else if (num >= 1_000) {
      return `₹${(num / 1_000).toFixed(2)} K`;
    }
    return `₹${num.toFixed(2)}`;
  };

  useEffect(() => {
    // Function to fetch the file size
    const fetchFileSize = async (url: string) => {
      try {
        const response = await fetch(url, {
          method: "HEAD", // Only fetch headers, no content
        });
        const size = response.headers.get("Content-Length");
        return size ? (parseInt(size, 10) / (1024 * 1024)).toFixed(2) : "N/A"; // Convert to MB
      } catch (error) {
        console.error("Error fetching file size:", error);
        return "N/A"; // If there's an error, return "N/A"
      }
    };

    // Fetch the file sizes for all documents
    const fetchSizes = async () => {
      const sizes: { [key: string]: string } = {};
      for (const doc of documents) {
        sizes[doc.href] = await fetchFileSize(doc.href);
      }
      setFileSizes(sizes);
    };
    fetchSizes();
  }, [dealDetail]);

  const handleRenderCard = () => {
    if (!isCardRendered) {
      setIsCardRendered(true);
    }
  };

  useEffect(() => {
    handleRenderCard();
  })

  const Card = useCallback(() => {
    return (
      <InvestmentAmountCard
        dealData={dealDetail}
        walletBalance={walletBalance}
        dealId={dealId ?? ''}
        payBalance={balance ?? ''}
        orderId={orderId ?? ''}
        financeType={financeType ?? ''}
        hasCalledCheckStatus={hasCalledCheckStatus}
      />
    );
  }, [dealDetail, walletBalance, dealId, balance, orderId, financeType]); // Add dependencies as necessary


  return (
    <div
      className="bg-[#FBFBF6] fixed bottom-0 right-0 overflow-y-auto h-auto  justify-center items-center z-50"
      style={{ width: window.innerWidth >= 1024 ? 'calc(100% - 250px)' : '100%', height: window.innerWidth >= 1024 ? 'calc(100%)' : '100%' }}
    >
      <HeaderNav
        showBtn={true}
        showNotification={true}
        whatsapp={false}
        beta={false}
        title='Transact'
      />
      {isLoading ?
        <div className="px-10 py-8 md:px-10 md:py-8">
          <div className="items-center mb-4">
            <button
              onClick={onClose}
              className="bg-[rgba(0,178,178,0.40)] rounded-full p-2"
            >
              <Image src={Arrow} width={20} height={20} alt="arrow" />
            </button>
          </div>
          <div className="flex justify-center items-center h-32">
            <div className="loader"></div>
          </div>
        </div>
        :
        <div className="flex md:flex-row flex-col">
          <div className="md:px-10 md:py-8 rounded-lg  w-full h-full flex flex-col gap-8 md:gap-14">
            <div className="bg-[rgba(0,178,178,0.40)] md:bg-[#FBFBF6] px-10 py-0 md:px-0 md:py-0 md:items-center md:flex gap-8">
              <div className="items-center  gap-6 flex  mb-4">
                <div className="w-full">
                  <button
                    onClick={onClose}
                    className="bg-[rgba(0,178,178,0.40)] md:flex hidden w-10 h-10 rounded-full p-2"
                  >
                    <Image src={Arrow} width={22} height={22} alt="arrow" className="w-[22px] h-[22px]" />
                  </button>
                </div>


                <Image
                  src={dealDetail?.company?.logoUrl || ''}
                  width={60}
                  height={60}
                  alt={dealDetail?.company?.brandName || ''}
                  className="mb-4 hidden lg:block  mx-auto md:mx-0"
                />

                <Image
                  src={dealDetail?.company?.logoUrl || ''}
                  width={80}
                  height={80}
                  alt={dealDetail?.company?.brandName || ''}
                  className="mb-4 mx-auto sm:hidden lg:hidden md:mx-0 md:flex hidden"
                />

              </div>
              <div className="flex gap-4 items-center">
                <button
                  onClick={onClose}
                  className="bg-[rgba(0,178,178,0.40)] md:hidden rounded-full p-2"
                >
                  <Image src={Arrow} width={22} height={22} alt="arrow" />
                </button>
                <Image
                  src={dealDetail?.company?.logoUrl || ''}
                  width={100}
                  height={100}
                  alt={dealDetail?.company?.brandName || ''}
                  className="mb-4 md:hidden mx-auto md:mx-0"
                />

                {/* <h2 className="text-2xl ml-5 font-bold text-center md:text-left">{'kjb'}</h2> */}
                <div className="md:flex gap-8">

                  <h2 className="lg:text-2xl font-bold text-center text-xl md:text-lg sm:text-base    md:text-left">{dealDetail?.company?.brandName}</h2>
                  <p className="text-primary-blue md:w-fit  bg-white border h-fit rounded-lg text-xs font-semibold px-4 py-2 text-center">
                    {dealDetail?.financeType}
                  </p>
                </div>

              </div>
              {/* <div className=" pl-6  sm:hidden  gap-4 mb-4 items-center md:items-start">
              <h2 className="text-2xl font-bold text-center md:text-left">{dealDetail?.company?.registeredName}</h2>
              <p className="text-primary-blue bg-white border rounded-lg text-sm font-semibold px-4 py-2 text-center">
                {dealDetail?.financeType}
              </p>
            </div> */}

            </div>



            <div className="px-10 md:px-0 md:py-0">
              <h2 className="text-2xl font-bold"> About the Company</h2>
              <div className="border rounded-lg shadow-md  bg-[#ffffff]">
                <div className="p-2 py-4 font-medium ">
                  {dealDetail?.miniSummary === '' ? 'No Information' : dealDetail?.miniSummary}
                </div>
                {/* <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="flex flex-col items-start border-t border-r md:border-r-0 border-gray-200 p-4">
                    <h3 className="font-semibold uppercase text-lg text-gray-500">Clients</h3>
                    <div className="mt-2 flex gap-4">
                    </div>
                  </div>
                  <div className="flex flex-col items-start border-t border-gray-200 p-4">
                    <h3 className="font-semibold uppercase text-lg text-gray-500">Backed By</h3>
                    <div className="mt-2 flex gap-4">
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
            {/* <div className="px-10 py-0  md:px-0 md:py-0">
              <h2 className="text-2xl font-bold">Deal History</h2>
              <div className="border rounded-lg shadow-md bg-[#F6F6F1]">
                <div className="grid grid-cols-2 md:grid-cols-4">
                  <div className="flex flex-col items-start border-b md:border-b-0 border-r md:border-r m-0 border-gray-200 p-4">
                    <h3 className="font-semibold text-lg text-gray-500 m-0  decoration-dashed underline-offset-4">
                      Active Deals
                    </h3>
                    <p className="text-2xl font-bold text-gray-800 m-0">{12}</p>
                  </div>
                  <div className="flex flex-col items-start border-b md:border-b-0 border-r md:border-r m-0 border-gray-200 p-4">
                    <h3 className="font-semibold text-lg text-gray-500 m-0  decoration-dashed underline-offset-4">
                      Raised
                    </h3>
                    <p className="mt-1 text-2xl font-bold text-gray-800 m-0">
                      {formatToIndianNumbering(16000000)}
                    </p>
                  </div>
                  <div className="flex flex-col items-start border-b md:border-b-0 border-r md:border-r m-0 border-gray-200 p-4">
                    <h3 className="font-semibold text-lg text-gray-500 m-0  decoration-dashed underline-offset-4">
                      Matured Deals
                    </h3>
                    <p className="mt-1 text-2xl font-bold text-gray-800 m-0">{80}</p>
                  </div>
                  <div className="flex flex-col items-start border-b md:border-b-0 m-0 border-gray-200 p-4">
                    <h3 className="font-semibold text-lg text-gray-500 m-0  decoration-dashed underline-offset-4">
                      On Time Payments
                    </h3>
                    <p className="mt-1 text-2xl font-bold text-gray-800 m-0">{100}%</p>
                  </div>
                </div>
             
              </div>
            </div> */}
            <div className="px-10 py-0 md:px-0 md:py-0">
              <h2 className="text-2xl font-bold">Security Measures</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <RiskCard title="Risk Analysis" text=" Tap Invest performs a rigorous risk analysis on all the inbound companies and evaluates them against over 50 key parameters, covering everything from financial health and market conditions to regulatory compliance and operational stability. This thorough approach helps ensure that all the deals listed on the platform are well-vetted. However, it is recommended that an individual performs their own analysis before making any investment." />
                <RiskCard title="On Demand eNACH" text="On-demand eNACH is enabled for the entire exposure amount of the companies before they can raise capital through Tap Invest. An on-demand eNACH ensures that the payment can be triggered whenever needed, ensuring quick and efficient collections." />
                <RiskCard title="Undated Cheques" text="Undated cheques are collected from the companies for the entire exposure
amount before they can raise capital through Tap Invest. These cheques help faciliate seamless and on-time
collections for an invoice discounting deal, and account for penalties in rare instances of delay." />
              </div>
            </div>

            {/* <div>
              <h1 className="text-2xl font-bold ">Documents</h1>

              <div className="flex flex-col md:flex-row gap-4" >

              </div>
            </div> */}
            {
              documents.length > 0 &&

              <div className="container mx-auto p-4 py-0 md:p-0">
                <h1 className="text-2xl font-bold mb-4">Documents</h1>
                <div className="flex flex-col lg:flex-row gap-4">
                  {documents.map((doc, index) => (
                    <a
                      key={index}
                      href={doc.href}
                      target="_blank"
                      download
                      className="flex items-center justify-between sm:w-full  lg:w-[50%] gap-2 p-2 border border-gray-300 rounded hover:bg-gray-100"
                    >
                      <div className="flex flex-col">

                        <span className="font-semibold">{doc.linkText}</span>
                        {
                          fileSizes &&

                          <span className="text-sm text-gray-500">{fileSizes[doc.href] ? `${fileSizes[doc.href]} MB` : <Spinner />}</span>
                        }
                      </div>


                      <svg
                        width="30px"
                        height="30px"
                        viewBox="0 0 25 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19.5 17V19.5H5.5V17M17.5 11L12.5 16L7.5 11M12.5 16V4.99998"
                          stroke="#121923"
                          strokeWidth="1.2"
                        />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            }


            <div className="w-full flex md:hidden overflow-auto pb-10  py-8 md:px-0 md:py-0">
              {isCardRendered && <Card />}
              {/* <InvestmentAmountCard dealData={dealDetail} walletBalance={walletBalance} dealId={dealId ?? ''} payBalance={balance ?? ''} orderId={orderId ?? ''} financeType={financeType ?? ''} /> */}
            </div>
          </div>
          <div className="md:w-[40%] mt-[10%] hidden md:flex w-full h-full">
            {isCardRendered && <Card />}

            {/* <InvestmentAmountCard dealData={dealDetail} walletBalance={walletBalance} dealId={dealId ?? ''} payBalance={balance ?? ''} orderId={orderId ?? ''} financeType={financeType ?? ''} /> */}
          </div>
        </div>
      }
      <Footer />
    </div>
  )
}


const RiskCard: React.FC<RiskCardProps> = ({ text, title }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };


  return (
    <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow-md">
      {/* Icon Section */}

      <div className="flex items-center justify-center w-12 h-12 bg-[#F1F3EC] rounded-lg">
        {title === "Risk Analysis" &&



          <svg
            fill="#000000"
            width="150px"
            height="150px"
            viewBox="-5 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>line-chart</title>
            <path
              d="M23.36 9.32c-1.32 0-2.36 1.080-2.36 2.36 0 0.28 0.040 0.56 0.12 0.8l-4.8 4.080c-0.32-0.2-0.72-0.28-1.16-0.28s-0.88 0.12-1.24 0.36l-2.72-2.2c0.080-0.24 0.12-0.44 0.12-0.72 0-1.32-1.080-2.36-2.36-2.36-1.32 0-2.36 1.080-2.36 2.36 0 0.36 0.080 0.68 0.2 0.96l-3.44 3.44c-0.28-0.12-0.64-0.2-0.96-0.2-1.32 0-2.36 1.080-2.36 2.36 0 1.32 1.080 2.36 2.36 2.36s2.36-1.080 2.36-2.36c0-0.36-0.080-0.68-0.2-0.96l3.44-3.44c0.28 0.12 0.64 0.2 0.96 0.2 0.44 0 0.88-0.12 1.24-0.36l2.76 2.12c-0.080 0.24-0.080 0.44-0.080 0.72 0 1.32 1.080 2.36 2.36 2.36s2.36-1.080 2.36-2.36c0-0.28-0.040-0.56-0.12-0.8l4.8-4.080c0.32 0.2 0.72 0.28 1.16 0.28 1.32 0 2.36-1.080 2.36-2.36-0.040-1.2-1.16-2.28-2.44-2.28zM2.36 21c-0.36 0-0.68-0.32-0.68-0.68 0-0.4 0.32-0.68 0.68-0.68s0.68 0.32 0.68 0.68c0 0.36-0.28 0.68-0.68 0.68zM8.24 13.76c0-0.4 0.32-0.68 0.68-0.68s0.68 0.32 0.68 0.68-0.32 0.68-0.68 0.68c-0.36 0-0.68-0.32-0.68-0.68zM15.2 19.28c-0.4 0-0.68-0.32-0.68-0.68s0.32-0.68 0.68-0.68 0.68 0.32 0.68 0.68c-0.040 0.4-0.28 0.68-0.68 0.68zM23.36 12.36c-0.36 0-0.68-0.32-0.68-0.68 0-0.4 0.32-0.68 0.68-0.68 0.4 0 0.68 0.32 0.68 0.68 0 0.4-0.32 0.68-0.68 0.68z"
              fill="#035782"
            ></path>
          </svg>
        }
        {
          title === "On Demand eNACH" &&
          <svg
            fill="#000000"
            width="80px"
            height="80px"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            enableBackground="new 0 0 24 24"
          >
            <path
              d="M8.5,6H6.7C8.2,4.7,10,4,12,4c0.3,0,0.6,0,0.9,0.1c0,0,0,0,0,0c0.5,0.1,1-0.3,1.1-0.9c0.1-0.5-0.3-1-0.9-1.1C12.7,2,12.4,2,12,2C9.6,2,7.3,2.9,5.5,4.4V3c0-0.6-0.4-1-1-1s-1,0.4-1,1v4c0,0.6,0.4,1,1,1h4c0.6,0,1-0.4,1-1S9.1,6,8.5,6z M7,14.5c-0.6,0-1,0.4-1,1v1.8C4.7,15.8,4,14,4,12c0-0.3,0-0.6,0.1-0.9c0,0,0,0,0,0c0.1-0.5-0.3-1-0.9-1.1c-0.5-0.1-1,0.3-1.1,0.9C2,11.3,2,11.6,2,12c0,2.4,0.9,4.7,2.4,6.5H3c-0.6,0-1,0.4-1,1s0.4,1,1,1h4c0.3,0,0.6-0.2,0.8-0.4c0,0,0,0,0,0c0,0,0,0,0,0c0-0.1,0.1-0.2,0.1-0.3c0-0.1,0-0.1,0-0.2c0,0,0-0.1,0-0.1v-4C8,14.9,7.6,14.5,7,14.5z M21,5.5c0.6,0,1-0.4,1-1s-0.4-1-1-1h-4c-0.1,0-0.1,0-0.2,0c0,0,0,0,0,0c-0.1,0-0.2,0.1-0.3,0.1c0,0,0,0,0,0c-0.1,0.1-0.2,0.1-0.2,0.2c0,0,0,0,0,0c0,0,0,0,0,0c0,0.1-0.1,0.2-0.1,0.2c0,0.1,0,0.1,0,0.2c0,0,0,0.1,0,0.1v4c0,0.6,0.4,1,1,1s1-0.4,1-1V6.7c1.3,1.4,2,3.3,2,5.3c0,0.3,0,0.6-0.1,0.9c-0.1,0.5,0.3,1,0.9,1.1c0,0,0.1,0,0.1,0c0.5,0,0.9-0.4,1-0.9c0-0.4,0.1-0.7,0.1-1.1c0-2.4-0.9-4.7-2.4-6.5H21z M20.3,16.5c-0.1-0.1-0.2-0.2-0.3-0.3c0,0,0,0,0,0c0,0,0,0,0,0c-0.1-0.1-0.2-0.1-0.3-0.1c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0h-4c-0.6,0-1,0.4-1,1s0.4,1,1,1h1.8c-1.4,1.3-3.3,2-5.3,2c-0.3,0-0.6,0-0.9-0.1c0,0,0,0,0,0c-0.5-0.1-1,0.3-1.1,0.9s0.3,1,0.9,1.1c0.4,0,0.7,0.1,1.1,0.1c2.4,0,4.7-0.9,6.5-2.4V21c0,0.6,0.4,1,1,1s1-0.4,1-1v-4C20.5,16.8,20.4,16.6,20.3,16.5C20.3,16.5,20.3,16.5,20.3,16.5z"
              fill="#035782"
            />
          </svg>
        }
        {
          title === "Undated Cheques" &&
          <svg
            width="120px"
            height="120px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.01562 6.98193C7.46334 6.98193 7.01562 7.43285 7.01562 7.98513C7.01562 8.53742 7.46334 8.98833 8.01563 8.98833H15.9659C16.5182 8.98833 16.9659 8.53742 16.9659 7.98513C16.9659 7.43285 16.5182 6.98193 15.9659 6.98193H8.01562Z"
              fill="#035782"
            />
            <path
              d="M7.01562 12C7.01562 11.4477 7.46334 10.9968 8.01562 10.9968H15.9659C16.5182 10.9968 16.9659 11.4477 16.9659 12C16.9659 12.5523 16.5182 13.0032 15.9659 13.0032H8.01563C7.46334 13.0032 7.01562 12.5523 7.01562 12Z"
              fill="#035782"
            />
            <path
              d="M8.0249 15.0122C7.47262 15.0122 7.0249 15.4631 7.0249 16.0154C7.0249 16.5677 7.47262 17.0186 8.0249 17.0186H15.9752C16.5275 17.0186 16.9752 16.5677 16.9752 16.0154C16.9752 15.4631 16.5275 15.0122 15.9752 15.0122H8.0249Z"
              fill="#035782"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3 6C3 4.34315 4.34315 3 6 3H18C19.6569 3 21 4.34315 21 6V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V6ZM6 5H18C18.5523 5 19 5.44772 19 6V18C19 18.5523 18.5523 19 18 19H6C5.44772 19 5 18.5523 5 18V6C5 5.44772 5.44772 5 6 5Z"
              fill="#035782"
            />
          </svg>

        }




      </div>


      {/* Title */}
      <h3 className="mt-4 text-xl font-semibold text-gray-800">{title}</h3>

      {/* Description */}
      <p
        className={`mt-2 text-sm text-gray-600 ${!isExpanded ? 'line-clamp-3' : ''
          }`}
      >
        {text}
      </p>

      {/* Read More / Read Less */}
      <a
        href="#"
        className="mt-4 text-sm font-medium text-primary-blue hover:underline"
        onClick={(e) => {
          e.preventDefault();
          toggleExpanded();
        }}
      >
        {isExpanded ? 'Read less' : 'Read more'}
      </a>
    </div>
  );
};

