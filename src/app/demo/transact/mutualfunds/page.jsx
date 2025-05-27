"use client"

import { useEffect, useState } from "react"

import { FaCheckCircle } from "react-icons/fa";
import Footer from "@/components/ui/footer/index"
import HeaderNav from "@/components/MyAccount/MutualFundsAnalyser/HeaderNav"
import Image from "next/image"
import { RiDeleteBin6Line } from "react-icons/ri";
import Select from "react-select";
import SideBar from "@/components/ui/Sidebar"
import StepLoader from "@/components/ui/stepLoader"
import Storage from '@/utils/storage';
import { UserApi } from "@/api/services/user/UserApi"
import dynamic from 'next/dynamic';
import { toast } from "react-toastify"
import { usePathname } from "next/navigation"
import SideBarMobile from '@/components/SideBarMobile/SideBarMobile';

const NavItemPopOver = dynamic(() => import('@/components/Navbar').then((mod) => mod.NavItemPopOver), { ssr: false });




const InvestComponent = ({options, redemption,setRedemption, withdrawAmount,setWithdrawAmount, activeSection, setShowButtons, setActiveRightPart ,setAmount,amount,timePeriod,setTimePeriod,investmentType,setInvestmentType,activeRightPart,setSelectedFund,selectedFund,



date,
setDate,
  installments,
   setInstallments,
     
}) => {

const numberToWords = (num) => {
  if (num === 0) return "Zero";

  const ones = [
    "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
    "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
    "Seventeen", "Eighteen", "Nineteen"
  ];

  const tens = [
    "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"
  ];

  const thousands = [
    "", "Thousand", "Lakh", "Crore"
  ];

  const numberToStr = (n) => {
    if (n === 0) return "";
    if (n < 20) return ones[n];
    if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? " " + ones[n % 10] : "");
    if (n < 1000) return ones[Math.floor(n / 100)] + " Hundred" + (n % 100 ? " " + numberToStr(n % 100) : "");
    return "";
  };

  const splitIntoIndianGroups = (n) => {
    const groups = [];
    // Get the last 3 digits
    groups.unshift(n % 1000);
    n = Math.floor(n / 1000);

    // Get the next groups of 2 digits each
    while (n > 0) {
      groups.unshift(n % 100);
      n = Math.floor(n / 100);
    }
    return groups;
  };

  const convertToWords = (groups) => {
    let result = "";
    for (let i = 0; i < groups.length; i++) {
      if (groups[i] !== 0) {
        result += numberToStr(groups[i]) + " " + thousands[groups.length - 1 - i] + " ";
      }
    }
    return result.trim();
  };

  const indianGroups = splitIntoIndianGroups(num);
  return convertToWords(indianGroups);
};

  const splitIntoIndianGroups = (n) => {
    const groups = [];
    // Get last 3 digits
    groups.unshift(n % 1000);
    n = Math.floor(n / 1000);

    // Get subsequent groups of 2 digits
    while (n > 0) {
      groups.unshift(n % 100);
      n = Math.floor(n / 100);
    }
    return groups;
  };

  const convertToWords = (groups) => {
    let result = "";
    for (let i = 0; i < groups.length; i++) {
      if (groups[i] !== 0) {
        result += numberToStr(groups[i]) + " " + thousands[groups.length - 1 - i] + " ";
      }
    }
    return result.trim();
  };


  const getFormattedAmount = (amount) => {
  const words = numberToWords(amount).split(" ");
  if (words.length > 4) {
    return words.join(" "); // Join the words without commas
  }
  return words.join(" "); // Ensure the result is a single string
};
  const isValidAmount = (amount) => {
    return amount && !isNaN(amount) && amount > 0;
  };
  const isValidWithdrawAmount = (amount) => {
    return amount && !isNaN(amount) && amount > 0;
  };

  const isValidTimePeriod = (timePeriod) => {
    return timePeriod !== "";
  };
  const isValidDate = (timePeriod) => {
    return date !== "";
  };
  const isValidinstallments = (timePeriod) => {
    return installments !== "";
  };
  const isValidateMonthly = (timePeriod) => {
    if (timePeriod === "monthly") {
      if (!isValidDate|| !isValidinstallments) {
        return false;
        
      }else{
        return true;
      }
      
    }
    return
  }
