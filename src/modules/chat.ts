import { Observable } from 'rxjs';
import { ofType } from 'redux-observable';
import { switchMap, mergeMap, map } from 'rxjs/operators';
import { fetchImgList } from '../lib/api/jjalbotapi';
import { User } from './room';

//--declare type

export interface Chat {
    content: string;
    user: User;
    createdtime: Date;
}

//--end declare type

//----types----

const FETCH_CHAT = 'chat/FETCH_CHAT' as const;
const SET_CHAT = 'chat/SET_CHAT' as const;
const MAKE_CHAT = 'chat/MAKE_CHAT' as const;
const UPDATE_CHAT = 'chat/UPDATE_CHAT' as const;

//-------end types-----------------

//--actions--
export const fetch_chat = () => ({
    type: FETCH_CHAT,
});

export const set_chat = (chatList: Chat[]) => ({
    type: SET_CHAT,
    payload: chatList,
});

export const make_chat = (chat: Chat) => ({
    type: MAKE_CHAT,
    payload: chat,
});

export const update_chat = (chat: Chat) => ({
    type: UPDATE_CHAT,
    payload: chat,
});

//--end actions---

//--action type
type room_actions = ReturnType<
    typeof fetch_chat | typeof set_chat | typeof make_chat | typeof update_chat
>;

/* export const jjalbotFetchEpic = (action$: Observable<any>) =>
    action$.pipe(
        ofType(FETCH_JJAL),
        switchMap(action =>
            fetchImgList(action.payload).pipe(
                map((imglist: Jalbottype[]) => set_jjal(imglist))
            )
        )
    ) */
//--end action type
let testchat: Chat = {
    createdtime: new Date(),
    user: {
        id: 1,
        nickname: 'test',
        email: 'testman',
    },
    content: '인생갱당함',
};

let chatlist = [testchat, testchat, testchat];

export type ChatInitialStateType = {
    chatList: Chat[];
    userList: User[];
};

const initialstate: ChatInitialStateType = {
    chatList: chatlist,
    userList: [],
};

function chatReducer(
    state: ChatInitialStateType = initialstate,
    action: room_actions
): ChatInitialStateType {
    switch (action.type) {
        case FETCH_CHAT:
            return state;
        case SET_CHAT:
            return { ...state, chatList: action.payload };
        case MAKE_CHAT:
            return {
                ...state,
                chatList: state.chatList.concat(action.payload),
            };
        case UPDATE_CHAT: {
            return state;
        }
        default:
            return state;
    }
}

export default chatReducer;
