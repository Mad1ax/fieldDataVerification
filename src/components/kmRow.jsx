import React from "react";
import KmCeil from "../kmCeil";

const KmRow = ({ currentRow }) => {
  // console.log('asd', Math.round(total.length/20));

  // let numberOfRow = Math.round(total.length/20)
  // console.log('numberOfRow', numberOfRow)
  //   let totalKm = 0;
//   console.log("currenrow", currentRow.forEach((e)=>console.log(e)));

// currentRow.forEach((e)=>console.log(e))
  return (
    <tr>
      {currentRow.map((e) => (
        <KmCeil key={e} currentKm={e}/>
      ))}
    </tr>
  );
};

export default KmRow;