console.log("timePeriod",timePeriod)
  const isValidInvestmentType = (investmentType) => {
    return investmentType !== "";
  };

  const isValidRedemptionAndFund = (redemption, selectedFund) => {
    return redemption !== "" && selectedFund !== "";
  };

  return (
    <div className="right text-[20px] lg:mb-[0px] mb-10  h-auto  space-y-6">
      {activeSection === "invest" && (
        <div className="invest">
          <p className="text-[20px]  lg:mt-0 mt-10 font-semibold text-[#035782]">I want to invest</p>
          <input
          disabled={activeRightPart.length > 1}
            className="border-b-2 text-[17px] border-black w-full lg:w-[400px] placeholder-black py-2 bg-[#E7F9F2] px-1 text-black focus:outline-none focus:border-[#035782]"
            type="text"
                maxLength={13}
            placeholder="Enter Amount"
             value={`₹ ${Number(amount).toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0,
            }).slice(1)}`} 
            onChange={(e) => {
                const numericValue = e.target.value.replace(/[^0-9]/g, "");
                setAmount(Number(numericValue));
            }}
          />
          <div className="lg:w-[390px] sm:w-[250px] relative">
          <p className="py-2  ">
        {amount ? `${getFormattedAmount(Number(amount))} Rupees` : "Enter Amount in numbers"}
      </p>
      </div>

          <div className="time-period relative">
            <p className="text-[20px] font-semibold text-[#035782]">For</p>
            <div className="relative w-full lg:w-[400px]">
              <select
              disabled={activeRightPart.length > 1}
                className="border-b-2 text-[17px] border-black w-full py-2 px-1 bg-[#E7F9F2] text-black focus:outline-none focus:border-[#035782] appearance-none pr-10"
                aria-label="Time Period"
                            onChange={(e) => setTimePeriod(e.target.value)}

              >
                <option  value="" disabled selected>
                  Select Time Period
                </option>
                <option value="1 year">Less than 1 year</option>
                <option value="3 years">1-3 years</option>
                <option value="5 years">More than 3 years</option>
              </select>
              <Image
                className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
                src="/Down-arrow.png"
                alt="Dropdown arrow"
              />
            </div>
          </div>

          <div className="radio my-8 space-y-2">
            <p className="text-[20px] font-semibold text-[#035782]">How do you want to invest?</p>
            <div className="flex gap-12 font-[18px]">
              <label className="flex items-center space-x-3">
                <input type="radio" disabled={activeRightPart.length > 1}  name="investment-type" checked={investmentType === "sip"} value="sip" className="cursor-pointer"               onChange={(e) => setInvestmentType(e.target.value)}
 />
                <span className="text-[#4A5151]">SIP</span>
              </label>
              <label className="flex items-center space-x-2">
                <input checked={investmentType === "lump-sum"}  type="radio" name="investment-type" value="lump-sum" className="cursor-pointer"               onChange={(e) => setInvestmentType(e.target.value)}
/>
                <span className="text-[#4A5151]">Lump sum</span>
              </label>
            </div>
          </div>

           <button
           disabled={activeRightPart.length> 1}
            onClick={() => {
              if (amount && timePeriod && investmentType) {

                setShowButtons(false);
                setActiveRightPart("invest");
              }
              else{
                toast.error("Please enter amount and time period");
              }
            }}
            className={`w-full lg:w-[400px] mt-6 h-[50px] text-white border ${ activeRightPart.length > 1 || !isValidAmount(amount) || !isValidTimePeriod(timePeriod) || !isValidInvestmentType(investmentType)? "bg-[#c7c7c7]":"bg-[#FB7706] border-[#FB7706] focus:outline-none focus:ring-2 focus:ring-[#FB7706]"}  text-[18px] font-semibold rounded-[4px]  `}
          >
            Continue
          </button>
        </div>
      )}

      {activeSection === "withdraw" && (
        <div className="withdraw">
          <p className="text-[20px] font-semibold lg:mt-0 mt-10 text-[#035782]">I want to withdraw</p>
          <input
          disabled={activeRightPart.length > 1}
            className="border-b-2 text-[17px] border-black w-full lg:w-[400px] placeholder-black py-2 bg-[#E7F9F2] px-1 text-black focus:outline-none focus:border-[#035782]"
            type="text"
                maxLength={13}
            placeholder="Enter Amount"
             value={`₹ ${Number(withdrawAmount).toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0,
            }).slice(1)}`} 
            onChange={(e) => {
                const numericValue = e.target.value.replace(/[^0-9]/g, "");
                setWithdrawAmount(Number(numericValue));
            }}
          />
           <div className="w-[390px] relative">
          <p className="py-2  ">
        {withdrawAmount ? `${getFormattedAmount(Number(withdrawAmount))} Rupees` : "Enter Amount in numbers"}
      </p>
      </div>


          <div className="time-period relative">
            <div className="relative w-full lg:w-[400px]">
               <select
                  disabled={activeRightPart.length> 1}
               value={timePeriod}
                className="border-b-2 text-[17px] border-black w-full py-2 px-1 bg-[#E7F9F2] text-black focus:outline-none focus:border-[#035782] appearance-none pr-10"
                aria-label="Time Period"
                            onChange={(e) => setTimePeriod(e.target.value)}

              >
                <option value="" disabled selected>
                  Select type of redemption
                </option>
                <option value="immediately">Immediately</option>
                <option value="monthly">Monthly</option>
              </select>
              <Image
                className="absolute  right-1 top-1/2 transform -translate-y-1/2 pointer-events-none"
                src="/Down-arrow.png"
                alt="Dropdown arrow"
              />
            </div>
           {
              timePeriod == "monthly" &&
              <>

            <div className="relative  my-10 w-full pr-10 lg:w-[400px]">
              <h5 className="text-[20px] font-semibold text-[#035782]">

              Start Date
</h5>
            <input
             disabled={activeRightPart.length> 1}
            className="border-b-2 text-[17px] border-black w-full lg:w-[400px] placeholder-black py-2 bg-[#E7F9F2] px-1 text-black focus:outline-none focus:border-[#035782]"
            type="date"

        
            placeholder="Start Date"
             value={date} 
            onChange={(e) => {
                setDate(e.target.value)
            }}
          />
              {/* <Image
                className="absolute  right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
                src="/Down-arrow.png"
                alt="Dropdown arrow"
              /> */}

              
            </div>

            <div className="relative w-full lg:w-[400px]">
              <input
             disabled={activeRightPart.length> 1}
            className="border-b-2 text-[17px] border-black w-full lg:w-[400px] placeholder-black py-2 bg-[#E7F9F2] px-1 text-black focus:outline-none focus:border-[#035782]"
            type="number"

        
            placeholder="Number of Instalments"
             value={installments} 
            onChange={(e) => {
                setInstallments(e.target.value)
            }}
          />

              
            </div>
              </>

            }

          </div>
          <button
  // disabled={
  //   activeRightPart.length > 1 || 
  //   !isValidAmount(withdrawAmount) || 
  //   !isValidTimePeriod(timePeriod) || 
  //   (timePeriod === "monthly" && (!date || !installments))
  // }
  onClick={() => {
    if (!withdrawAmount || !timePeriod) {
      return toast.error("Please enter amount and time period");
    }

    if (timePeriod === "monthly" && (!date || !installments)) {
      return toast.error("Please Start Date and number of installments");
    }

    setShowButtons(false);
    setActiveRightPart("withdraw");
  }}
  className={`w-full lg:w-[400px] mt-10 h-[50px] text-white border ${
    activeRightPart.length > 1 || 
    !isValidAmount(withdrawAmount) || 
    !isValidTimePeriod(timePeriod) || 
    (timePeriod === "monthly" && (!date || !installments))
      ? "bg-[#c7c7c7]"
      : "bg-[#FB7706] border-[#FB7706] focus:outline-none focus:ring-2 focus:ring-[#FB7706]"
  } text-[18px] font-semibold rounded-[4px]`}
>
  Continue
</button>


            {/* <button
           disabled={activeRightPart.length> 1}
        onClick={() => {
  if (!withdrawAmount || !timePeriod) {
    return toast.error("Please enter amount and time period");
  }

  if (timePeriod === "monthly" && (!date || !installments)) {
    return toast.error("Please Start Date and number of installments");
  }

  setShowButtons(false);
  setActiveRightPart("withdraw");
}}

            className={`w-full lg:w-[400px] mt-10 h-[50px] text-white border ${ activeRightPart.length> 1 || !isValidAmount(withdrawAmount) || !isValidTimePeriod(timePeriod) ||!isValidateMonthly ? "bg-[#c7c7c7]":"bg-[#FB7706] border-[#FB7706] focus:outline-none focus:ring-2 focus:ring-[#FB7706]"}  text-[18px] font-semibold rounded-[4px]  `}
          >
            Continue
          </button> */}
        </div>
      )}

      {activeSection === "switch" && (
        <div className="switch">
          <div className="time-period relative">
            <p className="text-[20px] font-semibold lg:mt-0 mt-10 text-[#035782]">I want to switch out of</p>
            <div className="relative w-full lg:w-[400px] ">
              <select  disabled={activeRightPart.length> 1} value={redemption}
              onChange={(e)=>{
                setRedemption(e.target.value)
              }}
             
                className="text-black border-b-2 text-[17px] border-black w-full py-2 bg-[#E7F9F2]  focus:outline-none focus:border-[#035782] appearance-none pr-10"
                aria-label="Time Period"
              >
                <option value="" disabled selected>
                  Select fund to switch out from
                </option>
                <option value="1 year">abc fund</option>
                <option value="3 years">def fund</option>
                <option value="5 years">new fund</option>
                <option value="5 years">latest fund</option>
                <option value="5 years">effigo fund</option>
              </select>
              <Image
                className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
                src="/Down-arrow.png"
                alt="Dropdown arrow"
              />
            </div>
          </div>

          <div className="time-period relative">
            <p className="text-[20px] font-semibold text-[#035782] mt-8">I want to switch in to</p>
            <div className="relative w-full lg:w-[400px] ">
              <select
               disabled={activeRightPart.length> 1}
              value={selectedFund}
              onChange={(e)=>{
                setSelectedFund(e.target.value)
              }}
                className="border-b-2 border-black text-[17px] w-full py-2 bg-[#E7F9F2] text-black focus:outline-none focus:border-[#035782] appearance-none pr-10"
                aria-label="Time Period"
              >
                <option value="" disabled selected>
                  Search fund to switch in to
                </option>
                {
                  options.map((option, index) => (
                    <option key={index} value={option.value}>{option.label}</option>
                  ))
                }
               {/* <option value="abc">abc fund</option>
                <option value="def">def fund</option>
                <option value="new">new fund</option>
                <option value="latest">latest fund</option>
                <option value="efiigo">effigo fund</option>
                <option value="select">select fund</option> */}
              </select>
              <Image
                className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
                src="/Down-arrow.png"
                alt="Dropdown arrow"
              />
            </div>
          </div>

          <div className="time-period relative">
            <div className="relative w-full lg:w-[400px] mt-12">
              <select  disabled={activeRightPart.length> 1} value={redemption}
              onChange={(e)=>{
                setRedemption(e.target.value)
              }}
                className="border-b-2 border-black text-[17px] w-full py-2 bg-[#E7F9F2] text-black focus:outline-none focus:border-[#035782] appearance-none pr-10"
                aria-label="Time Period"
              >
                <option value="" disabled selected>
                  Select type of redemption
                </option>
                <option value="immediately">Immediately</option>
                <option value="monthly">Monthly</option>
              </select>
              <Image
                className="absolute right-3 top-1/2  transform -translate-y-1/2 pointer-events-none"
                src="/Down-arrow.png"
                alt="Dropdown arrow"
              />
            </div>
          </div>
  {
              redemption == "monthly" &&
              <>

            <div className="relative  my-10 w-full pr-10 lg:w-[400px]">
<h5 className="text-[20px] font-semibold text-[#035782]">

              Start Date
</h5>
            <input
             disabled={activeRightPart.length> 1}
            className="border-b-2 text-[17px] border-black w-full lg:w-[400px] placeholder-black py-2 bg-[#E7F9F2] px-1 text-black focus:outline-none focus:border-[#035782]"
            type="date"

        
            placeholder="Start Date"
             value={date} 
            onChange={(e) => {
                setDate(e.target.value)
            }}
          />
              {/* <Image
                className="absolute  right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
                src="/Down-arrow.png"
                alt="Dropdown arrow"
              /> */}

              
            </div>

            <div className="relative w-full lg:w-[400px]">
              <input
             disabled={activeRightPart.length> 1}
            className="border-b-2 text-[17px] border-black w-full lg:w-[400px] placeholder-black py-2 bg-[#E7F9F2] px-1 text-black focus:outline-none focus:border-[#035782]"
            type="number"

        
            placeholder="Number of Instalments"
             value={installments} 
            onChange={(e) => {
                setInstallments(e.target.value)
            }}
          />

              
            </div>
              </>

            }
      
            {/* <button
           disabled={activeRightPart.length> 1}
           
            onClick={() => {
  if (redemption && selectedFund) {
    if (redemption === "monthly" && (!date || !installments)) {
      toast.error("Please Start Date and number of installments");
    } else {
      setShowButtons(false);
      setActiveRightPart("switch");
    }
  } else {
    toast.error("Please enter amount and time period");
  }
}}

            className={`w-full lg:w-[400px] mt-6 h-[50px] text-white border ${ activeRightPart.length> 1 || !redemption || !selectedFund ? "bg-[#c7c7c7]":"bg-[#FB7706] border-[#FB7706] focus:outline-none focus:ring-2 focus:ring-[#FB7706]"}  text-[18px] font-semibold rounded-[4px]  `}
          >
            Continue
          </button> */}
          <button
  // disabled={
  //   activeRightPart.length > 1 || 
  //   !redemption || 
  //   !selectedFund || 
  //   (redemption === "monthly" && (!date || !installments))
  // }
  onClick={() => {
    if (redemption && selectedFund) {
      if (redemption === "monthly" && (!date || !installments)) {
        toast.error("Please Start Date and number of installments");
      } else {
        setShowButtons(false);
        setActiveRightPart("switch");
      }
    } else {
      toast.error("Please enter amount and time period");
    }
  }}
  className={`w-full lg:w-[400px] mt-6 h-[50px] text-white border ${
    activeRightPart.length > 1 || 
    !redemption || 
    !selectedFund || 
    (redemption === "monthly" && (!date || !installments))
      ? "bg-[#c7c7c7]"
      : "bg-[#FB7706] border-[#FB7706] focus:outline-none focus:ring-2 focus:ring-[#FB7706]"
  } text-[18px] font-semibold rounded-[4px]`}
>
  Continue
</button>

        </div>
      )}
    </div>
  );
};

