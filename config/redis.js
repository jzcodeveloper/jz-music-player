const redis = require("redis");
const bluebird = require("bluebird");
const config = require("config");
const redisURL = config.get("redisURL");

bluebird.promisifyAll(redis.RedisClient.prototype);

const client = redis.createClient(redisURL);

client.on("connect", () => console.log("Redis Connected"));

module.exports = client;
