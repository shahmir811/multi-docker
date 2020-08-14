import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Fib = () => {
	const [seenIndexex, setSeenIndexex] = useState([]);
	const [values, setValues] = useState({});
	const [index, setIndex] = useState('');

	useEffect(() => {
		fetchValues();
		fetchIndexes();
	}, []);

	const fetchValues = async () => {
		try {
			const values = await axios.get('/api/values/current');
			setValues(values.data);
		} catch (error) {
			console.error(error);
		}
	};

	const fetchIndexes = async () => {
		try {
			const seenIndexex = await axios.get('/api/values/all');
			setSeenIndexex(seenIndexex.data);
		} catch (error) {
			console.error(error);
		}
	};

	const renderSeenIndex = () => {
		return seenIndexex.map(({ number }) => number).join(', ');
	};

	const renderValues = () => {
		const entries = [];

		for (let key in values) {
			entries.push(
				<div key={key}>
					For index {key}, I calculated {values[key]}
				</div>
			);
		}

		return entries;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		await axios.post('/api/values', { index });

		setIndex('');
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label htmlFor="index">Enter your index:</label>
				<input
					type="text"
					name="index"
					id="index"
					value={index}
					onChange={(e) => setIndex(e.target.value)}
				/>
				<button type="submit">Submit</button>
			</form>

			<h3>Indexes I have seen:</h3>
			{renderSeenIndex()}

			<h3>Calculated values:</h3>
			{renderValues()}
		</div>
	);
};

export default Fib;
