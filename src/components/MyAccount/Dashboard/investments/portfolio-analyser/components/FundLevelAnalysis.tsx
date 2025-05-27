"use client"

import React, { useContext } from 'react'

import { ProfileContext } from '@/components/DashboardLayout';
import { usePathname } from 'next/navigation';

export const FundLevelAnalysis = ({ funds }: {
	funds: {
		fund_name: string;
		investment_risk: string;
		volatilty_relative_to_market: string;
		amount: number;
		alpha: string;
		relative_performance: string;
	}[]
}) => {
	const { user } = useContext(ProfileContext)!;
	const pathname = usePathname();

	const demo = pathname.includes('/demo');

	return (
		<div className='mt-4 pb-8'>
			<h2 className='text-3xl'>Fund Level Analysis</h2>
			<div className='overflow-x-auto relative'>
				<table className='w-full'>
					<thead>
						<tr>
							<th className='text-lg font-bold text-left p-1 border border-black'>Fund Name</th>
							<th className='text-lg font-bold text-left p-1 border border-black'>Amount</th>
							<th className='text-lg font-bold text-left p-1 border border-black'>1-Year Performance</th>
							<th className='text-lg font-bold text-left p-1 border border-black'>Alpha (Excess Return)</th>
							<th className='text-lg font-bold text-left p-1 border border-black'>Beta (Correlation To The Market)</th>
							{/* <th className='text-lg font-bold text-left p-1 border border-black'>Our Opinion</th> */}
						</tr>
					</thead>
					<tbody>
						{funds.map((fund, index: number) => (
							<tr key={index}>
								<td className='text-lg text-left font-medium p-1 border border-black'>{demo ? `Fund ${index >= 26 ? String.fromCharCode(65, 65 + (index - 26)) : String.fromCharCode(65 + index)}` : fund.fund_name}</td>
								<td className='text-lg text-left font-medium p-1 border border-black'>{Intl.NumberFormat('en-IN', {
									style: "currency",
									currency: "INR",
									maximumFractionDigits: 0,
								}).format(fund.amount)}</td>
								<td className={`text-lg text-left font-medium p-1 border border-black ${user?.tier === "gold" ? '' : 'blur-[5px]'}`}>{user?.tier === "gold" ? fund.relative_performance : 'Fund Performance'}</td>
								<td className={`text-lg text-left font-medium p-1 border border-black ${user?.tier === "gold" ? '' : 'blur-[5px]'}`}>{user?.tier === "gold" ? fund.alpha : 'Fund Risk'}</td>
								<td className={`text-lg text-left font-medium p-1 border border-black ${user?.tier === "gold" ? '' : 'blur-[5px]'}`}>{user?.tier === "gold" ? fund.volatilty_relative_to_market : 'Fund Volatility'}</td>
								{/* <td className={`text-lg text-left font-medium p-1 border border-black ${user?.tier === "gold" ? '' : 'blur-[5px]'}`}>Our Opinion</td> */}
							</tr>
						))}
					</tbody>
				</table>
				{user?.tier !== "gold" && (
					<div className='absolute top-1/2 -translate-y-1/2 right-[18%]'>
						<a href="https://topmate.io/wealthup_me">
							<button className='btn text-2xl'>
								Schedule a call
							</button>
						</a>
					</div>
				)}
			</div>
		</div >
	)
}
