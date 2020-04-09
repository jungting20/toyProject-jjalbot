const { from } = require('rxjs');
const { delayWhen } = require('rxjs/operators');

const MongoSave = mongoInstance => from(mongoInstance.save());

module.exports = {
    MongoSave,
};
