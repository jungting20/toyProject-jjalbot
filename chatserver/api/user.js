const express = require('express');
const router = express.Router();
const User = require('../schemas/user');

router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    console.log(email, password);

    try {
        const exist = await User.findbyUsername(email);
        if (exist) {
            res.status = 409;
            return;
        }
    } catch (e) {
        res.throw(500, e);
    }

    const user = new User({
        email,
    });
    await user.setPassword(password);
    await user.save();

    const data = user.toJSON();

    console.log(data, '음음');
});
router.post('/login', (req, res) => {
    console.log('로그인');
});
router.post('/logout', (req, res) => {
    console.log('로그아웃');
});

module.exports = router;
