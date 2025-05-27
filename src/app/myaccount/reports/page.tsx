"use client"

"use client"

import { useEffect, useState } from "react"
import { CustomDropdown } from "@/components/ui/CustomDropdown"
import { Menu, MenuItem } from "@mui/material";
import { useSearchParams } from "next/navigation";
import HeaderNav from "@/components/MyAccount/MutualFundsAnalyser/HeaderNav";
import { MoreHorizontal, MoreHorizontalIcon } from "lucide-react";

interface DateRange {
  start: string
  end: string
}

interface Option {
  label: string
  value: string
}
interface Folio {
  folio_number: string;
  schemes: Scheme[];
}

interface Scheme {
  market_value: {
    amount: number;
  };
  holdings: {
    units: number;
  };
  nav: {
    value: number;
  };
  [key: string]: any;
}

const folios: Folio[] = [];

interface ApiResponse {
  data?: {
    rows: any[]
    columns: string[]
  }
  scheme_report?: {
    data: {
      rows: any[]
      columns: string[]
    }
  }
  folios?: Folio
}

interface TableRow {
  [key: string]: string | number | null
}

export default function Page() {
  const [dateRange, setDateRange] = useState<DateRange>({ start: '', end: '' });
  const [symbol, setSymbol] = useState<string>("")
  const [reportType, setReportType] = useState<string>("")
  const [segment, setSegment] = useState<string>("")
  const [plType, setPlType] = useState<string>("")
  const [showTable, setShowTable] = useState<boolean>(false)
  const [isHolding, setIsHolding] = useState<boolean>(false)
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>("30d")
  const [tableData, setTableData] = useState<TableRow[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 20;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedIsin, setSelectedIsin] = useState<string | null>(null);
  const searchParams = useSearchParams();

  const queryType = searchParams?.get('type');

  const totalPages = Math.ceil(tableData.length / rowsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };


  useEffect(() => {
    if (queryType === 'transaction') {
      setReportType('transactions');
    }
  }, [queryType])

  useEffect(() => {
    if (queryType === 'transaction' && reportType === 'transactions') {
      handleSearch();
    }
  }, [queryType, reportType])

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const currentData = tableData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const reportTypes: Option[] = [
    { label: "Transactions", value: "purchase" },
    // { label: "Redemptions", value: "redemption" },
    // { label: "Transactions", value: "transactions" },
    // { label: "Capital Gains", value: "capital-gains" },
    // { label: "Returns", value: "returns" },
    { label: "Holdings", value: "holdings" },
  ]

  const segmentOptions: Option[] = [
    { label: "Mutual funds", value: "mf" },
    { label: "Stocks", value: "stocks" },
    { label: "F&O", value: "fo" },
  ]

  const plOptions: Option[] = [
    { label: "Combined", value: "combined" },
    { label: "Realized", value: "realized" },
    { label: "Unrealized", value: "unrealized" },
  ]

  const getApiUrl = (type: string): string => {
    const baseUrl = "https://api.wealthup.me/api/v1/cybrilla/reports"

    switch (type) {
      case "purchase":
        return `${baseUrl}/purchase?types=all&statuses=all`
      case "redemption":
        return `${baseUrl}/redemption?types=all&statuses=all`
      case "transactions":
        return `${baseUrl}/transactions?from_date=${dateRange.start}&to_date=${dateRange.end}`
      case "capital-gains":
        return `${baseUrl}/capital-gains?from_date=${dateRange.start}&to_date=${dateRange.end}`
      case "returns":
        return `${baseUrl}/returns?from_date=${dateRange.start}&to_date=${dateRange.end}`
      case "holdings":
        return `${baseUrl}/holdings`
      default:
        return baseUrl
    }
  }

  const handleClick = (event: any, isin: any) => {
    setAnchorEl(event.currentTarget);
    setSelectedIsin(isin);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedIsin(null);
  };

  const handleBuyMore = () => {
    window.location.href = `/myaccount/transact/mutualfunds?tab=invest&isin=${selectedIsin}`
    handleClose();
  };

  const handleSell = () => {
    window.location.href = `/myaccount/transact/mutualfunds?tab=withdraw&isin=${selectedIsin}`
    handleClose();
  };

  const handleSwitch = () => {
    window.location.href = `/myaccount/transact/mutualfunds?tab=switch&isin=${selectedIsin}`
    handleClose();
  };

  const transformApiData = (data: ApiResponse | null, type: string): TableRow[] => {
    if (!data) return []

    switch (type) {
      case "purchase":
        if (!data || !data.data) return []

        const { rows, columns } = data.data

        return rows.map((row) => {
          const rowData: TableRow = {
            order_date: row[columns.indexOf("scheduled_on")] || null,
            execution_date: row[columns.indexOf("traded_on")] || null,
            scheme_name: row[columns.indexOf("scheme_name")] || null,
            amount: row[columns.indexOf("amount")] || null,
            type: row[columns.indexOf("type")] || null,
            status: row[columns.indexOf("state")] || null,
            order_id: row[columns.indexOf("id")] || null,
            folio_number: row[columns.indexOf("folio_number")] || null,
            allotted_units: row[columns.indexOf("allotted_units")] || null,
          }
          return rowData
        })
      case "redemption":
      case "transactions":
      case "capital-gains":
        if (!data.data) return []
        return data?.data.rows.map((row: any) => {
          const obj: TableRow = {}
          data.data!.columns.forEach((col: string, index: number) => {
            obj[col] = row[index]
          })
          return obj
        })
      case "returns":
        // Check for both aggregated_report and scheme_wise_report
        const reportData = data.aggregated_report?.data || data.scheme_wise_report?.data
        if (!reportData) return []

        return reportData?.rows.map((row: any) => {
          const obj: TableRow = {}
          reportData.columns.forEach((col: string, index: number) => {
            obj[col] = row[index]
          })
          return obj
        })
      case "holdings":
        if (!data || !data.folios) return [];
        let serialNumber = 1;
        return data?.folios?.flatMap((folio: any) =>
          folio?.schemes?.map((scheme: any, index: number) => {
            const investedAmount = scheme.invested_value.amount || 0;
            const currentValue = scheme.market_value.amount || 0;
            const profitAmount = currentValue - investedAmount;
            const profitPercent = investedAmount
              ? ((profitAmount / investedAmount) * 100).toFixed(2)
              : 0;
            return {
              "S.No": serialNumber++,
              scheme_name: scheme.name
                .split(" - ")[0]
                .toLowerCase()
                .replace(/\b\w/g, (char: string) => char.toUpperCase()),
              // type: scheme.type
              //   .toLowerCase()
              //   .replace(/\b\w/g, (char: string) => char.toUpperCase()),
              // sub_type: "-",
              holding_units: scheme.holdings.units.toFixed(2),
              nav: scheme.nav.value.toFixed(2),
              invested_amount: investedAmount.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
                minimumFractionDigits: 0,
              }),
              current_value: currentValue.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
                minimumFractionDigits: 0,
              }),
              profit_amount: profitAmount.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
                minimumFractionDigits: 0,
              }),
              "profit_%": `${profitPercent}%`,
              isin: scheme.isin,
            };
          })
        )
      default:
        return []
    }
  }

  // Also update the ApiResponse interface to include the new structure
  interface ApiResponse {
    data?: {
      rows: any[]
      columns: string[]
    }
    aggregated_report?: {
      data: {
        rows: any[]
        columns: string[]
      }
    }
    scheme_wise_report?: {
      data: {
        rows: any[]
        columns: string[]
      }
    }
    folios?: Array<{
      folio_number: string
      schemes: Array<{
        market_value: {
          amount: number
        }
        holdings: {
          units: number
        }
        nav: {
          value: number
        }
        [key: string]: any
      }>
    }>
  }

  const getAccessToken = (): string | null => {
    if (typeof window === 'undefined') return null;

    try {
      const tokenData = localStorage.getItem('token');
      if (!tokenData) return null;

      const parsedToken = JSON.parse(tokenData);
      return parsedToken.access_token || null;
    } catch (error) {
      console.error('Error reading access token:', error);
      return null;
    }
  };

  const handleSearch = async (): Promise<void> => {
    if (!reportType) {
      setError("Please select a report type")
      return
    }

    const accessToken = getAccessToken();
    if (!accessToken) {
      setError("No access token found")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const url = getApiUrl(reportType)
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch data")
      }
      setCurrentPage(1);
      setIsHolding(reportType === 'holdings');
      const data: ApiResponse = await response.json()
      const transformedData = transformApiData(data, reportType)
      setTableData(transformedData)
      setShowTable(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      setShowTable(false)
    } finally {
      setIsLoading(false)
    }
  }

  const getDateRange = (range: string): DateRange => {
    const today = new Date()
    let start = new Date()

    switch (range) {
      case "7d":
        start.setDate(today.getDate() - 7)
        break
      case "30d":
        start.setDate(today.getDate() - 30)
        break
      case "prevFY":
        const currentYear = today.getFullYear()
        const currentMonth = today.getMonth()
        if (currentMonth < 3) {
          start = new Date(currentYear - 2, 3, 1)
          today.setFullYear(currentYear - 1, 2, 31)
        } else {
          start = new Date(currentYear - 1, 3, 1)
          today.setFullYear(currentYear, 2, 31)
        }
        break
      case "currFY":
        if (today.getMonth() < 3) {
          start = new Date(today.getFullYear() - 1, 3, 1)
        } else {
          start = new Date(today.getFullYear(), 3, 1)
        }
        break
      default:
        start.setDate(today.getDate() - 30)
    }

    return {
      start: start.toISOString().split("T")[0],
      end: today.toISOString().split("T")[0],
    }
  }

  const handleTimeRangeClick = (range: string): void => {
    setSelectedTimeRange(range)
    const newDateRange = getDateRange(range);
    setDateRange(newDateRange)
  }


  useEffect(() => {
    handleTimeRangeClick('30d');
  }, [])

  return (
    <div className="relative">
      <HeaderNav showBtn={true} showNotification={true} whatsapp={false} beta={true} title="Reports" />
      <div className="p-4 md:p-6 max-w-[1600px] mx-auto">
        <div className="flex flex-col gap-4 mb-6 md:mb-4 border-b pb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:flex lg:flex-row gap-3 lg:gap-4 items-start lg:items-center">
            <div className="w-full md:w-48">
              <CustomDropdown
                options={reportTypes}
                placeholder="Report Type"
                value={reportType}
                onChange={(value) => setReportType(String(value))}
              />
            </div>

            {/* <div className="w-full md:w-48">
              <CustomDropdown
                options={segmentOptions}
                placeholder="Segment"
                value={segment}
                onChange={(value) => setSegment(String(value))}
              />
            </div>

            <div className="w-full md:w-48">
              <CustomDropdown
                options={plOptions}
                placeholder="P&L"
                value={plType}
                onChange={(value) => setPlType(String(value))}
              />
            </div>

            <input
              type="text"
              placeholder="eg: INFY"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              className="w-full md:w-48 px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
            />

            <div className="flex items-center gap-2 border rounded-md px-4 py-2 bg-white w-full lg:w-auto">
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange((prev) => ({ ...prev, start: e.target.value }))}
                className="outline-none w-full lg:w-auto text-sm"
              />
              <span className="text-gray-400">~</span>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange((prev) => ({ ...prev, end: e.target.value }))}
                className="outline-none w-full lg:w-auto text-sm"
              />
              <button
                className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
                onClick={() => setDateRange({ start: "", end: "" })}
              >
                ✕
              </button>
            </div> */}


            <div className="">
              <div className="flex flex-wrap gap-2">
                {["7d", "30d", "prevFY", "currFY"].map((range) => (
                  <button
                    key={range}
                    onClick={() => handleTimeRangeClick(range)}
                    className={`px-4 py-2 text-sm rounded-md whitespace-nowrap ${selectedTimeRange === range
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                  >
                    {range === "7d"
                      ? "last 7 days"
                      : range === "30d"
                        ? "last 30 days"
                        : range === "prevFY"
                          ? "prev. FY"
                          : "current FY"}
                  </button>
                ))}
              </div>
            </div>

            <button
              className={`w-full md:w-auto ${!dateRange || !reportType ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#FB7706] transition-colors'} text-white px-6 py-2 rounded-md flex items-center justify-center gap-2`}
              onClick={handleSearch}
              disabled={isLoading || !dateRange || !reportType}
            >
              <span className={`${(dateRange && reportType) && 'transform transition-transform hover:translate-x-1'}`}>
                See Report →
              </span>
            </button>
          </div>
        </div>

        {error && <div className="text-red-500 mb-4">{error}</div>}


        {showTable && tableData.length > 0 && (
          <div className="max-w-full">
            <table className="table-auto w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {Object.keys(tableData[0])
                    .filter((key) => key !== "isin")
                    .map((header) => (
                      <th
                        key={header}
                        className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {header.replace(/_/g, " ")}
                      </th>
                    ))}
                  {isHolding && (
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentData.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {Object.keys(tableData[0])
                      .filter((key) => key !== "isin")
                      .map((key, cellIndex) => (
                        <td
                          key={cellIndex}
                          className="px-4 py-2 whitespace-normal break-words text-sm text-gray-500"
                        >
                          {row[key]}
                        </td>
                      ))}
                    {isHolding && (
                      <td className="px-4 py-2 text-sm text-gray-500">
                        <MoreHorizontal
                          onClick={(e: any) => handleClick(e, row.isin)}
                          className="cursor-pointer"
                        />
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}


        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{
            style: {
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              padding: "4px",
            },
          }}
        >
          <MenuItem onClick={handleBuyMore}>Buy More</MenuItem>
          <MenuItem onClick={handleSell}>Sell</MenuItem>
          <MenuItem onClick={handleSwitch}>Switch</MenuItem>
        </Menu>

        {showTable && tableData.length === 0 && (
          <div className="text-center py-8 text-gray-500">No data available for the selected criteria</div>
        )}
        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 bg-gray-200 rounded ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-300"}`}
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 bg-gray-200 rounded ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-300"}`}
          >
            Next
          </button>
        </div>
      </div>
    </div >
  )
}