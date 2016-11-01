import React, { PropTypes } from 'react';
import _ from 'lodash';

import Frequencies from '../data/Frequencies';

const propTypes = { frequency: PropTypes.string };

export default function FrequencyDropdown(props) {
	const { frequency } = props;

	const options = _.map(Frequencies, (val, key) =>
		<option value={val} key={val}>{key}</option>
	);

	return (
		<select className="frequency-dropdown" defaultValue={Frequencies.Monthly} selected={frequency}>
			{options}
		</select>
	);
}

FrequencyDropdown.propTypes = propTypes;
