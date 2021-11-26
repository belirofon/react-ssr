import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { Header } from './Header';

window.addEventListener('load', () => {
  ReactDOM.render(<Header />, document.getElementById('root'));
});