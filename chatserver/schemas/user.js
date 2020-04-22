const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { Schema } = mongoose;
const {
    Types: { ObjectId },
} = Schema;
const userSchema = new Schema({
    rooms: [{ type: ObjectId, required: true, ref: 'Room' }],
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
    },
});

userSchema.methods.setPassword = async function(password) {
    const hash = await bcrypt.hash(password, 10);
    this.password = hash;
    return this;
};

userSchema.methods.checkPassword = async function(password) {
    const result = await bcrypt.compare(password, this.password);
    if (result) {
        return result;
    } else {
        return null;
    }
};

userSchema.methods.serialize = function() {
    const data = this.toJSON();
    delete data.password;
    return data;
};

userSchema.methods.generateToken = function() {
    const token = jwt.sign(
        {
            _id: this.id,
            email: this.email,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '7d',
        }
    );
    return token;
};
userSchema.methods.addRoom = function(roomid) {
    this.rooms.push(roomid);
    return this.rooms;
};

userSchema.statics.findbyUsername = function(email) {
    return this.findOne({ email });
};

module.exports = mongoose.model('User', userSchema);
