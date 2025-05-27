import PageSlider from '@/components/MyAccount/MutualFundsAnalyser/PageSlider'

const PortfolioAnalyser = ({children}) => {
	return (
		<div className='w-full xl:w-11/12 m-auto max-w-[100vw] md:max-w-full relative px-1 md:px-4 min-h-screen'>
			<PageSlider />
			{children}
		</div>
	)
}

export default PortfolioAnalyser