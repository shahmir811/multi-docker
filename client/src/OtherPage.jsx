import React from 'react';
import { Link } from 'react-router-dom';

const OtherPage = () => {
	return (
		<div>
			I am other page
			<Link to="/">Go back to home</Link>
		</div>
	);
};

export default OtherPage;
