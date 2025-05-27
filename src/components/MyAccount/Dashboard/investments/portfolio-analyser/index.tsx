"use client"
import React, { useEffect, useState } from 'react'

import Breadcrumbs from '@/components/Breadcrumbs';
import { ChartCard } from './components/ChartCard';
import Container from '@/components/ui/Container';
import { FundLevelAnalysis } from './components/FundLevelAnalysis';
import { Header } from './components/Header';
import Storage from '@/utils/storage';
import { UserApi } from '@/api/services/user/UserApi';
import { profileCrumbs } from '@/utils/Breadcrumbs';

const PortfolioAudit = () => {
	const [data, setData] = useState<any>(null);
	const [betaDiversification, setBetaDiversification] = useState<any>(null);
	const [performance, serPerformance] = useState<any>(null);
	const [alpha, setAlpha] = useState<any>(null);
	const [riskHighAndVeryHighPercentage, setRiskHighAndVeryHighPercentage] = useState(0);
	const [diversificationAcrossAssetClass, setDiversificationAcrossAssetClass] = useState<any>(null);
	const [fetchAgain, setFetchAgain] = useState(false);

	const getColor = (data: any) => {
		const colors = ["#006699", "#0080A2", "#0098AB", "#00B0B4", "#00C9A7", "#00A7C9"]
		return data.map((it: any, index: number) => {
			if (it.title === "Negative Alpha" || it.title === "Underperformer") {
				return "#FF0000"
			} else if (it.title === "Average" || it.title === "In line with risk") {
				return "#FF7300"
			} else if (it.title === "Positive Alpha" || it.title === "Outperformer") {
				return "#00C9A7"
			} else {
				return colors[index]
			}
		})
	}

	const fetchData = async () => {
		const { access_token } = Storage.getToken()!;
		const userApiClient = new UserApi(access_token);
		const res = await userApiClient.getPortfolioAudit();
		if (res.ok) {
			const data = await res.json()
			setData(data);
			const riskHighVeryHigh = data.risk.slice(4).reduce((prev: any, curr: any) => prev + curr.amount, 0);
			const totalRiskAmt = data.risk.reduce((prev: any, curr: any) => prev + curr.amount, 0)
			// console.log({ riskHighVeryHigh, totalRiskAmt })
			setRiskHighAndVeryHighPercentage((riskHighVeryHigh / totalRiskAmt) * 100)
			setBetaDiversification({
				labels: data.beta_diversification?.map((it: any) => it.title),
				datasets: [
					{
						data: data.beta_diversification?.map((it: any) =>
							it.percentage * 100
						),
						backgroundColor: ["#006699", "#0080A2", "#0098AB", "#00B0B4", "#00C9A7", "#00A7C9"],
						borderWidth: 0,
					},
				],
			})
			serPerformance({
				labels: data.performance?.map((it: any) => it.title),
				datasets: [
					{
						data: data.performance?.map((it: any) =>
							it.percentage * 100
						),
						backgroundColor: getColor(data.performance),
						borderWidth: 0,
					},
				],
			})
			setAlpha({
				labels: data.alpha?.map((it: any) => it.title),
				datasets: [
					{
						data: data.alpha?.map((it: any) =>
							it.percentage
						),
						backgroundColor: getColor(data.alpha),
						borderWidth: 0,
					},
				],
			})
			setDiversificationAcrossAssetClass({
				labels: Object.keys(data.divercification_accross_asset_class).map(key => key.slice(0, 1).toUpperCase() + key.slice(1)),
				datasets: [
					{
						data: Object.values(data.divercification_accross_asset_class).map((item: any) => item.percentage),
						backgroundColor: ["#006699", "#0080A2", "#0098AB", "#00B0B4", "#00C9A7", "#00A7C9"],
						borderWidth: 0,
					},
				],
			})
		}
		console.log("Something went wrong");
	}

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	useEffect(() => {
		if (fetchAgain === true) {
			fetchData();
		}
	}, [fetchAgain])

	// Todo: Add the amount for all the charts like diversification

	return (
		<>
			{data !== null && (
				<React.Fragment>
					<Header
						annual_loss={data.annual_loss}
						fund_size_message={data.fund_size_message}
						total_funds={data.total_funds}
						setFetchAgain={setFetchAgain}
					/>
					<div className="mt-4 px-4"><Breadcrumbs crumbs={profileCrumbs} /></div>
					<Container>
						<div className='flex justify-between gap-12 flex-wrap'>
							<ChartCard title="1-Year Performance" data={performance} additionalData={data.performance}>
								<p className='mb-0 font-medium text-lg'>
									{
										Math.round(data.performance.find((it: any) => it.title === "Underperformer").percentage * 100) === 0 ? <>
											All your funds are performing well.
										</> : (
											<>
												<span className='text-[#FF0000]'>{data.funds.filter((fund: any) => fund.relative_performance === "Underperformer").length} out of {data.total_funds} funds in your portfolio, comprising {Math.round(data.performance.find((it: any) => it.title === "Underperformer").percentage * 100)}% of your investments are under performing.</span> <a href="https://topmate.io/wealthup_me" className='text-blue-600 hover:underline'>Schedule a call</a> to fix this.
											</>
										)
									}
								</p>
							</ChartCard>
							<ChartCard title="Alpha (Excess return)" additionalData={data.alpha} data={alpha}>
								<p className='mb-0 text-lg font-medium'>
									{data.alpha.find((el: any) => el.title === "Negative Alpha").percentage > 0 ? (
										<>
											<span className='text-[#FF0000]'>
												{Math.round(data.alpha.find((el: any) => el.title === "Negative Alpha").percentage * 100)}% of your funds are delivering poor return compare to the risk that they have taken. </span> <a href="https://topmate.io/wealthup_me" className='text-blue-600 hover:underline'>Schedule a call</a> to fix this.
										</>
									) : data.alpha.find((el: any) => el.title === "Negative Alpha").percentage === 0 ? (
										<>
											{Math.round(data.alpha.find((el: any) => el.title === "In line with risk").percentage * 100)}% of your funds are only performing in line with risk.
										</>
									) : data.alpha.find((el: any) => el.title === "Positive Alpha").percentage === 1 ? (
										<>
											100% of your funds are giving you excess return relative to the risk they have taken. Great job.
										</>
									) : null}

								</p>
							</ChartCard>
							<ChartCard title="Diversification" data={diversificationAcrossAssetClass}
								additionalMessage={`${data.shares ? 'Equity includes direct equity investments' : ''}`}
								additionalData={data.divercification_accross_asset_class}
							>
								<p className='mb-0 text-lg font-medium'>
									{
										data.divercification_accross_asset_class.equity.percentage >= 50 ?
											(
												<>
													You have very high risk in your portfolio. When the market is not performing well you can see a lot of losses. <a href="https://topmate.io/wealthup_me" className='text-blue-600 hover:underline'>Schedule a call</a> to fix this.
												</>
											)
											: data.divercification_accross_asset_class.equity.percentage < 50 && data.divercification_accross_asset_class.equity.percentage >= 25 ? (
												<>
													You have moderate risk in your portfolio. You may be able to generate better returns. <a href="https://topmate.io/wealthup_me" className='text-blue-600 hover:underline'>Schedule a call</a> to fix this.
												</>
											) : (
												<>
													You have very low risk in your portfolio. You can generate much better returns. <a href="https://topmate.io/wealthup_me" className='text-blue-600 hover:underline'>Schedule a call</a> to fix this.
												</>
											)
									}
								</p>
							</ChartCard>
							<ChartCard title="Beta (Correlation to the market)" additionalData={data.beta_diversification} data={betaDiversification} additionalMessage={`${data.beta_less_than_zero ? 'Investments that move opposite to market act as a hedge to the rest of your portfolio. When the equity makret falls, these will generally perform well.' : ''}`}>
								<p className="mb-2 font-medium text-lg">
									{(data.beta_diversification.find((it: any) => it.title === "In line with market").percentage * 100) === 100 || (data.beta_diversification.find((it: any) => it.title === "More volatile than market").percentage * 100) === 100 && '100% of your portfolio has volatility in line with market'}
									{Math.round((data.beta_diversification.find((it: any) => it.title === "In line with market").percentage * 100 + data.beta_diversification.find((it: any) => it.title === "More volatile than market").percentage * 100))}% of your portfolio has volatility in line with or higher than market.</p>
							</ChartCard>
						</div>
						<FundLevelAnalysis funds={data.funds} />
					</Container>
				</React.Fragment>
			)}
		</>
	)
}

export default PortfolioAudit


