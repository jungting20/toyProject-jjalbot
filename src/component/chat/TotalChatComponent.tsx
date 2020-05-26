import React from 'react';
import styled from 'styled-components';
//import ChatComponent from './chatComponent';
import RoomComponent from './roomComponent';
import ChatComponent from './chatComponent';
import { Room } from '../../modules/chat';
import { OpenRoom } from '../../modules/openroom';
import { Chat, CurrentRoom } from '../../modules/chat';

interface TotalChatComponentProps {
    roomList: Room[];
    openroomList: OpenRoom[];
    chatList?: Chat[];
    openroomdoublClick: (id: string) => void;
    currentRoom: CurrentRoom;
    enterEvent: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    myRoomdoubleClick: (id: string) => void;
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
    openroomdoublClick,
    currentRoom,
    enterEvent,
    myRoomdoubleClick,
}: TotalChatComponentProps) => (
    <TotalChatComponentBlock>
        <RoomComponent
            roomList={roomList}
            openroomList={openroomList}
            openRoomdoubleClick={openroomdoublClick}
            myRoomdoubleClick={myRoomdoubleClick}
        />
        <ChatComponent
            chatList={chatList!}
            currentRoom={currentRoom}
            enterEvent={enterEvent}
        />
    </TotalChatComponentBlock>
);

export default TotalChatComponent;
