//--declare type

type Nullable<T> = T | null;

export interface InputModal {
    nickname: string;
    visible: boolean;
    confirm: boolean;
    roomid: string;
}

//--end declare type

//----types----

const SHOW_MODAL = 'modal/SHOW_MODAL' as const;
//const HIDE_MODAL = 'modal/HIDE_MODAL' as const;
const SET_NICKNAME = 'modal/SET_NICKNAME' as const;
//const GET_NICKNAME = 'modal/GET_NICKNAME' as const;
const SUBMIT_NICKNAME = 'modal/SUBMIT_NICKNAME' as const;
const CANCEL_NICKNAME = 'modal/CANCEL_NICKNAME' as const;
//const SET_CONFIRM = 'modal/SET_CONFIRM' as const;

//-------end types-----------------

//--actions--
export const show_modal = (roomid: string) => ({
    type: SHOW_MODAL,
    payload: roomid,
});

export const set_nickname = (nickname: string) => ({
    type: SET_NICKNAME,
    payload: nickname,
});

export const submit_nickname = () => ({
    type: SUBMIT_NICKNAME,
});
export const cancel_nickname = () => ({
    type: CANCEL_NICKNAME,
});

//--end actions---

//--action type
type modal_actions = ReturnType<
    | typeof show_modal
    | typeof set_nickname
    | typeof submit_nickname
    | typeof cancel_nickname
>;

/* export const modalShowEpic = (action$: Observable<any>) =>
    action$.pipe(
        ofType(GET_NICKNAME),
        concatMap(action =>
            action$.pipe(
                ofType(SUBMIT_NICKNAME),
                tap(a => console.log('concatmap'))
                //map(submitaction => submitaction.payload)
            )
        )
    ); */
//--end action type

//const roomlist = [testroom, testroom, testroom];

export type InputModalInitialStateType = InputModal;

const initialstate: InputModal = {
    nickname: '',
    visible: false,
    confirm: false,
    roomid: '',
};

function modalReducer(
    state: InputModalInitialStateType = initialstate,
    action: modal_actions
): InputModalInitialStateType {
    switch (action.type) {
        case SHOW_MODAL:
            return { ...state, visible: true, roomid: action.payload };
        case SET_NICKNAME: {
            return { ...state, visible: true, nickname: action.payload };
        }
        case SUBMIT_NICKNAME: {
            return { ...state, confirm: true, visible: false };
        }
        case CANCEL_NICKNAME: {
            return { ...state, confirm: false, visible: false, nickname: '' };
        }
        default:
            return state;
    }
}

export default modalReducer;
