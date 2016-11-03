import alt from '../components/Dispatcher';
import BudgetActions from '../actions/BudgetActions';

import Amount from '../models/Amount';
import DollarRate from '../models/DollarRate';
import Frequencies from '../data/Frequencies';

function emptyItem() {
	const emptyAmount = new Amount();
	return { name: '', rate: new DollarRate(emptyAmount, Frequencies.Monthly) };
}

export class BudgetStoreModel {
	constructor() {
		this.lists = {
			incomeFixed: [emptyItem()],
			incomeVariable: [emptyItem()],
			expensesFixed: [emptyItem()],
			expensesVariable: [emptyItem()]
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
		item.rate = item.rate.withFrequency(frequency);
		if (addNewItem) this.lists[listName].push(emptyItem());
	}
}

export default alt.createStore(BudgetStoreModel, 'BudgetStore');
