const redis = require("redis");
const bluebird = require("bluebird");
const redisURL = process.env.REDIS_URL || "redis://localhost:6379";

bluebird.promisifyAll(redis.RedisClient.prototype);

const client = redis.createClient(redisURL);

client.on("connect", () => console.log("Redis Connected"));

module.exports = client;
