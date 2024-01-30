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
    this.state = { isLoggedIn: false, email: '', password: '' };
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
  }

  handleChangeEmail(event) {
    console.log(`Setting state with new value: { email: ${event.target.value} }`);
    this.setState({ email: event.target.value });
  }

  handleChangePassword(event) {
    console.log(`Setting state with new value: { password: ${event.target.value} }`);
    this.setState({ password: event.target.value });
  }

  handleLoginSubmit(event) {
    console.log('SUBMITTED');
    this.setState({ isLoggedIn: true });
    event.preventDefault();
  }

  render () {
    console.log(`Rendering \`Login\` component with states: { email: ${this.state.email}, password: ${this.state.password} }`);
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
            <input className={css(styles.loginTextInput)} id="password" name="password" type="text" value={this.state.password} onChange={this.handleChangePassword} />
          </div>
          <input className={css(styles.loginButton)} type="submit" value="Submit" />
        </form>
      </>
    );
  }
}
export default Login;
