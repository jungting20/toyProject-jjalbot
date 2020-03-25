const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
};

userSchema.methods.checkPassword = async function(password) {
    const result = await bcrypt.compare(password, this.password);
    return result;
};

userSchema.statics.findbyUsername = function(email) {
    return this.findOne({ email });
};

module.exports = mongoose.model('User', userSchema);