const ButtonsComponent = ({ setActiveSection, activeSection }) => {
  return (
    <div className="left h-auto ">
      <div className="bg-[#E7F9F2]">
        <h2 className="text-[21px] text-[#035782]  font-semibold mb-11 ">
          What do you want to do today?
        </h2>

        <div className="flex flex-col space-y-6  ">
          {/* Buttons */}
          <button
            onClick={() => setActiveSection("invest")}
            className={`w-full lg:w-[400px] h-[50px] ${activeSection === "invest" ? "bg-[#FB7706] text-white" : "bg-white text-black"
              } border border-[#FB7706] text-[18px] font-semibold rounded-[4px] mx-auto`}
          >
            Invest/Purchase
          </button>
          <button
            onClick={() => setActiveSection("withdraw")}
            className={`w-full lg:w-[400px] h-[50px] ${activeSection === "withdraw" ? "bg-[#FB7706] text-white" : "bg-white text-black"
              } border border-[#FB7706] text-[18px] font-semibold rounded-[4px] mx-auto`}
          >
            Withdraw/Sell
          </button>
          <button
            onClick={() => setActiveSection("switch")}
            className={`w-full lg:w-[400px] h-[50px] ${activeSection === "switch" ? "bg-[#FB7706] text-white" : "bg-white text-black"
              } border border-[#FB7706] text-[18px] font-semibold rounded-[4px] mx-auto`}
          >
            Switch
          </button>
        </div>
      </div>
    </div>
  );
};

