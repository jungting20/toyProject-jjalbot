import React from 'react';
import styled from 'styled-components';
import Loading from './Loading';

export interface LzyimgProps {
    width?: string;
    height?: string;
    src?: string;
    isloading?: boolean;
    onLoad?: any;
    ref?: any;
}

export const ImgBlock = styled.div`
    /* height: 100px;
    width: 100px; */
    width: ${(props: LzyimgProps) => (props.width ? props.width : 'auto')};
    height: ${(props: LzyimgProps) => (props.height ? props.height : 'auto')};
    border: 1px solid;
    display: inline-flex;
    justify-content: center;
`;

export const ImgComponent = styled.img<LzyimgProps>`
    background-color: blue;
    /* visibility: hidden; */
    display: ${(props: LzyimgProps) => (props.isloading ? 'none' : 'block')};
`;

const LoadingImgComponent = (props: LzyimgProps) => {
    return (
        <ImgBlock>
            <Loading size="10x" isloading={props.isloading} />
            <ImgComponent
                src={props.src}
                onLoad={props.onLoad}
                isloading={props.isloading}
            />
        </ImgBlock>
    );
};

export default LoadingImgComponent;
