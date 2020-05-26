import { Observable, of } from 'rxjs';
import { ofType } from 'redux-observable';
import { switchMap, map, catchError } from 'rxjs/operators';
import { fetchLogin, fetchCheckLogin, fetchLogout } from '../lib/api/userapi';
import { Room } from './chat';

//--declare type

type Nullable<T> = T | null;

export interface Login {
    email: string;
    password: string;
}

export interface User {
    rooms: Room[];
    _id: string;
    email: string;
    _v: number;
}

//--end declare type

//----types----

const FETCH_LOGIN = 'login/FETCH_LOGIN' as const;
const FETCH_CHECKLOGIN = 'login/FETCH_CHECKLOGIN' as const;
const FETCH_LOGOUT = 'login/FETCH_LOGOUT' as const;
const SET_EMAIL = 'login/SET_EMAIL' as const;
const SET_PASSWORD = 'login/SET_PASSWORD' as const;
const SET_LOGIN = 'login/SET_LOGIN' as const;
const SET_ERROR = 'login/SET_ERROR' as const;
const SET_ROOMS = 'login/SET_ROOMS' as const;
const SET_INIT = 'login/SET_INIT' as const;

//-------end types-----------------

//--actions--
export const fetch_login = (loginobj: Login) => ({
    type: FETCH_LOGIN,
    payload: loginobj,
});
export const fetch_checklogin = () => ({
    type: FETCH_CHECKLOGIN,
});

export const fetch_logout = () => ({
    type: FETCH_LOGOUT,
});
export const set_email = (email: string) => ({
    type: SET_EMAIL,
    payload: email,
});
export const set_password = (password: string) => ({
    type: SET_PASSWORD,
    payload: password,
});
export const set_login = (user: any) => ({
    type: SET_LOGIN,
    payload: user,
});
export const set_error = (errormessage: string) => ({
    type: SET_ERROR,
    payload: errormessage,
});
export const set_rooms = (rooms: Room[]) => ({
    type: SET_ROOMS,
    payload: rooms,
});
export const set_init = () => ({
    type: SET_INIT,
});
//--end actions---

//--action type
type login_actions = ReturnType<
    | typeof fetch_login
    | typeof fetch_checklogin
    | typeof fetch_logout
    | typeof set_email
    | typeof set_password
    | typeof set_login
    | typeof set_error
    | typeof set_rooms
    | typeof set_init
>;

export const loginFetchEpic = (action$: Observable<any>) =>
    action$.pipe(
        ofType(FETCH_LOGIN),
        switchMap(action =>
            fetchLogin(action.payload).pipe(
                map((user: any) => set_login(user)),
                //tap(resoponse => console.log('탭탭탭', resoponse)),
                catchError((e: any) => {
                    return of(set_error(e.message));
                })
            )
        )
    );
export const checkloginFetchEpic = (action$: Observable<any>) =>
    action$.pipe(
        ofType(FETCH_CHECKLOGIN),
        switchMap(action =>
            fetchCheckLogin().pipe(
                map((user: any) => set_login(user)),
                //tap(resoponse => console.log('탭탭탭', resoponse)),
                catchError((e: any) => {
                    return of(set_error(e.message));
                })
            )
        )
    );
export const logoutFetchEpic = (action$: Observable<any>) =>
    action$.pipe(
        ofType(FETCH_LOGOUT),
        switchMap(action =>
            fetchLogout().pipe(
                map((any: any) => set_init()),
                //tap(resoponse => console.log('탭탭탭', resoponse)),
                catchError((e: any) => {
                    return of(set_error(e.message));
                })
            )
        )
    );
//--end action type

//const roomlist = [testroom, testroom, testroom];

export type LoginInitialStateType = {
    login: Login;
    auth: Nullable<User>;
    authError: Nullable<string>;
    tokencheck: boolean;
    myroomList: Room[];
};

const initialstate: LoginInitialStateType = {
    login: {
        email: '',
        password: '',
    },
    auth: null,
    authError: null,
    tokencheck: false,
    myroomList: [],
};

function loginReducer(
    state: LoginInitialStateType = initialstate,
    action: login_actions
): LoginInitialStateType {
    switch (action.type) {
        case FETCH_LOGIN:
            const initlogindata = { email: '', password: '' };
            return { ...state, login: initlogindata };
        case SET_EMAIL:
            const setEmailedObj = { ...state.login, email: action.payload };
            return { ...state, login: setEmailedObj };
        case SET_PASSWORD:
            const setPasswordObj = { ...state.login, password: action.payload };
            return { ...state, login: setPasswordObj };
        case SET_LOGIN:
            return {
                ...state,
                auth: action.payload,
                authError: null,
                tokencheck: true,
                myroomList: action.payload.rooms,
            };
        case SET_ERROR:
            return { ...state, authError: action.payload, tokencheck: true };
        case SET_ROOMS:
            const newauth = Object.assign(state.auth, {
                rooms: action.payload,
            });
            return { ...state, auth: newauth };
        case FETCH_LOGOUT:
            return state;
        case SET_INIT:
            return initialstate;
        default:
            return state;
    }
}

export default loginReducer;
