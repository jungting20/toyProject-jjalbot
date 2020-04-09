import React from 'react';
import styled from 'styled-components';
//import ChatComponent from './chatComponent';
import RoomComponent from './roomComponent';
import { Room } from '../../modules/room';
import { OpenRoom } from '../../modules/openroom';
import { Chat } from '../../modules/chat';

interface TotalChatComponentProps {
    roomList: Room[];
    openroomList: OpenRoom[];
    chatList?: Chat[];
}

const TotalChatComponentBlock = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: space-around;
`;

const TotalChatComponent = ({
    roomList,
    chatList,
    openroomList,
}: TotalChatComponentProps) => (
    <TotalChatComponentBlock>
        <RoomComponent roomList={roomList} openroomList={openroomList} />
        {/* <ChatComponent chatList={chatList} /> */}
    </TotalChatComponentBlock>
);

export default TotalChatComponent;
