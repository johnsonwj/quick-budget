import React, { PropTypes } from 'react';
import _ from 'lodash';
import Icon from 'react-fontawesome';

import Amount from '../models/Amount';
import DollarRate from '../models/DollarRate';
import BudgetActions from '../actions/BudgetActions';
import FrequencyDropdown from './FrequencyDropdown';

export default class BudgetListItem extends React.Component {
	static propTypes = {
		item: PropTypes.shape({
			name: PropTypes.string,
			rate: PropTypes.instanceOf(DollarRate)
		}),
		index: PropTypes.number,
		listName: PropTypes.string.isRequired,
		isLast: PropTypes.bool
	};

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
		this.handleChangeFrequency = this.handleChangeFrequency.bind(this);
		this.handleVariableToggle = this.handleVariableToggle.bind(this);
	}

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

	handleChangeFrequency(newFrequency) {
		const { index, listName, isLast } = this.props;
		BudgetActions.changeItemFrequency({
			listName,
			index,
			frequency: newFrequency,
			addNewItem: isLast
		});
	}

	handleVariableToggle() {
		const { index, listName, isLast } = this.props;
		BudgetActions.toggleItemVariable({
			listName,
			index,
			addNewItem: isLast
		});
	}

	render() {
		const { item, listName, index } = this.props;
		const { name, rate, isVariable } = item || {};
		const { amount, frequency } = rate || {};
		const { tempNameText, tempAmountText } = this.state;

		const getCssClass = part => `item-${part}`;
		const checkboxId = `variable-checkbox-${listName}-${index}`;

		return (
			<div className="budget-list-item">
				<Icon
					name="times"
					className={getCssClass('remove')}
					onClick={() => BudgetActions.removeItem({ listName, index })}
				/>
				<div className={getCssClass('name')}>
					<input
						type="text"
						placeholder="Name"
						value={tempNameText || name || ''}
						onChange={e => this.handleChangeName(e.target.value)}
						onFocus={() => this.setState({ tempNameText: name || '' })}
						onBlur={() => this.handleNameBlur()}
					/>
				</div>
				<div className={getCssClass('amount')}>
					<input
						type="text"
						placeholder={new Amount().toString()}
						value={tempAmountText || (amount ? amount.toString() : '')}
						onChange={e => this.handleChangeAmount(e.target.value)}
						onFocus={() => this.setState({ tempAmountText: amount ? amount.toString() : '' })}
						onBlur={() => this.handleAmountBlur()}
					/>
				</div>
				<FrequencyDropdown
					{...{ frequency }}
					onChangeFrequency={this.handleChangeFrequency}
				/>
				<label htmlFor={checkboxId} className={getCssClass('variable')}>
					<input
						id={checkboxId}
						type="checkbox"
						checked={isVariable}
						onChange={() => this.handleVariableToggle()}
					/>
					Variable
				</label>
			</div>
		);
	}
}
