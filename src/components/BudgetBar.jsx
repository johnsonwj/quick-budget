import React from 'react';

const BudgetBar = () => (
	<div id="budget-bar" className="negative">
		<div id="fixed-income" style={{ flex: '0 0 30%' }} />
		<div id="variable-income" style={{ flex: '0 0 30%' }} />
		<div id="fixed-expense" style={{ flex: '0 0 30%' }} />
		<div id="variable-expense" style={{ flex: '0 0 70%' }} />
		<div id="savings" style={{ flex: '0 0 0%' }} />
		<div id="fixed-difference" style={{ flex: '0 0 00%' }} />
		<div id="variable-difference" style={{ flex: '0 0 40%' }} />
	</div>
);

export default BudgetBar;
