import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { IoAddCircleOutline, IoChevronDown, IoChevronUp } from "react-icons/io5";
import React, { useEffect, useState } from 'react';

import Button from '@/components/ui/ButtonNew';
import DeleteConfirmationModal from '@/components/DeleteConfirmationModal';
import Storage from '@/utils/storage';
import { UploadModal } from '@/components/MyAccount/Portfolio/components/UploadModal';
import { UserApi } from '@/api/services/user/UserApi';
import { apiUrl } from '@/utils/constants';
import { formatIndianNumber } from '@/components/MyAccount/Dashboard/mfpa/mfpa-static-table';
import { toast } from 'react-toastify';


export type Investment = {
  id: number;
  name: string;
  invested: number;
  current: number;
  percentage: number;
  subData?: Investment[];
  assetClass?: string;
};

export type MutualFund = {
  name: string;
  quantity: number;
  invested_amount: number;
  current_amount: number;
};


export interface InvoiceDiscountingRes {
  invoice_discounting: InvoiceDiscounting
}

export interface InvoiceDiscounting {
  data: InvoiceDiscountingData[]
  totalInvestedAmount: number
  totalCurrentAmount: number
  totalReturn: number
}

export interface InvoiceDiscountingData {
  investmentName: string
  investedAmount: number
  currentAmount?: number | null
  return: number
}


interface InvestmentTableProps {
  onTotalCurrentChange: (totalCurrent: number) => void;
  allInvesements: (investments: Investment[]) => void;
  allMutualFund: (mutualFunds: MutualFund[]) => void;
  allInvoiceDiscountingData: (mutualFunds: InvoiceDiscountingData[]) => void;
  setDemoModal: () => void;
}

