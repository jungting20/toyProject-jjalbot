import React from 'react';
import styled from 'styled-components';
import Loading from './Loading';
import ErrorComponent from './ErrorComponent';

export interface LzyimgProps {
    width?: string;
    height?: string;
    src?: string;
    isloading?: boolean;
    iserror?: boolean;
    onLoad?: any;
    onerror?: any;
    ref?: any;
    maxheight?: string;
    maxwidth?: string;
}

export const ImgBlock = styled.div`
    /* height: 100px;
    width: 100px; */
    width: ${(props: LzyimgProps) => (props.width ? props.width : 'auto')};
    height: ${(props: LzyimgProps) => (props.height ? props.height : 'auto')};
    border: 1px solid;
    display: inline-flex;
    justify-content: center;
    max-height: ${(props: LzyimgProps) =>
        props.maxheight ? props.maxheight : '500px'};
    max-width: ${(props: LzyimgProps) =>
        props.maxwidth ? props.maxwidth : '250px'};
`;

export const ImgComponent = styled.img<LzyimgProps>`
    background-color: blue;
    /* visibility: hidden; */
    display: ${(props: LzyimgProps) => (props.isloading ? 'none' : 'block')};
    max-height: inherit;
    max-width: inherit;
`;

const LoadingImgComponent = (props: LzyimgProps) => {
    return (
        <ImgBlock>
            <Loading size="5x" isloading={props.isloading} />
            {props.iserror ? (
                <ErrorComponent size="10x" />
            ) : (
                <ImgComponent
                    src={props.src}
                    onLoad={props.onLoad}
                    isloading={props.isloading}
                    onError={props.onerror}
                />
            )}
        </ImgBlock>
    );
};

export default LoadingImgComponent;
