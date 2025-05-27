import { whatsappLink, whatsappLinkWealthometer } from '@/utils/constants'

import Button from '@/components/ui/ButtonNew'
import React from 'react'

const ProsAndCons = ({pros, cons, actionItems = [], flex=false, summary=false}) => {
  return (
    <section className={`grid grid-cols-1 ${flex ? 'md:grid-cols-2 gap-10' : 'gap-4'} md:h-full h-auto`}>
      <div className='dashboard-card'>
          <div>
            <div className='flex items-center gap-2'>
                <span className='w-3 h-3 bg-[#0FD28C] rounded-full inline-block'></span>
                <h5>What’s Working</h5>
            </div>
            <ul className='bullets listelement font-[sans-serif]'>
              {(pros && pros.length) ?  pros.map((item,index) => <li key={index} className='text-lg font-light'>{item}</li> ) : <li>Exciting stuff here. Coming Soon!</li>}
            </ul>
            <div className='flex items-center gap-2'>
              <span className='w-3 h-3 bg-[#D42929] rounded-full inline-block'></span>
              <h5> What’s Not Working</h5>
            </div>
            <ul className='bullets listelement font-[sans-serif]'>
              {(cons && cons.length) ?  cons.map((item,index) => <li key={index} className='text-lg font-light'>{item}</li> ) : <li>Exciting stuff here. Coming Soon!</li>}
            </ul>
          </div>
      </div>
      <div className='dashboard-card grow'>
          <div className='flex items-center gap-2'>
              {/* <span className='w-3 h-3 bg-[#D42929] rounded-full inline-block'></span> */}
              <h5>{summary ? "Overall Diagnosis" : "Action Items"}</h5>
          </div>
          <ul className='bullets listelement font-[sans-serif]'>
            {(actionItems && actionItems.length) 
              ?  actionItems.map((item,index) => <li key={index} >
                {item.split('{.break}').map((line, idx) => (
                  <p className='text-lg' key={idx}>
                    {line.includes('Contact your RM') ? 
                    (
                      <>
                        <a className='underline' href={whatsappLinkWealthometer}>
                        <Button size='small' padding={'px-4 sm:py-2 max-w-fit'} boxShadow={false} onClick={() => {}}>
                            {/* <span className='text-sm sm:text-base font-medium'>Contact your RM</span> */}
                            Contact your RM
                        </Button>
                        </a> {line.replace('Contact your RM', '')}
                      </>
                    ) : (
                      <>
                        {line}
                      </>
                    )}
                  </p>
                ))}
              </li> ) 
              : <>
                  <li>Our experts are working hard to make this section live soon!</li>
                </>
            }
          </ul>
      </div>
    </section>
  )
}

export default ProsAndCons