const mongoose = require('mongoose');

const { Schema } = mongoose;
const {
    Types: { ObjectId },
} = Schema;
const nickNameSchema = new Schema({
    roomid: { type: ObjectId, required: true, ref: 'Room' },
    userid: { type: ObjectId, required: true, ref: 'User' },
    nickname: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Nickname', nickNameSchema);
