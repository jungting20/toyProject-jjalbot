import { Observable } from 'rxjs';

export const onlyone = (fn: Function) => {
    let isexcute = false;
    return function(...args: any) {
        if (!isexcute) {
            isexcute = true;
            return fn(...args);
        }
    };
};

export const isnotnull = (a: any) => a !== null;

export const fromSocketEvent = <T>(
    socket: SocketIOClient.Socket,
    eventname: string
) => {
    return new Observable(subscriber => {
        socket.on(eventname, (data: T) => {
            subscriber.next(data);
        });
        return () => socket.disconnect();
    });
};

/* export function createAction<T, P extends (...args: any) => any>(
    type: T,
    payloadCreator: P
): (...args: Parameters<P>) => Action<T> & { payload: ReturnType<P> };
export function createAction<T>(type: T): () => Action<T>;
export function createAction(type: any, payloadCreator?: any) {
    return (...args: any[]) => ({
        type,
        ...(payloadCreator && { payload: payloadCreator(...args) }),
    });
}
 */
