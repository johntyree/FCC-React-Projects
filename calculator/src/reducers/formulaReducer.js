import { CLEAR, CALCULATE, PRESS_OPERATOR, PRESS_DECIMAL, PRESS_NUMBER } from '../actions';
import { calculate } from '../helpers/helpers.js';

const NUMBER_RE = /^\d+(\.\d*)?$/g;

// Jesus this is fucking terrible. Should model operations as a tree.

export default function formulaReducer(summary, action) {
    if (!summary) { return {}; }
    const formula = summary.formula;
    const prev = formula.slice(0, -1);
    const current = formula[formula.length-1] || "";
    switch (action.type) {
        case PRESS_NUMBER:
            if (summary.result) {
                return formulaReducer(
                    {result: "", formula: []},
                    action
                );
            }
            if (current === "0" || current === "") {
                /// Replace the 0 with whatever was pressed
                return {...summary, formula: [...prev, action.payload]};
            }
            const is_negative = (
                    current === "-" && "+-*/".includes(prev[prev.length-1]));
            if (current.match(NUMBER_RE) || is_negative) {
                return {
                    ...summary,
                   formula: [...prev, current + action.payload],
                };
            }
            return {...summary, formula: [...formula, action.payload]};
        case PRESS_DECIMAL:
            if (summary.result) {
                return formulaReducer( {result: "", formula: []},
                    action
                );
            }
            if (current.includes(".")) {
                return summary;
            }
            if (current.match(NUMBER_RE)) {
                return {...summary, formula: [...prev, current + "."]};
            } else {
                return {...summary, formula: [...formula, "0."]};
            }
        case PRESS_OPERATOR:
            if (summary.result) {
                return formulaReducer(
                    {result: "", formula: [summary.result]},
                    action
                );
            }
            if (!formula.length) {
                return {...summary, formula: ["0", action.payload]};
            }
            if (action.payload === "-") {
                if (current === "-" && prev[prev.length-1] === "-") {
                    return summary;
                }
                return {...summary, formula: [...formula, "-"]};
            }
            if ("+*/-".includes(current)) {
                if ("+*/-".includes(prev[prev.length-1])) {
                    return {
                        ...summary,
                        formula: [...prev.slice(0, -1), action.payload]
                    };
                } else {
                    return {
                        ...summary,
                        formula: [...prev, action.payload],
                    };
                }
            }
            return {...summary, formula: [...formula, action.payload]};
        case CALCULATE:
            return {...summary, result: String(calculate(formula))};
        case CLEAR:
            return {formula: [], result: ""};
        default:
            return summary;
    }
}
