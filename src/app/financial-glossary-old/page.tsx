import FinancialGlossary from "@/components/financial-glossary/FinancialGlossary";
import FinancialGlossaryLayout from "@/components/financial-glossary/FinancialGlossaryLayout";
import { NextPageWithLayout } from "@/app/_app";
import { ReactElement } from "react";

const Page: NextPageWithLayout = () => {
  return (
    <>
      <FinancialGlossary />
    </>
  );
};

export default Page;

Page.getLayout = (page: ReactElement) => {
  return <FinancialGlossaryLayout>{page}</FinancialGlossaryLayout>;
};

