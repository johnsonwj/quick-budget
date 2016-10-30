import React, { PropTypes } from 'react';
import AltContainer from 'alt-container';

import IntroPage from './IntroPage';
import QuickBudget from './QuickBudget';
import ViewStore from '../stores/ViewStore';
import Views from '../data/Views';

const propTypes = {
	view: PropTypes.string.isRequired
};

function App(props) {
	const { view } = props;

	let appComponent;
	switch (view) {
	case Views.Intro:
		appComponent = <IntroPage />;
		break;
	default:
		appComponent = <QuickBudget {...props} />;
	}

	return <div id="app">{appComponent}</div>;
}
export { App as ControlledApp };

App.propTypes = propTypes;

export default function FluxedApp() {
	return (
		<AltContainer
			stores={{
				view: () => ({ store: ViewStore, value: ViewStore.getState().view })
			}}
			component={App}
		/>
	);
}

