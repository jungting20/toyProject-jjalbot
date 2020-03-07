import React from 'react';
import styled from 'styled-components';
import { JjalBotInitialStateType } from '../../modules/jjalbot';
import ImgLzy from '../common/ImgLzy';

const JjalbotBlock = styled.div`
    /* width: 500px;
    height: 500px; */
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
    grid-auto-rows: minmax(100px, auto);
`;

const JjalbotComponent = ({ imglist }: JjalBotInitialStateType) => {
    return (
        <JjalbotBlock>
            {imglist.map(a => (
                <ImgLzy src={a.imageUrl} />
            ))}
        </JjalbotBlock>
    );
};

export default JjalbotComponent;
