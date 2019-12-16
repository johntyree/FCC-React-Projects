import React from 'react';
import { connect } from 'react-redux';

const Display = ({ formula, result }) => {

    var display;

    if (result) {
        display = [result];
    }
    else if (formula.length) {
        display = formula[formula.length-1];
    } else {
        display = ["0"];
    }

    return (
        <div>
            <div>
                {formula.join(" ")}{result ? " = " + result : ""}
            </div>
            <div id="display">
                {display}
            </div>
        </div>
    )        
}

const mapStateToProps = (state) => {
    return {
        formula: state.summary.formula,
        result: state.summary.result,
    };
};

export default connect(
    mapStateToProps
)(Display);
