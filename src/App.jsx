import React, { useState } from 'react';
// import InputForm from './components/inputForm';

import TableRow from './components/tableRow';
import InitialTable from './components/initialTable';
import { getDistance } from 'geolib';
// import { isElementType } from '@testing-library/user-event/dist/utils';

const App = () => {
  //   const initialState = [];

  const [inputValue, setInputValue] = useState('');
  const [culvertObjects, setCulvertObjects] = useState([]);
  const [isCheckedHead, setChecked] = useState('false');
  const [pointArr, setInitialRenderArr] = useState([]);

  let testArr = [];
  let uniqCulvertsArr = [];
  let uniqKmArr = [];
  let initialRenderArr = [];

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  ///первичная загрузка данных
  const dataLoader = (e) => {
    e.preventDefault();
    console.log('load');

    testArr = inputValue.trim().split(`\n`);
    testArr.forEach((elem) => {
      initialRenderArr.push(elem.split(`,`));
    });
    setInitialRenderArr(initialRenderArr);
  };

  //   ///срендерить таблицу
  //   const initialTableGenerate = (e) => {
  //     e.preventDefault();

  //     return (
  //       <>

  //       </>
  //     );
  //   };

  ///////////////проверка данных/////////////////////
  const firstDataChecker = (e) => {
    e.preventDefault();

    // isCheckedHead
    //   ? (testArr = inputValue.trim().split(`\n`))
    //   : (testArr = inputValue.trim().split(`\n`).slice(1));

    testArr = inputValue.trim().split(`\n`);

    testArr.forEach((elem) => {
      if (elem.split(`,`)[1].split(`_`)[0].includes('tr')) {
        uniqCulvertsArr.push(elem.split(`,`)[1].split(`_`)[0]);
      }
      if (elem.split(`,`)[1].split(`_`)[0].includes('km')) {
        uniqKmArr.push(elem.split(`,`)[1].split(`_`)[0]);
      }
    });

    let setCulveret = new Set(uniqCulvertsArr);
    let filteredUniqCulvertsArr = [...setCulveret].sort((a, b) =>
      a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
    );

    let setKm = new Set(uniqKmArr);
    let filteredUniqKmArr = [...setKm].sort((a, b) =>
      a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
    );

    console.log('фильтруем и сортируем трубы и километровые');
    console.log('уникальные трубы', filteredUniqCulvertsArr);
    console.log('уникальные км', filteredUniqKmArr);

    let culvertTotalDataArr = [];
    let currentCulvertObject = {};
    let currentCulvetAxisQuantity = 0;
    let culvertCoordsObject = {};
    let culvertCoordsArray = [];
    let currentCulvertCoord1;
    let currentCulvertCoord2;
    let currentCulvertHeight1;
    let currentCulvertHeight2;

    filteredUniqCulvertsArr.forEach((uniqCulvert) => {
      testArr.forEach((elem) => {
        if (elem.split(`,`)[1].split(`_`)[0] === uniqCulvert) {
          if (elem.split(`,`)[elem.split(`,`).length - 1] === 'ось трубы') {
            currentCulvetAxisQuantity++;
            culvertCoordsObject = {
              culvertName: uniqCulvert,
              culvertPointNumber: currentCulvetAxisQuantity,
              axisPointLat: elem.split(`,`)[2],
              axisPointLong: elem.split(`,`)[3],
              axisPointHeight: elem.split(`,`)[4],
            };
            culvertCoordsArray.push(culvertCoordsObject);
          }
        }
      });
      currentCulvertObject = {
        culvertName: uniqCulvert,
        culvertLength: 0,
        culvertAxisPointQuantity: currentCulvetAxisQuantity,
        axisHeightDifference: 0,
        culvertSlope: 0,
      };

      currentCulvetAxisQuantity = 0;
      culvertTotalDataArr.push(currentCulvertObject);
    });

    filteredUniqCulvertsArr.forEach((uniqCulvert) => {
      culvertCoordsArray.forEach((point) => {
        if (
          point.culvertName === uniqCulvert &&
          point.culvertPointNumber === 1
        ) {
          currentCulvertCoord1 = {
            latitude: point.axisPointLat,
            longitude: point.axisPointLong,
          };
          currentCulvertHeight1 = point.axisPointHeight;
        }
        if (
          point.culvertName === uniqCulvert &&
          point.culvertPointNumber === 2
        ) {
          currentCulvertCoord2 = {
            latitude: point.axisPointLat,
            longitude: point.axisPointLong,
          };
          currentCulvertHeight2 = point.axisPointHeight;

          let currentCulvertLength = getDistance(
            currentCulvertCoord1,
            currentCulvertCoord2,
            0.01
          );

          culvertTotalDataArr[point.culvertName.slice(2) - 1].culvertLength =
            Number(currentCulvertLength.toFixed(3));
          culvertTotalDataArr[
            point.culvertName.slice(2) - 1
          ].axisHeightDifference = Number(
            Math.abs(currentCulvertHeight2 - currentCulvertHeight1).toFixed(3)
          );
          culvertTotalDataArr[point.culvertName.slice(2) - 1].culvertSlope =
            Number(
              (
                (Math.abs(currentCulvertHeight2 - currentCulvertHeight1) /
                  currentCulvertLength.toFixed(2)) *
                1000
              ).toFixed(2)
            );
        }
      });
    });

    console.log('массив объектов труб', culvertTotalDataArr);
    setCulvertObjects(culvertTotalDataArr);
  };

  return (
    <>
      <h1 className='m-2 border-bottom text-center'>
        Верификация данных с приёмника
      </h1>
      <form action='' id='form'>
        <div className='inputContainer p-2'>
          <textarea
            className='form-control'
            id='inputText'
            name='inputText'
            placeholder='вставь данные сюда'
            rows='10'
            value={inputValue}
            onChange={handleChange}
          ></textarea>

          <div className=' buttonContainer p-2'>
            <button className='btn btn-info m-2' onClick={dataLoader}>
              загрузить данные
            </button>

            {/* <button
              className='btn btn-primary m-2'
              id='btnTableGenerate'
              onClick={initialTableGenerate}
            >
              генерировать таблицу
            </button> */}

            <button
              className='btn btn-primary m-2'
              id='buttonTest'
              onClick={firstDataChecker}
            >
              проверить данные
            </button>
          </div>
        </div>
      </form>

      <div className='border-2 border-danger p-2'>
        <table className='table table-hover table-bordered'>
          {/* <tbody> */}
          {/* {pointArr && (<InitialTable totalData={po}in/>)} */}

          <InitialTable totalData={pointArr} />

          {/* {pointArr.map((elem) => (
              <InitialTable
                totalData={elem}
                key={elem[1]}
                id={elem[1]}
                number={elem[0]}
              />
            ))} */}
        </table>

        <table className='table table-hover table-bordered'>
          <tbody>
            {culvertObjects.map((culvert) => (
              <TableRow
                key={culvert.culvertName}
                name={culvert.culvertName}
                culvertLength={culvert.culvertLength}
                culvertAxisPointQuantity={culvert.culvertAxisPointQuantity}
                axisHeightDifference={culvert.axisHeightDifference}
                culvertSlop={culvert.culvertSlope}
              />
            ))}
            {/* </tbody> */}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default App;

//   const [columnCulvertName, setColumnCulvertName] = useState(1)
//   const [columnLatitude, setColumnLatitude] = useState(2)
//   const [columnLongtitude, setColumnLongitude] = useState(3)
//   const [columnLHeight, setColumnHeight] = useState(3)

// 2 точки оси
// длина
// уклон
// высота насыпи

//   const handleChangeName = () => {
// 	setColumnCulvertName(document.querySelector('#selected-culveret-name').value)
//   }

//   const handleChangeLatitude = () => {
// 	setColumnLatitude(document.querySelector('#selected-culveret-latitude').value)
//   }
//   const handleChangeLongitude = () => {
// 	setColumnLongitude(document.querySelector('#selected-culveret-longitude').value)
//   }
//   const handleChangeHeight = () => {
// 	setColumnHeight(document.querySelector('#selected-culveret-height').value)
//   }

{
  /* <div className='form-check'>
              <input
                className='form-check-input'
                type='checkbox'
                value=''
                id='flexCheckIndeterminate'
                onChange={() => setChecked((state) => !state)}
              />
              <label
                className='form-check-label'
                htmlFor='flexCheckIndeterminate'
              >
                Наличие шапки
              </label>
            </div>

            <div className='form-group'>
              <select
                className='form-select form-select-sm m-1'
                aria-label='.form-select-sm example'
                required
                defaultValue='имя трубы'
				id='selected-culveret-name'
				onChange={handleChangeName}
              >
                <option value=''>Имя трубы</option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
				<option value='4'>4</option>
				<option value='5'>5</option>
              </select>
            </div>

            <div className='form-group'>
              <select
                className='form-select form-select-sm m-1'
                aria-label='.form-select-sm example'
                required
                defaultValue='широта'
				id='selected-culveret-latitude'
				onChange={handleChangeLatitude}
              >
                <option value=''>Широта</option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
				<option value='4'>4</option>
				<option value='5'>5</option>
              </select>
            </div>

            <div className='form-group'>
              <select
                className='form-select form-select-sm m-1'
                aria-label='.form-select-sm example'
                required
                defaultValue='долгота'
				id='selected-culveret-longitude'
				onChange={handleChangeLongitude}
              >
                <option value=''>Долгота</option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
				<option value='4'>4</option>
				<option value='5'>5</option>

              </select>
            </div>

            <div className='form-group'>
              <select
                className='form-select form-select-sm m-1'
                aria-label='.form-select-sm example'
                required
                defaultValue='высотная отметка'
				id='selected-culveret-height'
				onChange={handleChangeHeight}
              >
                <option value=''>Высотная отметка</option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
				<option value='4'>4</option>
				<option value='5'>5</option>
              </select>
            </div> */
}