const FundList = ({ selectedFund,setSelectedFund, addingAmount, setAddingAmount, fundsData, isEditable, onAmountChange, onDelete, totalAmount,setFundsData, }) => {
console.log("addingAmount",addingAmount)
  const handleAddFund = () => {
    // Assuming you have a way to get the selected fund (e.g., from a state variable)
    // const selectedFund = document.querySelector('.custom-select__single-value')?.innerText;

    if (!selectedFund || addingAmount == 0 || addingAmount == "0") {
      toast.error("Please select a fund and enter an amount");
      return;
    }

    // Add the new fund to the fundsData array
    const newFund = {
      name: selectedFund.label,
      amount: Number(addingAmount),
    };

    setFundsData([...fundsData, newFund]);
    setAddingAmount("0"); // Reset the amount input
  };


  return (
    <div className="space-y-4 lg:space-y-8">
      {fundsData.map((fund, index) => (
        <FundItem
          key={index}
          fundName={fund.name}
          amount={fund.amount}
          onDelete={onDelete}
          isEditable={isEditable}
          onAmountChange={onAmountChange}
          index={index}
        />
      ))}

      {/* Additional Funds (Dynamic form) */}
      {isEditable && (
        <div className="inputs w-[100%] h-11 flex items-center gap-5">
  {/* Plus Icon */}
  

  {/* Select Input */}
  <Select
    options={optionss}
     value={selectedFund}
    onChange={setSelectedFund}
    placeholder="Search for fund"
    className="h-11 flex-1"
    classNamePrefix="custom-select h-11"
  />

  {/* Amount Input */}
  <input
    className="w-[30%] px-2 py-2 border-[1px] border-gray-300"
    type="text"
    placeholder="Amount"
    onChange={(e) => {
      const inputValue = e.target.value.replace(/[^0-9]/g, "");
      setAddingAmount(inputValue);
    }}
    value={ addingAmount && `₹ ${Number(addingAmount).toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).slice(1)}` }
  />
  <div   onClick={handleAddFund} className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full text-lg text-gray-700">
    +
  </div>
</div>

      //   <div className="inputs w-[100%] h-11 flex justify-between gap-5">
        

      //       <Select
      //   options={optionss}
  
      //   placeholder="Search for fund"
      //   className="h-11"
      //   classNamePrefix="custom-select h-11"
       
      // />


      //     <input
      //       className="w-[30%] px-2 py-2 border-[1px] border-gray-300"
      //       type="text"
      //       placeholder="Amount"
      //       onChange={(e)=>{
      //           const inputValue = e.target.value.replace(/[^0-9]/g, "");
      //         setAddingAmount(inputValue)
      //       }}
      //        value={`₹ ${Number(addingAmount).toLocaleString("en-IN", {
      //           style: "currency",
      //           currency: "INR",
      //           maximumFractionDigits: 0,
      //         }).slice(1)}`}
      //     />


      //   </div>
      )}

      <div className="total flex justify-between items-center">
        <p className="text-[18px] lg:text-[20px] font-semibold">TOTAL</p>
        <p className="text-[18px] lg:text-[20px] font-semibold">
          Rs. {Number(totalAmount).toLocaleString("en-IN")}
        </p>
      </div>
    </div>
  );
};

  const FundItem = ({ fundName, amount, onDelete, isEditable, onAmountChange, index }) => {
  return (
    <div className="border-b-2 border-black" key={index}>
      <div className="text-[16px] lg:text-[18px] flex justify-between items-center">
        <div className="flex justify-start gap-4">
          <p className="w-[155px]">{fundName}</p>
          {isEditable && (
            <RiDeleteBin6Line className="fill-[#23A3E4]" onClick={() => onDelete(index)} />
          )}
        </div>
        {isEditable ? (
          <div className="flex mb-5 bg-white w-[135px] border rounded">
            <input
              maxLength={15}
              // value={amount}
              onFocus={(e) => e.target.select()} // Select the text on focus for better UX

              value={`₹ ${Number(amount).toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0,
              }).slice(1)}`}
            
              onChange={(e) => onAmountChange(e.target.value, index)}


              // onChange={(e) => {
              //   const numericValue = e.target.value.replace(/[^0-9]/g, ""); // Allow only numbers
              //   onAmountChange(numericValue, index); // Update the state with the numeric value
              // }}
              className="w-full text-[15px] px-1 outline-none"
              type="text"
              placeholder="0"
            />
          </div>
        ) : (
          <p>Rs. {Number(amount).toLocaleString("en-IN")}</p>
        )}
      </div>
      <div className="flex items-center gap-2 pb-2">
        <div className="w-3 h-3 rounded-full bg-[#39CEF3]" />
        <span>Equity</span>
      </div>
    </div>
  );
};
const optionss = [
    { value: "Fund A", label: "GHI Debt Fund" },
    { value: "Fund B", label: "JKL Gold Fund" },
    { value: "Fund C", label: "MNO Equity Fund" },
  ];

