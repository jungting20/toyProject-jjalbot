import axios from 'axios';
import { from, of, Observable } from 'rxjs';
import { pluck, catchError } from 'rxjs/operators';
import { Jalbottype } from '../../modules/jjalbot';
const instance = axios.create({
    baseURL: 'https://jjalbot.com/api/jjals',
});

axios({
    url: 'https://www.dailysecu.com/news/photo/201911/78344_76892_1943.png',
    method: 'get',
}).then(a => console.log('axios', a));

export const fetchImgList = (text: string): Observable<Jalbottype[]> => {
    return from(
        instance.get('/', {
            params: {
                text: `'${text}'`,
            },
        })
    ).pipe(
        pluck('data'),
        catchError(error => of([]))
    );
};
