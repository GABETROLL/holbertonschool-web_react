import React from 'react';
import { connect } from 'react-redux';
import { getFooterCopy, getFullYear } from '../utils/utils';

export function mapStateToProps(state) {
  return {
    user: {
      ...state.get('user').toJS(),
      isLoggedIn: state.get('isUserLoggedIn'),
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
export default connect(mapStateToProps)(Footer);
