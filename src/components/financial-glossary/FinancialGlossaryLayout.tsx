"use client"
import React, { createContext, useEffect, useState } from 'react'

import { CmsApi } from '@/api/services/content/CmsApi';
import { FinancialGlossary } from './types';
import Footer from '@/components/ui/footer';
import Header from '@/components/ui/header';

const FinancialGlossaryLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<
    Array<FinancialGlossary>
  >([]);
  const [selected, setSelected] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const cmsApiClient = new CmsApi();

  const getData = async () => {
    const data = await cmsApiClient.getFinancialGlossary();

    setData(data);
    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    getData();
  }, [getData]);

  return (
    <FinancialGlossaryContext.Provider value={{ data, loading, selected, setSelected }}>
      <Header />
      <div className='min-h-screen container my-8 md:mt-24'>
        {children}
      </div>
      <Footer />
    </FinancialGlossaryContext.Provider>
  )
}

export default FinancialGlossaryLayout

export const FinancialGlossaryContext = createContext<{
  data: Array<FinancialGlossary>;
  selected: string;
  loading: boolean;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}>({ data: [], selected: "", loading: false, setSelected: () => null });
