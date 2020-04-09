import axios from 'axios';
import { from, of, Observable } from 'rxjs';
import { pluck, catchError, tap } from 'rxjs/operators';
import { Jalbottype } from '../../modules/jjalbot';
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
