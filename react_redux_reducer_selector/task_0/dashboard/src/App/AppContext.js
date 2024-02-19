import React from 'react';

export const defaultUser = {
  email: '',
  password: '',
  isLoggedIn: false,
};
export function logOut() {
  this.setState(state => ({
    ...state,
    value: {
      ...(state.value),
      user: defaultUser
    }
  }));
}

const AppContext = React.createContext({
  user: defaultUser,
  logOut
});
export default AppContext;
