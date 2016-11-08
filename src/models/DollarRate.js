import Amount from './Amount';

const DAYS_PER_WEEK = 7;
const DAYS_PER_YEAR = 365.25;
const MONTHS_PER_YEAR = 12;

const weeksPerMonth = DAYS_PER_YEAR / (DAYS_PER_WEEK * MONTHS_PER_YEAR);
const weeksPerYear = DAYS_PER_YEAR / DAYS_PER_WEEK;

// frequencies are [weekly, semimonthly, monthly, yearly]
// conversions[a, b] is a per b
const conversions = [
	[1, 2 * weeksPerMonth, weeksPerMonth, weeksPerYear],
	[1 / (2 * weeksPerMonth), 1, 2, 2 * MONTHS_PER_YEAR],
	[1 / weeksPerMonth, 1 / 2, 1, MONTHS_PER_YEAR],
	[1 / weeksPerYear, 1 / (2 * MONTHS_PER_YEAR), 1 / MONTHS_PER_YEAR, 1]
];

export default class DollarRate {
	constructor(amount, frequency) {
		this.amount = amount;
		this.frequency = frequency;
	}

	withFrequency(freq) {
		const newAmt = this.amount.toNumber() * conversions[this.frequency][freq];
		return new DollarRate(new Amount(`${newAmt}`), freq);
	}
}
