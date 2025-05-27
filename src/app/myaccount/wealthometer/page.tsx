import React, { ReactElement } from 'react'

import { DashboardLayout } from '@/components/DashboardLayout';
import WealthoMeterPage from '@/components/Wealthometer/new'

const WealthoMeter = () => <WealthoMeterPage />

export default WealthoMeter

WealthoMeter.getLayout = (page: ReactElement) => {
    return <DashboardLayout>{page}</DashboardLayout>;
};
