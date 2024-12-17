import React, { useState } from 'react';
import { getDistance } from 'geolib';
import _ from 'lodash';

import TableRow from './components/tableRow';
import TableHead from './components/tableHead';
import KmRow from './components/kmRow';
import InfoBlock from './components/infoBlock';

//загрузка тогоже файла
//loader
//проверка на наличие данных в инпуте
//отправка данных

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [culvertObjects, setCulvertObjects] = useState([]);
  const [kmMarkerArr, setKmMarkerArr] = useState([]);
  const [kmMarkerArrComponent, setKmMarkerArrComponent] = useState([]);
  const [infoBlock, setInfoBlock] = useState(false);
  const [kmMarkerArea, setKmMarkerArea] = useState([]);
  const [numberVerifiedCulverts, setNumberVerifiedCulverts] = useState(0);
  const [isFileLoaded, setFileLoaded] = useState(false);
  const [loadedFileName, setLoadedFileName] = useState('');

  let dataArr = [];
  let uniqCulvertsArr = [];
  let uniqKmArr = [];
  let filteredUniqCulvertsArr = [];
  let filteredUniqKmArr = [];

  //отслеживание изменения textarea
  const handleChange = (e) => setInputValue(e.target.value);

  //обработка и проверка данных
  const firstDataChecker = () => {
    // проверка на наличие шапки
    inputValue.trim().split(`\n`)[0].split(`,`)[1].substr(0, 2) === 'tr' ||
    inputValue.trim().split(`\n`)[0].split(`,`)[1].substr(0, 2) === 'km'
      ? (dataArr = inputValue.trim().split(`\n`))
      : (dataArr = inputValue.trim().split(`\n`).slice(1));

    //поиск уникальных труб и км
    dataArr.forEach((elem) => {
      if (elem.split(`,`)[1].split(`_`)[0].includes('tr')) {
        uniqCulvertsArr.push(elem.split(`,`)[1].split(`_`)[0]);
      }
      if (elem.split(`,`)[1].split(`_`)[0].includes('km')) {
        uniqKmArr.push(elem.split(`,`)[1].split(`_`)[0]);
      }
    });

    //фильтрация и сортировка массивов уникальных труб и км
    let setCulveret = new Set(uniqCulvertsArr);
    filteredUniqCulvertsArr = [...setCulveret].sort((a, b) =>
      a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
    );

    let setKm = new Set(uniqKmArr);
    filteredUniqKmArr = [...setKm].sort((a, b) =>
      a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
    );

    console.log('уникальные трубы', filteredUniqCulvertsArr);
    console.log('уникальные км', filteredUniqKmArr);

    //установка участка километровых столбов
    setKmMarkerArr(filteredUniqKmArr);
    if (filteredUniqKmArr.length > 0) {
      setKmMarkerArea([
        filteredUniqKmArr[0],
        filteredUniqKmArr[filteredUniqKmArr.length - 1],
      ]);
    } else {
      setKmMarkerArea([]);
    }

    //создание 2-мерного массива км-знаков для передачи в компонент
    let firstLevelKmArr = [];
    let totalKmArr = [];
    for (let i = 0; i <= Math.ceil(filteredUniqKmArr.length / 20); i++) {
      firstLevelKmArr = _.slice(filteredUniqKmArr, [20 * i], [20 * (i + 1)]);
      totalKmArr.push(firstLevelKmArr);
    }
    setKmMarkerArrComponent(totalKmArr);

    let culvertTotalDataArr = [];
    let currentCulvertObject = {};
    let currentCulvetAxisQuantity = 0;
    let culvertCoordsObject = {};
    let culvertCoordsArray = [];
    let currentCulvertCoord1;
    let currentCulvertCoord2;
    let currentCulvertHeight1;
    let currentCulvertHeight2;
    let currentCulvetRoadAxisQuantity = 0;
    let currentCulvetRoadsideQuantity = 0;
    // let currentCulvertRoadAxisHeight = 0;
    let currentCulvertRoadHightMarker = 0;
    let verifiedCulverts = 0;
    let culvertIndex;

    //создание массива с данными по трубам
    filteredUniqCulvertsArr.forEach((uniqCulvert) => {
      dataArr.forEach((elem) => {
        if (elem.split(`,`)[1].split(`_`)[0] === uniqCulvert) {
          if (elem.split(`,`)[5].includes('ось трубы')) {
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

          if (elem.split(`,`)[5].includes('ось дороги')) {
            currentCulvetRoadAxisQuantity++;
            currentCulvertRoadHightMarker = Number(elem.split(`,`)[4]);
            // console.log(currentCulvertRoadAxisHeight);
          }
          if (elem.split(`,`)[5].includes('бровка')) {
            currentCulvetRoadsideQuantity++;
          }
        }
      });

      currentCulvertObject = {
        culvertName: uniqCulvert,
        culvertLength: 0,
        culvertAxisPointQuantity: currentCulvetAxisQuantity,
        culvertRoadsideQuantity: currentCulvetRoadsideQuantity,
        culvertRoadAxisQuantity: currentCulvetRoadAxisQuantity,
        axisHeightDifference: 0,
        culvertSlope: 0,
        // culvertHeightFill: 0,
        culvertRoadAxisHeight: currentCulvertRoadHightMarker,
        culvertGroundHeight: 0,
        isVerifiedCulvert: false,
      };

      currentCulvetAxisQuantity = 0;
      currentCulvetRoadAxisQuantity = 0;
      currentCulvetRoadsideQuantity = 0;
      culvertTotalDataArr.push(currentCulvertObject);
    });

    //обновляем данные в созданном массиве труб
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

          let currentCulvertGroundHeight = 0;

          culvertIndex = _.indexOf(filteredUniqCulvertsArr, uniqCulvert);

          culvertTotalDataArr[culvertIndex].culvertLength = Number(
            currentCulvertLength.toFixed(3)
          );

          //высота насыпи
          // culvertTotalDataArr[culvertIndex].culvertGroundHeight = (
          //   currentCulvertRoadHightMarker -
          //   (Number(currentCulvertHeight1) + Number(currentCulvertHeight2)) / 2
          // ).toFixed(2);

          // console.log(currentCulvertRoadHightMarker);
          // console.log(culvertRoadAxisHeight);
          // console.log(culvertGroundHeight);

          // console.log(
          //   'h',
          //   (
          //     culvertTotalDataArr[culvertIndex].culvertGroundHeight -
          //     (Number(currentCulvertHeight1) + Number(currentCulvertHeight2)) /
          //       2
          //   ).toFixed(2)
          // );

          //расчет разницы высотных отметок
          culvertTotalDataArr[culvertIndex].axisHeightDifference = Number(
            Math.abs(currentCulvertHeight2 - currentCulvertHeight1).toFixed(3)
          );

          //расчет уклона трубы по оси
          culvertTotalDataArr[culvertIndex].culvertSlope = Number(
            (
              (Math.abs(currentCulvertHeight2 - currentCulvertHeight1) /
                currentCulvertLength.toFixed(2)) *
              1000
            ).toFixed(2)
          );

          //vis nas
          culvertTotalDataArr[culvertIndex].culvertGroundHeight = (
            culvertTotalDataArr[culvertIndex].culvertRoadAxisHeight -
            (Number(currentCulvertHeight1) + Number(currentCulvertHeight2)) / 2
          ).toFixed(2);

          //верификация текущей трубы
          if (
            currentCulvertLength > 3 &&
            currentCulvertLength < 100 &&
            culvertTotalDataArr[culvertIndex].culvertSlope < 600 &&
            culvertTotalDataArr[culvertIndex].culvertAxisPointQuantity === 2 &&
            culvertTotalDataArr[culvertIndex].culvertRoadsideQuantity >= 2 &&
            culvertTotalDataArr[culvertIndex].culvertRoadAxisQuantity >= 1
          ) {
            culvertTotalDataArr[culvertIndex].isVerifiedCulvert = true;
            verifiedCulverts += 1;
          }
        }
      });
    });

    setNumberVerifiedCulverts(verifiedCulverts);
    verifiedCulverts = 0;
    console.log('массив объектов труб', culvertTotalDataArr);
    setInfoBlock(true);
    setCulvertObjects(culvertTotalDataArr);
  };

  //очистка содержимого
  const inputClear = () => {
    setInputValue('');
    setInfoBlock(false);
    setFileLoaded(false);
  };

  //загрузка текстового файла
  const fileLoader = (event) => {
    setFileLoaded(true);
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.onload = function (event) {
      let currentTextareaValue = event.target.result;
      setInputValue('');
      setInputValue(currentTextareaValue);
    };

    console.log('загружаю файл', file.name);
    setLoadedFileName(file.name);
    reader.readAsText(file);
  };

  //   let sendData = () => console.log('sending');

  let sendData = () => {
    navigator
      .share({
        title: `123`,
        text: `${JSON.stringify(inputValue)}`,
      })
      .then(() => {
        console.log('список труб отправлен');
      })
      .catch((err) => {
        console.log('что-то пошло не так');
      });
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
            placeholder='>>вставь данные сюда или выбери текстовый файл<<'
            rows='10'
            value={inputValue}
            onChange={handleChange}
          ></textarea>

          <div className=' buttonContainer p-2'>
            <div className='spanContainer'>
              <label className='input-file'>
                <input
                  type='file'
                  className='form-control'
                  id='inputGroupFile04'
                  aria-describedby='inputGroupFileAddon04'
                  onChange={fileLoader}
                  aria-label='Upload'
                />
                <span id='spanButton' className='bg-primary'>
                  выбрать файл
                </span>
              </label>
            </div>
            {isFileLoaded && (
              <div className='font-weight-bold'>загружен {loadedFileName}</div>
            )}

            <button
              className='btn btn-primary m-2 border-secondary'
              id='func-buttons'
              type='button'
              onClick={firstDataChecker}
            >
              проверить данные
            </button>

            <button
              className='btn btn-warning m-2 border-secondary'
              id='func-buttons'
              type='button'
              onClick={sendData}
            >
              отправить данные
              {/* <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                fill='currentColor'
                className='bi bi-send float-md-end m-1'
                viewBox='0 0 16 16'
              >
                <path d='M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z' />
              </svg> */}
            </button>

            <button
              className='btn btn-info m-2 border-secondary'
              type='button'
              id='func-buttons'
              onClick={inputClear}
            >
              очистить данные
            </button>
            <InfoBlock />
          </div>
        </div>
      </form>

      {infoBlock && (
        <div>
          <div className='border-2 border-danger p-2'>
            <h5>
              Километровые столбы: {kmMarkerArr.length} шт.{' '}
              {kmMarkerArea.length === 2 && (
                <div>
                  На участке {kmMarkerArea[0].slice(2)}-
                  {kmMarkerArea[1].slice(2)}
                </div>
              )}
            </h5>
            <table className='table table-hover table-bordered km-table'>
              <tbody>
                {kmMarkerArrComponent.map((elem) => (
                  <KmRow key={elem} currentRow={elem} />
                ))}
              </tbody>
            </table>
          </div>

          <div className='border-2 border-danger p-2'>
            <h5>
              Водопропускные трубы: {culvertObjects.length} шт.
              {numberVerifiedCulverts > 0 ? (
                <div>Верифицированны: {numberVerifiedCulverts} шт.</div>
              ) : (
                <div>Верифицированных труб нет</div>
              )}
            </h5>

            <table className='table table-hover table-bordered'>
              <TableHead />
              <tbody>
                {culvertObjects.map((culvert) => (
                  <TableRow
                    key={culvert.culvertName}
                    name={culvert.culvertName}
                    culvertLength={culvert.culvertLength}
                    culvertAxisPointQuantity={culvert.culvertAxisPointQuantity}
                    axisHeightDifference={culvert.axisHeightDifference}
                    culvertSlop={culvert.culvertSlope}
                    culvertRoadsideQuantity={culvert.culvertRoadsideQuantity}
                    culvertRoadAxisQuantity={culvert.culvertRoadAxisQuantity}
                    // culvertGroundHeight={culvert.culvertGroundHeight}
                    culvertGroundHeight={culvert.culvertGroundHeight}
                    verifiedCulvert={culvert.isVerifiedCulvert}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
