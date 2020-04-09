import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import jjalbotReducer, { jjalbotFetchEpic } from './jjalbot';
import roomReducer from './room';
import chatReducer from './chat';
import openroomReducer, { openRoomListFetchEpic } from './openroom';
import loginReducer, { loginFetchEpic } from './login';

export const rootEpic = combineEpics(
    jjalbotFetchEpic,
    openRoomListFetchEpic,
    loginFetchEpic
);

const rootReducer = combineReducers({
    jjalbot: jjalbotReducer,
    room: roomReducer,
    openroom: openroomReducer,
    chat: chatReducer,
    auth: loginReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
