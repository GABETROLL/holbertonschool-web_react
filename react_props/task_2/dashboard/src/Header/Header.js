import React from 'react';
import logo from '../assets/holberton-logo.jpg';
import './Header.css';

export default function Header() {
  return (
    <div className="App-header">
      <img className="logo" src={logo} alt=""/>
      <h1>School dashboard</h1>
    </div>
  );
}
