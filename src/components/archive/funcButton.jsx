import React from "react";

const FuncButton = ({id,name,value,onIncrement,onDelete,onReset}) => {


  return (
    <>
      <h3>{name}</h3>
      <span>value:{value}</span>
      <div>
        <button
          onClick={() => onIncrement(id)}
          className="btn btn-sm m-1 bg-info"
        >
          inc
        </button>
        <button
          onClick={() => onReset(id)}
          className="btn btn-sm m-1 bg-info"
        >
          res
        </button>
        <button
          className="btn btn-danger btn-sm m-1"
          onClick={()=>onDelete(id)}
        >
          del
        </button>
      </div>
    </>
  );
};

export default FuncButton;
