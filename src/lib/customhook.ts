import { useState, useEffect } from 'react';
import { Observable } from 'rxjs';

export function useObservable<U>(observable: Observable<U>, defs?: any[]): U {
    const [state, setstate] = useState<U>();
    useEffect(() => {
        const subject = observable.subscribe(setstate);
        return () => {
            subject.unsubscribe();
        };
    }, defs || [observable]);
    return state!;
}
