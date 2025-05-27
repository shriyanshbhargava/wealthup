'use client';

import '@/styles/newstyles.css';

import Footer from '@/components/ui/footer';
import Header from '@/components/ui/header';
import HeaderController from '@/components/display/HeaderController';
import React from 'react';
import { RentReceiptGeneratorForm } from '@/components/rent-receipt-generator/RentReceiptGeneratorForm';

const RentReceiptGenerator: React.FC = () => {
  return (
    <>
      <Header />
      <div className="mt-12">
        <HeaderController
          title="Rent Receipt Generator"
          additionalKeywords="rent, receipt, generator"
        />
      </div>
      <RentReceiptGeneratorForm />
      <Footer />
    </>
  );
};

export default RentReceiptGenerator;
