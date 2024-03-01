import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
// react
import { defaultUser, logOut } from './AppContext';
import AppContext from './AppContext';
// redux
import { connect } from 'react-redux';
import { displayNotificationDrawer, hideNotificationDrawer } from '../actions/uiActionCreators';
// react
import WithLogging from '../HOC/WithLogging';
import Notifications from '../Notifications/Notifications';
import { getLatestNotification } from '../utils/utils';
import Header from '../Header/Header';
import Login from '../Login/Login';
import CourseList from '../CourseList/CourseList';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import BodySection from '../BodySection/BodySection';
import Footer from '../Footer/Footer';
import { StyleSheet, css } from 'aphrodite';
import { red } from '../styles';

const styles = StyleSheet.create({
  app: {
    fontSize: 20,
    marginTop: 40,
  },
  body: {
    margin: '68px 45px',
  },
  footer: {
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
    fontSize: 20,
    textAlign: 'center',
    fontStyle: 'italic',
    borderTop: `4px ${red} solid`,
  },
});

/**
 * `state` is assumed to be the same format as
 * `../reducers/uiReducer`'s `initialState`,
 * AND be converted to a ``Immutable.Map``.
 */
export function mapStateToProps(state) {
  return {
    displayDrawer: state.get('isNotificationDrawerVisible'),
    isLoggedIn: state.get('isUserLoggedIn'),
  };
}
// ?
export const mapDispatchToProps = {
  handleDisplayDrawer: displayNotificationDrawer,
  handleHideDrawer: hideNotificationDrawer,
};

export const LoginWithLogging = WithLogging(Login);

// TODO: USE THE PROPS DIRECTLY, INSTEAD OF THROUGH STATE,
// TO KEEP "MUTATIONS" THROUGH REDUX.
class App extends React.Component {
  constructor(props) {
    super(props);

    // TODO: REMOVE isLoggedIn FROM STATE!
    const value = { user: defaultUser, logOut };
    value.logOut = value.logOut.bind(this);

    this.state = {
      value,
      listNotifications: [
        { id: 1, type: 'default', value: 'New course available' },
        { id: 2, type: 'urgent', value: 'New resume available' },
        { id: 3, type: 'urgent', html: {__html: getLatestNotification()} },
      ],
    };

    this.markNotificationAsRead = this.markNotificationAsRead.bind(this);

    this.logIn = this.logIn.bind(this);
    this.handleLogOutKeyEvent = this.handleLogOutKeyEvent.bind(this);
  }

  // (START) TODO: USE REDUX INSTEAD OF REACT STATE

  markNotificationAsRead(id) {
    this.setState(state => ({
      listNotifications: state.listNotifications.filter(notification => notification.id !== id),
    }));
  }

  // (for isLoggedIn here)
  logIn(email, password) {
    this.setState(state => ({
      value: {
        ...(state.value),
        user: {
          email,
          password,
          isLoggedIn: true
        }
      }
    }));
  }

  handleLogOutKeyEvent(event) {
    if (event.ctrlKey && event.key === 'h') {
      alert('Logging you out');
      this.state.value.logOut();
    }
  }
  // (END) TODO: USE REDUX INSTEAD OF REACT STATE

  // TODO: CHECK THAT THE EVENT REMOVAL WORKS
  componentDidMount() {
    document.addEventListener('keydown', this.handleLogOutKeyEvent);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleLogOutKeyEvent);
  }

  render() {
    console.log(this);

    const listCourses = [
      { id: 1, name: 'ES6', credit: 60 },
      { id: 2, name: 'Webpack', credit: 20 },
      { id: 3, name: 'React', credit: 40 },
    ];

    const { displayDrawer } = this.props;

    // TODO: USE REDUX STORE FOR LOGIN STATE, NOT CONTEXT & LOCAL STATE
    return (
      <AppContext.Provider value={this.state.value}>
        <Notifications
          listNotifications={this.state.listNotifications}
          displayDrawer={displayDrawer}
          handleDisplayDrawer={this.props.handleDisplayDrawer}
          handleHideDrawer={this.props.handleHideDrawer}
          markNotificationAsRead={this.markNotificationAsRead}
        />
        <div className={css(styles.app)}>
          <Header />
          <div className={css(styles.body)}>
            {
              this.props.isLoggedIn
              ? (
                <BodySectionWithMarginBottom title="Course list">
                  <CourseList listCourses={listCourses} />
                </BodySectionWithMarginBottom>
              )
              : (
                <BodySectionWithMarginBottom title="Log in to continue">
                  <LoginWithLogging logIn={this.logIn} />
                </BodySectionWithMarginBottom>
              )
            }
            {
              <BodySection title="News from the School">
                <p>Let's welcome our new Student Success Manager for Holberton School PR, Ellen!!</p>
              </BodySection>
            }
          </div>
          <div className={css(styles.footer)}>
            <Footer />
          </div>
        </div>
      </AppContext.Provider>
    );
  }
}
// ?
App.defaultProps = {
  displayDrawer: false,
  isLoggedIn: false,
  handleDisplayDrawer: () => { },
  handleHideDrawer: () => { },
};
App.propTypes = {
  displayDrawer: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
  handleDisplayDrawer: PropTypes.func,
  handleHideDrawer: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
