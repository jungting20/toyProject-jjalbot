import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socketio from 'socket.io-client';
import InputNickNameModalComponent from '../../component/chat/InputNickNameModalComponent';
import TotalChatComponent from '../../component/chat/TotalChatComponent';
import { RootState } from '../../modules';
import {
    cancel_nickname,
    set_nickname,
    show_modal,
    submit_nickname,
} from '../../modules/inputmodal';
import {
    fetch_openroom,
    make_openroom,
    OpenRoom,
    set_openroom,
    remove_openroom,
} from '../../modules/openroom';

import {
    Chat,
    make_chat,
    initialize_chat,
    update_chat,
} from '../../modules/chat';

import { join_chatroom, join_mychatroom } from '../../modules/chat';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { set_rooms, fetch_checklogin } from '../../modules/login';
import useUpdateEffect from '../../lib/customhook';

const ChatContainer = ({ history }: RouteComponentProps) => {
    const { openroom, modal, auth, chat } = useSelector(
        (state: RootState) => state
    );

    const { nickname, confirm, visible, roomid } = modal;

    const { currentOpenRoom, chatList } = chat;

    const dispatch = useDispatch();
    const openroomdoubleClick = (id: string) => {
        dispatch(show_modal(id));
    };

    const myRoomdoubleClick = (id: string) => {
        dispatch(join_mychatroom(id, auth.auth!._id, 'myroom'));
    };

    const changeNickNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(set_nickname(e.currentTarget.value));
    };

    const submitNickNameInput = () => {
        dispatch(submit_nickname());
    };
    const cancelNickNameInput = () => {
        dispatch(cancel_nickname());
    };
    const enterEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        e.currentTarget.value = '';
        dispatch(update_chat(roomid, auth.auth!._id, value, nickname));
    };

    useUpdateEffect(() => {
        if (!confirm) {
            return;
        }
        dispatch(join_chatroom(roomid, auth.auth!._id, 'openroom', nickname));
    }, [confirm]);

    useUpdateEffect(() => {
        const socket = socketio.connect(
            `http://localhost:4000/chat?roomid=${currentOpenRoom.id}`
        );
        if (!currentOpenRoom.isopen) {
            socket.close();
            return;
        }

        if (currentOpenRoom.fromwhichroom === 'openroom') {
            dispatch(remove_openroom(roomid));
        }

        socket.on('newChat', (chat: Chat) => {
            console.log(chat, 'chatdata');
            dispatch(make_chat(chat));
        });

        return () => {
            socket.close();
        };
    }, [currentOpenRoom]);

    useEffect(() => {
        /* if (!(auth.auth || auth.tokencheck)) {
            dispatch(fetch_checklogin());
            return;
        } */

        if (!auth.auth) {
            history.push('/login');
            return;
        }

        const socket = socketio.connect('http://localhost:4000/room');

        dispatch(fetch_openroom());

        socket.on('connect', () => {
            console.log('연결');
        });

        socket.on('newRoom', (data: any) => {
            const room: OpenRoom = data.room;

            dispatch(make_openroom(room));
        });

        return () => {
            dispatch(initialize_chat());
        };
    }, [auth]);

    return (
        <>
            <InputNickNameModalComponent
                nickname={nickname}
                visible={visible}
                changeInput={changeNickNameInput}
                inputsubmit={submitNickNameInput}
                cancelsubmit={cancelNickNameInput}
            />
            <TotalChatComponent
                roomList={auth.myroomList}
                openroomList={openroom.openroomList}
                openroomdoublClick={openroomdoubleClick}
                currentRoom={currentOpenRoom}
                chatList={chatList}
                enterEvent={enterEvent}
                myRoomdoubleClick={myRoomdoubleClick}
            />
        </>
    );
};
export default withRouter(ChatContainer);
