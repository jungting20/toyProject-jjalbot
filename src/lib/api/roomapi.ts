import axios from 'axios';
import { from, of, Observable } from 'rxjs';
import { map, pluck, catchError, tap } from 'rxjs/operators';
import { OpenRoom } from '../../modules/openroom';
const instance = axios.create({
    baseURL: 'http://localhost:4000/room',
});

export const fetchOpenRoomList = (): Observable<OpenRoom[]> => {
    return from(instance.get('/openRoomList')).pipe(
        pluck('data'),
        map(({ data }) => data),
        catchError(error => of([]))
    );
};
