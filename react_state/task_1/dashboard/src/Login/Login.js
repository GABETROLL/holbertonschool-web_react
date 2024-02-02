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

class Login extends React.Component {
  static displayName = 'Login';

  constructor(props) {
    super(props);
    this.state = { isLoggedIn: false, email: '', password: '', enableSubmit: false };
    this.shouldEnableSubmit = this.shouldEnableSubmit.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
  }

  shouldEnableSubmit(email, password) {
    return (
      typeof email === 'string' && email.length > 0
      && typeof password === 'string' && password.length > 0
    );
  }

  handleChangeEmail(event) {
    // console.log(`Setting state email: ${event.target.value}`);
    const email = event.target.value;
    this.setState(state => ({
      email,
      enableSubmit: this.shouldEnableSubmit(email, state.password),
    }));
  }

  handleChangePassword(event) {
    // console.log(`Setting state password: ${event.target.value}`);
    const password = event.target.value;
    this.setState(state => ({
      password,
      enableSubmit: this.shouldEnableSubmit(state.email, password),
    }));
  }

  handleLoginSubmit(event) {
    // console.log('SUBMITTED');
    event.preventDefault();
    this.setState({ isLoggedIn: true });
  }

  render () {
    // console.log('Rendering `Login` component with states:', this.state);
    return (
      <>
        <p>Login to access the full dashboard</p>
        <form className={css(styles.login)} onSubmit={this.handleLoginSubmit}>
          <div className={css(styles.loginRow)}>
            <label className={css(styles.loginItem)} htmlFor="email">Email:</label>
            <input className={css(styles.loginTextInput)} id="email" name="email" type="email" value={this.state.email} onChange={this.handleChangeEmail} autoComplete="true"/>
          </div>
          <div className={css(styles.loginRow)}>
            <label className={css(styles.loginItem)} htmlFor="password">Password:</label>
            <input className={css(styles.loginTextInput)} id="password" name="password" type="password" value={this.state.password} onChange={this.handleChangePassword} />
          </div>
          <input className={css(styles.loginButton)} type="submit" value="OK"
            disabled={!this.state.enableSubmit}
          />
        </form>
      </>
    );
  }
}
export default Login;
