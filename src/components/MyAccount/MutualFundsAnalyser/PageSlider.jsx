'use client'

import Link from 'next/link'
import SliderCaroussel from '@/components/Slider';
import {usePathname} from 'next/navigation'

const ToggleButton = ({children, active,index, link}) =>{
  const pathname = usePathname();
  const demo = pathname.includes('demo')

  const url = (demo ? `/demo/` : '/myaccount/') + `portfolio-analyser/${link}` 

  return(
    <Link href={url}>
      <button 
        className={`w-full max-w-[180px] py-2 rounded-3xl ${active===index ? 'bg-[#035782] text-white border-white border-[1px]' : 'border-2 bg-white text-primary-blue border-primary-blue'}`}
        style={{boxShadow: `0px 4px 4px 0px rgba(3, 87, 130, 0.50)`}}
      >
          {children}
      </button>
    </Link>
  )
}

const PageSlider = () => {
  const links = ['summary', 'performance', 'diversification', 'risk-and-volatility', 'investments']
  const tabs = ['Summary','Performance','Diversification','Risk and Volatility','Investments']

  const pathname = usePathname().split('/');
  const activePage = links.indexOf(pathname[pathname.length - 1])

  return (
    <div className=' max-w-[90%] lg:w-[700px] xl:w-full w-5/6 m-auto py-8'>
      <SliderCaroussel maxslides={5} infinite={false} showarrows={true}>
        {tabs.map((item, index)=> (
          <div key={index} className='justify-center items-center max-w-[180px]'>
            <ToggleButton active={activePage === -1 ? 1 : activePage} index={index} link={links[index]} >{item}</ToggleButton>
          </div>
        ))}
      </SliderCaroussel>
    </div>
  )
}

export default PageSlider