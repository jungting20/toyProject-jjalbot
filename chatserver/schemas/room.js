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
roomSchema.methods.joinUser = function(userid) {
    if (!this.users.includes(userid)) {
        this.users.push(userid);
        return this.save();
    }
    console.log('이미포함');
    return this;
};

module.exports = mongoose.model('Room', roomSchema);
