import React from 'react';
import logo from '../assets/holberton-logo.jpg';
import { StyleSheet, css } from 'aphrodite';
import { red } from '../styleColor';

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    alignItems: 'center',
    color: red,
    borderBottom: `4px ${red} solid`,
  },
  logo: {
    height: 300,
  },
});

export default function Header() {
  return (
    <div className={css(styles.header)}>
      <img className={css(styles.logo)} src={logo} alt=""/>
      <h1>School dashboard</h1>
    </div>
  );
}
