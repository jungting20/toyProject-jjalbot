import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { fetchOpenRoomList } from '../lib/api/roomapi';
import { ofType } from 'redux-observable';
//--declare type

export interface OpenRoom {
    users: any[];
    _id: string;
    title: string;
    owner: string;
    createdAt: string;
    __v: number;
}

//--end declare type

//----types----

const FETCH_OPENROOM = 'openroom/FETCH_ROOM' as const;
const SET_OPENROOM = 'openroom/SET_ROOM' as const;
const MAKE_OPENROOM = 'openroom/MAKE_ROOM' as const;
const UPDATE_OPENROOM = 'openroom/UPDATE_ROOM' as const;
const REMOVE_OPENROOM = 'openroom/REMOVE_ROOM' as const;

//-------end types-----------------

//--actions--
export const fetch_openroom = () => ({
    type: FETCH_OPENROOM,
});

export const set_openroom = (roomList: OpenRoom[]) => ({
    type: SET_OPENROOM,
    payload: roomList,
});

export const make_openroom = (room: OpenRoom) => ({
    type: MAKE_OPENROOM,
    payload: room,
});

export const update_openroom = (room: OpenRoom) => ({
    type: UPDATE_OPENROOM,
    payload: room,
});
export const remove_openroom = (roomid: string) => ({
    type: REMOVE_OPENROOM,
    payload: roomid,
});
//--end actions---

//--action type
type openroom_actions = ReturnType<
    | typeof fetch_openroom
    | typeof set_openroom
    | typeof make_openroom
    | typeof update_openroom
    | typeof remove_openroom
>;

export const openRoomListFetchEpic = (action$: Observable<any>) =>
    action$.pipe(
        ofType(FETCH_OPENROOM),
        switchMap(action =>
            fetchOpenRoomList().pipe(
                map((openroom: OpenRoom[]) => set_openroom(openroom))
            )
        )
    );
//--end action type

//const roomlist = [testroom, testroom, testroom];

export type OpenRoomInitialStateType = {
    openroomList: OpenRoom[];
};

const initialstate: OpenRoomInitialStateType = {
    openroomList: [],
};

function openroomReducer(
    state: OpenRoomInitialStateType = initialstate,
    action: openroom_actions
): OpenRoomInitialStateType {
    switch (action.type) {
        case FETCH_OPENROOM:
            return state;
        case SET_OPENROOM:
            return { ...state, openroomList: action.payload };
        case MAKE_OPENROOM:
            return {
                ...state,
                openroomList: state.openroomList.concat(action.payload),
            };
        case UPDATE_OPENROOM: {
            return state;
        }
        case REMOVE_OPENROOM: {
            const newOpenRoomList = state.openroomList.filter(
                room => room._id != action.payload
            );
            return { ...state, openroomList: newOpenRoomList };
        }
        default:
            return state;
    }
}

export default openroomReducer;
