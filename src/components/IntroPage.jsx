import React from 'react';
import ViewActions from '../actions/ViewActions';
import Views from '../data/Views';

const IntroPage = () => (
	<div id="intro-page">
		<h1>Quick Budget</h1>
		<button onClick={() => ViewActions.changeView(Views.Income)}>Begin</button>
	</div>
);

export default IntroPage;
