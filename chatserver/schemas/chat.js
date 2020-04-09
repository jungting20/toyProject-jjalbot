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
    user: {
        type: ObjectId,
        required: true,
        ref: 'User',
    },
    content: String,
    checkedUserList: [
        {
            type: ObjectId,
            ref: 'User',
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Chat', chatSchema);
