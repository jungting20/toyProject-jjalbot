const mongoose = require('mongoose');

const { Schema } = mongoose;

const {
    Types: { ObjectId },
} = Schema;

const roomSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    owner: {
        type: String,
        required: true,
    },
    users: [
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

module.exports = mongoose.model('Room', roomSchema);
