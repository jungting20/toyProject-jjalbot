import { useState, useEffect } from 'react';
import { Observable } from 'rxjs';

export function useObservable<U>(observable: Observable<U>): U {
    const [state, setstate] = useState();
    useEffect(() => {
        const subject = observable.subscribe(setstate);
        return () => {
            subject.unsubscribe();
        };
    }, [observable]);
    return state;
}
