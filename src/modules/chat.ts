import { Observable } from 'rxjs';
import { ofType } from 'redux-observable';
import { switchMap, map } from 'rxjs/operators';
import { User } from './login';
import {
    joinRoomAndGetChatList,
    addChat,
    joinMyRoomAndGetChatList,
} from '../lib/api/chatapi';

//--declare type

export interface Chat {
    room: string;
    nickname: string;
    content: string;
    checkedUserList: string[];
    createdAt: Date;
}
export interface Member {
    user: User;
    nickname: string;
}

export interface Room {
    _id: string;
    title: string;
    owner: string;
    joinedusers: NicknameUser[];
    createdAt: string;
    _v: number;
    /* lastmessage: {
        createdtime: Date;
        content: string;
    }; */
}

export interface NicknameUser {
    _id: string;
    nickname: string;
    userid: string;
}

type roomname = 'openroom' | 'myroom';

export interface CurrentRoom {
    id: string | null;
    isopen: boolean;
    nickname: string;
    fromwhichroom: roomname;
}

//--end declare type

//----types----

const INITIALIZE = 'chat/INITIALIZE' as const;
const FETCH_CHAT = 'chat/FETCH_CHAT' as const;
const SET_CHAT = 'chat/SET_CHAT' as const;
const MAKE_CHAT = 'chat/MAKE_CHAT' as const;
const UPDATE_CHAT = 'chat/UPDATE_CHAT' as const;
const JOIN_CHATROOM = 'chat/JOIN_CHATROOM' as const;
const JOIN_MYCHATROOM = 'chat/JOIN_MYCHATROOM' as const;
//const JOIN_CHATMYROOM = 'chat/JOIN_CHATMYROOM' as const;

const FETCH_ROOM = 'chat/FETCH_ROOM' as const;
const SET_ROOM = 'chat/SET_ROOM' as const;
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
    fromwhichroom: roomname,
    nickname?: string
) => ({
    type: JOIN_CHATROOM,
    payload: {
        roomid,
        userid,
        fromwhichroom,
        nickname,
    },
});
export const join_mychatroom = (
    roomid: string,
    userid: string,
    fromwhichroom: roomname,
    nickname?: string
) => ({
    type: JOIN_MYCHATROOM,
    payload: {
        roomid,
        userid,
        fromwhichroom,
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
const joinChatRoomEpicMaker = (
    type: string,
    apifn: (payload: any) => Observable<any>
) => (action$: Observable<any>) =>
    action$.pipe(
        ofType(type),
        switchMap(action =>
            apifn(action.payload).pipe(
                map(({ data }: any) => {
                    const newData = Object.assign(data, {
                        roomid: action.payload.roomid,
                        fromwhichroom: action.payload.fromwhichroom,
                    });
                    return set_chat(newData);
                })
            )
        )
    );

export const joinChatRoomEpic = joinChatRoomEpicMaker(
    JOIN_CHATROOM,
    joinRoomAndGetChatList
);

export const joinChatMyRoomEpic = joinChatRoomEpicMaker(
    JOIN_MYCHATROOM,
    joinMyRoomAndGetChatList
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
    myroomList: Room[];
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
        fromwhichroom: 'openroom',
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
                fromwhichroom: action.payload.fromwhichroom,
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
