import * as ReactDOM from 'react-dom';
import { Header } from './Header.jsx';

window.addEventListener('load', () => {
  ReactDOM.render(<Header />, getElementById('app'));
});