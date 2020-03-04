import React, { useState, useEffect } from 'react';
import { Observable } from 'rxjs';

export function useObservable<U>(Observable: Observable<U>): U {
    const [state, setstate] = useState();
    useEffect(() => {
        const subject = Observable.subscribe(setstate);
        return () => {
            subject.unsubscribe();
        };
    }, [Observable]);
    return state;
}
