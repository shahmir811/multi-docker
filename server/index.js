const keys = require('./keys');
const redis = require('redis');

// Express App Setup
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Postgress Client Setup
const { Pool } = require('pg');
const pgClient = new Pool({
	user: keys.pgUser,
	host: keys.pghost,
	database: keys.pgDatabase,
	password: keys.pgPassword,
	port: keys.pgPort,
});
// Table name = values. Stores indices of fibnache index
pgClient.on('connect', () => {
	pgClient
		.query('CREATE TABLE IF NOT EXISTS values (number INT)')
		.catch((err) => console.log(err));
});

// Redis Client Setup
const redisClient = redis.createClient({
	host: keys.redisHost,
	port: keys.redisPort,
	retry_strategy: () => 1000, // if connection gets lost, then try again for connection after 1sec
});
const redisPublisher = redisClient.duplicate();

// Express routes handler
app.get('/', (req, res) => res.send('Hello Pakitan'));

app.get('/values/all', async (req, res) => {
	try {
		const values = await pgClient.query('SELECT * from values');

		res.send(values.rows);
	} catch (error) {
		console.log(error);
	}
});

// redis library for nodeJS donot support await, so we use callback function below
app.get('/values/current', async (req, res) => {
	redisClient.hgetall('values', (err, values) => {
		res.send(values);
	});
});

app.post('/values', async (req, res) => {
	const index = req.body.index;

	if (parseInt(index) > 40) {
		return res.status(422).send('Index too high');
	}

	redisClient.hset('values', index, 'Nothing yet!');
	redisPublisher.publish('insert', index);
	pgClient.query('INSERT INTO values(number) VALUES($1)', [index]);
});

app.listen(5000, (err) => console.log(`App is listening on PORT: 5000`));
