import { FC, ReactNode, useState } from "react";
import { Chart as ChartJS, ArcElement, Legend, Tooltip } from 'chart.js';

import { Doughnut } from "react-chartjs-2";
import { BsInfoCircle } from "react-icons/bs";
import Modal from "@/components/ui/Modal";
ChartJS.register(ArcElement, Tooltip, Legend);

const DETAILS = [
	{ title: "Performance", description: "This shows the overall performance of your funds in a specific time period as compared to its peers." },
	{ title: "Diversification", description: "This shows if you have invested in different asset classes. This is important because it reduces the overall loss if any one asset performs poorly." },
	{ title: "Alpha", description: "This shows your funds' ability to outperform the market benchmark." },
	{ title: "Beta", description: "This shows your funds' sensitivity to market movements. It helps assess the funds' risk relative to the broader market." }
]


export const ChartCard: FC<{ data: any, title: string, children: ReactNode, additionalMessage?: string, additionalData?: any; }> = ({ data, title, children, additionalMessage, additionalData }) => {
	const [showInfoPopup, setShowInfoPopup] = useState(false);
	return (
		<>
			<div className='my-4 bg-white rounded-md p-4 w-full h-[370px] max-w-[40rem]'>
				<div className="flex justify-between">
					<h2 className='text-2xl md:text-3xl capitalize'>{title}</h2><BsInfoCircle
						className="cursor-pointer"
						onClick={() => setShowInfoPopup(true)}
					/>
				</div>
				<div className='w-full flex justify-center relative'>
					<div className='h-[150px] w-[150px] md:h-[200px] md:w-[200px]'>
						<Doughnut
							data={data}
							options={{
								plugins: {
									legend: { display: false },
									tooltip: {
										callbacks: {
											label: (context) => {
												if (title === "Alpha (Excess return)") {
													const currentItem: any = Object.values(additionalData).find((el: any) => el.title === context.label);
													return `${currentItem.fund_length > 1 ? `${currentItem.fund_length} Funds` : `${currentItem.fund_length} Fund`} - ${Math.round(context.parsed * 100)}%`
												}
												if (title.toLowerCase() === "diversification") {
													const currentItem = additionalData[context.label.toLowerCase()];
													return `${Math.round((currentItem.amount / 100000) * 10) / 10}L - ${Math.round(context.parsed * 10) / 10}%`
												}
												const currentItem: any = Object.values(additionalData).find((el: any) => el.title === context.label);
												if (currentItem) {
													return `${Math.round((currentItem.amount / 100000) * 10) / 10}L - ${Math.round(context.parsed * 10) / 10}%`
												}
												return `${Math.round(context.parsed * 10) / 10}%`;
											},
										},
									},
								},
							}}
						/>
					</div>
					{additionalMessage && additionalMessage.length && <div className='w-44 pl-4 absolute bottom-0 right-0 flex'>
						<span className='text-red-800 text-2xl mr-1'>*</span>
						<p className='text-xs'>{additionalMessage}</p>
					</div>}
				</div>
				<div className='mt-4'>
					{children}
				</div>
			</div>
			<Modal show={showInfoPopup} onClose={() => setShowInfoPopup(false)} title={title}>
				<p className="text-xl">
					{DETAILS.find(item => title.toLowerCase().includes(item.title.toLocaleLowerCase()))?.description ?? ''}
				</p>
			</Modal>
		</>
	)
}
