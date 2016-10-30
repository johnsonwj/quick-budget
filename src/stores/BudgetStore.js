import alt from '../components/Dispatcher';
import BudgetActions from '../actions/BudgetActions';

import Amount from '../models/Amount';

function emptyItem() { return { name: '', amount: new Amount() }; }

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
		this.lists[listName][index].amount = amount;
		if (addNewItem) this.lists[listName].push(emptyItem());
	}
}

export default alt.createStore(BudgetStoreModel, 'BudgetStore');
