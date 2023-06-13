import React from 'react';

const TableRow = ({
  name,
  culvertLength,
  culvertAxisPointQuantity,
  axisHeightDifference,
  culvertSlop,
  culvertRoadsideQuantity,
  culvertRoadAxisQuantity,
}) => {
  return (
    <>
      <tr>
        <td className='mainTableCeil'>{name}</td>
        <td className='mainTableCeil'>{culvertLength}</td>
        <td className='mainTableCeil'>{culvertAxisPointQuantity}</td>
        <td className='mainTableCeil'>{culvertRoadAxisQuantity}</td>
        <td className='mainTableCeil'>{culvertRoadsideQuantity}</td>
        {/* <td >разница высот: {axisHeightDifference}</td> */}
        <td className='mainTableCeil'>{culvertSlop}</td>
      </tr>
    </>
  );
};

export default TableRow;
