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
