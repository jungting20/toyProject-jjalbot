import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import jjalbotReducer, { jjalbotFetchEpic } from './jjalbot';
import roomReducer from './room';
import chatReducer from './chat';

export const rootEpic = combineEpics(jjalbotFetchEpic);

const rootReducer = combineReducers({
    jjalbot: jjalbotReducer,
    room: roomReducer,
    chat: chatReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
