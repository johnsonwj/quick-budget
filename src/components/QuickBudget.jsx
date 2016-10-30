import React, { PropTypes } from 'react';

import BudgetBar from './BudgetBar';
import BudgetListView from './BudgetListView';

const propTypes = {
	view: PropTypes.string.isRequired
};

export default function QuickBudget() {
	return (
		<div id="quick-budget">
			<BudgetBar />
			<BudgetListView listName="incomeFixed" />
		</div>
	);
}

QuickBudget.propTypes = propTypes;
