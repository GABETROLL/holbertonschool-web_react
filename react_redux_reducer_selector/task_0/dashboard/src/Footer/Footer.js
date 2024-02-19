import React from 'react';
import AppContext from '../App/AppContext';
import { getFooterCopy, getFullYear } from '../utils/utils';

export default function Footer() {
  return (
    <AppContext.Consumer>
      {
        value => (
          <>
            <p>Copyright { getFullYear() } - { getFooterCopy(true) }</p>
            {value.user.isLoggedIn && (<p><a>Contact us</a></p>)}
          </>
        )
      }
    </AppContext.Consumer>
  );
}
