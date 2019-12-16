import { combineReducers } from 'redux';
import displayReducer from './displayReducer';
import formulaReducer from './formulaReducer';

export default combineReducers({
    display : displayReducer,
    summary : formulaReducer
})
