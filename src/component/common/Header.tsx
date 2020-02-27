import React from 'react';
import styled from 'styled-components';
import Button from './Button';

const HeaderBlock = styled.div`
    width: 100%;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 1px solid;
    height: 100px;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    background-color: white;
    justify-content: center;
`;

function Header() {
    return (
        <HeaderBlock>
            <Wrapper>
                <Button to="/imglzy">이미지 지연로딩</Button>
                <Button to="/imgord">이미지 순차로딩</Button>
                <Button to="/gitsearch">깃검색페이지</Button>
                <Button to="/divslide">슬라이드</Button>
            </Wrapper>
        </HeaderBlock>
    );
}

export default Header;
