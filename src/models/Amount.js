import _ from 'lodash';

export default class Amount {
	constructor(amtString) {
		if (!amtString) {
			this.dollars = 0;
			this.cents = 0;
		} else if (!_.includes(amtString, '.')) {
			this.dollars = parseInt(amtString);
			this.cents = 0;
		} else {
			const pieces = _.split(amtString, '.');
			this.dollars = parseInt(pieces[0] || '0');
			this.cents = parseInt(pieces[1] || '0');
		}
	}

	toString() {
		return `\$${(this.dollars + this.cents / 100).toFixed(2)}`;
	}
}
