import React, { PropTypes } from 'react';
import _ from 'lodash';
import AltContainer from 'alt-container';

import BudgetStore from '../stores/BudgetStore';
import BudgetListItem from './BudgetListItem';

const unfluxedPropTypes = {
	items: PropTypes.arrayOf(PropTypes.object)
}

export function BudgetListView(props) {
	const { items, listName } = props;

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
			{renderedItems}
		</div>
	)
}

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
	)
}

BudgetListView.propTypes = unfluxedPropTypes;
FluxedBudgetListView.propTypes = fluxedPropTypes;
