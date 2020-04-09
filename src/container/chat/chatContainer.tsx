import React, { useEffect } from 'react';
import socketio from 'socket.io-client';
import TotalChatComponent from '../../component/chat/TotalChatComponent';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../modules';
import {
    make_openroom,
    OpenRoom,
    fetch_openroom,
} from '../../modules/openroom';

const ChatContainer = () => {
    const { room, openroom } = useSelector((state: RootState) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        const socket = socketio.connect('http://localhost:4000/room');

        dispatch(fetch_openroom());

        socket.on('connect', () => {
            console.log('연결');
        });

        socket.on('newRoom', (data: any) => {
            const room: OpenRoom = data.room;

            dispatch(make_openroom(room));
        });
    }, []);

    return (
        <TotalChatComponent
            roomList={room.roomList}
            openroomList={openroom.openroomList}
        />
    );
};

export default ChatContainer;
