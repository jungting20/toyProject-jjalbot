const { of } = require('rxjs');
const makeCodeMessage = (code, message) => ({ code, message });

const existuserMessage = res => {
    res.status(400);
    return { res, data: makeCodeMessage(400, '존재하는 email') };
};

const serverErrorMessage = res => {
    res.status(500);
    return { res, data: makeCodeMessage(500, '서버 에러') };
};

const compactErrorMessage = res => {
    res.status(401);
    return {
        res,
        data: makeCodeMessage(401, 'email, password를 입력 해 주세요'),
    };
};
const isnotUserMessage = res => {
    res.status(401);
    return {
        res,
        data: makeCodeMessage(401, 'email이 존재하지 않습니다'),
    };
};

const isnotValid = res => {
    res.status(401);
    return {
        res,
        data: makeCodeMessage(401, '비밀번호가 틀렸습니다'),
    };
};

module.exports = {
    makeCodeMessage,
    existuserMessage,
    serverErrorMessage,
    compactErrorMessage,
    isnotUserMessage,
    isnotValid,
};
