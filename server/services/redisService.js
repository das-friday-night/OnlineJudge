// this service provides CRUD on redis instance since it is made as an interface, redis object
// only created once, we actually create a singleton of redis. The benefit: server won't worry
// about the scenario where memory being used to create many duplicated redis instance

let redis = require('redis');
let client = redis.createClient();

function set(key, val, callback){
    // key: string
    // val: string
    client.set(key, val, function (err, res) {
        // res: string
        if(err){
            console.log(err);
            return;
        }
        callback(res);
    });
}

function get(key, callback) {
    // key: string
    client.get(key, function(err, res){
        // res: string
        if(err){
            console.log(err);
            return;
        }
        callback(res);
    });
}

function expire(key, timeInSeconds) {
    client.expire(key, timeInSeconds);
}

function quit() {
    client.quit();
}

module.exports = {
    get: get,
    set: set,
    expire: expire,
    quit: quit,
    redisPrint: redis.print
}