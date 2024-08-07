import React from 'react';
import ReactDOM from 'react-dom';
// redux
import { applyMiddleware, createStore, compose } from 'redux';
import { thunk } from 'redux-thunk';
import { Provider } from 'react-redux';
import rootReducer from './reducers/rootReducer';
// import middleware
// react
import App from './App/App';
import reportWebVitals from './reportWebVitals';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
