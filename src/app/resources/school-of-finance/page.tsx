'use client'

import '@/styles/newstyles.css'

import React, { useEffect, useState } from 'react';

import AddTerm from '@/components/landing-page/resources/school-of-finance/AddTerm';
import Filter from '@/components/landing-page/resources/school-of-finance/Filter'
import Glossary from '@/components/landing-page/resources/school-of-finance/Glossary'
import { GtmNoScript } from '@/components/GoogleTagManager'
import Header from '@/components/landing-page/resources/school-of-finance/Header'
import MenuBar from '@/components/landing-page/resources/school-of-finance/MenuBar';
import NavBar from '@/components/ui/header'
import ShareTerm from '@/components/landing-page/resources/school-of-finance/ShareTerm';
import Storage from "@/utils/storage";
import { UserApi } from '@/api/services/user/UserApi';
import { usePathname } from 'next/navigation'

interface CheckerState {
  static: boolean;
  carousels: boolean;
  video: boolean;
}

interface UserData {
  first_name: string;
  [key: string]: any;
}

const FinancialGlossary: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [checkers, setCheckers] = useState<CheckerState>({ static: true, carousels: true, video: true });
  const [openAddTermModal, setOpenAddTermModal] = useState<boolean>(false);
  const [openShareTermModal, setOpenShareTermModal] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [clicked, setClicked] = useState<boolean>(false);

  const pathname = usePathname();

  const handleOpenAddTermModal = () => setOpenAddTermModal(true);
  const handleCloseAddTermModal = () => setOpenAddTermModal(false);
  const handleOpenShareTermModal = () => setOpenShareTermModal(true);
  const handleCloseShareTermModal = () => setOpenShareTermModal(false);

  useEffect(() => {
    (async () => {
      const tokens = Storage.getToken();
      if (tokens !== null) {
        const userApiClient = new UserApi(tokens.access_token);
        setIsLoggedIn(true);

        const res = await userApiClient.getMe();

        if (res.status === 200) {
          const data: UserData = await res.json();
          setName(data?.first_name || '');
        } else {
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
      }
    })();
  }, [isLoggedIn]);

  return (
    <div className="w-full text-white text-center gradientbg4 min-h-screen relative pb-20">
      <GtmNoScript gtmId="GTM-5MF3NPV" />
      <div onClick={() => setClicked(true)}>
        <NavBar />
        <Header />
        {/* <IconCarousel /> */}
        <Filter checkSate={checkers} setCheckState={setCheckers} setSearchTerm={setSearchTerm} />
        <Glossary checkers={checkers} searchTerm={searchTerm} />
      </div>
      <MenuBar
        handleOpenModal={handleOpenAddTermModal}
        handleOpenShareTermModal={handleOpenShareTermModal}
        clicked={clicked}
        setClicked={setClicked}
      />
      <AddTerm
        openModal={openAddTermModal}
        onClose={handleCloseAddTermModal}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        name={name}
        setName={setName}
      />
      <ShareTerm
        openModal={openShareTermModal}
        onClose={handleCloseShareTermModal}
        pathname={pathname || ""}
      />
    </div>
  );
};

export default FinancialGlossary;
