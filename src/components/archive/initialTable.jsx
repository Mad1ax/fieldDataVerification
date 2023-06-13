import React from 'react';
import InitialTableRow from './initialTableRow';
import InitialTableHead from './initialTableHead';

const InitialTable = ({ number, id, totalData }) => {
//   let curArr = totalData;
  // console.log(totalData)

  return (
    <>
	<thead>
      <InitialTableHead totalData={totalData}/>
	  </thead>
	  <tbody>
      {totalData.map((elem) => (
        <tr>
          {elem.map((e) => (
            <InitialTableRow data={e} />
          ))}
        </tr>
      ))}
	  </tbody>
    </>
  );
};

export default InitialTable;
