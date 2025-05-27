import { DashboardLayout } from "@/components/DashboardLayout";
import { NextPageWithLayout } from "@/app/_app";
import { ReactElement } from "react";
import WealthoMeterPro from "@/components/MyAccount/Dashboard/WealthoMeterPro";

const Page: NextPageWithLayout = () => {
    return (
        <>
            <WealthoMeterPro />
        </>
    );
};

export default Page;

Page.getLayout = (page: ReactElement) => {
    return <DashboardLayout>{page}</DashboardLayout>;
};
