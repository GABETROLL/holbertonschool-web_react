import React from 'react';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  login: {
    display: 'flex',
  },
  loginItem: {
    marginRight: 15,
  }
});

function Login() {
  return (
    <>
      <p>Login to access the full dashboard</p>
      <div className={css(styles.login)}>
        <label className={css(styles.loginItem)} htmlFor="email">Email:</label>
        <input className={css(styles.loginItem)} id="email" name="email" type="email" autoComplete="true"/>
        <label className={css(styles.loginItem)} htmlFor="password">Password:</label>
        <input className={css(styles.loginItem)} id="password" name="password" type="text"/>
        <button>OK</button>
      </div>
    </>
  );
}
Login.displayName = 'Login';
export default Login;
