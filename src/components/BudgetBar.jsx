import React, { PropTypes } from 'react';
import AltContainer from 'alt-container';
import _ from 'lodash';

import BudgetStore, { BudgetItemShape } from '../stores/BudgetStore';
import Frequencies from '../data/Frequencies';
import Views from '../data/Views';

const BudgetBar = (props) => {
	const itemMonthlyDollars = budgetItem =>
		budgetItem.rate.withFrequency(Frequencies.Monthly).amount.toNumber();

	const sumRatesMonthly = (rateList, variable) =>
		_(rateList)
			.filter(item => item.isVariable === variable)
			.sumBy(itemMonthlyDollars);

	const fmi = sumRatesMonthly(props.income, false);
	const vmi = sumRatesMonthly(props.income, true);
	const fme = sumRatesMonthly(props.expenses, false);
	const vme = sumRatesMonthly(props.expenses, true);

	const difference = (fmi + vmi) - (fme + vme);
	const positive = difference > 0;

	const stylify = ratio => ({ flex: `0 0 ${ratio * 100}%` });

	const denominator = positive ? (fmi + vmi) : (fme + vme);

	const fd = _.max([0, Math.abs(difference) - (positive ? vmi : vme)]);
	const vd = Math.abs(difference) - fd;

	return (
		<div id="budget-bar" className={positive ? 'positive' : 'negative'}>
			<div id="fixed-income" style={stylify(fmi / denominator)} />
			<div id="variable-income" style={stylify(vmi / denominator)} />
			<div id="fixed-expense" style={stylify(fme / denominator)} />
			<div id="variable-expense" style={stylify(vme / denominator)} />
			<div id="savings" style={{ flex: '0 0 0%' }} />
			<div id="fixed-difference" style={stylify(fd / denominator)} />
			<div id="variable-difference" style={stylify(vd / denominator)} />
		</div>
	);
};

BudgetBar.propTypes = {
	income: PropTypes.arrayOf(PropTypes.shape(BudgetItemShape)),
	expenses: PropTypes.arrayOf(PropTypes.shape(BudgetItemShape))
};

export default () => (
	<AltContainer
		stores={[BudgetStore]}
		inject={{
			income: () => BudgetStore.getState().lists[Views.Income],
			expenses: () => BudgetStore.getState().lists[Views.Expenses]
		}}
		component={BudgetBar}
	/>
);
