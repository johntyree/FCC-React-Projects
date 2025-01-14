import React from 'react';
import { connect } from 'react-redux';
import { clear, calculate, pressDecimal, pressNumber, pressOperator } from '../actions';

const Key = ({keyType, clear, calculate, pressDecimal, pressNumber, pressOperator}) => {
    const btnClass = keyType.type || "";

    const handleClick = (event) => {
        const elType = event.target.dataset.type;
        let key = event.target.value;

        if (elType === "number") {
            pressNumber(key);
        }
        else if (elType === "all-clear") {
            clear();
        }
        else if (elType === "decimal-symbol") {
            pressDecimal();
        }
        else if (elType === "operator") {
            if (key === "x") {
                key = "*";
            }
            pressOperator(key);
        }
        else {
            calculate();
        }
            
    };

    return (
        <div className={`${btnClass}`}>
            <button 
                id={keyType.name}
                className="ui button"
                value={keyType.value}
                onClick={handleClick}
                data-type={keyType.type}
            >
                {keyType.value}
            </button>
        </div>
    )
}



export default connect(
    null,
    { 
      clear,
      calculate,
      pressDecimal,
      pressNumber,
      pressOperator,
    }
)(Key);
