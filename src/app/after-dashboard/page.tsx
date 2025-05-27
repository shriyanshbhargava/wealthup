"use client"

import React, { useState, createContext } from 'react'
import { VideoScreen } from './video-screen'
import { Dashboard } from './dashboard'
import { ShowMeHow } from './show-me-how'
import { JourneyPage } from './journey'


// type JorneyItem = {
//   name: string;
//   type: string;
// }

// export const JourneyContext = createContext<{
//   items: Array<JorneyItem>,
//   setItems: React.Dispatch<React.SetStateAction<JorneyItem[]>>
// } | null>(null)

const AfterDashboardPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  // const [journeyItems, setJourneyItems] = useState<Array<JorneyItem>>([])
  const [currentPage, setCurrentPage] = useState<'video' | 'dashboard' | 'goal' | 'custom'>('video')

  return (
    <div className='w-full h-full flex justify-center items-center gap-4'>
      {/* <JourneyPage /> */}
      {/* <ShowMeHow
              setCurrentPage={setCurrentPage} 
            /> */}
        {/* <JourneyContext.Provider value={{ items: journeyItems, setItems: setJourneyItems }}> */}
          {currentPage === "video" ?
              <VideoScreen />
           : currentPage === "dashboard" ?
              <Dashboard />
           : currentPage === "custom" ? <JourneyPage /> : <ShowMeHow />
          }
        {/* </JourneyContext.Provider> */}
        
    </div>
  )
}

export default AfterDashboardPage
