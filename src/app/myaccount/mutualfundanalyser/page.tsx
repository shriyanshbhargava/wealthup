// 'use client'

// import { UserApi } from '@/api/services/user/UserApi'
// import FundWiseAnalysis from '@/components/MyAccount/Dashboard/mfpa/fund-wise-analysis'
// import HaveAQuestion from '@/components/MyAccount/Dashboard/mfpa/have-a-question'
// import MutualFundTable, { MfpaDataItem } from '@/components/MyAccount/Dashboard/mfpa/mfpa-static-table'
// import PerformanceGraph from '@/components/MyAccount/Dashboard/mfpa/performance-graph'
// import Storage from '@/utils/storage'
// import { useEffect, useState } from 'react'

// interface mfpaData {
//   performance: MfpaDataItem[];
//   performance_count: number | null;
//   total_funds: number
// }

// const MFPA = () => {
//   const [mfpaData, setMfpaData] = useState<mfpaData | null>(null);
//   const [outPerformingFunds, setOutPerformingFunds] = useState(null)
//   const [isLoading, setIsLoading] = useState<boolean>(true)

//   useEffect(() => {
//     const fetchMfpaData = async () => {
//       setIsLoading(true);
//       try {
//         const { access_token } = Storage.getToken()!;
//         const userApiClient = new UserApi(access_token);
//         const res = await userApiClient.getPortfolioAudit();
//         if (res.ok) {
//           const data = await res.json();
//           const filteredFunds = data.funds.filter((fund: any) => fund.fund_name && fund.fund_name !== "N/A" && fund.relative_performance === "Outperformer");
//           setOutPerformingFunds(filteredFunds.length)
//           setMfpaData(data);
//         }
//       } catch (error) {
//         console.log("server error to fetch mfpa table data");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchMfpaData();
//   }, []);

//   return (
//     <>
//       {isLoading ? 
//       <div className="bg-[#bdefe6] flex justify-center items-center h-[70vh] w-full z-[999]">
//         <div className="relative h-20 w-20 rounded-full">
//           <div className="absolute inset-0 rounded-full bg-transparent border-[4px] border-transparent"></div>
//           <div className="h-full w-full rounded-full border-[4px] border-transparent border-t-[#035782] animate-spin"></div>
//         </div>
//       </div> : <div className='p-4 md:p-8'>
//         <PerformanceGraph
//           performance_count={mfpaData?.performance_count ?? null}
//           mfpaData={mfpaData?.performance ?? []}
//           total_funds={mfpaData?.total_funds ?? 0}
//           isPending={isLoading}
//           outPerformingFunds={outPerformingFunds}
//         />
//         <MutualFundTable
//           mfpaData={mfpaData?.performance ?? []}
//           isPending={isLoading}
//         />
//         <FundWiseAnalysis />
//         {/* <HaveAQuestion /> */}
//       </div>}
//     </>
//   )
// }

// export default MFPA;
'use client'

import MutualFundTable, { MfpaDataItem } from '@/components/MyAccount/Dashboard/mfpa/mfpa-static-table'
import { useEffect, useState } from 'react'

import FundWiseAnalysis from '@/components/MyAccount/Dashboard/mfpa/fund-wise-analysis'
import HaveAQuestion from '@/components/MyAccount/Dashboard/mfpa/have-a-question'
import HeaderNav from '@/components/MyAccount/MutualFundsAnalyser/HeaderNav'
import PerformanceGraph from '@/components/MyAccount/Dashboard/mfpa/performance-graph'
import Storage from '@/utils/storage'
import { UserApi } from '@/api/services/user/UserApi'

interface mfpaData {
  performance: MfpaDataItem[];
  performance_count: number | null;
  total_funds: number
}

const MFPA = () => {
  const [mfpaData, setMfpaData] = useState<mfpaData | null>(null);
  const [outPerformingFunds, setOutPerformingFunds] = useState(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchMfpaData = async () => {
      setIsLoading(true);
      try {
        const { access_token } = Storage.getToken()!;
        const userApiClient = new UserApi(access_token);
        const res = await userApiClient.getPortfolioAudit();
        if (res.ok) {
          const data = await res.json();
          const filteredFunds = data.funds.filter((fund: any) => fund.fund_name && fund.fund_name !== "N/A" && fund.relative_performance === "Outperformer");
          setOutPerformingFunds(filteredFunds.length)
          setMfpaData(data);
        }
      } catch (error) {
        console.log("server error to fetch mfpa table data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMfpaData();
  }, []);

  return (
    <div className='relative'>
    <HeaderNav
          showBtn={true}
          showNotification={true} 
          whatsapp={false}
          title="Mututal Fund Analyser"
        />
      {isLoading ? 
      <div className="bg-[#bdefe6] flex justify-center items-center h-[70vh] w-full z-[999]">
        <div className="relative h-20 w-20 rounded-full">
          <div className="absolute inset-0 rounded-full bg-transparent border-[4px] border-transparent"></div>
          <div className="h-full w-full rounded-full border-[4px] border-transparent border-t-[#035782] animate-spin"></div>
        </div>
      </div> : <div className='p-4 md:p-8'>
        <PerformanceGraph
          performance_count={mfpaData?.performance_count ?? null}
          mfpaData={mfpaData?.performance ?? []}
          total_funds={mfpaData?.total_funds ?? 0}
          isPending={isLoading}
          outPerformingFunds={outPerformingFunds}
        />
        <MutualFundTable
          mfpaData={mfpaData?.performance ?? []}
          isPending={isLoading}
        />
        <FundWiseAnalysis />
        {/* <HaveAQuestion /> */}
      </div>}
      </div>
  )
}

export default MFPA;
