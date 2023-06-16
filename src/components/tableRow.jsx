import React from 'react';

const TableRow = ({
  name,
  culvertLength,
  culvertAxisPointQuantity,
  culvertSlop,
  culvertRoadsideQuantity,
  culvertRoadAxisQuantity,
  verifiedCulvert,
}) => {

	// let classes += verifiedCulvert === true? 'bg-danger' : 'bg-info'
	// console.log(verifiedCulvert)
	let classes
	// classes +=verifiedCulvert? 'primary':'danger'
	if (!verifiedCulvert) {classes='bg-warning'}
	
  return (
    <>
      <tr className={classes}>
        <td className='mainTableCeil'>{name}</td>
        <td className='mainTableCeil'>{culvertLength}</td>
        <td className='mainTableCeil'>{culvertAxisPointQuantity}</td>
        <td className='mainTableCeil'>{culvertRoadAxisQuantity}</td>
        <td className='mainTableCeil'>{culvertRoadsideQuantity}</td>
        <td className='mainTableCeil'>{culvertSlop}</td>
      </tr>
    </>
  );
};

export default TableRow;
