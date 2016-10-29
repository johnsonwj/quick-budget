require('normalize.css/normalize.css');
require('skeleton-css/css/skeleton.css')
require('styles/base.scss');

import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/Main';

// Render the main component into the dom
ReactDOM.render(<App />, document.getElementById('app'));
