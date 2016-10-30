import alt from '../components/Dispatcher';

import ViewActions from '../actions/ViewActions';
import Views from '../data/Views';

export class ViewStoreModel {
	constructor() {
		this.view = Views.Intro;

		this.bindActions(ViewActions);
	}

	onChangeView(newView) { this.view = newView; }
}

export default alt.createStore(ViewStoreModel, 'ViewStore');
