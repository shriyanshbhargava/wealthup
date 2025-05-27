import Storage from "@/utils/storage"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { UserApi } from "@/api/services/user/UserApi"
import React, { useState } from 'react'

export const RetirementGoal: React.FC<{
  setCurrentModal: React.Dispatch<React.SetStateAction<"options" | "custom" | "retirement" | "house" | "education" | "travel" | "loans" | null>>
  open: boolean
}> = ({ setCurrentModal, open }) => {
  const [showTitleInput, setShowTitleInput] = useState(false)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setShowTitleInput(false)
    }
  }
  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    const tokens = Storage.getToken()

    const userApi = new UserApi(tokens!.access_token)

    const form = e.target as HTMLFormElement
    const formData = new FormData(form)

    const date = formData.get('date')
    const totalValue = formData.get('amount')

    if (!date || !totalValue) {
      return;
    }

    const value = totalValue.toString().replace(/[₹\,]/g, '');

    const res = await userApi.createGoal({
      event_name: "retirement",
      event_date: date.toString(),
      initial_cost: parseInt(value ?? "0")
    })

    const json = await res.json()
    // alert(JSON.stringify(json))
    window.location.reload()
  }
  
  let todayDate=new Date();
  let month=todayDate.getMonth()+1;
  let date;
  if(month<10){
    date=todayDate.getFullYear()+"-0"+month;
  }
  else{
    date=todayDate.getFullYear()+"-"+month;
  }

  return (
    
    <Dialog open={open} onOpenChange={() => setCurrentModal("options")}>
  <DialogContent className="p-6">
   <DialogHeader>
      <DialogTitle className="text-center text-2xl">
        <div className="md:w-full w-[90%]">
          {showTitleInput ? (
            <div className="z-50 flex justify-center relative">
              <input autoFocus type="text" className="bg-white rounded-full p-4 text-2xl text-brand-blue font-bold  w-[80%]" defaultValue="Early Retirement" onKeyDown={handleKeyDown} />
              <div className="absolute top-[30%] right-[13%]">
                <button onClick={() => setShowTitleInput(false)}>
                  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.4137 6.22267L18 0.808916C17.815 0.622391 17.5947 0.474508 17.352 0.373865C17.1093 0.273222 16.849 0.221827 16.5863 0.222666H2C1.46957 0.222666 0.960859 0.43338 0.585786 0.808453C0.210714 1.18353 0 1.69223 0 2.22267V22.2227C0 22.7531 0.210714 23.2618 0.585786 23.6369C0.960859 24.012 1.46957 24.2227 2 24.2227H22C22.5304 24.2227 23.0391 24.012 23.4142 23.6369C23.7893 23.2618 24 22.7531 24 22.2227V7.63642C24.0008 7.37368 23.9494 7.11339 23.8488 6.87069C23.7482 6.62799 23.6003 6.40771 23.4137 6.22267ZM17 22.2227H7V15.2227H17V22.2227ZM22 22.2227H19V15.2227C19 14.6922 18.7893 14.1835 18.4142 13.8085C18.0391 13.4334 17.5304 13.2227 17 13.2227H7C6.46957 13.2227 5.96086 13.4334 5.58579 13.8085C5.21071 14.1835 5 14.6922 5 15.2227V22.2227H2V2.22267H16.5863L22 7.63642V22.2227ZM16 5.22267C16 5.48788 15.8946 5.74224 15.7071 5.92977C15.5196 6.11731 15.2652 6.22267 15 6.22267H8C7.73478 6.22267 7.48043 6.11731 7.29289 5.92977C7.10536 5.74224 7 5.48788 7 5.22267C7 4.95745 7.10536 4.7031 7.29289 4.51556C7.48043 4.32802 7.73478 4.22267 8 4.22267H15C15.2652 4.22267 15.5196 4.32802 15.7071 4.51556C15.8946 4.7031 16 4.95745 16 5.22267Z" fill="#035782"/>
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-center gap-4">
              Retirement
              {/* <button onClick={() => setShowTitleInput(true)}>
                <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.7594 6.49747L14.268 3.00684C14.1519 2.89074 14.0141 2.79864 13.8624 2.7358C13.7107 2.67297 13.5482 2.64063 13.384 2.64062C13.2198 2.64063 13.0572 2.67297 12.9056 2.7358C12.7539 2.79864 12.6161 2.89074 12.5 3.00684L2.86641 12.6404C2.74983 12.7561 2.65741 12.8938 2.59451 13.0455C2.5316 13.1971 2.49948 13.3598 2.50001 13.524V17.0154C2.50001 17.347 2.6317 17.6649 2.86612 17.8993C3.10054 18.1337 3.41849 18.2654 3.75001 18.2654H16.875C17.0408 18.2654 17.1997 18.1996 17.3169 18.0824C17.4342 17.9652 17.5 17.8062 17.5 17.6404C17.5 17.4747 17.4342 17.3157 17.3169 17.1985C17.1997 17.0813 17.0408 17.0154 16.875 17.0154H9.00938L17.7594 8.26544C17.8755 8.14936 17.9676 8.01155 18.0304 7.85987C18.0933 7.7082 18.1256 7.54563 18.1256 7.38145C18.1256 7.21728 18.0933 7.05471 18.0304 6.90303C17.9676 6.75136 17.8755 6.61354 17.7594 6.49747ZM7.24141 17.0154H3.75001V13.524L10.625 6.64903L14.1164 10.1404L7.24141 17.0154ZM15 9.25684L11.5094 5.76544L13.3844 3.89044L16.875 7.38184L15 9.25684Z" fill="white"/>
                </svg>
              </button> */}
            </div>
          )}
        </div>
      </DialogTitle>
    </DialogHeader>
    {showTitleInput && (
      <div className="absolute top-0 left-0 right-0 h-full bg-black/50"></div>
    )} 
    <div className="mt-2 flex flex-col">
        <form className="md:w-full w-[90%]" onSubmit={handleSubmit}>
          <div className="flex flex-col mb-4 mt-6 gap-2">
            <label htmlFor="date" className="">When do you want to retire?</label>
            <div className="bg-white rounded-full w-full">
              <input type="month" name="date" defaultValue={date} min={date} className="bg-white rounded-full p-4 text-2xl text-brand-blue font-bold h-[67px] w-full" />
            </div>
          </div>
          <div className="flex flex-col mb-4 mt-6 gap-2">
            <label htmlFor="amount" className="">Current monthly expenses</label>
            <input type="text" name="amount" defaultValue="50000" className="bg-white rounded-full p-4 text-2xl text-brand-blue font-bold" onChange={(e) => {
              const value = e.target.value.replace(/[₹\,]/g, '');
              const numericValue = parseInt(value);
              const formattedValue = isNaN(numericValue) ? '0' : `${numericValue}`;
              e.target.value = formattedValue;
            }}/>
          </div>
          <div className="mt-12 w-full">
            <button
              className='w-full s:w-[275px] h-[56px] rounded-md bg-[#FB7306] shadow-[0px_3px_4px_0px_#074553] text-white text-xl'>
              Add goal
          </button>
          </div>
        </form>
    </div>
  </DialogContent>
</Dialog>
  )
}
