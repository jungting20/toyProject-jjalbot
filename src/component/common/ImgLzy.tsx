import React, { createRef, useState } from 'react';
import { fromEvent, merge, of } from 'rxjs';
import { filter, mergeMap, mapTo, pluck, throttleTime } from 'rxjs/operators';
import { isnotnull } from '../../lib/util';
import { useObservable } from '../../lib/customhook';
import LoadingImgComponent, { ImgBlock, LzyimgProps } from './Img';

const isnotnullCurrentToRectOb = (ref: React.RefObject<HTMLElement>) =>
    of(ref).pipe(pluck('current'), filter(isnotnull));

const event$ = (ref: React.RefObject<HTMLElement>, event: string) =>
    isnotnullCurrentToRectOb(ref).pipe(
        mergeMap((dom: HTMLElement) =>
            fromEvent(window, event).pipe(throttleTime(300), mapTo(dom))
        )
    );

//현재 돔의 위치를 검사하여 이미지 요청 유뮤를 선택
const filteringstartloader = (a: HTMLElement) =>
    a.getBoundingClientRect().top <= window.innerHeight &&
    a.getBoundingClientRect().bottom >= 0;

const Lzyimg = (props: LzyimgProps) => {
    const [loading, setloading] = useState(true); // 이미지 로딩중 loading 태그 보여줄지 상태 유무
    const ImgBlockRef = createRef<HTMLElement>(); //scroll 이벤트 등록을 위한 Block의 돔이 필요
    const loadingstater$ = merge(
        isnotnullCurrentToRectOb(ImgBlockRef), //처음 렌더링 시 위치를 알기 위해 wrapping
        event$(ImgBlockRef, 'scroll'), // 스크롤 이벤트 발생시 위치를 알기 위한 wrapping,
        event$(ImgBlockRef, 'resize')
    ) //시작 or scroll시에만 돔의 로딩여부가 결정됨(시작과 동시에 스크롤이벤트가 발생할 일은 없으니 merge를 하여 따로 처리 )처리되는 조건이 같아 merge가 가능했다
        .pipe(
            filter(filteringstartloader),
            mapTo(true) //위치가 loading이 가능한 위치이면
        );
    const startloading = useObservable(loadingstater$);
    const onload = (e: any) => {
        setloading(false);
    };
    return !startloading ? (
        <ImgBlock ref={ImgBlockRef} />
    ) : (
        <LoadingImgComponent {...props} onLoad={onload} isloading={loading} />
    );
};

export default Lzyimg;
