import axios from 'axios';
import { from, of, Observable } from 'rxjs';
import { pluck, catchError, tap, map } from 'rxjs/operators';
import { Jalbottype } from '../../modules/jjalbot';
import { Chat } from '../../modules/chat';
const instance = axios.create({
    baseURL: 'http://localhost:4000',
});

export const fetchRoomList = (): Observable<any[]> => {
    return from(instance.get('/room/roomList')).pipe(
        pluck('data'),
        tap(a => console.log(a)),
        catchError(error => of([]))
    );
};

export const joinRoomAndGetChatList = ({
    userid,
    roomid,
    nickname,
}: any): Observable<any[]> => {
    return from(
        instance.post('/room/joinUser', {
            userid,
            roomid,
            nickname,
        })
    ).pipe(
        pluck('data'),
        tap(a => console.log('나오긴할까', a))
    );
};

export const addChat = (chatobj: any): Observable<any[]> => {
    console.log('ㅁddChat');
    return from(instance.post('/chat/addchat', chatobj)).pipe(pluck('data'));
};
