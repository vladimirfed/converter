import React from "react";

const Currency = ({
  currOptions,
  selectCurr,
  onChangeCurr,
  amount,
  onChangeAmount,
}) => {
  return (
    <div>
      
      <input className="select" type="number" value={amount} onChange={onChangeAmount} />
      <select className="select" value={selectCurr} onChange={onChangeCurr}>
        {currOptions.map((option) => (
          <option className="options" key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Currency;
