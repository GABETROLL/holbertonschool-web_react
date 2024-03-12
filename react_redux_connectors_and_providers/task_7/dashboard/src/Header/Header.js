import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../actions/uiActionCreators';
// styling imports
import logo from '../assets/holberton-logo.jpg';
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

export function mapStateToProps({ ui }) {
  let userCredentials = ui.get('user');
  userCredentials = userCredentials ? userCredentials.toJS() : { email: '', password: '' };

  return {
    user: {
      ...userCredentials,
      isLoggedIn: ui.get('isUserLoggedIn'),
    },
  };
}
export const mapDispatchToProps = { logout };

class Header extends React.Component {
  render () {
    return (
      <>
        <div className={css(styles.header)}>
          <img className={css(styles.logo)} src={logo} alt=""/>
          <h1>School dashboard</h1>
        </div>
        {this.props.user.isLoggedIn && (
          <p id="logoutSection">
            Welcome <strong>{this.props.user.email}</strong> (
            <a className={css(styles.link)} onClick={() => this.props.logout()}>Log out</a>)
          </p>
        )}
      </>
    );
  }
}

Header.defaultProps = {
  user: {
    isLoggedIn: false,
    email: '',
    password: ''
  },
  logout: () => { },
};
Header.propTypes = {
  user: PropTypes.shape({
    isLoggedIn: PropTypes.bool,
    email: PropTypes.string,
    password: PropTypes.string,
  }),
  logout: PropTypes.func,
};

export const StatelessHeader = Header;
export default connect(mapStateToProps, mapDispatchToProps)(Header);
