import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { faSmile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';

interface ErrorProps {
    size?: SizeProp;
}

const LoadingBlock = styled.div<ErrorProps>`
    display: 'inlile-block';
`;

const ErrorComponent = ({ size }: ErrorProps) => (
    <LoadingBlock>
        <FontAwesomeIcon icon={faSmile} size={size} />
    </LoadingBlock>
);

export default ErrorComponent;
