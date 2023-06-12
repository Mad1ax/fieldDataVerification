import React from 'react';

const InitialTableHead = ({ totalData }) => {
  // console.log(totalData[0].length)
  let curArr = totalData[0];

  return (
    curArr && (
      <tr>
        {totalData[0].map((elem) => (
          <th>
            <div className='form-group'>
              <select
                className='form-select form-select-sm m-1'
                aria-label='.form-select-sm example'
                required
                defaultValue='имя трубы'
                id='selected-culveret-name'
              >
                <option value='0'>Выбери значение</option>
                <option value='1'>Имя трубы</option>
                <option value='2'>Широта</option>
                <option value='3'>Долгота</option>
                <option value='4'>Высотная отметка</option>
                <option value='5'>Тип точки</option>
              </select>
            </div>
          </th>
        ))}
      </tr>
    )
  );
};

export default InitialTableHead;

// {totalData.map((elem) => (
// 	<tr>
// 	  {elem.map((e) => (
// 		<InitialTableRow data={e} />
// 	  ))}
// 	</tr>
//   ))}

{
  /* <div className='form-group'>
<select
  className='form-select form-select-sm m-1'
  aria-label='.form-select-sm example'
  required
  defaultValue='имя трубы'
  id='selected-culveret-name'
>
  <option value=''>Имя трубы</option>
  <option value='1'>1</option>
  <option value='2'>2</option>
  <option value='3'>3</option>
  <option value='4'>4</option>
  <option value='5'>5</option>
</select>
</div> */
}
