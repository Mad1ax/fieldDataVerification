import React from 'react';

const KmTable = ({ currentKm, total }) => {
    // console.log('asd', Math.round(total.length/20));

	let numberOfRow = Math.round(total.length/20)
//   let totalKm = 0;

  return (
    <>
      <td className='kmTableCeil'>{currentKm.slice(2)}</td>
    </>
  );
};

export default KmTable;
