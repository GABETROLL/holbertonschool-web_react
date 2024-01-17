import React from 'react';
import PropTypes from 'prop-types';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Login from '../Login/Login';
import CourseList from '../CourseList/CourseList';
import Footer from '../Footer/Footer';
import './App.css';

function App({ isLoggedIn }) {
  isLoggedIn = isLoggedIn || false;

  return (
    <>
      <Notifications />
      <div className="App">
        <Header />
        <div className="App-body">
          {isLoggedIn ? (<CourseList />) : (<Login />)}
        </div>
        <Footer />
      </div>
    </>
  );
}

App.PropTypes = {
  isLoggedIn: PropTypes.bool,
}

export default App;
