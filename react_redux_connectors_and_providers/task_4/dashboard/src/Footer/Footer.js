import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFooterCopy, getFullYear } from '../utils/utils';

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

function Footer({ user }) {
  return (
    <>
      <p>Copyright { getFullYear() } - { getFooterCopy(true) }</p>
      {user.isLoggedIn && (<p><a>Contact us</a></p>)}
    </>
  );
}
Footer.defaultProps = {
  user: {
    isLoggedIn: false,
    email: '',
    password: '',
  }
};
Footer.propTypes = {
  user: PropTypes.shape({
    isLoggedIn: PropTypes.bool,
    email: PropTypes.string,
    password: PropTypes.string,
  }),
};

export const StatelessFooter = Footer;
export default connect(mapStateToProps)(Footer);
