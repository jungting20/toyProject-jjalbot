import { Observable } from 'rxjs';
import { ofType } from 'redux-observable';
import { switchMap, mergeMap, map } from 'rxjs/operators';
import { fetchImgList } from '../lib/api/jjalbotapi';
import { User } from './login';

//--declare type
/* export interface User {
    id: number;
    email: string;
    nickname: string;
} */
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
}

//--end declare type

//----types----

const FETCH_ROOM = 'room/FETCH_ROOM' as const;
const SET_ROOM = 'room/SET_ROOM' as const;
const MAKE_ROOM = 'room/MAKE_ROOM' as const;
const UPDATE_ROOM = 'room/UPDATE_ROOM' as const;
const SET_CURRENTROOM = 'room/SET_CURRENTROOM' as const;

//-------end types-----------------

//--actions--
export const fetch_room = () => ({
    type: FETCH_ROOM,
});

export const set_room = (roomList: Room[]) => ({
    type: SET_ROOM,
    payload: roomList,
});

export const make_room = (room: Room) => ({
    type: MAKE_ROOM,
    payload: room,
});

export const update_room = (room: Room) => ({
    type: UPDATE_ROOM,
    payload: room,
});

export const set_currentroom = (roomobj: CurrentRoom) => ({
    type: SET_CURRENTROOM,
    payload: roomobj,
});

//--end actions---

//--action type
type room_actions = ReturnType<
    | typeof fetch_room
    | typeof set_room
    | typeof make_room
    | typeof update_room
    | typeof set_currentroom
>;

export type RoomInitialStateType = {
    roomList: Room[];
    currentOpenRoom: CurrentRoom;
};

const initialstate: RoomInitialStateType = {
    roomList: [],
    currentOpenRoom: {
        id: null,
        isopen: false,
    },
};

function roomReducer(
    state: RoomInitialStateType = initialstate,
    action: room_actions
): RoomInitialStateType {
    switch (action.type) {
        case FETCH_ROOM:
            return state;
        case SET_ROOM:
            return { ...state, roomList: action.payload };
        case MAKE_ROOM:
            return {
                ...state,
                roomList: state.roomList.concat(action.payload),
            };
        case UPDATE_ROOM: {
            return state;
        }
        case SET_CURRENTROOM: {
            return { ...state, currentOpenRoom: action.payload };
        }
        default:
            return state;
    }
}

export default roomReducer;
