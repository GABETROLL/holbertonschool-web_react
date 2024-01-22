import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Notifications from '../Notifications/Notifications';
import { getLatestNotification } from '../utils/utils';
import Header from '../Header/Header';
import Login from '../Login/Login';
import CourseList from '../CourseList/CourseList';
import Footer from '../Footer/Footer';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogOutKeyEvent = this.handleLogOutKeyEvent.bind(this);
  }

  handleLogOutKeyEvent(event) {
    if (event.ctrlKey && event.key === 'h') {
      alert('Logging you out');
      this.props.logOut();
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
    const listNotifications = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', html: {__html: getLatestNotification()} },
    ];

    const listCourses = [
      { id: 1, name: 'ES6', credit: 60 },
      { id: 2, name: 'Webpack', credit: 20 },
      { id: 3, name: 'React', credit: 40 },
    ];

    return (
      <>
        <Notifications listNotifications={listNotifications} />
        <div className="App">
          <Header />
          <div className="App-body">
            {this.props.isLoggedIn ? (<CourseList listCourses={listCourses} />) : (<Login />)}
          </div>
          <Footer />
        </div>
      </>
    );
  }
}

App.defaultProps = {
  isLoggedIn: false,
  logOut: () => {},
};
App.propTypes = {
  isLoggedIn: PropTypes.bool,
  logOut: PropTypes.func,
};

export default App;
