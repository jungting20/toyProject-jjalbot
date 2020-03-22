import React from 'react';
import styled from 'styled-components';
import ChatComponent from './chatComponent';
import RoomComponent from './roomComponent';

const TotalChatComponentBlock = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: space-around;
`;

const TotalChatComponent = () => (
    <TotalChatComponentBlock>
        <RoomComponent />
        <ChatComponent />
    </TotalChatComponentBlock>
);

export default TotalChatComponent;
