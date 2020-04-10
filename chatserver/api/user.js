const Joi = require('joi');
const express = require('express');
const router = express.Router();
const User = require('../schemas/user');

//const { ErrorHandler } = require('../lib/CustomError');

router.post('/register', async (req, res) => {
    const schema = Joi.object().keys({
        email: Joi.string(),
        password: Joi.string().required(),
    });
    const { email, password } = req.body;
    console.log(email, password);
    const result = Joi.validate({ email, password }, schema);
    if (result.error) {
        return res.status(400).json({ code: 400, message: '에러' });
    }

    try {
        const exists = await User.findbyUsername(email);
        if (exists) {
            return res.status(400).json({ code: 400, message: '유저가 존재' });
        }

        const user = new User({
            email,
        });
        await user.setPassword(password);
        await user.save();

        const userdata = user.serialize();
        const token = user.generateToken();
        res.cookie('access_token', token, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true,
        });
        res.status(200).json({ code: 200, message: '성공', data: userdata });
    } catch (e) {
        console.log(e);
        res.status(500).json({ code: 500, message: '에러', error: e });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(401).json({
            code: 401,
            message: '이메일이나 비밀번호를 입력해주세요',
        });
        return;
    }

    try {
        const user = await User.findbyUsername(email);

        if (!user) {
            //throw new ErrorHandler('401', '아이디가 존재하지 않습니다');
            res.status(401).json({
                code: 401,
                message: '아이디가 존재하지 않습니다',
            });
            return;
        }

        const valid = await user.checkPassword(password);

        if (!valid) {
            res.status(401).json({
                code: 401,
                message: '비밀번호가 틀렸습니다',
            });
            return;
        }
        const userdata = user.serialize();
        const token = user.generateToken();
        res.cookie('access_token', token, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true,
        });
        console.log(userdata);
        res.status(200).json({ code: 200, message: '성공', data: userdata });
    } catch (e) {
        console.log(e);
        res.status(500).json({ code: 500, message: '에러' });
    }
});
/* const check = async ctx => {
    const { user } = ctx.state;
    if (!user) {
        ctx.status = 401;
        return;
    }
    ctx.body = user;
}; */
const logout = async (req, res) => {
    res.cookie('access_token');
    res.status(204).json({ code: 204, message: '로그아웃 성공' });
};

module.exports = router;
