import React from 'react';
import './Login.css';

export default function Login() {
  return (
    <>
      <p>Login to access the full dashboard</p>
      <div className="login">
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" autoComplete="true"/>
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="text"/>
        <button>OK</button>
      </div>
    </>
  );
}
