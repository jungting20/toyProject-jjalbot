import { Observable } from 'rxjs';
import { ofType } from 'redux-observable';
import { switchMap, mergeMap, map } from 'rxjs/operators';
import { User } from './login';
import { joinRoomAndGetChatList, addChat } from '../lib/api/chatapi';

//--declare type

export interface Chat {
    room: string;
    nickname: string;
    content: string;
    checkedUserList: String[];
    createdAt: Date;
}
export interface Member {
    user: User;
    nickname: string;
}

export interface Room {
    id: number;
    memberList: Member[];
    Lastmessage: {
        createdtime: Date;
        content: string;
    };
    createdUser: User;
}

export interface CurrentRoom {
    id: string | null;
    isopen: boolean;
    nickname: string;
}

//--end declare type

//----types----

const INITIALIZE = 'chat/INITIALIZE' as const;
const FETCH_CHAT = 'chat/FETCH_CHAT' as const;
const SET_CHAT = 'chat/SET_CHAT' as const;
const MAKE_CHAT = 'chat/MAKE_CHAT' as const;
const UPDATE_CHAT = 'chat/UPDATE_CHAT' as const;
const JOIN_CHATROOM = 'chat/JOIN_CHATROOM' as const;

const FETCH_ROOM = 'chat/FETCH_ROOM' as const;
const SET_ROOM = 'chat/SET_ROOM' as const;
const MAKE_ROOM = 'chat/MAKE_ROOM' as const;
const UPDATE_ROOM = 'chat/UPDATE_ROOM' as const;
const SET_CURRENTROOM = 'chat/SET_CURRENTROOM' as const;

//-------end types-----------------

//--actions--
export const initialize_chat = () => ({
    type: INITIALIZE,
});
export const fetch_chat = () => ({
    type: FETCH_CHAT,
});

export const set_chat = (obj: any) => ({
    type: SET_CHAT,
    payload: obj,
});

export const make_chat = (chat: Chat) => ({
    type: MAKE_CHAT,
    payload: chat,
});

export const update_chat = (
    roomid: string,
    userid: string,
    content: string,
    nickname: string
) => ({
    type: UPDATE_CHAT,
    payload: {
        roomid,
        userid,
        content,
        nickname,
    },
});

export const join_chatroom = (
    roomid: string,
    userid: string,
    nickname: string
) => ({
    type: JOIN_CHATROOM,
    payload: {
        roomid,
        userid,
        nickname,
    },
});
export const fetch_room = () => ({
    type: FETCH_ROOM,
});

export const set_room = (roomList: Room[]) => ({
    type: SET_ROOM,
    payload: roomList,
});

export const set_currentroom = (roomobj: CurrentRoom) => ({
    type: SET_CURRENTROOM,
    payload: roomobj,
});

//--end actions---

//--action type
type room_actions = ReturnType<
    | typeof fetch_chat
    | typeof set_chat
    | typeof make_chat
    | typeof update_chat
    | typeof join_chatroom
    | typeof fetch_room
    | typeof set_room
    | typeof set_currentroom
    | typeof initialize_chat
>;

export const joinChatRoomEpic = (action$: Observable<any>) =>
    action$.pipe(
        ofType(JOIN_CHATROOM),
        switchMap(action =>
            joinRoomAndGetChatList(action.payload).pipe(
                map(({ data }: any) => {
                    const newData = Object.assign(data, {
                        roomid: action.payload.roomid,
                    });
                    console.log('newdata', newData);
                    return set_chat(newData);
                })
            )
        )
    );
export const addChatEpic = (action$: Observable<any>) =>
    action$.pipe(
        ofType(UPDATE_CHAT),
        switchMap(action =>
            addChat(action.payload).pipe(map(({ data }: any) => fetch_chat()))
        )
    );
//--end action type

//let chatlist = [testchat, testchat, testchat];

export type ChatInitialStateType = {
    chatList: Chat[];
    userList: User[];
    myroomList: any[];
    currentOpenRoom: CurrentRoom;
};

const initialstate: ChatInitialStateType = {
    chatList: [],
    userList: [],
    myroomList: [],
    currentOpenRoom: {
        id: null,
        isopen: false,
        nickname: '',
    },
};

function chatReducer(
    state: ChatInitialStateType = initialstate,
    action: room_actions
): ChatInitialStateType {
    switch (action.type) {
        case INITIALIZE:
            return initialstate;
        case FETCH_CHAT:
            return state;
        case SET_CHAT:
            const newCurrentOpenRoom = {
                id: action.payload.roomid,
                isopen: true,
                nickname: action.payload.nickname,
            };
            return {
                ...state,
                myroomList: action.payload.myroomList,
                chatList: action.payload.chatList,
                currentOpenRoom: newCurrentOpenRoom,
            };
        case MAKE_CHAT:
            return {
                ...state,
                chatList: state.chatList.concat(action.payload),
            };
        case UPDATE_CHAT: {
            return state;
        }
        case JOIN_CHATROOM: {
            return state;
        }
        default:
            return state;
    }
}

export default chatReducer;
