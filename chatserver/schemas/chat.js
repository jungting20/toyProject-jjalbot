const mongoose = require('mongoose');

const { Schema } = mongoose;
const {
    Types: { ObjectId },
} = Schema;
const chatSchema = new Schema({
    room: {
        type: ObjectId,
        required: true,
        ref: 'Room',
    },
    nickname: String,
    content: String,
    checkedUserList: [
        {
            type: ObjectId,
            ref: 'Nickname',
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Chat', chatSchema);
