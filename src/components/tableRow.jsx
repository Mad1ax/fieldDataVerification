import React from 'react';

const TableRow = ({
  name,
  culvertLength,
  culvertAxisPointQuantity,
  axisHeightDifference,
  culvertSlop,
}) => {
  return (
    <>
      <tr>
        <td >труба: {name}</td>
        <td >длина: {culvertLength} м.</td>
        <td >точек оси: {culvertAxisPointQuantity}</td>
        {/* <td >разница высот: {axisHeightDifference}</td> */}
        <td >уклон: {culvertSlop} ‰</td>
      </tr>
    </>
  );
};

export default TableRow;
