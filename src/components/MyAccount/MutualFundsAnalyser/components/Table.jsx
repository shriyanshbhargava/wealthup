import React from 'react'

export const formatNumber = (number, decimals=1) => {
  const num = new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: decimals,
      minimumFractionDigits:decimals
    }).format(number)
  return num;
}

export const titleCase = (data) => {
  return data.toLowerCase().split(' ').map((word) => {
    return (word.charAt(0).toUpperCase() + word.slice(1));
}).join(' ');
}

export const TableHeader = ({header,alignLeft=[],alignRight=[],headerStyles,missedGains=false}) => {
  return(
    <thead className='bg-primary-blue text-white '>
          <tr className='py-6 rounded-lg'>
            {header.map((item, index) => (
              <th key={index} className={`text-lg font-medium py-3 ${headerStyles}  ${alignLeft.includes(item) ? "text-left " : alignRight.includes(item) ? 'text-right ' : 'text-left '} ${item === "Volatility" ? "pl-16" : ""}`}>
                  <p className='my-0 p-0 text-lg font-medium m-auto whitespace-pre-line'>{item}</p>
              </th>
            ))}
            {missedGains && 
              <th colSpan={3} className=''>
                <h5 className='pt-4 text-lg font-medium'>Missed Gains (per year)</h5>
                <div className="h-[0.1rem] block w-full bg-white"></div>
                <ol className='flex ol'>
                  <li className='basis-1/3 tl text-lg font-medium text-right p-4 flex justify-end'>1 Year</li>
                  <li className='basis-1/3 tl text-lg font-medium text-right p-4 flex justify-end'>2 Years</li>
                  <li className='basis-1/3 tl text-lg font-medium text-right p-4 flex justify-end'>3 Years</li>
                </ol>
                </th>
              }
          </tr>
    </thead>
  )
}

export const TableBody = ({rowdata, total}) => {
  return(
      <tbody>
        {rowdata?.map((row, index1)=>(
            <tr key={index1} className={`${index1%2 === 0 ? 'bg-white' : 'bg-[#99e0e0]'} text-primary-blue`}>
                {row.name &&<td  className={`tabledata text-left`}>
                    <p className='w-full'>{row.name}</p>
                </td>}
                {row.title !== undefined && <td  className={`tabledata text-left`}>
                    <p className='w-full'>{row.title}</p> 
                </td>}
                {row.fund_name !== undefined  &&
                  <td  className={`text-left tabledata `}>
                      <p className='w-full '>{titleCase(row.fund_name)}</p> 
                  </td>
                }
                {(row.current_value !==undefined) &&<td  className={`tabledata text-right`}>
                    <p className='font-normal'><span style={{fontFamily:'sans-serif'}}>₹</span>{formatNumber(row.current_value,0) || 0}</p>
                </td>}
                {row.amount !== undefined &&
                  <td  className={`tabledata text-right`}>
                      <p className='font-normal'><span style={{fontFamily:'sans-serif'}}>₹</span> {formatNumber(row.amount,0)}</p> 
                  </td>
                }
                {(row.percentage !==undefined) &&<td  className={`tabledata text-right`}>
                    <p className='w-full font-normal'> {formatNumber(row.percentage,1) || 0}%</p>
                </td>}
                {row.volatilty_relative_to_market !== undefined &&
                  <td  className={`text-left tabledata`} style={{ paddingLeft: '4rem' }}>
                      <p className='w-full font-normal'>{row.volatilty_relative_to_market}</p> 
                  </td>
                }
                {row.asset_class &&
                  <td  className={`tabledata text-right`}>
                      <p className='w-full font-normal'>{row.asset_class}</p> 
                  </td>
                }
                {row.funds &&
                  <td  className={`tabledata text-right`}>
                      <p className='w-full font-normal'>{row.funds}</p> 
                  </td>
                }
            </tr>
        ))}
        {total}
      </tbody>
  )
}

const PortfolioTable = ({header, rowdata, alignLeft,alignRight,headerStyles, missedGains=false, total}) => {
  return (
      <table className={`w-full px-4`}>
        <TableHeader header={header} alignLeft={alignLeft} alignRight={alignRight} missedGains={missedGains} headerStyles={headerStyles} />
        <TableBody rowdata={rowdata} total={total} />
      </table>
  )
}

export default PortfolioTable
