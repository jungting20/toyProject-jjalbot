const express = require('express');
const router = express.Router();
const User = require('../schemas/user');
const { of, from, concat } = require('rxjs');
const {
    map,
    switchMap,
    concatMap,
    delayWhen,
    catchError,
    tap,
    mapTo,
} = require('rxjs/operators');
const {
    existuserMessage,
    serverErrorMessage,
    compactErrorMessage,
    isnotUserMessage,
    isnotValid,
    makeCodeMessage,
} = require('../lib/message');
const { MongoSave } = require('../lib/rxmongo');
const { isnotnull, isnotcompact } = require('../lib/util');
const CusError = require('../lib/CustomError');

const getUser = () => obs$ =>
    obs$.pipe(
        concatMap(({ req, res }) => {
            const { email } = req.body;
            return from(User.findbyUsername(email));
        })
    );

const makeTokenUser$ = (req, res) => obs$ =>
    obs$.pipe(
        map(user => {
            const token = user.generateToken();
            const userdata = user.serialize();
            res.cookie('access_token', token, {
                maxAge: 1000 * 60 * 60 * 24 * 7,
                httpOnly: true,
            }).status(200);
            console.log('여기인데', res);
            return {
                res,
                data: { ...makeCodeMessage(200, '성공'), user: userdata },
            };
        })
    );
router.post('/register', (req, res) => {
    console.log('뭬어');
    const existuser$ = () => obs$ =>
        obs$.pipe(
            getUser(),
            tap(user => {
                if (user) {
                    console.log('여기서 떳을텐데');
                    throw new CusError(existuserMessage(res));
                }
            })
        );

    const addUser$ = (req, res) => obs$ =>
        obs$.pipe(
            concatMap(() => {
                const { email, password } = req.body;
                const user = new User({ email });
                return from(user.setPassword(password));
            }),
            delayWhen(user => MongoSave(user)),
            tap(a => console.log('adduser'))
        );

    const register = of({ req, res }).pipe(
        existuser$(req, res),
        addUser$(req, res),
        makeTokenUser$(req, res),
        catchError(e => of(e))
    );
    register.subscribe(({ res, data }) => res.json(data));
});

router.post('/login', (req, res) => {
    const isnotcompact$ = (req, res) => obs$ =>
        obs$.pipe(
            tap(() => {
                const { email, password } = req.body;
                if (isnotcompact(email, password)) {
                    throw new CusError(compactErrorMessage(res));
                }
            })
        );

    const isuser = (req, res) => obs$ =>
        obs$.pipe(
            getUser(),
            tap(user => {
                if (!isnotnull(user)) {
                    throw new CusError(isnotUserMessage(res));
                }
            })
        );

    const checkPassword$ = (req, res) => obs$ =>
        obs$.pipe(
            concatMap(user => from(user.checkPassword(req.body.password))),
            tap(user => {
                if (!isnotnull(user)) {
                    throw new CusError(isnotValid(res));
                }
            })
        );

    const login$ = of({ req, res }).pipe(
        isnotcompact$(req, res),
        isuser(req, res),
        checkPassword$(req, res),
        //makeTokenUser$(req, res),
        catchError(e => of(e))
    );
    login$.subscribe(({ res, data }) => res.json(data));
});
router.post('/logout', (req, res) => {
    console.log('로그아웃');
});

module.exports = router;
