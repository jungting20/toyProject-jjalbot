import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { Room } from '../../modules/room';

interface RoomComponentProps {
    roomList: Room[];
}

const RoomComponentBlock = styled.div`
    /* width: 300px; */
    height: 500px;
    border: 1px solid black;
    border-radius: 2px;
    display: grid;
    grid-template-columns: 1fr 5fr;

    .option {
        grid-column: 1;
    }

    .chat {
        grid-column: 2;
    }
`;

const OptionArea = styled.div`
    background-color: #783c00;
`;

const ChatArea = styled.div``;

const RoomTitleComponent = styled.div`
    height: 90px;
    padding: 10px;
    font-weight: bold;
`;

const ItemComponentBlock = styled.div`
    height: 70px;
    /*   border: 1px solid black; */
    &:hover {
        background: ${palette.gray[2]};
    }
    margin: 5px;
    padding-top: 5px;
    padding-left: 5px;
`;

const RoomContentTopDiv = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 5fr 1fr;
`;

const NameSpanComponentBlock = styled.div``;

const NameSpanComponent = styled.span`
    font-size: 1rem;
    font-weight: bold;
    margin-right: 3px;
`;

const ShowTimeComponent = styled.div`
    font-size: 1rem;
    color: ${palette.gray[5]};
`;

const LastContentBox = styled.div`
    margin-top: 2px;
    font-size: 0.7rem;
    color: ${palette.gray[6]};
    border: none;
`;

const RoomComponent = ({ roomList }: RoomComponentProps) => {
    return (
        <RoomComponentBlock>
            <OptionArea className="option" />
            <ChatArea className="chat">
                <RoomTitleComponent>채팅</RoomTitleComponent>
                {roomList.map(room => (
                    <ItemComponentBlock>
                        <RoomContentTopDiv>
                            <NameSpanComponentBlock>
                                {room.memberList.map(user => (
                                    <NameSpanComponent>
                                        {user.nickname},
                                    </NameSpanComponent>
                                ))}
                            </NameSpanComponentBlock>
                            <ShowTimeComponent>9:10</ShowTimeComponent>
                        </RoomContentTopDiv>
                        <LastContentBox>
                            {room.Lastmessage.content}
                        </LastContentBox>
                    </ItemComponentBlock>
                ))}
            </ChatArea>
        </RoomComponentBlock>
    );
};

export default RoomComponent;
