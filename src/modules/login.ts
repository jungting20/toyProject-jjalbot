import { Observable, of } from 'rxjs';
import { ofType } from 'redux-observable';
import { switchMap, mergeMap, map, tap, catchError } from 'rxjs/operators';
import { fetchOpenRoomList } from '../lib/api/roomapi';
import { fetchLogin } from '../lib/api/userapi';

//--declare type

type Nullable<T> = T | null;

export interface Login {
    email: string;
    password: string;
}

export interface User {
    rooms: Array<any>;
    _id: string;
    email: string;
    _v: number;
}

//--end declare type

//----types----

const FETCH_LOGIN = 'login/FETCH_LOGIN' as const;
const SET_EMAIL = 'login/SET_EMAIL' as const;
const SET_PASSWORD = 'login/SET_PASSWORD' as const;
const SET_LOGIN = 'login/SET_LOGIN' as const;
const SET_ERROR = 'login/SET_INIT' as const;

//-------end types-----------------

//--actions--
export const fetch_login = (loginobj: Login) => ({
    type: FETCH_LOGIN,
    payload: loginobj,
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
//--end actions---

//--action type
type login_actions = ReturnType<
    | typeof fetch_login
    | typeof set_email
    | typeof set_password
    | typeof set_login
    | typeof set_error
>;

export const loginFetchEpic = (action$: Observable<any>) =>
    action$.pipe(
        ofType(FETCH_LOGIN),
        switchMap(action =>
            fetchLogin(action.payload).pipe(
                map((user: any) => set_login(user)),
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
    authError: string;
};

const initialstate: LoginInitialStateType = {
    login: {
        email: '',
        password: '',
    },
    auth: null,
    authError: '',
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
            let setEmailedObj = { ...state.login, email: action.payload };
            return { ...state, login: setEmailedObj };
        case SET_PASSWORD:
            let setPasswordObj = { ...state.login, password: action.payload };
            return { ...state, login: setPasswordObj };
        case SET_LOGIN:
            return { ...state, auth: action.payload };
        case SET_ERROR:
            return { ...state, authError: action.payload };
        default:
            return state;
    }
}

export default loginReducer;
