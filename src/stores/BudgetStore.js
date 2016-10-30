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
		}

		this.savings = 0;

		this.bindActions(BudgetActions);
	}

	onAddItem(listName) {
		this.lists[listName].push(emptyItem());
	}

	onChangeItemName(itemInfo) {
		const { listName, index, name } = itemInfo;
		this.lists[listName][index].name = name;
	}

	onChangeItemAmount(itemInfo) {
		const { listName, index, amount } = itemInfo;
		this.lists[listName][index].amount = amount;
	}
}

export default alt.createStore(BudgetStoreModel, 'BudgetStore');
