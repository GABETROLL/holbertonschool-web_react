import React from 'react';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  login: {
    display: 'flex',
    '@media (max-width: 900px)': {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },
  loginRow: {
    display: 'flex',
  },
  loginItem: {
    marginRight: 15,
  },
  loginTextInput: {
    border: 'none',
  },
  loginButton: {
    fontSize: 18,
    padding: '7px 12px',
    background: 'transparent',
    border: 'none',
    outlineColor: 'orange',
  },
});

function Login() {
  return (
    <>
      <p>Login to access the full dashboard</p>
      <div className={css(styles.login)}>
        <div className={css(styles.loginRow)}>
          <label className={css(styles.loginItem)} htmlFor="email">Email:</label>
          <input className={css(styles.loginTextInput)} id="email" name="email" type="email" autoComplete="true"/>
        </div>
        <div className={css(styles.loginRow)}>
          <label className={css(styles.loginItem)} htmlFor="password">Password:</label>
          <input className={css(styles.loginTextInput)} id="password" name="password" type="text"/>
        </div>
        <button className={css(styles.loginButton)}>OK</button>
      </div>
    </>
  );
}
Login.displayName = 'Login';
export default Login;
