import React, { createRef, useEffect, useState } from 'react';
import { fromEvent, merge, of } from 'rxjs';
import {
    debounceTime,
    filter,
    tap,
    mergeMap,
    mapTo,
    pluck,
    map,
} from 'rxjs/operators';
import { isnotnull } from '../../lib/util';
import LoadingImgComponent, { ImgBlock, LzyimgProps } from './Img';

const isnotnullCurrentToRectOb = (ref: React.RefObject<HTMLElement>) =>
    of(ref).pipe(pluck('current'), filter(isnotnull));

const scroll$ = (ref: React.RefObject<HTMLElement>) =>
    isnotnullCurrentToRectOb(ref).pipe(
        mergeMap((dom: HTMLElement) =>
            fromEvent(window, 'scroll').pipe(debounceTime(500), mapTo(dom))
        )
    );

//현재 돔의 위치를 검사하여 이미지 요청 유뮤를 선택
const filteringstartloader = (a: HTMLElement) =>
    a.getBoundingClientRect().top <= window.innerHeight &&
    a.getBoundingClientRect().bottom >= 0;

const Lzyimg = (props: LzyimgProps) => {
    const [loading, setloading] = useState(true); // 이미지 로딩중 loading 태그 보여줄지 상태 유무
    const [startloading, setstartloading] = useState(false); //스크롤 위치에 따라 로딩 시작을 결정해야함 즉 이미지 요청여부를 결정
    const ImgBlockRef = createRef<HTMLElement>(); //scroll 이벤트 등록을 위한 Block의 돔이 필요

    useEffect(() => {
        const loadingstater$ = merge(
            isnotnullCurrentToRectOb(ImgBlockRef),
            scroll$(ImgBlockRef)
        )
            .pipe(
                filter(filteringstartloader),
                tap(a => {
                    setstartloading(true);
                })
            )
            .subscribe();

        return () => {
            loadingstater$.unsubscribe();
        };
    }, [loading, startloading]);
    //useCallback으로 만들자
    const onload = (e: any) => {
        setloading(false);
        console.log('onload', loading);
    };

    return !startloading ? (
        <ImgBlock ref={ImgBlockRef} />
    ) : (
        <LoadingImgComponent {...props} onLoad={onload} isloading={loading} />
    );
};

export default Lzyimg;
