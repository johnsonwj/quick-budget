import React, { PropTypes } from 'react';
import _ from 'lodash';

import Frequencies from '../data/Frequencies';

const propTypes = {
	frequency: PropTypes.number.isRequired,
	onChangeFrequency: PropTypes.func.isRequired
};

export default function FrequencyDropdown(props) {
	const { frequency } = props;

	const options = _.map(Frequencies, (val, key) =>
		<option value={val} key={val}>{key}</option>
	);

	return (
		<select
			className="frequency-dropdown"
			value={frequency}
			onChange={e => props.onChangeFrequency(+e.target.value)}
		>
			{options}
		</select>
	);
}

FrequencyDropdown.propTypes = propTypes;
