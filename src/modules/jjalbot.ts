import { Observable } from 'rxjs';
import { ofType } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';
import { fetchImgList } from '../lib/api/jjalbotapi';

//--declare type
export interface Jalbottype {
    _id: string;
    tags: string[];
    status: string;
    title: string;
    shortId: string;
    bucketUrl: string;
    type: string;
    videoUrl?: string;
    metadata: Metadata;
    createdAt: string;
    updatedAt: string;
    __v: number;
    imageUrl: string;
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
//-------end types-----------------

//--actions--
export const fetch_jjal = (text: string) => ({
    type: FETCH_JJAL,
    payload: text,
});
export const set_jjal = (jjallist: Jalbottype[]) => ({
    type: SET_JJAL,
    payload: jjallist,
});
//--end actions---

type jjal_actions = ReturnType<typeof set_jjal | typeof fetch_jjal>;

export type JjalBotInitialStateType = {
    imglist: Jalbottype[];
};

const initialstate: JjalBotInitialStateType = {
    imglist: [],
};

export const jjalbotFetchEpic = (action$: Observable<any>) =>
    action$.pipe(
        ofType(FETCH_JJAL),
        mergeMap(action =>
            fetchImgList(action.payload).pipe(
                map((imglist: Jalbottype[]) => set_jjal(imglist))
            )
        )
    );
function jjalbotReducer(
    state: JjalBotInitialStateType = initialstate,
    action: jjal_actions
) {
    switch (action.type) {
        case FETCH_JJAL:
            return { ...state };
        case SET_JJAL:
            return { ...state, imglist: action.payload };

        default:
            return state;
    }
}

export default jjalbotReducer;
