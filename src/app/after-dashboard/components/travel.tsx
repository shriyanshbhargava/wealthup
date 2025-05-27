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
import React from 'react'

export const Travel : React.FC<{
  setCurrentModal: React.Dispatch<React.SetStateAction<"options" | "custom" | "retirement" | "house" | "education"| "travel" | "loans" |null>>
  open: boolean
}> = ({ setCurrentModal, open }) => {
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
      event_name: "travel",
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
      <DialogTitle className="text-center text-2xl">Travel</DialogTitle>
    </DialogHeader>
    <div className="mt-2 flex flex-col">
        <form className="md:w-full w-[90%]" onSubmit={handleSubmit}>
          <div className="flex flex-col mb-4 mt-6 gap-2 w-full">
            <label htmlFor="amount" className="">Target Date</label>
            <div className="bg-white rounded-full w-full">
              <input type="month" name="date" defaultValue={date} min={date} className="bg-white rounded-full p-4 text-2xl text-brand-blue font-bold h-[67px] w-full" />
            </div>
          </div>
          <div className="flex flex-col mb-4 mt-6 gap-2">
            <label htmlFor="amount" className="">Cost as of today</label>
              <input type="text" name="amount" defaultValue="100000" className="bg-white rounded-full p-4 text-2xl text-brand-blue font-bold" onChange={(e) => {
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
