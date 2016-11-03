import React, { PropTypes } from 'react';

import BudgetBar from './BudgetBar';
import BudgetListView from './BudgetListView';
import Views from '../data/Views';
import ViewActions from '../actions/ViewActions';

const propTypes = {
	view: PropTypes.string.isRequired
};

function handleBack(currentView) {
	switch (currentView) {
	case Views.Income: return ViewActions.changeView(Views.Intro);
	case Views.Expenses: return ViewActions.changeView(Views.Income);
	default: return null;
	}
}

function handleNext(currentView) {
	switch (currentView) {
	case Views.Income: return ViewActions.changeView(Views.Expenses);
	default: return null;
	}
}

export default function QuickBudget(props) {
	return (
		<div id="quick-budget">
			<BudgetBar />
			<BudgetListView listName={props.view} />
			<div id="page-buttons">
				<button
					id="prev-page"
					onClick={() => handleBack(props.view)}
				>
					Back
				</button>
				<button
					id="next-page"
					onClick={() => handleNext(props.view)}
					disabled={props.view === Views.Expenses}
				>
					Next
				</button>
			</div>
		</div>
	);
}

QuickBudget.propTypes = propTypes;
