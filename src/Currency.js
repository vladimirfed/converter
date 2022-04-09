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
      <h1>Currency</h1>
      <input type="number" value={amount} onChange={onChangeAmount} />
      <select value={selectCurr} onChange={onChangeCurr}>
        {currOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Currency;
