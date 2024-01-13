import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';
import Notifications from './Notifications/Notifications';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <div id="root-notifications">
      <Notifications/>
    </div>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