export default function Page()  {
  const [activeSection, setActiveSection] = useState("invest");
  const [showButtons, setShowButtons] = useState(true);
  const [activeRightPart, setActiveRightPart] = useState("");
   const [selectedOption, setSelectedOption] = useState("All Units");
   const [showSidebar, setShowSidebar] = useState(true);
    const [value, setValue] = useState("237");
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
    const [amount, setAmount] = useState(""); // For investment amount
    const [withdrawAmount, setWithdrawAmount] = useState(""); // For investment amount
  const [timePeriod, setTimePeriod] = useState(""); // For selected time period
  const [investmentType, setInvestmentType] = useState("sip"); // For selected investment type
  const [selectedFund, setSelectedFund] = useState("")
  const pathname = usePathname();

 const [isPopupVisible, setIsPopupVisible] = useState(false);

  const [selectedMethod, setSelectedMethod] = useState("Mandate")

  const[redemption,setRedemption]=useState("")
  const demo = pathname?.includes('demo');
  const [edit, setEdit] = useState(false)
  const [showmodel, setShowmodel] = useState(false)
  const [date, setDate] = useState()
  const [installments, setInstallments] = useState()
    const [funds, setFunds] = useState([
    { name: "ABC Equity XYZ Fund", amount: 100000 },
    { name: "DEF Debt Fund", amount: 50000 },
    { name: "GHI Gold Fund", amount: 75000 }
  ]);
  const [withdrawfunds, setWithdrawfunds] = useState([
    { name: "ABC Equityy XYZ Fund", amount: 100000 },
    { name: "DEF Debty Fund", amount: 50000 },
    { name: "GHI Gold Fund", amount: 75000 }
  ]);

  const [isEditable, setIsEditable] = useState(false);
    const [options, setOptions] = useState([
    { value: 'abc', label: 'abc' },
    { value: 'abcd', label: 'abcd' },
    { value: 'abcde', label: 'abcde' },
    { value: 'abcdef', label: 'abcdef' },
    { value: 'abcdefg', label: 'abcdefg' },
    { value: 'select', label: 'Find a new fund' },
  ]);
  const [addingAmount, setAddingAmount] = useState(0);
  

  const demoPages = [
    {
        to: "/demo/profile",
        name: "My Profile",
    },
    {
        to: "#",
        name: "Logout",
    },
];

const dashboardPages = [
    {
        to: "/myaccount/profile",
        name: "My Profile",
    },
    {
        to: "/logout",
        name: "Logout",
    },
];

    const handleSelect = (option) => {
    setSelectedOption(option);
  };

     useEffect(() => {
    const handleResize = () => {
      setShowSidebar(window.innerWidth >= 1024); // Sidebar visible for screens >= 1024px (lg breakpoint)
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize); // Listen to resize events

    return () => {
      window.removeEventListener("resize", handleResize); // Clean up listener
    };
  }, []);

    const handleChange = (e) => {
      if (selectedOption === "Select amount") {
        if (e <= 200000) {
    setValue(e);
          
        }else{
          toast.error("You can't invest more than 200000")
        }
        
      }
      else if (selectedOption ==="Select units") {
        console.log("eee",e)
        if (e <= 345) {
            setValue(e);
          
        }else{
          toast.error("You can't invest more than 345 units")
        }
        
      }
      console.log(e)
  };
  const handleBlur = () => {
    setIsEditing(false);
  };

  useEffect(() => {
    (async () => {
        const tokens = Storage.getToken();
        if (tokens !== null) {
            const userApiClient = new UserApi(tokens.access_token);         
            const res = await userApiClient.getMe();

            if (res.status === 200) {
                const data = await res.json();
                let initials = ''
                initials += (data?.first_name?.split('')[0] ?? '')
                initials += (data?.last_name?.split('')[0] ?? '')
                if (initials.length === 0) {
                    initials = 'U'
                }
                setName(initials);
            }
        }
    })();
}, []);

useEffect(() => {
  if(selectedFund == "select"){

togglePopup()

setSelectedFund("")

  }

}, [selectedFund])




  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };






  const handleAmountChange = (value, index) => {
    const numericValue = value.replace(/[^0-9]/g, ""); // Allow only numbers
    const updatedFunds = [...funds];
    updatedFunds[index].amount = numericValue;
    setFunds(updatedFunds);
  };
  

  const handleDelete = (index) => {
    const updatedFunds = funds.filter((_, i) => i !== index);
    setFunds(updatedFunds);
  };

  const totalAmount = funds.reduce((acc, fund) => acc + Number(fund.amount), 0);


 



  useEffect(() => {
    // Add or remove the `overflow-hidden` class on the body when showModel changes
    if (showmodel) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Cleanup to remove the class when the component unmounts
    return () => document.body.classList.remove("overflow-hidden");
  }, [showmodel]);

  useEffect(() => {
    // some logic
  }, [togglePopup]); // Added 'togglePopup' to the dependency array

  return <main className={`w-full `} >
  {/* Sidebar */}
  <div className="hidden lg:block">
    <SideBar />
  </div>
  <div className="lg:hidden">
    <SideBarMobile />
  </div>

  {/* Main Content */}
  <div
    className={`bg-[#E7F9F2] lg:pb-28 w-full transition-all ${showmodel ? "overflow-hidden":""} ${showSidebar? "":"pb-16"}  duration-300 ${
      showSidebar ? "lg:ml-[200px]" : "ml-0"
    }`}
  >
    {/* Header */}
    <div className="header w-full mb-10 h-18 py-2 bg-[rgba(0,178,178,0.40)] text-[20px] lg:text-[30px] text-[#035782] font-semibold flex  items-center top-0 right-0 z-30 transition-all duration-300">
      <div className="heading flex-1  px-6 self-start lg:ml-12 lg:px-12">Transactions</div>
      <div className="flex-1 items-end justify-end">

      <div className='w-8 h-8 self-end  absolute top-3 lg:right-16  right-8  sm:w-12  sm:h-12 bg-primary-blue rounded-full'>
                        <NavItemPopOver user title={name} items={demo ? demoPages : dashboardPages} navbar={false} />
                    </div> 
      </div>

    </div>



    {/* Back Button */}
    {!showButtons && (
      <div
        onClick={() => {
          setShowButtons(true);
          setActiveRightPart("");
        }}
        className="backbtn w-fit  lg:ml-[6%] ml-4  text-[16px] lg:text-[18px] cursor-pointer hover:font-medium text-[#035782]  py-4 underline"
      >
        Back
      </div>
    )}

    {/* Content Layout */}
    <div
      className={`flex flex-col lg:flex-row  px-4  justify-between lg:px-12 ${
        showSidebar ? "lg:ml-[3%]" : "ml-0"
      } ${ showSidebar ? "lg:mr-[15%]":"mr-0"}`}
    >
      {showButtons && (
        <ButtonsComponent
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
      )}
