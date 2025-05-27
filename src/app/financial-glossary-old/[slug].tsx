import { GetStaticPaths, GetStaticProps } from "next";
import React, { ReactElement } from "react";

import { CmsApi } from "@/api/services/content/CmsApi";
import FinancialGlossaryLayout from "@/components/financial-glossary/FinancialGlossaryLayout";
import FinancialGlossaryTerm from "@/components/financial-glossary/FinancialGlossaryTerm";
import { NextPageWithLayout } from "@/app/_app";

type Props = {
  data: any;
}

const Page: NextPageWithLayout<Props> = ({ data }) => {
  return (
    <>
      <FinancialGlossaryTerm financialGlossary={data} />
    </>
  );
};

export default Page;

Page.getLayout = (page: ReactElement) => {
  return <FinancialGlossaryLayout>{page}</FinancialGlossaryLayout>;
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;

  const cmsApiClient = new CmsApi();
  const data = await cmsApiClient.getFinancialGlossary(slug);

  return {
    props: {
      data: data[0],
      revalidate: 60,
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const cmsApiClient = new CmsApi();

  const allPosts = await cmsApiClient.getFinancialGlossary();

  return {
    paths: allPosts.map(({ slug }: { slug: string; }) => ({
      params: { slug: slug }
    })),
    fallback: "blocking"
  }
}
