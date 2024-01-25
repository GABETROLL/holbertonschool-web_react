import React from 'react';
import logo from '../assets/holberton-logo.jpg';
import { StyleSheet, css } from 'aphrodite';
import { red } from '../styleColor';

const styles = StyleSheet.create({
  appHeader: {
    display: 'flex',
    alignItems: 'center',
    borderBottomWidth: 4,
    color: red,
    borderBottomColor: red,
  },
  logo: {
    height: 300,
  },
});

export default function Header() {
  return (
    <div className={css(styles.appHeader)}>
      <img className={css(styles.logo)} src={logo} alt=""/>
      <h1>School dashboard</h1>
    </div>
  );
}
