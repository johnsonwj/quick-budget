import React, { PropTypes } from 'react';
import AltContainer from 'alt-container';

import IntroPage from './IntroPage';
import BudgetBar from './BudgetBar';
import ViewStore from '../stores/ViewStore';
import Views from '../data/Views';

const propTypes = {
	View: PropTypes.object
};

export function QuickBudget(props) {
	const { view } = props;

	let appComponent;
	switch (view) {
	case Views.Intro:
		appComponent = <IntroPage />;
		break;
	default:
		appComponent = <BudgetBar />;
	}

	return <div id="app">{appComponent}</div>;
}

QuickBudget.propTypes = propTypes;

export default function FluxedQuickBudget() {
	return (
		<AltContainer	stores={
			{ view: () => ({ store: ViewStore, value: ViewStore.getState().view }) }
		}>
			<QuickBudget />
		</AltContainer>
	);
}
 