const InvestmentTable: React.FC<InvestmentTableProps> = ({ onTotalCurrentChange, allInvesements, allInvoiceDiscountingData, allMutualFund, setDemoModal }) => {

  const [investments, setInvestments] = useState<Investment[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingRows, setEditingRows] = useState<number[]>([]);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newInvestment, setNewInvestment] = useState<Investment>({
    id: 0,
    name: '',
    invested: 0,
    current: 0,
    percentage: 0,
  });
  const [selectedAssetClass, setSelectedAssetClass] = useState<string>('');
  const [editingSubRows, setEditingSubRows] = useState<{ [key: number]: number[] }>({});
  const [mutualFunds, setMutualFunds] = useState<MutualFund[]>([]);
  const [invoiceDiscountingData, setInvoiceDiscountingData] = useState<InvoiceDiscountingData[]>([]);
  const [invoiceDiscounting, setInvoiceDiscounting] = useState<InvoiceDiscounting>();
  const [expandedMutualFund, setExpandedMutualFund] = useState(false);
  const [expandedInvoiceDiscounting, setExpandedInvoiceDiscounting] = useState(false);
  const [showCaseModal, setShowCaseModal] = useState(false)
  const [fetchAgain, setFetchAgain] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState({ show: false, selectedId: 0, isSub: false })

  useEffect(() => {
    fetchInvestmentData();
  }, []);

  const fetchInvestmentData = async () => {
    const { access_token } = Storage.getToken()!;
    try {
      const userApiClient = new UserApi(access_token);
      const res = await userApiClient.getPortfolio();
      if (res.ok) {
        const responseData = await res.json();
        if (Array.isArray(responseData.data) && responseData.data.length > 0) {
          const formattedData = responseData.data.map((item: any) => ({
            id: item._id,
            name: item.name,
            invested: Number(item.invested),
            current: Number(item.current),
            percentage: Number(item.percentage),
            subData: item.subData?.map((sub: any) => ({
              id: sub._id,
              name: sub.name,
              invested: Number(sub.invested),
              current: Number(sub.current),
              percentage: Number(sub.percentage)
            }))
          }));
          setInvestments(formattedData);
        } else {
          // If no portfolio exists, an empty one will be created
          setInvestments([]);
          await postInvestmentData([]);
        }
      } else {
        console.error("HTTP Error:", res.status, res.statusText);
      }
    } catch (error) {
      console.error("Error fetching investment data:", error);
    }
  };

  useEffect(() => {
    const loadMutualFunds = async () => {
      try {
        const funds = await fetchMutualFunds();
        if (funds?.length === 0) {
          setDemoModal();
        }
        setMutualFunds(funds);
      } catch (error) {
        console.error('Failed to load mutual funds:', error);
      }
    };

    loadMutualFunds();
  }, []);

  useEffect(() => {
    const loadInvoiceDiscounting = async () => {
      try {
        const funds = await fetchInvoiceDiscounting();
        setInvoiceDiscounting(funds);
        setInvoiceDiscountingData(funds?.data);
      } catch (error) {
        console.error('Failed to load mutual funds:', error);
      }
    };
    loadInvoiceDiscounting();
  }, []);


  const fetchMutualFunds = async () => {
    const url = `${apiUrl}/api/v1/investments/user`;
    const { access_token } = Storage.getToken()!;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      const data = result.data;

      if (!Array.isArray(data)) {
        throw new Error('API response does not contain an array');
      }

      return data as MutualFund[];
    } catch (error) {
      console.error("Error fetching mutual funds:", error);
      throw error;
    }
  };

  const fetchInvoiceDiscounting = async () => {
    const url = `${apiUrl}/api/v1/investments/all-user-investments`;
    const { access_token } = Storage.getToken()!;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      const data = result.data as InvoiceDiscounting;
      const dummyData: InvoiceDiscounting = {
        "data": [
          {
            "investmentName": "Prajal Enterprises x Walmart India (P) Ltd",
            "investedAmount": 7000,
            "currentAmount": 51678.93,
            "return": 638.2704285714285
          },
          {
            "investmentName": "Prajal Enterprises x Walmart India (P) Ltd",
            "investedAmount": 5000,
            "currentAmount": null,
            "return": -100
          },
          {
            "investmentName": "MS Agrotech  ",
            "investedAmount": 5000,
            "currentAmount": null,
            "return": -100
          }
        ],
        "totalInvestedAmount": 17000,
        "totalCurrentAmount": 51678.93,
        "totalReturn": 203.9937058823529
      }
      return data;
    } catch (error) {
      console.error("Error fetching mutual funds:", error);
      throw error;
    }
  };


  const postInvestmentData = async (data: Investment[]) => {
    const url = `${apiUrl}/api/v1/portfolio/portfolio-create`;
    const { access_token } = Storage.getToken()!;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`
        },
        body: JSON.stringify({
          portfolios: data.map(item => ({
            name: item.name,
            invested: item.invested,
            current: item.current,
            percentage: item.percentage,
            subData: item.subData?.map(sub => ({
              name: sub.name,
              invested: sub.invested,
              current: sub.current,
              percentage: sub.percentage
            }))
          }))
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Portfolio created successfully", result);
      return result;
    } catch (error) {
      console.error("Error posting portfolio data:", error);
      throw error;
    }
  };
  const updateInvestmentData = async (id: number, data: any) => {
    const { access_token } = Storage.getToken()!;
    const url = `${apiUrl}/api/v1/portfolio/portfolio-edit/${id}`;
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        console.log("Portfolio updated successfully");
        fetchInvestmentData(); // Refresh the data after updating
      } else {
        console.error("HTTP Error:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  const deleteInvestment = async (id: number, sub: boolean) => {
    const url = `${apiUrl}/api/v1/portfolio/portfolio-delete/${id}`;
    const { access_token } = Storage.getToken()!;

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });

      if (response.ok) {
        console.log("Portfolio deleted successfully");

        if (sub) {
          investments.map(inv => {
            if (inv.subData) {
              const updatedSubData = inv.subData.filter(subInv => subInv.id !== id);

              // Calculate new totals
              const subDataTotalInvested = updatedSubData.reduce((total, subInv) => total + subInv.invested, 0);
              const subDataTotalCurrent = updatedSubData.reduce((total, subInv) => total + subInv.current, 0);

              // Update percentages for remaining sub-data
              const updatedSubDataWithPercentages = updatedSubData.map(subInv => ({
                ...subInv,
                percentage: (subInv.current / subDataTotalCurrent) * 100
              }));

              // Update the investment data
              updateInvestmentData(inv.id, {
                name: inv.name,
                invested: subDataTotalInvested,
                current: subDataTotalCurrent,
                percentage: inv.percentage, // Assuming the percentage of the overall investment might need different logic
                subData: updatedSubDataWithPercentages
              });

              // Return the updated investment object, filter out if no subData left
              return updatedSubData.length > 0 ? { ...inv, subData: updatedSubDataWithPercentages } : null;
            }
            return inv;
          })
          fetchInvestmentData()
        } else {
          setInvestments(prevInvestments => prevInvestments.filter(inv => inv.id !== id));
        }
      } else {
        console.error("HTTP Error:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };


  const handleEditClick = () => {
    if (isEditing) {
      investments.forEach(inv => {
        if (editingRows.includes(inv.id) || editingSubRows[inv.id]?.length) {

          // Calculate total invested and current for subData
          const subDataTotalInvested = inv.subData?.reduce((total, sub) => total + sub.invested, 0) || 0;
          const subDataTotalCurrent = inv.subData?.reduce((total, sub) => total + sub.current, 0) || 0;

          const updatedSubData = inv.subData?.map(sub => {
            if (editingSubRows[inv.id]?.includes(sub.id)) {
              const percentage = (sub.current / subDataTotalCurrent) * 100;
              return {
                name: sub.name,
                invested: sub.invested,
                current: sub.current,
                percentage: percentage
              };
            }
            return sub;
          });

          const updatedInvestmentData = {
            name: inv.name,
            invested: subDataTotalInvested,
            current: subDataTotalCurrent,
            percentage: inv.percentage,
            subData: updatedSubData
          };

          updateInvestmentData(inv.id, updatedInvestmentData);
        }
      });

      setEditingRows([]);
      setEditingSubRows({});
    }
    handleExpandClick(investments[0].id);
    setIsEditing(!isEditing);
  };



  const handleSubRowEditClick = (parentId: number, subId: number) => {
    setEditingSubRows(prevState => ({
      ...prevState,
      [parentId]: prevState[parentId]?.includes(subId)
        ? prevState[parentId].filter(id => id !== subId)
        : [...(prevState[parentId] || []), subId]
    }));
  };

  const handleInputChange = (id: number, value: string | number, field: 'invested' | 'name' | 'current') => {
    setInvestments(investments.map(inv =>
      inv.id === id ? {
        ...inv,
        [field]: field === 'invested' || field === 'current' ? parseInt(value as string, 10) : value
      } : inv
    ));
    setEditingRows(prevState => [...new Set([...prevState, id])]);
  };

  const handleSubRowInputChange = (parentId: number, subId: number, value: string | number, field: 'invested' | 'name' | 'current') => {
    setInvestments(investments.map(inv => {
      if (inv.id === parentId) {
        return {
          ...inv,
          subData: inv.subData?.map(sub =>
            sub.id === subId ? {
              ...sub,
              [field]: field === 'invested' || field === 'current' ? parseInt(value as string, 10) : value
            } : sub
          )
        };
      }
      return inv;
    }));
    setEditingSubRows(prevState => ({
      ...prevState,
      [parentId]: [...new Set([...(prevState[parentId] || []), subId])]
    }));
  };

  const handleAddRow = () => {
    setShowAddForm((prev) => !prev);
  };

  const handleExpandClick = (id: number) => {
    setExpandedMutualFund(false);
    setExpandedRow(expandedRow === id ? null : id);
  };

  const handleFormChange = (field: keyof Investment, value: string | number) => {
    setNewInvestment({ ...newInvestment, [field]: value });
  };

  const handleAssetClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAssetClass(e.target.value);
  };

  const totalInvested =
    investments.reduce((acc, inv) => acc + inv.invested, 0) +
    mutualFunds.reduce((acc, inv) => acc + inv.invested_amount, 0) +
    (invoiceDiscountingData?.reduce((acc, inv) => acc + (inv?.investedAmount || 0), 0) || 0);
  const totalCurrent = mutualFunds.reduce((acc, mf) => acc + mf.current_amount, 0)
    + investments.reduce((acc, inv) => acc + inv.current, 0) +
    (invoiceDiscountingData?.reduce((acc, inv) => acc + (inv?.currentAmount || 0), 0) || 0);

  const invTotalCurrent = investments.reduce((acc, inv) => acc + inv.invested, 0)
  const invTotalInvested = investments.reduce((acc, inv) => acc + inv.current, 0);

  const mfTotalCurrent = mutualFunds.reduce((acc, mf) => acc + mf.current_amount, 0)
  const mfTotalInvested = mutualFunds.reduce((acc, inv) => acc + inv.invested_amount, 0);

  useEffect(() => {
    const updatedInvestments = investments.map(inv => {
      const returnAmount = inv.current - inv.invested;
      const returnPercentage = inv.current ? (returnAmount / inv.current) * 100 : 0;
      const formattedReturn = `${returnAmount >= 0 ? '₹' : '-₹'} ${formatIndianNumber(Math.abs(returnAmount))} | ${returnPercentage >= 0 ? '+' : ''}${returnPercentage?.toFixed(1)}%`;

      return {
        ...inv,
        percentage: totalCurrent ? (inv.current / totalCurrent * 100) : 0,
        return: formattedReturn,
      };
    });
    setInvestments(updatedInvestments);
  }, [invTotalCurrent]);

  const addInvestmentData = async (newInvestment: Partial<Investment>) => {
    const { access_token } = Storage.getToken()!;
    const url = `${apiUrl}/api/v1/portfolio/portfolio-edit/`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify(newInvestment),
      });

      if (response.ok) {
        console.log("New investment added successfully");
        fetchInvestmentData();
      } else {
        console.error("HTTP Error:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };


  const handleAddInvestmentData = async (
    newInvestment: Partial<Investment>,
    parentInvestmentId: number | null
  ) => {
    const { access_token } = Storage.getToken()!;
    const url = `${apiUrl}/api/v1/portfolio/portfolio-edit/${parentInvestmentId}`;

    try {
      if (parentInvestmentId) {
        const parentInvestment = investments.find(inv => inv.id === parentInvestmentId);

        if (parentInvestment) {
          // Calculate total values for current and invested fields
          const subDataCurrentTotal = parentInvestment.subData?.reduce((sum, subInv) => sum + subInv.current, 0) || 0;
          const subDataInvestedTotal = parentInvestment.subData?.reduce((sum, subInv) => sum + subInv.invested, 0) || 0;

          // Calculate total current and invested values including new investment
          const totalCurrentValue = newInvestment.current
            ? newInvestment.current + subDataCurrentTotal
            : subDataCurrentTotal;
          const totalInvestedValue = newInvestment.invested
            ? newInvestment.invested + subDataInvestedTotal
            : subDataInvestedTotal;

          // Calculate percentage for the new investment
          const percentageValue = newInvestment.current
            ? (newInvestment.current / totalCurrentValue) * 100
            : 0;

          // Prepare updatedSubData with percentage for each object
          const updatedSubData = [
            ...((parentInvestment.subData || []).map(({ id, ...rest }) => ({
              ...rest,
              percentage: (rest.current / totalCurrentValue) * 100
            }))),
            { ...newInvestment, percentage: percentageValue }
          ];

          // Update parentInvestment with totalCurrentValue and totalInvestedValue
          const updatedInvestment = {
            ...parentInvestment,
            current: totalCurrentValue,
            invested: totalInvestedValue,
            subData: updatedSubData
          };

          // Send the updated investment data to the server
          const response = await fetch(url, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${access_token}`,
            },
            body: JSON.stringify(updatedInvestment),
          });

          if (response.ok) {
            console.log("New investment added successfully");
            fetchInvestmentData();
          } else {
            console.error("HTTP Error:", response.status, response.statusText);
          }
        } else {
          console.error("Parent investment not found.");
        }
      } else {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
          body: JSON.stringify(newInvestment),
        });

        if (response.ok) {
          console.log("New investment added successfully");
          fetchInvestmentData();
        } else {
          console.error("HTTP Error:", response.status, response.statusText);
        }
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };



  const getParentInvestmentId = (selectedAssetClass: string): number | null => {
    const parentInvestment = investments.find(inv => inv.name === selectedAssetClass);

    if (parentInvestment) {
      return parentInvestment.id;
    }

    return null;
  };



  const handleSubmitNewRow = async () => {
    const assetClassExists = investments.some(inv => inv.name === selectedAssetClass);
    const parentInvestmentId = getParentInvestmentId(selectedAssetClass);
    investments.map((i, index) => {
    })
    // if(!newInvestment.assetClass || !newInvestment.name || !newInvestment.current || !newInvestment.invested){
    //   toast.error("Please fill all the details")
    //   return
    // }
    if (assetClassExists) {
      const newInvestmentData: Partial<Investment> = {
        name: newInvestment.name,
        invested: newInvestment.invested,
        current: newInvestment.current,
      };

      await handleAddInvestmentData(newInvestmentData, parentInvestmentId);

      setInvestments((prevInvestments) => [
        ...prevInvestments,
        {
          id: Date.now(),
          ...newInvestmentData,
        } as Investment
      ]);

      setNewInvestment(
        {
          id: 0,
          name: '',
          invested: 0,
          current: 0,
          percentage: 0,
        }
      );
    }
    else {
      const newId = investments.length > 0 ? Math.max(...investments.map(inv => inv.id)) + 1 : 1;

      const newInvestmentData = {
        ...newInvestment,
        id: newId,
        assetClass: selectedAssetClass,
        percentage: 100
      };

      let updatedInvestments: Investment[];

      const assetClassExists = investments.some(inv => inv.assetClass === selectedAssetClass);

      if (assetClassExists) {
        updatedInvestments = investments.map(inv => {
          if (inv.assetClass === selectedAssetClass) {
            return {
              ...inv,
              subData: [...(inv.subData || []), newInvestmentData]
            };
          }
          return inv;
        });
      } else {
        updatedInvestments = [...investments, {
          id: newId,
          name: selectedAssetClass,
          invested: newInvestmentData.invested,
          current: newInvestmentData.current,
          percentage: 100,
          assetClass: selectedAssetClass,
          subData: [newInvestmentData]
        }];
      }

      try {
        let portfolioTotal = newInvestmentData.current + totalInvested
        await postInvestmentData([{
          id: newId,
          name: selectedAssetClass,
          invested: newInvestmentData.invested,
          current: newInvestmentData.current,
          percentage: (newInvestmentData.current / portfolioTotal) * 100,
          assetClass: selectedAssetClass,
          subData: [newInvestmentData]
        }]);
        await fetchInvestmentData()
        setShowAddForm(false);
        setNewInvestment({
          id: 0,
          name: '',
          invested: 0,
          current: 0,
          percentage: 0,
          assetClass: '',
        });
        setSelectedAssetClass('');
      } catch (error) {
        console.error("Error submitting new investment:", error);

      }
    }
  };


  useEffect(() => {
    const updatedInvestments = mutualFunds.map(mf => {
      const returnAmount = mf.current_amount - mf.invested_amount;
      const returnPercentage = mf.current_amount ? (returnAmount / mf.current_amount) * 100 : 0;
      const formattedReturn = `${returnAmount >= 0 ? '₹' : '-₹'} ${formatIndianNumber(Math.abs(returnAmount))} | ${returnPercentage >= 0 ? '+' : ''}${returnPercentage?.toFixed(1)}%`;

      return {
        ...mf,
        percentage: mfTotalCurrent ? (mf.current_amount / mfTotalCurrent * 100) : 0,
        return: formattedReturn,
      };
    });
    setMutualFunds(updatedInvestments);
  }, [mfTotalCurrent]);


  const handleMutualFundExpandClick = () => {
    setExpandedRow(null);
    setExpandedMutualFund(!expandedMutualFund);
  };
  const handleInvoiceDiscountingClick = () => {
    setExpandedRow(null);
    setExpandedInvoiceDiscounting(!expandedInvoiceDiscounting);
  };

  function formatAmount(amount: number): string {
    if (amount >= 1000) {
      return `₹ ${(amount / 1000)?.toFixed(0)}K`;
    }
    return `₹ ${amount?.toFixed(0)}`;
  }

  useEffect(() => {
    onTotalCurrentChange(totalCurrent);
  }, [totalCurrent, onTotalCurrentChange]);


  useEffect(() => {
    allInvesements(investments);
  }, [investments, allInvesements]);

  useEffect(() => {
    allMutualFund(mutualFunds);
  }, [mutualFunds, allMutualFund]);


  useEffect(() => {
    allInvoiceDiscountingData(invoiceDiscountingData);
  }, [invoiceDiscountingData, allInvoiceDiscountingData]);



  return (
    <div className="mx-auto p-4 md:p-8 rounded-2xl">
      <div className="flex justify-end gap-4 mb-4">
        <button onClick={handleEditClick} className={`font-semibold text-white px-4 py-2 rounded-xl flex gap-2 items-center ${isEditing ? "bg-green-700" : "bg-[#01c8a9]"}`}
          disabled={investments.length === 0}
        >
          <FaPencilAlt />
          {isEditing ? 'Save Table' : 'Edit Table'}
        </button>
        <button onClick={handleAddRow} className="bg-[#01C8A9] font-semibold text-white px-4 py-2 rounded-xl flex gap-2 items-center">
          <IoAddCircleOutline />
          Add Investment
        </button>
      </div>
      <div className='px-0 sm:px-4 bg-white rounded-2xl overflow-x-auto shadow-md shadow-[#60a1c2] min-w-full'>
        <table className="w-full">
          <thead>
            <tr className='text-[#035782]'>
              <th className="p-4 pt-8 border-b text-start font-medium w-[30%] min-w-[200px]  md:min-w-0">Investment</th>
              <th className="p-4 pt-8 border-b text-right font-medium w-[15%]">Invested Amount</th>
              <th className="p-4 pt-8 border-b text-right font-medium w-[15%]">Current Amount</th>
              <th className="p-4 pt-8 border-b text-right font-medium w-[15%]">Return</th>
              <th className="p-4 pt-8 border-b text-right font-medium w-[15%]">% Of Portfolio</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b ">
              <td className="pb-2 px-4 flex justify-between items-center  min-w-[200px]  md:min-w-0">
                <div className='font-semibold text-[#035782]'>Mutual Funds</div>
                <button className="mt-2 p-2 pr-0" onClick={() => handleMutualFundExpandClick()}>
                  {expandedMutualFund ? <IoChevronUp /> : <IoChevronDown />}
                </button>
              </td>
              {(!mutualFunds || mutualFunds.length === 0) ? (
                <td colSpan={4} className='text-center cursor-pointer text-[#2E87B9] py-2'>
                  <Button size='small' padding={'px-4 sm:py-2 max-w-fit'} boxShadow={true} onClick={() => setShowCaseModal(true)}>
                    <span className='text-sm sm:text-base px-8 font-medium'>Fetch Your Mutual Fund Details</span>
                  </Button>
                </td>
              ) : (
                <>
                  <td className="border-b py-2 px-[15px] w-[15%] text-right">
                    {`₹${formatIndianNumber(mfTotalInvested)}`}
                  </td>
                  <td className="border-b py-2 px-[15px] w-[15%] text-right">
                    {`₹${formatIndianNumber(mfTotalCurrent)}`}
                  </td>
                  <td className="border-b py-2 w-[15%] text-right">
                    {`${(mfTotalInvested === 0 || mfTotalCurrent === 0)
                      ? "NA"
                      : `₹${isNaN(mfTotalCurrent - mfTotalInvested) ? 0 : formatIndianNumber(mfTotalCurrent - mfTotalInvested)} | ${isNaN(((mfTotalCurrent - mfTotalInvested) / mfTotalInvested * 100)) ? '0.0' : ((mfTotalCurrent - mfTotalInvested) / mfTotalInvested * 100).toFixed(1)}%`
                      }`}
                  </td>
                  <td className="border-b py-2 px-[15px] w-[15%] text-right">{((mfTotalCurrent / totalCurrent) * 100)?.toFixed(1)}%</td>
                </>
              )}
            </tr>

            {expandedMutualFund && (
              <tr>
                <td colSpan={5} className="pb-2">
                  <table className="min-w-full bg-white border-gray-200 mt-2">
                    {/* <thead>
                      <tr className='text-[#035782]'>
                        <th className="border-b text-start font-medium w-[25%] pr-4 sm:pr-0 py-2">Name</th>
                        <th className="border-b font-medium text-right w-[20%] pr-4 sm:pr-0 py-2">Invested Amount</th>
                        <th className="border-b font-medium text-right w-[20%] pr-4 sm:pr-0 py-2">Current Amount</th>
                        <th className="border-b font-medium text-right w-[20%] pr-4 sm:pr-0 py-2">Return (₹)</th>
                        <th className="border-b font-medium text-right w-auto py-2">Return (%)</th>
                      </tr>
                    </thead> */}
                    <tbody>
                      {mutualFunds?.map((mf, idx) => (
                        <React.Fragment key={`mutual-${idx}`}>
                          {mf.invested_amount !== 0 && <tr>
                            <td className="border-b py-2 px-4 w-[30%] min-w-[200px]  md:min-w-0 text-left text-sm">{mf.name.split('-')[0].trim()}</td>
                            <td className="border-b py-2 px-[23px] sm:px-[17px] w-[15%] text-right text-sm">{`₹${formatIndianNumber(mf.invested_amount)}`}</td>
                            <td className="border-b py-2 px-[23px] sm:px-[17px] w-[15%] text-right text-sm">{`₹${formatIndianNumber(mf.current_amount)}`}</td>
                            <td className="border-b py-2 w-[15%] text-right text-sm">
                              {`${(mf.invested_amount === 0 || mf.current_amount === 0)
                                ? "NA"
                                : `₹${isNaN(mf.current_amount - mf.invested_amount) ? 0 : formatIndianNumber(mf.current_amount - mf.invested_amount)} | ${isNaN(((mf.current_amount - mf.invested_amount) / mf.invested_amount * 100)) ? '0.0' : ((mf.current_amount - mf.invested_amount) / mf.invested_amount * 100).toFixed(1)}%`
                                }`}
                            </td>
                            <td className="border-b py-2 px-[15px] w-[15%] text-right text-sm">
                              {/* {`${((mf.current_amount) / mfTotalCurrent * 100)?.toFixed(1)}%`} */}
                            </td>
                          </tr>}
                        </React.Fragment>
                      ))}

                    </tbody>
                  </table>
                </td>
              </tr>

            )}
            {(invoiceDiscounting?.data || invoiceDiscounting?.data?.length) && (
              <tr className="border-b ">
                <td className="pb-2 px-4 flex justify-between items-center  min-w-[200px]  md:min-w-0">
                  <div className='font-semibold text-[#035782]'>Invoice Discounting</div>
                  <button className="mt-2 p-2 pr-0" onClick={() => handleInvoiceDiscountingClick()}>
                    {expandedMutualFund ? <IoChevronUp /> : <IoChevronDown />}
                  </button>
                </td>
                <td className="border-b py-2 px-[15px] w-[15%] text-right">
                  {`₹${formatIndianNumber(invoiceDiscounting?.totalInvestedAmount ?? 0)}`}
                </td>
                <td className="border-b py-2 px-[15px] w-[15%] text-right">
                  {`₹${formatIndianNumber(invoiceDiscounting?.totalCurrentAmount ?? 0)}`}
                </td>
                <td className="border-b py-2 w-[15%] text-right">
                  {`${(invoiceDiscounting?.totalInvestedAmount === 0 || invoiceDiscounting?.totalCurrentAmount === undefined || invoiceDiscounting?.totalCurrentAmount === 0)
                    ? "NA"
                    : `₹${isNaN(invoiceDiscounting?.totalCurrentAmount - invoiceDiscounting?.totalInvestedAmount)
                      ? 0
                      : formatIndianNumber((invoiceDiscounting?.totalCurrentAmount || 0) - (invoiceDiscounting?.totalInvestedAmount || 0))} | ${isNaN(((invoiceDiscounting?.totalCurrentAmount - invoiceDiscounting?.totalInvestedAmount) / (invoiceDiscounting?.totalInvestedAmount || 1)) * 100)
                        ? '0.0'
                        : (((invoiceDiscounting?.totalCurrentAmount - invoiceDiscounting?.totalInvestedAmount) / (invoiceDiscounting?.totalInvestedAmount || 1)) * 100).toFixed(1)}%`
                    }`}
                </td>
                <td className="border-b py-2 px-[15px] w-[15%] text-right">{(invoiceDiscounting?.totalCurrentAmount && (invoiceDiscounting?.totalCurrentAmount / totalCurrent) * 100)?.toFixed(1)}%</td>
              </tr>
            )}
            {expandedInvoiceDiscounting && (
              <tr>
                <td colSpan={5} className="pb-2">
                  <table className="min-w-full bg-white border-gray-200 mt-2">
                    {/* <thead>
                      <tr className='text-[#035782]'>
                        <th className="border-b text-start font-medium w-[25%] pr-4 sm:pr-0 py-2">Name</th>
                        <th className="border-b font-medium text-right w-[20%] pr-4 sm:pr-0 py-2">Invested Amount</th>
                        <th className="border-b font-medium text-right w-[20%] pr-4 sm:pr-0 py-2">Current Amount</th>
                        <th className="border-b font-medium text-right w-[20%] pr-4 sm:pr-0 py-2">Return (₹)</th>
                        <th className="border-b font-medium text-right w-auto py-2">Return (%)</th>
                      </tr>
                    </thead> */}
                    <tbody>
                      {invoiceDiscountingData?.map((mf, idx) => (
                        <React.Fragment key={`mutual-${idx}`}>
                          {mf.investedAmount !== 0 && <tr>
                            <td className="border-b py-2 px-4 w-[30%] min-w-[200px]  md:min-w-0 text-left text-sm">{mf.investmentName}</td>
                            <td className="border-b py-2 px-[23px] sm:px-[17px] w-[15%] text-right text-sm">{`₹${formatIndianNumber(mf.investedAmount)}`}</td>
                            <td className="border-b py-2 px-[23px] sm:px-[17px] w-[15%] text-right text-sm">{`₹${formatIndianNumber(mf.currentAmount || 0)}`}</td>
                            <td className="border-b py-2 w-[15%] text-right text-sm">
                              {`${(mf.investedAmount === 0 || !mf.currentAmount)
                                ? "NA"
                                : `₹${isNaN(mf.currentAmount - mf.investedAmount) ? 0 : formatIndianNumber((mf.currentAmount ?? 0) - mf.investedAmount)} | ${isNaN(((mf.currentAmount - mf.investedAmount) / mf.investedAmount) * 100)
                                  ? '0.0'
                                  : (((mf.currentAmount - mf.investedAmount) / mf.investedAmount) * 100).toFixed(1)
                                }%`
                                }`}
                            </td>
                            <td className="border-b py-2 px-[15px] w-[15%] text-right text-sm">
                            </td>
                          </tr>}
                        </React.Fragment>
                      ))}

                    </tbody>
                  </table>
                </td>
              </tr>

            )}
            {investments.map(inv => (
              <React.Fragment key={inv.id}>
                <tr className={`${expandedRow === inv.id && inv.subData ? "" : "border-b"}`}>
                  <td className="py-4 px-4 w-[30%] min-w-[200px]  md:min-w-0">
                    {(isEditing && inv.name === '') || editingRows.includes(inv.id) ? (
                      <input
                        type="text"
                        value={inv.name}
                        onChange={(e) => handleInputChange(inv.id, e.target.value, 'name')}
                        autoFocus={editingRows[0] === inv.id}
                        className="w-full border border-gray-300 rounded px-2 py-1"
                      />
                    ) : (
                      <div className="flex items-center gap-2 justify-between">
                        <div className='font-semibold text-[#035782] flex gap-2 items-center'>
                          {inv.name}
                          {isEditing && <button
                            onClick={() => setShowDeleteModal({
                              show: true,
                              selectedId: inv.id,
                              isSub: false
                            })}
                            className="text-red-500"
                          >
                            <FaTrash />
                          </button>}
                        </div>
                        <div className='flex items-center gap-2'>
                          {inv.subData && (
                            <button onClick={() => handleExpandClick(inv.id)}>
                              {expandedRow === inv.id ? <IoChevronUp /> : <IoChevronDown />}
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </td>
                  <td className="py-2 px-4 text-right w-[15%]">
                    {/* {isEditing ? (
                      <input
                        type="number"
                        value={inv.invested}
                        onChange={(e) => handleInputChange(inv.id, parseInt(e.target.value, 10), 'invested')}
                        className="w-full border border-gray-300 rounded px-2 py-1"
                        style={{ WebkitAppearance: "none", MozAppearance: "textfield" }}
                      />
                    ) : ( */}
                    <span>{`₹${formatIndianNumber(inv.invested)}`}</span>
                    {/* )} */}
                  </td>
                  <td className="py-2 px-4 text-right w-[15%]">
                    {/* {isEditing ? (
                      <input
                        type="number"
                        value={inv.current}
                        onChange={(e) => handleInputChange(inv.id, parseInt(e.target.value, 10), 'current')}
                        className="w-full border border-gray-300 rounded px-2 py-1"
                        style={{ WebkitAppearance: "none", MozAppearance: "textfield" }}
                      />
                    ) : ( */}
                    <span className='whitespace-nowrap'>{`₹${formatIndianNumber(inv.current)}`}</span>
                    {/* )} */}
                  </td>
                  <td className="py-2 text-right w-[15%]">
                    {`${(inv.current === 0 || inv.invested === 0)
                      ? "NA"
                      : `₹${isNaN(inv.current - inv.invested) ? 0 : formatIndianNumber(inv.current - inv.invested)} | ${isNaN(((inv.current - inv.invested) / inv.invested * 100)) ? '0.0' : ((inv.current - inv.invested) / inv.invested * 100).toFixed(1)}%`
                      }`}
                  </td>
                  <td className="py-2 px-4 text-right w-[15%]">
                    {(inv.current / totalCurrent * 100)?.toFixed(1)}%
                  </td>
                </tr>
                {expandedRow === inv.id && inv.subData && (
                  <tr>
                    <td colSpan={5} className="pb-2">
                      <table className="min-w-full bg-white border-gray-200 mt-2 border-t">
                        {/* <thead>
                          <tr className='text-[#035782]'>
                            <th className="border-b text-start font-medium px-0 py-2">Name</th>
                            <th className="border-b font-medium text-right px-0 py-2">Invested Amount</th>
                            <th className="border-b font-medium text-right px-0 py-2">Current Amount</th>
                            <th className="border-b font-medium text-right px-0 py-2">% Of Portfolio</th>
                          </tr>
                        </thead> */}
                        <tbody>
                          {inv.subData.map(sub => (
                            <tr key={sub.id} className="text-sm md:text-base">
                              <td className="border-b px-4 py-1 w-[30%] min-w-[200px]  md:min-w-0">
                                {isEditing ? (
                                  <input
                                    type="text"
                                    value={sub.name}
                                    onChange={(e) => handleSubRowInputChange(inv.id, sub.id, e.target.value, 'name')}
                                    className="w-full border border-gray-300 rounded px-2 py-1"
                                  />
                                ) : (
                                  <div className="flex items-center justify-between">
                                    <div className='flex gap-2'>
                                      {sub.name}
                                      {isEditing && <button
                                        onClick={() => setShowDeleteModal({
                                          show: true,
                                          selectedId: sub.id,
                                          isSub: true
                                        })}
                                        className="text-red-500"
                                      >
                                        <FaTrash />
                                      </button>}
                                    </div>
                                    {isEditing && (
                                      <button onClick={() => handleSubRowEditClick(inv.id, sub.id)}>
                                        <FaPencilAlt />
                                      </button>
                                    )}
                                  </div>
                                )}
                              </td>
                              <td className="border-b px-[23px] sm:px-[17px] py-1 text-right w-[15%]">
                                {isEditing ? (
                                  <input
                                    type="text" // Change input type to 'text'
                                    value={sub.invested === 0 ? '' : sub.invested?.toLocaleString("en-IN")}
                                    onChange={(e) => {
                                      const rawValue = e.target.value.replace(/,/g, ''); // Remove commas
                                      const parsedValue = rawValue === '' ? 0 : parseInt(rawValue, 10); // Parse as number
                                      handleSubRowInputChange(inv.id, sub.id, parsedValue, 'invested');
                                    }}
                                    className="w-full border border-gray-300 rounded px-2 py-1 text-right"
                                    style={{ WebkitAppearance: "none", MozAppearance: "textfield" }}
                                  />
                                ) : (
                                  <span>{`₹${formatIndianNumber(sub.invested)}`}</span>
                                )}
                              </td>

                              <td className="border-b px-[23px] sm:px-[17px] py-1 text-right w-[15%]">
                                {isEditing ? (
                                  <input
                                    type="text" // Change input type to 'text'
                                    value={sub.current === 0 ? '' : sub.current?.toLocaleString("en-IN")}
                                    onChange={(e) => {
                                      const rawValue = e.target.value.replace(/,/g, ''); // Remove commas
                                      const parsedValue = rawValue === '' ? 0 : parseInt(rawValue, 10); // Parse as number
                                      handleSubRowInputChange(inv.id, sub.id, parsedValue, 'current');
                                    }}
                                    className="w-full border border-gray-300 rounded px-2 py-1 text-right"
                                    style={{ WebkitAppearance: "none", MozAppearance: "textfield" }}
                                  />
                                ) : (
                                  <span>{`₹${formatIndianNumber(sub.current)}`}</span>
                                )}
                              </td>
                              <td className="border-b py-1 text-right w-[15%]">
                                {`${(sub.current === 0 || sub.invested === 0)
                                  ? "NA"
                                  :
                                  `₹${isNaN(sub.current - sub.invested) ? 0 : formatIndianNumber(sub.current - sub.invested)} | ${isNaN(((sub.current - sub.invested) / sub.invested * 100)) ? '0.0' : ((sub.current - sub.invested) / sub.invested * 100).toFixed(1)}%`
                                  }`}
                              </td>
                              <td className="border-b px-[23px] sm:px-[17px] py-1 text-right w-[15%]">
                                {/* {sub.percentage?.toFixed(1)}% */}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
            <tr className='border-t-2'>
              <td className="px-4 pt-4 pb-8 border-t font-bold text-[#035782] whitespace-nowrap w-[30%] min-w-[200px]  md:min-w-0">Total</td>
              <td className="pt-4 px-[15px] pb-8 border-t font-bold text-right whitespace-nowrap w-[15%]">₹ {formatIndianNumber(totalInvested)}</td>
              <td className="pt-4 px-[15px] pb-8 border-t font-bold text-right whitespace-nowrap w-[15%]">₹ {formatIndianNumber(totalCurrent)}</td>
              <td className="pt-4 pb-8 border-t font-bold text-right whitespace-nowrap w-[15%]">{`${(totalCurrent === 0 || totalInvested === 0)
                ? "NA"
                : `₹${formatIndianNumber(totalCurrent - totalInvested)}`} | ${((totalCurrent - totalInvested) / totalInvested * 100)?.toFixed(1)}%`}</td>
              <td className="pt-4 px-[15px] pb-8 border-t font-bold text-right whitespace-nowrap w-[15%]">100%</td>
            </tr>
          </tbody>
        </table>
      </div>
      {
        showAddForm && (
          <div className="mt-4 p-4 flex gap-8 items-center flex-col md:flex-row justify-center pt-5 bg-white rounded-xl">
            <div className="mb-2 w-full md:max-w-sm">
              <select
                value={selectedAssetClass}
                onChange={handleAssetClassChange}
                className="w-full px-2 py-1 rounded-xl pr-6 outline-none bg-white border"
              >
                <option value="" disabled>Select Asset Class</option>
                <option value="Stocks">Stocks</option>
                <option value="Cash in Bank">Cash in Bank</option>
                <option value="Fixed Deposit">Fixed Deposit</option>
                <option value="Gold">Gold</option>
                <option value="PPF">PPF</option>
                <option value="EPF">EPF</option>
                <option value="Leasing Assets">Leasing Assets</option>
                <option value="Real Estate">Real Estate</option>
                <option value="Crypto">Crypto</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="mb-2 w-full">
              <input
                type="text"
                value={newInvestment.name}
                placeholder='Name'
                onChange={(e) => handleFormChange('name', e.target.value)}
                className="w-full border border-gray-300 px-2 py-1 h-full rounded-xl"
              />
            </div>
            <div className="mb-2 w-full">
              <input
                type="text" // Change input type to 'text'
                placeholder="Invested Amount"
                value={newInvestment.invested === 0 ? '' : newInvestment.invested?.toLocaleString("en-IN")}
                onChange={(e) => {
                  const rawValue = e.target.value.replace(/,/g, ''); // Remove commas
                  const parsedValue = rawValue === '' ? 0 : parseInt(rawValue, 10); // Parse as number
                  handleFormChange('invested', parsedValue);
                }}
                className="w-full border border-gray-300 px-2 py-1 rounded-xl text-right"
                style={{ WebkitAppearance: "none", MozAppearance: "textfield" }}
              />
            </div>

            <div className="mb-2 w-full">
              <input
                type="text" // Change input type to 'text'
                placeholder="Current Amount"
                value={newInvestment.current === 0 ? '' : newInvestment.current?.toLocaleString("en-IN")}
                onChange={(e) => {
                  const rawValue = e.target.value.replace(/,/g, ''); // Remove commas
                  const parsedValue = rawValue === '' ? 0 : parseInt(rawValue, 10); // Parse as number
                  handleFormChange('current', parsedValue);
                }}
                className="w-full border border-gray-300 px-2 py-1 rounded-xl text-right"
                style={{ WebkitAppearance: "none", MozAppearance: "textfield" }}
              />
            </div>
            <div>
              <button
                onClick={handleSubmitNewRow}
                className="bg-[#01C8A9] font-medium text-white px-4 py-1.5 rounded-xl"
              >
                Submit
              </button>

            </div>
          </div>
        )
      }
      <UploadModal setFetchAgain={setFetchAgain} open={showCaseModal} onClose={() => setShowCaseModal(false)} />
      {showDeleteModal.show && <DeleteConfirmationModal id={showDeleteModal.selectedId} sub={showDeleteModal.isSub} handleDelete={deleteInvestment} onClose={() => {
        setShowDeleteModal({
          ...showDeleteModal, show: false
        })
      }} />}
    </div >
  );
};

export default InvestmentTable;