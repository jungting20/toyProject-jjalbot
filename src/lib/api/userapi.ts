import axios from 'axios';
import { from, Observable } from 'rxjs';
import { pluck, map } from 'rxjs/operators';
import { User, Login } from '../../modules/login';
const instance = axios.create({
    baseURL: 'http://localhost:4000/user',
    withCredentials: true,
});

export const fetchLogin = (loginobj: Login): Observable<User[]> => {
    return from(
        instance.post('/login', loginobj).catch(error => {
            throw error.response.data;
            //return Error(error.response.data);
        })
    ).pipe(
        pluck('data'),
        map(({ data }) => data)
        /* catchError(error => {
            console.log('혹시 여기서?', error);
            return of([]);
        }) */
    );
};
export const fetchCheckLogin = (): Observable<User[]> => {
    return from(
        instance.post('/checklogin').catch(error => {
            throw error.response.data;
            //return Error(error.response.data);
        })
    ).pipe(
        pluck('data'),
        map(({ data }) => data)
        /* catchError(error => {
            console.log('혹시 여기서?', error);
            return of([]);
        }) */
    );
};

export const fetchLogout = (): Observable<any[]> => {
    return from(
        instance.post('/logout').catch(error => {
            throw error.response.data;
            //return Error(error.response.data);
        })
    ).pipe(
        pluck('data'),
        map(({ data }) => data)
        /* catchError(error => {
            console.log('혹시 여기서?', error);
            return of([]);
        }) */
    );
};
