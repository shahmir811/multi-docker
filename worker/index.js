const keys = require('./keys');
const redis = require('redis');

const redisClient = redis.createClient({
	host: keys.redisHost,
	port: keys.redisPort,
	retry_strategy: () => 1000, // if connection gets lost, then try again for connection after 1sec
});

const sub = redisClient.duplicate();

const fib = (index) => {
	if (index < 2) return 1;
	return fib(index - 1) + fib(index - 2);
};

// Below, message is the index value where we want to get fibnache value
sub.on('message', (channel, message) => {
	redisClient.hset('values', message, fib(parseInt(message)));
});

sub.subscribe('insert');