<div className="">

      <InvestComponent
      setSelectedFund={setSelectedFund}
      selectedFund={selectedFund}
      amount={amount}
      date={date}
      options={options}
      setDate={setDate}
      installments={installments}
      setInstallments={setInstallments}
      withdrawAmount={withdrawAmount}
      setWithdrawAmount={setWithdrawAmount}
      activeRightPart={activeRightPart}
      timePeriod={timePeriod}
      setInvestmentType={setInvestmentType}
      investmentType={investmentType}
      setTimePeriod={setTimePeriod}
      setAmount={setAmount}
        setActiveRightPart={setActiveRightPart}
        setShowButtons={setShowButtons}
        activeSection={activeSection}
        redemption={redemption}

        setRedemption={setRedemption}
      />
</div>
  {isPopupVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Select Fund Name</h2>
                  <Select
        options={optionss}
        
        onChange={(e)=>{
            console.log("e",e)
const newOption = { value: e.value, label: e.label };
    setOptions((prevOptions) => [...prevOptions, newOption])
    setSelectedFund(e.value)
    togglePopup()

        }}
        placeholder="Search for fund"
        className="h-11"
        classNamePrefix="custom-select h-11"
        styles={{
         
        }}
      />
            {/* <select
            onChange={()=>{
              togglePopup()
            }}
              className="w-full p-2 border rounded-md mb-4"
              defaultValue=""
            >
              <option value="" disabled>
                Select fund name
              </option>
              <option value="fund1">Fund 1</option>
              <option value="fund2">Fund 2</option>
              <option value="fund3">Fund 3</option>
              <option value="fund4">Fund 4</option>
            </select> */}
            <div className="flex mt-2 justify-end">
              <button
                className="bg-[#23A3E4] text-white py-2 px-4 rounded-md mr-2"
                onClick={togglePopup}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Active Sections */}
      {activeRightPart === "invest" && (
        <div className="allocation ml-0  lg:w-[35%]   ">
          <div className="heading pb-6 flex justify-between items-center ">

         
          <div className=" text-[18px] lg:text-[20px] font-bold text-[#035782] ">
            Your Fund Allocation
          </div>
      <div onClick={()=>{
            setEdit(!edit)
          }}>  {
          edit==true? <span  className="text-[18px] cursor-pointer text-[#23A3E4] underline ">Save</span> :  <span className="text-[18px] cursor-pointer text-[#23A3E4] underline">Edit</span>
        }
           </div>
          </div>
          
          

          <div className="space-y-4 lg:space-y-8">
          
           <FundList
           setAddingAmount={setAddingAmount}
           addingAmount={addingAmount}
           selectedFund={selectedFund}
           setSelectedFund={setSelectedFund}
           setFundsData={setFunds}
      fundsData={funds}
      isEditable={edit}
      onAmountChange={handleAmountChange}
      onDelete={handleDelete}
      totalAmount={totalAmount}
    />
            
          
           

          
           

            
          </div>

          {/* Payment Options */}
          <div className="payment mt-4  lg:mt-10">
          <div className="flex justify-between items-center">
            <h2 className="text-[18px] lg:text-[20px] text-[#035782] py-2">
              Select Payment Method
            </h2>
           
            </div>
            <div className="btns space-y-4 w-full lg:space-y-6">
              <div className="3butons flex justify-evenly items-center gap-2 lg:gap-4 ">
                  <button onClick={()=>{
                    setSelectedMethod("Mandate")
                  }} className={`w-full  h-[50px]   border ${selectedMethod === "Mandate" ? "bg-[#FB7706]   text-white" : "bg-white  text-black"}  text-[13px] border-[#FB7706] lg:text-[18px] font-semibold rounded-[4px]  `}>
                Mandate
              </button>
              <button onClick={()=>{
                    setSelectedMethod("Upi")
                  }}  className={`w-full  h-[50px]  border ${selectedMethod === "Upi" ? "bg-[#FB7706]   text-white" : "bg-white  text-black"} border-[#FB7706]  text-[13px] lg:text-[18px] font-semibold rounded-[4px]  `}>
                UPI
              </button>
              <button onClick={()=>{
                    setSelectedMethod("NetBanking")
                  }} className={`w-full  h-[50px] border ${selectedMethod === "NetBanking" ? "bg-[#FB7706]   text-white" : "bg-white  text-black"}  border-[#FB7706] text-[13px] lg:text-[18px] font-semibold rounded-[4px]  `}>
                Netbanking
              </button>
              </div>
            
              <button onClick={()=>{
                setShowmodel(true)
              }} className="w-full  h-[50px] text-black bg-white border border-[#FB7706] text-[16px] lg:text-[18px] font-semibold rounded-[4px]">
               Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Withdraw Section */}
      {activeRightPart === "withdraw" && (
        <div className="Sell Recommendation ml-0  lg:w-[35%]  lg:ml-[215px]">
         

<div className="heading pb-6 flex justify-between items-center ">

         
          <div className=" text-[18px] lg:text-[20px] font-bold text-[#035782] ">
            Sell Recommendation
          </div>
      <div onClick={()=>{
            setEdit(!edit)
          }}>  {
          edit==true? <span  className="text-[18px] cursor-pointer text-[#23A3E4] underline ">Save</span> :  <span className="text-[18px] cursor-pointer text-[#23A3E4] underline">Edit</span>
        }
           </div>
          </div>


             <div className=" space-y-8">
                     <FundList
                      selectedFund={selectedFund}
           setSelectedFund={setSelectedFund}
      fundsData={funds}
      setFundsData={setFunds}
      addingAmount={addingAmount}
      setAddingAmount={setAddingAmount}
      isEditable={edit}
      onAmountChange={handleAmountChange}
      onDelete={handleDelete}
      totalAmount={totalAmount}
    />
               

             </div>
       {/* <div onClick={togglePopup}  className="payment underline font-semibold py-3 text-[18px] text-[#23A3E4] my-3 flex items-center">
  Change Funds
             </div> */}


             <div>
               <button
               onClick={()=>{
                setShowmodel(true)
               }}
                 className="w-[100%] h-[50px] text-white    bg-[#FB7706] text-[18px] font-semibold rounded-[4px]"
               >
                 Redeem</button>
             </div>



        </div>
      )}

      {/* Switch Section */}
      {activeRightPart === "switch" && (
        <div className="switchsummary w-full lg:w-[400px] ml-0 lg:ml-[215px]">
           <h2 className="text-[20px] text-[#035782]">Switch Summary</h2>
            <div className="bg-[#f3f7f9] p-3">
              <p className="text-[16px]">ABC Equity XYZ something something fund</p>
              <div className="flex items-center gap-2 pb-1">
                <div className="w-3 h-3  rounded-full bg-[#39CEF3]" />
                <span>Equity</span>
              </div>
            </div>
            <div className=" flex justify-between items-center my-6">
              <p className="text-[18px]">Available Amount <br /> Rs. 2,00,000</p>
              <p className="text-[18px]"> Available Units <br /> 345</p>

           </div>
           <div className="border-b-2 border-black ">
             <p className=" text-[#035782] text-[20px] font-semibold">I want to switch in to</p>
             <p className="text-[16px]">ABC Equity XYZ something something fund</p>

             </div>
           <div>
  <div className="flex justify-between my-4">
    {["All Units", "Select units", "Select amount"].map((option) => (
      <div
        key={option}
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => handleSelect(option)}
      >
        <div
          className={`w-4 h-4 border-2 rounded-full ${
            selectedOption === option ? "bg-[#23A3E4]" : "border-[#23A3E4]"
          }`}
        />
        <p
          className={`mt-4 text-[16px] font-medium ${
            selectedOption === option ? "text-[#23A3E4]" : "text-gray-800"
          }`}
        >
          {option}
        </p>
      </div>
    ))}
  </div>
  <div>
    <div className="flex  justify-between items-center">
 <h2 className="text-[20px]  mb-[-2px] font-medium">
      {selectedOption === "Select amount" ? "Amount to switch" : "Units to switch"}
    </h2>
     <h2 className="text-[20px]  mb-[-2px] font-medium">
      {selectedOption === "Select amount" ? "Approx. Units" : "Approx. Amount"}
    </h2>
    </div>
   

    <div className={`border  border-black ${selectedOption === "All Units" ? "bg-gray-300" : ""} flex justify-between items-center px-5  rounded-xl`}>
     
   <input
  disabled={selectedOption === "All Units"}
  type="text"

  maxLength={13}
  value={
    selectedOption === "Select amount"
      ? `₹ ${Number(value || 0).toLocaleString("en-IN", {
          maximumFractionDigits: 0,
        })}`
      : value
  }
  onChange={(e) => {


    const inputValue = e.target.value.replace(/[^0-9]/g, ""); // Only allow numeric input
    handleChange(inputValue); // Pass the cleaned number back to the handler
  }}
  onBlur={() => {
  
    handleBlur();
  }}
  onFocus={() => {
    if (selectedOption === "Select amount") {
      handleChange(value.replace(/[^0-9]/g, "")); // Remove formatting for editing
    }
  }}
  className="text-[30px] font-semibold w-[70%] bg-transparent border-none outline-none"
  autoFocus
/>


     <p className="font-normal  mt-3 text-[18px]">
  {selectedOption === "Select amount"?
  (
    <>
      {Math.round(value / 23)}
    </>
  ) 
    : ( <>
    {Number(Math.round(value * 23)).toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).slice(1)}
  </>
    )}
</p>



{/* `₹ ${Number(Math.round(value * 23)).toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0,
            }).slice(1)}` */}
    </div>
  </div>
</div>

            
            <button
            onClick={()=>{
                setShowmodel(true)
               }}
              className="w-[100%] h-[50px] text-white my-6    bg-[#FB7706] text-[18px] font-semibold rounded-[5px]"
            >
              Switch now</button>
        </div>
      )}
    </div>
  </div>
  <div className="lg:ml-[16%] ">

  <Footer/>
  </div>




  {
    showmodel &&  <div 
     className="fixed  inset-0 bg-black bg-opacity-50  flex justify-center items-center z-50">
    <div 
    style={{ backgroundImage: "url('/assets/ribbon.gif')", backgroundSize: 'contain', backgroundPosition: 'center' }} className="bg-white p-6  rounded-md flex flex-col items-center  shadow-lg lg:w-[30%] lg:mx-0 mx-4 lg:h-[43%]">
      <FaCheckCircle className="text-4xl  text-[#01C8A9] my-3"/>

      <h1 className="text-3xl font-bold  text-[#035782]">Congrats! </h1>
      <h1 className="text-2xl font-medium ">Transaction successful.  </h1>
      <span className="text-[17px] w-[95%] font-normal text-center">The investment will get reflected in your portfolio in 2-3 business days.</span>
     
      <div className="flex ">
        <button onClick={()=>{setShowmodel(false)}}
          className="bg-[#FB7306] mt-7 text-white font-medium py-2 px-4 rounded-md "
        
        >
          Redirecting you in 10 s
        </button>
      </div>
    </div>
  </div>
  }

</main>

  
 
  



}




