import React from 'react';
import { getFooterCopy, getFullYear } from '../utils/utils';
import './Footer.css';

export default function Footer() {
  return (
    <div className="App-footer">
      <p>Copyright { getFullYear() } - { getFooterCopy(true) }</p>
    </div>
  );
}
