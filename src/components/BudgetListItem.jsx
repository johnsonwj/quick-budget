import React, { PropTypes } from 'react';
import _ from 'lodash';

import Amount from '../models/Amount';
import BudgetActions from '../actions/BudgetActions';
import FrequencyDropdown from './FrequencyDropdown';

export default class BudgetListItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tempNameText: '',
			tempAmountText: ''
		};

		this.handleChangeName = this.handleChangeName.bind(this);
		this.handleNameBlur = this.handleNameBlur.bind(this);
		this.handleChangeAmount = this.handleChangeAmount.bind(this);
		this.handleAmountBlur = this.handleAmountBlur.bind(this);
	}

	static propTypes = {
		item: PropTypes.object,
		index: PropTypes.number,
		listName: PropTypes.string.isRequired,
		isLast: PropTypes.bool
	};

	handleChangeName(newValue) {
		this.setState({ tempNameText: newValue });
	}

	/*
	 * TODO:
	 *   change name of this item in addition to creating a new one when this is the last item
	 *   what the hell is up with amount changing
	 */

	handleNameBlur() {
		const { index, listName, isLast } = this.props;
		const newName = this.state.tempNameText;
		if (isLast && _.some(this.state.tempNameText))
			BudgetActions.addItem(listName);
		else if (!isLast)
			BudgetActions.changeItemName({ listName, index, name: newName });
		this.setState({ tempNameText: '' });
	}

	handleChangeAmount(newValue) {
		this.setState({ tempAmountText: newValue });
	}

	handleAmountBlur() {
		const { index, listName, isLast } = this.props;
		const newAmount = new Amount(_.trimStart(this.state.tempAmountText, '$'));
		if (isLast && _.some(this.state.tempAmountText))
			BudgetActions.addItem(listName);
		else if (!isLast)
			BudgetActions.changeItemAmount({ listName, index, amount: newAmount });
		this.setState({ tempAmountText: '' });
	}

	render() {
		const { item } = this.props;
		const { name, amount, frequency } = item || {};
		const { tempNameText, tempAmountText } = this.state;

		const getCssClass = (part) => `item-${part}`;

		return (
			<div className="budget-list-item">
				<div className={getCssClass('name')}>
					<input
						type="text"
						placeholder="Name"
						value={tempNameText || name || ''}
						onChange={(e) => this.handleChangeName(e.target.value)}
						onBlur={() => this.handleNameBlur()}
					/>
				</div>
				<div className={getCssClass('amount')}>
					<input
						type="text"
						placeholder={new Amount().toString()}
						value={tempAmountText || amount ? amount.toString() : ''}
						onChange={(e) => this.handleChangeAmount(e.target.value)}
						onBlur={() => this.handleAmountBlur()}
					/>
				</div>
				<FrequencyDropdown {...{ frequency }} />
			</div>
		);
	}
}
