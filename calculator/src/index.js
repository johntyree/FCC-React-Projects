import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import App from './components/App';
import reducers from './reducers';

var action_count = 0;

const actionLogger = ({ getState }) => next => action => {
  const ac = action_count;
  action_count += 1;
  console.log('START', ac, action);
  const ret = next(action);
  console.log('END  ', ac, getState());
  return ret;
}

const initialState = {
  summary: {formula: [], result: ""},
  display: "0",
};

const middleware = applyMiddleware(actionLogger);
const store = createStore(reducers, initialState, middleware);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector('#root')
)
