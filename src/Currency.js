import React from 'react';

const Currency = ({currOptions}) => {
    return (
        <div>
            <h1>Currency</h1>
            <input type="number" />
            <select >
                {currOptions.map(option =>(
                    <option value={option}>{option}</option>
                ))}
                
            </select>
        </div>
    );
};

export default Currency;