import React from 'react';
import './App.css';
import logo from './holberton-logo.jpg';
import { getFooterCopy, getFullYear } from './utils';

function App() {
  return (
    <div className="app">
      <div className="App-header">
        <img className="logo" src={logo} alt=""/>
        <h1>School dashboard</h1>
      </div>
      <div className="App-body">
        <p>Login to access the full dashboard</p>
        <div className="login">
          <label htmlFor="email">Email:</label>
          <input id="email" name="email" type="email"/>
          <label htmlFor="password">Password:</label>
          <input id="password" name="password" type="text"/>
          <button>OK</button>
        </div>
      </div>
      <div className="App-footer">
        <p>Copyright { getFullYear() } - { getFooterCopy(true) }</p>
      </div>
    </div>
  );
}

export default App;
