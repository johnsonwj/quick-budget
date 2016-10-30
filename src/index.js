/* eslint-disable react/jsx-filename-extension, import/extensions */
import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/Main.jsx';

require('normalize.css/normalize.css');
require('skeleton-css/css/skeleton.css');
require('./styles/base.scss');

// Render the main component into the dom
// eslint-disable-next-line react/jsx-filename-extension
ReactDOM.render(<App />, document.getElementById('app'));
