import { PropTypes } from 'react';
import _ from 'lodash';

import alt from '../components/Dispatcher';
import BudgetActions from '../actions/BudgetActions';

import Amount from '../models/Amount';
import DollarRate from '../models/DollarRate';
import Frequencies from '../data/Frequencies';

function emptyItem() {
	const emptyAmount = new Amount();
	return {
		name: '',
		rate: new DollarRate(emptyAmount, Frequencies.Monthly),
		isVariable: false
	};
}

export class BudgetStoreModel {
	constructor() {
		this.lists = {
			income: [emptyItem()],
			expenses: [emptyItem()]
		};

		this.savings = 0;

		this.bindActions(BudgetActions);
	}

	onChangeItemName(itemInfo) {
		const { listName, index, name, addNewItem } = itemInfo;
		this.lists[listName][index].name = name;
		if (addNewItem) this.lists[listName].push(emptyItem());
	}

	onChangeItemAmount(itemInfo) {
		const { listName, index, amount, addNewItem } = itemInfo;
		this.lists[listName][index].rate.amount = amount;
		if (addNewItem) this.lists[listName].push(emptyItem());
	}

	onChangeItemFrequency(itemInfo) {
		const { listName, index, frequency, addNewItem } = itemInfo;
		const item = this.lists[listName][index];
		item.rate.frequency = frequency;
		if (addNewItem) this.lists[listName].push(emptyItem());
	}

	onToggleItemVariable(itemInfo) {
		const { listName, index, addNewItem } = itemInfo;
		const item = this.lists[listName][index];
		item.isVariable = !item.isVariable;
		if (addNewItem) this.lists[listName].push(emptyItem());
	}

	onRemoveItem(itemInfo) {
		const { listName, index } = itemInfo;
		if (this.lists[listName].length > 1)
			this.lists[listName] = _.filter(this.lists[listName], (item, idx) => idx !== index);
	}
}

export default alt.createStore(BudgetStoreModel, 'BudgetStore');

export const BudgetItemShape = {
	name: PropTypes.string,
	rate: PropTypes.instanceOf(DollarRate)
};
