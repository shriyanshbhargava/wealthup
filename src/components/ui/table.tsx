import React from 'react';

interface CellProps {
  text: string | number;
  number?: number;
  isPercentage?: boolean;
  missedGains?: boolean;
  span?: number;
  right?: boolean;
  left?: boolean;
}

const TableCell: React.FC<CellProps & { alternate?: boolean, heading?: boolean, lastThree?: boolean, empty?: boolean }> = ({ text, number, isPercentage, lastThree, span = 1, left, right, alternate, heading, missedGains, empty }) => (
  heading ? <th className={`${left ? 'text-left' : right ? 'text-right' : 'text-center'} ${(empty && heading) ? "px-4 pt-4 pb-0": missedGains ? "px-4 pt-0 pb-4" : lastThree ? 'px-4 pt-0' : "p-4"} ${heading ? "text-white" : "text-primary-blue"} ${text === "Missed Gains (per year)" ? "border-b-2 border-white" : ""} text-lg font-medium`} colSpan={span}>
  {typeof text === "number" ? 
      <>
          <span className={`${left ? 'text-left' : right ? 'text-right' : 'text-center'}`}>{isPercentage ? `${text}%` : text}</span>
      </>
  : text}
  {number && <><br/><span className={`${left ? 'text-left' : right ? 'text-right' : 'text-center'}`}>{isPercentage ? `${number}%` : number}</span></>}
</th> : <td className={`${left ? 'text-left' : right ? 'text-right' : 'text-center'} ${alternate ? "bg-[#99e0e0]" : ""} ${heading ? "text-white" : "text-primary-blue"} p-4 text-lg`} colSpan={span}>
    {typeof text === "number" ? 
        <>
            <span className={`${left ? 'text-left' : right ? 'text-right' : 'text-center'}`}>{isPercentage ? `${text}%` : text}</span>
        </>
    : text}
    {number && <><br/><span className={`${left ? 'text-left' : right ? 'text-right' : 'text-center'}`}>{isPercentage ? `${number}%` : number}</span></>}
  </td>
);

interface TableProps {
  headers: CellProps[];
  subHeaders?: CellProps[];
  rows: CellProps[][];
  missedGains?: boolean;
}

const Table: React.FC<TableProps> = ({ headers, subHeaders, rows, missedGains }) => (
  <table className="w-full px-4">
    <thead className='bg-primary-blue'>
      <tr>
        {headers.map((header, index) => 
          <TableCell 
            key={index} 
            {...header} 
            heading={true} 
            empty={missedGains}
          />
        )}
      </tr>
      {missedGains && subHeaders && 
        <tr>
          {subHeaders.map((subHeader, index) => 
            <TableCell 
              key={index} 
              {...subHeader} 
              heading 
              missedGains
              lastThree={index > (subHeaders.length - 3)}
            />
          )}
        </tr>
      }
    </thead>
    <tbody>
      {rows.map((row, rowIndex) => (
        <tr key={rowIndex}>
          {row.map((cell, cellIndex) => <TableCell key={cellIndex} {...cell} alternate={(rowIndex + 1) % 2 === 0} />)}
        </tr>
      ))}
      <tr>
        <td colSpan={missedGains ? subHeaders?.length : headers.length}><hr /></td>
      </tr>
      <tr>
        {/* Add the total row here */}
      </tr>
    </tbody>
  </table>
);

export default Table;

