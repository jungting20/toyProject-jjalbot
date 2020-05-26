import axios from 'axios';
import { from, of, Observable } from 'rxjs';
import { pluck, catchError } from 'rxjs/operators';
const instance = axios.create({
    baseURL: 'http://localhost:4000',
    withCredentials: true,
});

const joinRoomMaker = (url: string) => ({
    userid,
    roomid,
    nickname,
}: any): Observable<any[]> => {
    return from(
        instance.post(url, {
            userid,
            roomid,
            nickname,
        })
    ).pipe(pluck('data'));
};

export const fetchRoomList = (): Observable<any[]> => {
    return from(instance.get('/room/roomList')).pipe(
        pluck('data'),
        catchError(error => of([]))
    );
};

export const joinRoomAndGetChatList = joinRoomMaker('/room/joinUser');
export const joinMyRoomAndGetChatList = joinRoomMaker('/room/joinMyRoom');

export const addChat = (chatobj: any): Observable<any[]> => {
    return from(instance.post('/chat/addchat', chatobj)).pipe(pluck('data'));
};
