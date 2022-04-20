import React from "react";

const List = ({ currOptions, currValues }) => {
  console.log(currOptions);
  return (
    <div className="parent">
        <h1>Currencies list</h1>
      <div className="child">
        {currOptions.map((option) => (
          <div>{option}</div>
        ))}
      </div>
      <div className="child">
        {currValues.map((option) => (
          <div>{option}</div>
        ))}
      </div>
    </div>
  );
};

export default List;
