import React from 'react';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  login: {
    display: 'flex',
  },
});

function Login() {
  return (
    <>
      <p>Login to access the full dashboard</p>
      <div className={css(styles.login)}>
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" autoComplete="true"/>
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="text"/>
        <button>OK</button>
      </div>
    </>
  );
}
Login.displayName = 'Login';
export default Login;
