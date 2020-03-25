import { Observable } from 'rxjs';
import { ofType } from 'redux-observable';
import { switchMap, mergeMap, map } from 'rxjs/operators';
import { fetchImgList } from '../lib/api/jjalbotapi';

export interface User {
    id: number;
    email: string;
    nickname: string;
}

export interface Chat {
    content: string;
    userid: number;
    userEmail: string;
    createdtime: Date;
}

//--declare type
export interface Room {
    id: number;
    memberList: User[];
    Lastmessage: {
        createdtime: Date;
        content: string;
    };
    createdUser: User;
}

//--end declare type

//----types----

const FETCH_ROOM = 'room/FETCH_ROOM' as const;
const SET_ROOM = 'room/SET_ROOM' as const;
const MAKE_ROOM = 'room/MAKE_ROOM' as const;
const UPDATE_ROOM = 'room/UPDATE_ROOM' as const;

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

//--end actions---

//--action type
type room_actions = ReturnType<
    typeof fetch_room | typeof set_room | typeof make_room | typeof update_room
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
let testroom: Room = {
    id: 1,
    memberList: [
        {
            id: 1,
            email: 'aho',
            nickname: 'jh1',
        },
        {
            id: 2,
            email: 'bho',
            nickname: 'jh2',
        },
        {
            id: 3,
            email: 'cho',
            nickname: 'jh3',
        },
    ],
    createdUser: {
        id: 1,
        email: 'aho',
        nickname: 'jh1',
    },
    Lastmessage: {
        createdtime: new Date(),
        content: '오잉',
    },
};

let roomlist = [testroom, testroom, testroom];

export type RoomInitialStateType = {
    roomList: Room[];
    currentOpenRoom: number;
};

const initialstate: RoomInitialStateType = {
    roomList: roomlist,
    currentOpenRoom: 0,
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
        default:
            return state;
    }
}

export default roomReducer;
