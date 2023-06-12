import React, { useState } from 'react';
import FuncButton from './funcButton';
// import "bootstrap/dist/css/bootstrap.css"

const InputForm = ({ onDataConvertion }) => {
  const { form } = document.forms;
  let testArr = [];

  const dataChecker = () => {
    testArr = form.elements.inputText.value.split(`\n`);
    console.log('asd');
  };

  return (
    <div className='inputContainer border border-2 border-danger p-2'>
      <textarea
        id='inputText'
        name='inputText'
        placeholder='вставь данные сюда'
      ></textarea>

      <div className='buttonContainer'>
        <button
          className='btn stn-sm btn-danger m-2'
          onClick={onDataConvertion}
        >
          test1
        </button>
        <button
          className='btn stn-sm btn-danger m-2'
          onClick={() => dataChecker()}
        >
          test2
        </button>
      </div>
    </div>
  );
};

// const InputForm = ({onResetAll,buttons,onReset,onIncrement,onDelete}) => {

//   return (
//     <>
//       <div className="inputContainer border border-2 border-danger p-2">
//         <textarea
//           id="inputText"
//           name="inputText"
//           placeholder="вставь данные сюда"
//         ></textarea>

//         <div className="buttonContainer">
//           <button className="btn stn-sm btn-danger m-2"
//           onClick={onResetAll}>сбросить всё</button>
//           {buttons.map((button) => (
//             <FuncButton
//               key={button.id}
//               {...button}
//               onIncrement={onIncrement}
//               onReset={onReset}
//               onDelete={onDelete}
//             />
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

export default InputForm;
