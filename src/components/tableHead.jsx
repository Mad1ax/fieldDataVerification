import React from 'react';

const TableHead = () => {
  return (
    <>
      <thead>
        <tr>
          <th>Имя трубы</th>
          <th>длина, м.</th>
          <th>точек оси трубы</th>
          <th>точек оси дороги</th>
          <th>точек бровки</th>
          <th>уклон, ‰</th>
          <th>толщина засыпки, м</th>
        </tr>
      </thead>
    </>
  );
};

export default TableHead;
