import React from 'react';
import Lzyimg from '../component/common/ImgLzy';
import Arr from '../lib/dummydata/dummydata';
import styled from 'styled-components';

const ImagePageBlock = styled.div`
    /* width: 500px;
    height: 500px; */
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
    grid-auto-rows: minmax(100px, auto);
`;

const Imglazyloadingpage = () => {
    return (
        <ImagePageBlock>
            {Arr.map((a, i) => (
                <Lzyimg key={i} />
            ))}
        </ImagePageBlock>
    );
};

export default Imglazyloadingpage;
