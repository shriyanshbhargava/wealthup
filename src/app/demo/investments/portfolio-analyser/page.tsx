import React, { FC, ReactElement, ReactNode } from 'react'

import { DashboardLayout } from '@/components/DashboardLayout';
import PortfolioAudit from '@/components/MyAccount/Dashboard/investments/portfolio-analyser';

const PortfolioAuditPage = () => {
	return (
		<PortfolioAudit />
	)
}

export default PortfolioAuditPage


PortfolioAuditPage.getLayout = (page: ReactElement) => {
	return <DashboardLayout>{page}</DashboardLayout>;
};
