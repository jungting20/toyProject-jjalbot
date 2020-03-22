import { Observable } from 'rxjs';
import { ofType } from 'redux-observable';
import { switchMap, mergeMap, map } from 'rxjs/operators';
import { fetchImgList } from '../lib/api/jjalbotapi';

export interface userMap {
    [key: string]: string;
}

export interface chat {
    content: string;
    userid: number;
}

//--declare type
export interface Room {
    id: number;
    chatlist: chat[];
    users: userMap;
}

export interface Metadata {
    type: string;
    width: number;
    height: number;
}
//--end declare type

//----types----
const FETCH_JJAL = 'jjal/FETCH_JJAL' as const;
const SET_JJAL = 'jjal/SET_JJAL' as const;
const SET_SEARCHTEXT = 'jjal/SET_SEARCHTEXT' as const;

//-------end types-----------------

//--actions--
export const fetch_jjal = (text: string) => ({
    type: FETCH_JJAL,
    payload: text,
});
/* export const set_jjal = (jjallist: Jalbottype[]) => ({
    type: SET_JJAL,
    payload: jjallist,
}); */

export const set_searchText = (text: string) => ({
    type: SET_SEARCHTEXT,
    payload: text,
});

//--end actions---

//--action type
/* type jjal_actions = ReturnType<typeof set_jjal | typeof fetch_jjal | typeof set_searchText>; */

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
/* export type JjalBotInitialStateType = {
    searchText: string;
    imglist: Jalbottype[];
    isLoading: boolean;
}; */

/* const initialstate: JjalBotInitialStateType = {
    searchText: '',
    imglist: [],
    isLoading: false,
};

 */

/* function jjalbotReducer(
    state: JjalBotInitialStateType = initialstate,
    action: jjal_actions
) {
    switch (action.type) {
        case FETCH_JJAL:
            return { ...state };
        case SET_JJAL:
            return { ...state, imglist: action.payload };
        case SET_SEARCHTEXT:
            return { ...state, searchText: action.payload };
        default:
            return state;
    }
}

export default jjalbotReducer;
 */
