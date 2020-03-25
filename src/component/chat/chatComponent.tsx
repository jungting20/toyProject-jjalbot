import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { Chat } from '../../modules/chat';

interface ChatProps {
    chatList: Chat[];
}

const ChatComponentBlock = styled.div`
    width: 350px;
    height: 500px;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
`;
const ChatTopBlock = styled.div`
    margin: 10px;
    padding: 10px;
    flex: 1;
    /*    background-color: white; */
`;

const ChatContentBlock = styled.div`
    background: #bed0dc;
    flex: 8;
`;

const ChatInputBoxBlock = styled.div`
    margin: 10px;
    flex: 1;
    padding: 10px;
`;

const ChatContent = styled.div<ChatProps>`
    display: flex;
    flex-direction: column;
    .my-chats {
        align-self: flex-end;
        background-color: #ffe440;
    }
    .others {
        align-self: flex-start;
        background-color: white;
    }
`;

const Message = styled.div`
    padding: 10px;
    font-size: 0.8rem;
    font-weight: 600;
`;

const chatlist = [
    {
        id: 'me',
        message: '안녕 쀼',
    },
    {
        id: 'others',
        message: '탈슈의 메세지',
    },
    {
        id: 'me',
        message: '극한의 호',
    },
];

const ChatComponent = ({ chatList }: ChatProps) => {
    return (
        <ChatComponentBlock>
            <ChatTopBlock />
            <ChatContentBlock>
                {chatList.map(chat => {
                    let isme = chat.id === 'me';
                    return (
                        <ChatContent isme={isme}>
                            <Message className={isme ? 'my-chats' : 'others'}>
                                {chat.message}
                            </Message>
                        </ChatContent>
                    );
                })}
            </ChatContentBlock>
            <ChatInputBoxBlock />
        </ChatComponentBlock>
    );
};

export default ChatComponent;
