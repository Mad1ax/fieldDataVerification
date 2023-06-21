import React, { useState } from 'react';

const InfoBlock = () => {
  const [collapsedBlock, setCollapsedBlock] = useState(true);
  // let bool;

  let classes;
  const getClasses = () => {
    collapsedBlock ? (classes = 'card-body collapse') : (classes = 'card-body');
    return classes;
  };

  return (
    <>
      <div id='accordion'>
        <div className='card'>
          <div className='card-header' id='headingOne'>
            <h5 className='mb-0'>
              <button
                className='btn btn-link'
                data-toggle='collapse'
                data-target='#collapseOne'
                aria-expanded='true'
                aria-controls='collapseOne'
                onClick={() => setCollapsedBlock((bool) => !bool)}
                type='button'
              >
                <span className='fw-bold text-primary'>Справка</span>
              </button>
            </h5>
          </div>

          <div
            id='collapseOne'
            className='collapse show'
            aria-labelledby='headingOne'
            data-parent='#accordion'
          >
            <div className={getClasses()} id='collapseTarget'>
              {/* <h6 className='font-weight-bold'> */}
              <p className='fs-6'>
                Колонки исходных данных должны располагаться в следующем
                порядке:
              </p>
              {/* </h6> */}
              <ol className='list-group list-group-numbered'>
                <li className='list-group-item'>№</li>
                <li className='list-group-item'>Имя трубы</li>
                <li className='list-group-item'>Широта</li>
                <li className='list-group-item'>Долгота</li>
                <li className='list-group-item'>Высотная отметка</li>
                <li className='list-group-item'>Тип точки</li>
              </ol>
              <h6 className='font-weight-bold'> Разделитель - запятая</h6>

              <p className='fs-6'>Труба считается провереной, если имеет:</p>
              <ol className='list-group'>
                <li className='list-group-item'>2 точки оси</li>
                <li className='list-group-item'>2 точки бровки</li>
                <li className='list-group-item'>1 точка оси дороги</li>
                <li className='list-group-item'>длина 3-100 метров</li>
                <li className='list-group-item'>уклон до 600‰</li>
				{/* <li className='list-group-item'>высота насыпи 5см+</li> */}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoBlock;
