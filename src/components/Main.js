require('normalize.css/normalize.css');
require('skeleton-css/css/skeleton.css')
require('styles/base.scss');

import React from 'react';

import BudgetBar from './BudgetBar';

export default class AppComponent extends React.Component {
	render() {
		return (
			<div id="app">
				<BudgetBar />
				Herro
			</div>
		);
	}
}
 