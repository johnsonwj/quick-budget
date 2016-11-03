import React, { PropTypes } from 'react';
import _ from 'lodash';
import AltContainer from 'alt-container';

import BudgetStore from '../stores/BudgetStore';
import BudgetListItem from './BudgetListItem';

const unfluxedPropTypes = {
	items: PropTypes.arrayOf(PropTypes.object),
	listName: PropTypes.string.isRequired
};

function BudgetListView(props) {
	const { items, listName } = props;

	const title = {
		income: 'Step 1: Income',
		expenses: 'Step 2: Expenses'
	}[listName];

	const renderedItems = _.map(items, (item, idx) =>
		<BudgetListItem
			key={idx}
			index={idx}
			item={item}
			isLast={idx === items.length - 1}
			{...{ listName }}
		/>
	);

	return (
		<div className="budget-list-view">
			<h3 className="title">{title}</h3>
			{renderedItems}
		</div>
	);
}
export { BudgetListView as ControlledBudgetListView };

const fluxedPropTypes = {
	listName: PropTypes.string.isRequired
};

export default function FluxedBudgetListView(props) {
	return (
		<AltContainer
			stores={{
				items: () => ({ store: BudgetStore, value: BudgetStore.getState().lists[props.listName] })
			}}
		>
			<BudgetListView {...props} />
		</AltContainer>
	);
}

BudgetListView.propTypes = unfluxedPropTypes;
FluxedBudgetListView.propTypes = fluxedPropTypes;
