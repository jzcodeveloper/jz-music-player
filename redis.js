require("colors");
const redis = require("redis");
const bluebird = require("bluebird");

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const redisURL = require("./config/keys").redisURL;
const client = redis.createClient(redisURL);

client.on("connect", () => console.log("Redis Connected".green));

module.exports = client;
