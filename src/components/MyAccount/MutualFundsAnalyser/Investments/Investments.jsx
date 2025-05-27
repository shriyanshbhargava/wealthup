'use client'

import React, {useEffect, useState} from 'react'

import MutualFunds from './MutualFunds';
import Others from './Others'
import Stocks from './Stocks'
import Storage from '@/utils/storage';
import { UserApi } from '@/api/services/user/UserApi';

const Investments = () => {
  const [investments, setInvestments] = useState(null);
  const [stocks, setStocks] = useState([]);
  const [netWorth, setNetWorth] = useState(null);
  const [mutualFunds, setMutualFunds] = useState([]);
  const [others, setOthers] = useState([])

  const fetchData = async () => {
    const { access_token } = Storage.getToken();
    const userApiClient = new UserApi(access_token);
    const res = await userApiClient.getPortfolioAuditInvestments();
    if (res.status === 200) {
        const json = await res.json();
        setInvestments(json);
        // setStocks(json.data[0].results[0].investments)
        setNetWorth(json.netWorth)
        setMutualFunds(json.investments.filter((it) => it.fund_type === "mutualfund"))
        setStocks(json.investments.filter((it) => it.fund_type === "equity"))
        setOthers(json.investments.filter((it) => it.fund_type === "other"))

        // setOthers(json.data[3])
    } else if (res.status === 404) {
        // setCasNotUploded(true);
    } else {
        toast.error("Something went wrong.");
        // setLoading(false);
    }
  }

  const totalReturnMf = mutualFunds?.reduce((prev, curr) => prev + (curr.invested_amount === "N/A" ? 0 : (curr.amount - curr.invested_amount)), 0)
  const totalCurrentValueMf = mutualFunds?.reduce((prev, curr) => prev + curr.amount, 0)
  // const totalReturnPercentage = totalReturn / (totalCurrentValue - totalReturn)
  const totalReturnStocks = stocks?.reduce((prev, curr) => prev + curr.day_change, 0)
  const totalCurrentValueStocks = stocks?.reduce((prev, curr) => prev + curr.amount, 0)
  // const totalReturnPercentage = totalReturn / (totalCurrentValue - totalReturn)

  const totalReturn = totalReturnMf + totalReturnStocks
  const totalCurrentValue = totalCurrentValueMf + totalCurrentValueStocks
  const totalReturnPercentage = totalReturn / (totalCurrentValue - totalReturn)
  
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className='pt-6 flex flex-col gap-6 px-3'>
        <MutualFunds mutualFunds={mutualFunds} netWorth={netWorth} />
        <Stocks stocks={stocks} netWorth={netWorth} />
        <Others others={others} netWorth={netWorth} totalReturn={totalReturn} totalReturnPercentage={totalReturnPercentage}  />
        
    </section>
  )
}

export default Investments