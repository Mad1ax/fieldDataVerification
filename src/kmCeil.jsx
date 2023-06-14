import React from "react";

const KmCeil = ({ currentKm }) => {

//   console.log("currenrow", currentRow);

  return (
    // <tr>
    //   {currentRow.forEach((e) => {
    //     <td>{e.slice(2)}</td>;
    //   })}
    // </tr>
    <td>{currentKm.slice(2)}</td>
  );
};

export default KmCeil;
