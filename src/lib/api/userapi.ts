import axios from 'axios';
import { from, of, Observable } from 'rxjs';
import { pluck, catchError, tap, map } from 'rxjs/operators';
import { User, Login } from '../../modules/login';
const instance = axios.create({
    baseURL: 'http://localhost:4000/user',
});

export const fetchLogin = (loginobj: Login): Observable<User[]> => {
    return from(instance.post('/login', loginobj)).pipe(
        pluck('data'),
        map(({ data }) => data)
        /* catchError(error => {
            console.log('혹시 여기서?', error);
            return of([]);
        }) */
    );
};
