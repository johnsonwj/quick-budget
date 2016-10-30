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

	handleNameBlur() {
		const { index, listName, isLast } = this.props;
		const newName = this.state.tempNameText;
		const empty = _.isEmpty(newName);

		if (isLast && empty) return;
		BudgetActions.changeItemName({ listName, index, name: newName, addNewItem: isLast });
		this.setState({ tempNameText: '' });
	}

	handleChangeAmount(newValue) {
		this.setState({ tempAmountText: newValue });
	}

	handleAmountBlur() {
		const { index, listName, isLast } = this.props;
		const newAmount = new Amount(_.trimStart(this.state.tempAmountText, '$'));
		const empty = _.isEmpty(this.state.tempAmountText);

		if (isLast && empty) return;
		BudgetActions.changeItemAmount({ listName, index, amount: newAmount, addNewItem: isLast });
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
						onFocus={() => this.setState({ tempNameText: name || '' })}
						onBlur={() => this.handleNameBlur()}
					/>
				</div>
				<div className={getCssClass('amount')}>
					<input
						type="text"
						placeholder={new Amount().toString()}
						value={tempAmountText || (amount ? amount.toString() : '')}
						onChange={(e) => this.handleChangeAmount(e.target.value)}
						onFocus={() => this.setState({ tempAmountText: amount ? amount.toString() : '' })}
						onBlur={() => this.handleAmountBlur()}
					/>
				</div>
				<FrequencyDropdown {...{ frequency }} />
			</div>
		);
	}
}
