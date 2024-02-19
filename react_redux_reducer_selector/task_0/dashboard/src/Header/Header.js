import React from 'react';
import logo from '../assets/holberton-logo.jpg';
import AppContext from '../App/AppContext';
import { StyleSheet, css } from 'aphrodite';
import { red } from '../styles';

export const styles = StyleSheet.create({
  header: {
    display: 'flex',
    alignItems: 'center',
    color: red,
    borderBottom: `4px ${red} solid`,
  },
  logo: {
    height: 215,
  },
  title: {
    fontSize: 27,
  },
  link: { },
});

class Header extends React.Component {
  render () {
    return (
      <>
        <div className={css(styles.header)}>
          <img className={css(styles.logo)} src={logo} alt=""/>
          <h1>School dashboard</h1>
        </div>
        {this.context.user.isLoggedIn && (
          <p id="logoutSection">
            Welcome <strong>{this.context.user.email}</strong> (
            <a className={css(styles.link)} onClick={this.context.logOut}>Log out</a>)
          </p>
        )}
      </>
    );
  }
}
Header.contextType = AppContext;
export default Header;
