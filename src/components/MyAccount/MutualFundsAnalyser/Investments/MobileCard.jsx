import { Accordion } from '@/components/ui/Accordion';
import AccordionContent from './AccordionContent';
import TitleCard from './TitleCard';

const MobileCard = ({name, currentVal, percentage, nav, units, totalReturn,percentReturn,  percentageChange}) => {
    return(
        <div className='rounded-xl p-1 bg-white relative text-lg  my-5 card-shadow md:hidden'>
            <Accordion 
                title="" 
                subtitle={<TitleCard name={name} currentVal={currentVal} percentageChange={percentageChange} nav={nav} />} 
                content={<AccordionContent units={units} percentage={percentage} totalReturn={totalReturn} percentReturn={percentReturn} />} 
                padding={false}
            />
        </div>
    )
}

export default MobileCard;