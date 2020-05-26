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
    joinedusers: [
        {
            nickname: {
                type: String,
            },
            userid: {
                type: String,
            },
        },
    ],
    lastMessage: {
        content: {
            type: String,
        },
        createdtime: {
            type: Date,
            default: Date.now,
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
roomSchema.methods.joinUser = function(nickname, userid) {
    const findIndexNumber = this.joinedusers.findIndex(obj => {
        return obj.nickname === nickname || obj.userid === userid;
    });
    if (findIndexNumber === -1) {
        this.joinedusers.push({
            nickname,
            userid,
        });
        this.save();
        return true;
    }
    return false;
};

module.exports = mongoose.model('Room', roomSchema);
