import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { Room } from '../../modules/room';
import { OpenRoom } from '../../modules/openroom';
import { Route, Switch, Link } from 'react-router-dom';
import { faComment, faChalkboard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface RoomComponentProps {
    roomList: Room[];
}
interface OpenRoomComponentProps {
    openroomList: OpenRoom[];
}
const RoomComponentBlock = styled.div`
    width: 300px;
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
    width: 50px;
`;

const OptionItemBlock = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 10px;
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

const OpenRoomList = styled.div`
    &:hover {
        background-color: yellow;
    }
`;

const MyRoomListComponent = ({ roomList }: RoomComponentProps) => (
    <ChatArea className="chat">
        <RoomTitleComponent>채팅</RoomTitleComponent>
        {roomList.map(room => (
            <ItemComponentBlock key={room.id}>
                <RoomContentTopDiv>
                    <NameSpanComponentBlock>
                        {room.memberList.map(user => (
                            <NameSpanComponent key={user.id}>
                                {user.nickname},
                            </NameSpanComponent>
                        ))}
                    </NameSpanComponentBlock>
                    <ShowTimeComponent>9:10</ShowTimeComponent>
                </RoomContentTopDiv>
                <LastContentBox>{room.Lastmessage.content}</LastContentBox>
            </ItemComponentBlock>
        ))}
    </ChatArea>
);

const OpenRoomListComponent = ({ openroomList }: OpenRoomComponentProps) => (
    <ChatArea className="chat">
        {openroomList.map(openroom => (
            <OpenRoomList key={openroom._id}>{openroom.title}</OpenRoomList>
        ))}
    </ChatArea>
);

const RoomComponent = ({
    roomList,
    openroomList,
}: RoomComponentProps & OpenRoomComponentProps) => {
    return (
        <RoomComponentBlock>
            <OptionArea className="option">
                <OptionItemBlock>
                    <Link to="/chat/openroom">
                        <FontAwesomeIcon icon={faChalkboard} size="2x" />
                    </Link>
                </OptionItemBlock>
                <OptionItemBlock>
                    <Link to="/chat/myroom">
                        <FontAwesomeIcon icon={faComment} size="2x" />
                    </Link>
                </OptionItemBlock>
            </OptionArea>
            <Switch>
                <Route
                    exact
                    path="/chat/myroom"
                    render={() => <MyRoomListComponent roomList={roomList} />}
                />
                <Route
                    exact
                    path="/(chat|chat/openroom)"
                    render={() => (
                        <OpenRoomListComponent openroomList={openroomList} />
                    )}
                />
            </Switch>
        </RoomComponentBlock>
    );
};

export default RoomComponent;
