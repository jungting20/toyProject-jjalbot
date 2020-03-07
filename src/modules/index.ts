import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import jjalbotReducer, { jjalbotFetchEpic } from './jjalbot';

export const rootEpic = combineEpics(jjalbotFetchEpic);

const rootReducer = combineReducers({
    jjalbot: jjalbotReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
