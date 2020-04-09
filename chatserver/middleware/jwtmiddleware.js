const jwt = require('jsonwebtoken');
const User = require('../schemas/user');

const jwtMiddleware = async function(req, res, next) {
    const token = req.cookies['access_token'];
    console.log('미들웨어', token);
    if (!token) {
        next();
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.user = {
            _id: decoded._id,
            email: decoded.email,
        };
        const now = Math.floor(Date.now() / 1000);

        if (decoded.exp - now < 60 * 60 * 24 * 3.5) {
            const user = await User.findById(decoded._id);
            const token = user.generateToken();
            res.cookie('access_token', token, {
                maxAge: 1000 * 60 * 60 * 24 * 7,
                httpOnly: true,
            });
        }

        //console.log('user', res.user);
        next();
    } catch (e) {
        console.log(e, '에러');
        next();
    }
};

const checklogin = function(req, res, next) {
    if (!res.user) {
        return res.status(401).json({ code: 401, message: '로그인 필요' });
    }
    next();
};

module.exports = { jwtMiddleware, checklogin };
