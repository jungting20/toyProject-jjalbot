import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { Chat, CurrentRoom } from '../../modules/chat';

interface ChatProps {
    chatList: Chat[];
    currentRoom: CurrentRoom;
    enterEvent: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

interface ChatComponentProps {
    isopen: boolean;
}

const ChatComponentBlock = styled.div<ChatComponentProps>`
    width: 350px;
    height: 500px;
    border: 1px solid black;
    display: ${props => (props.isopen ? 'flex' : 'none')};
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
    overflow: auto;
`;

const ChatInputBoxBlock = styled.div`
    margin: 10px;
    flex: 1;
    padding: 10px;
`;

const ChatContent = styled.div`
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

const ChatComponent = ({ chatList, currentRoom, enterEvent }: ChatProps) => {
    const KeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (e.currentTarget.value.trim().length > 0) {
                console.log('채팅입력이벤트');
                enterEvent(e);
            }
        }
    };
    const messageRef = useRef<HTMLDivElement>(null);
    const scrollToBottom = () => {
        if (messageRef && messageRef.current) {
            console.log('이거 실행좀');
            messageRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };
    useEffect(scrollToBottom, [chatList]);

    return (
        <ChatComponentBlock isopen={currentRoom.isopen}>
            <ChatTopBlock />
            <ChatContentBlock>
                {chatList.map((chat, index) => {
                    let isme = chat.nickname === currentRoom.nickname;
                    return (
                        <ChatContent key={index}>
                            <Message className={isme ? 'my-chats' : 'others'}>
                                {chat.content}
                            </Message>
                        </ChatContent>
                    );
                })}
                <div ref={messageRef} />
            </ChatContentBlock>
            <ChatInputBoxBlock>
                <input onKeyPress={KeyPress}></input>
            </ChatInputBoxBlock>
        </ChatComponentBlock>
    );
};

export default ChatComponent;
