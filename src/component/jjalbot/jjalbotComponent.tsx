import React from 'react';
import styled from 'styled-components';
import { Jalbottype } from '../../modules/jjalbot';
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

const JjalbotComponent = ({ imglist }: JjalBotComponentProps) => {
    return (
        <JjalbotBlock>
            {imglist.map(a => (
                <ImgLzy src={a.imageUrl} key={a._id} />
            ))}
        </JjalbotBlock>
    );
};

export default JjalbotComponent;
