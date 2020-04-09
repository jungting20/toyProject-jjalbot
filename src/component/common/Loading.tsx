import React from 'react';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import styled from 'styled-components';

interface LoadingProps {
    size?: SizeProp;
    isloading?: boolean;
}

const LoadingBlock = styled.div<LoadingProps>`
    display: ${props => (props.isloading ? 'inline-block' : 'none')};
`;

const Loading = ({ size, isloading }: LoadingProps) => (
    <LoadingBlock isloading={isloading}>
        <FontAwesomeIcon icon={faSpinner} size={size} spin />
    </LoadingBlock>
);

export default Loading;
