import React from 'react';
import TotalChatComponent from '../../component/chat/TotalChatComponent';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';

const ChatContainer = () => {
    const { room } = useSelector((state: RootState) => state);
    return <TotalChatComponent roomList={room.roomList} />;
};

export default ChatContainer;
