import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import counterReducer from './store/reducers/counter';
import resultReducer from './store/reducers/result';
import thunk from 'redux-thunk';
import { loadState, saveState } from './store/storeServices';


// Middleware
const loggerMiddleware1 = store => {
  return next => {
    return action => {
      console.log('[Middleware]1 dispatching', action)
      next(action)
      console.log("1", store.getState())
    }
  }
}

const loggerMiddleware2 = store => {
  return next => {
    return action => {
      console.log('[Middleware]2 dispatching', action)
      next(action)
      console.log("2", store.getState())
    }
  }
}

const rootReducer = combineReducers({
  ctr: counterReducer,
  res: resultReducer
})

// redux dev tool
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistState = loadState();

const logger = createLogger();

// ใช้ logger เป็น middleware ช่วยแสดงความเปลี่ยนแปลงของ redux store
const store = createStore(
  rootReducer, 
  persistState,
  composeEnhancers(applyMiddleware(loggerMiddleware1, loggerMiddleware2, thunk))
);

// persistState โหลดใหม่ ข้อมูลไม่หาย
store.subscribe(() => {
  saveState(store.getState());
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
