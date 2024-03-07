import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
// redux
import { connect } from 'react-redux';
import {
  displayNotificationDrawer, hideNotificationDrawer,
  loginRequest, logout,
} from '../actions/uiActionCreators';
import { markAsRead } from '../actions/notificationActionCreators';
// react
import WithLogging from '../HOC/WithLogging';
import Notifications from '../Notifications/Notifications';
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
 * The `{ ui }` argument is assumed to be returned by the `../reducers/rootReducer`.
 * The state slice that corresponds to this component is `ui`.
 */
export function mapStateToProps({ ui }) {
  let user = ui.get('user');
  user = user ? user.toJS() : { email: '', password: '' };
  // should be a POJS now

  return {
    displayDrawer: ui.get('isNotificationDrawerVisible'),
    isLoggedIn: ui.get('isUserLoggedIn'),
    user,
  };
}
// ?
export const mapDispatchToProps = {
  handleDisplayDrawer: displayNotificationDrawer,
  handleHideDrawer: hideNotificationDrawer,
  markAsRead,
  login: loginRequest,
  logout,
};

export const LoginWithLogging = WithLogging(Login);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogOutKeyEvent = this.handleLogOutKeyEvent.bind(this);
  }

  handleLogOutKeyEvent(event) {
    if (event.ctrlKey && event.key === 'h') {
      alert('Logging you out');
      this.props.logout();
    }
  }

  // TODO: CHECK THAT THE EVENT REMOVAL WORKS
  componentDidMount() {
    document.addEventListener('keydown', this.handleLogOutKeyEvent);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleLogOutKeyEvent);
  }

  render() {
    // console.log(this);

    const listCourses = [
      { id: 1, name: 'ES6', credit: 60 },
      { id: 2, name: 'Webpack', credit: 20 },
      { id: 3, name: 'React', credit: 40 },
    ];

    const { displayDrawer } = this.props;

    return (
      <>
        <Notifications
          displayDrawer={displayDrawer}
          handleDisplayDrawer={this.props.handleDisplayDrawer}
          handleHideDrawer={this.props.handleHideDrawer}
          markNotificationAsRead={this.props.markAsRead}
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
                  <LoginWithLogging logIn={this.props.login} />
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
      </>
    );
  }
}

App.defaultProps = {
  displayDrawer: false,
  isLoggedIn: false,
  user: { email: '', password: '' },
  handleDisplayDrawer: () => { },
  handleHideDrawer: () => { },
  login: () => { },
  logout: () => { },
};
App.propTypes = {
  displayDrawer: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
  user: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
  }),
  handleDisplayDrawer: PropTypes.func,
  handleHideDrawer: PropTypes.func,
  login: PropTypes.func,
  logout: PropTypes.func,
};

export const StatelessApp = App;
export default connect(mapStateToProps, mapDispatchToProps)(App);
