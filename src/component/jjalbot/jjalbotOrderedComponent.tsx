import React, { useMemo, useCallback, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Jalbottype } from '../../modules/jjalbot';
import ImgLzy from '../common/ImgLzy';
import { useObservable } from '../../lib/customhook';
import { interval, from, range } from 'rxjs';
import {
    mergeMap,
    concatMap,
    map,
    filter,
    scan,
    take,
    tap,
} from 'rxjs/operators';
import { resolve } from 'dns';

type JjalBotComponentProps = {
    imglist: Jalbottype[];
};

const JjalbotBlock = styled.div`
    /* width: 500px;
    height: 500px; */
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-gap: 10px;
    grid-auto-rows: minmax(100px, auto);
`;

const makeImgLzy = (imgobj: Jalbottype) => (
    <ImgLzy src={imgobj.imageUrl} key={imgobj._id} />
);

const JjalbotOrderedComponent = ({ imglist }: JjalBotComponentProps) => {
    const listState = useObservable(
        from(imglist).pipe(
            concatMap((imgobj: Jalbottype) => {
                const img = new Image();
                return new Promise<JSX.Element>(resolve => {
                    const onload = () => {
                        resolve(<>{img}</>);
                    };
                    img.onload = onload;
                    img.src = imgobj.imageUrl;
                });
            }),
            tap(console.log),
            filter(a => !!a),
            take(4),
            scan<JSX.Element, JSX.Element[]>(
                (acc, curr) => acc.concat(curr),
                []
            )
        ),
        [imglist]
    );
    /* const totallist =
        listState &&
        listState.map(a => <ImgLzy src={a.imageUrl} key={a._id} />); */

    return <JjalbotBlock>{listState}</JjalbotBlock>;
};

export default JjalbotOrderedComponent;
