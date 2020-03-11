import React from 'react';
import { from } from 'rxjs';
import { concatMap, scan, take } from 'rxjs/operators';
import styled from 'styled-components';
import { useObservable } from '../../lib/customhook';
import { Jalbottype } from '../../modules/jjalbot';
import ErrorComponent from '../common/ErrorComponent';
import ImgLzy from '../common/ImgLzy';

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

const JjalbotOrderedComponent = ({ imglist }: JjalBotComponentProps) => {
    const listState = useObservable(
        from(imglist).pipe(
            concatMap((imgobj: Jalbottype, i) => {
                const img = new Image();
                return new Promise<JSX.Element>(resolve => {
                    const onload = () => {
                        resolve(
                            <ImgLzy src={imgobj.imageUrl} key={imgobj._id} />
                        );
                    };
                    const onerror = () => {
                        console.log(`${i}번 이미지 로딩 실패`);
                        resolve(<ErrorComponent size="10x" key={imgobj._id} />);
                    };
                    img.onload = onload;
                    img.onerror = onerror;
                    img.src = imgobj.imageUrl;
                });
            }),
            scan<JSX.Element, JSX.Element[]>(
                (acc, curr) => acc.concat(curr),
                []
            )
        ),
        [imglist]
    );

    return <JjalbotBlock>{listState}</JjalbotBlock>;
};

export default JjalbotOrderedComponent;
