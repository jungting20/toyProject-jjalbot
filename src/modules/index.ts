import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import jjalbotReducer, { jjalbotFetchEpic } from './jjalbot';
import roomReducer from './myroom';
import chatReducer, { joinChatRoomEpic, addChatEpic } from './chat';
import openroomReducer, { openRoomListFetchEpic } from './openroom';
import loginReducer, { loginFetchEpic } from './login';
import modalReducer from './inputmodal';

export const rootEpic = combineEpics(
    jjalbotFetchEpic,
    openRoomListFetchEpic,
    loginFetchEpic,
    joinChatRoomEpic,
    addChatEpic
);

const rootReducer = combineReducers({
    jjalbot: jjalbotReducer,
    room: roomReducer,
    openroom: openroomReducer,
    chat: chatReducer,
    auth: loginReducer,
    modal: modalReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
