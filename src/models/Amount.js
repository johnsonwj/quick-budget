import _ from 'lodash';

export default class Amount {
	constructor(amtString) {
		if (!amtString) {
			this.dollars = 0;
			this.cents = 0;
		} else if (!_.includes(amtString, '.')) {
			this.dollars = parseInt(amtString, 10);
			this.cents = 0;
		} else {
			const pieces = _.split(amtString, '.');
			this.dollars = parseInt(pieces[0] || '0', 10);

			// in order to prevent losing leading zeroes (which are significant), stick a 1 in front
			// and subtract it off again after parsing. Add zeroes on the end to avoid edge cases.
			const centsString = `1${pieces[1]}00`;
			// negative round!
			const roundedCents = _.round(parseInt(centsString, 10), 3 - centsString.length);
			const floored = _.floor(roundedCents / Math.pow(10, (centsString.length - 3)));
			this.cents = floored - 100;
		}
	}

	toString() {
		return `$${(this.dollars + (this.cents / 100)).toFixed(2)}`;
	}
}
