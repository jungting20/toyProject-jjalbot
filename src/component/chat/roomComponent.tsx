import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { Room } from '../../modules/chat';
import { OpenRoom } from '../../modules/openroom';
import { Route, Switch, Link } from 'react-router-dom';
import { faComment, faChalkboard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface RoomComponentProps {
    roomList: Room[];
    myRoomdoubleClick: (id: string) => void;
}
interface OpenRoomComponentProps {
    openroomList: OpenRoom[];
    openRoomdoubleClick: (id: string) => void;
}

interface OpenRoomItemProps {
    id: string;
    openRoomdoubleClick: (id: string) => void;
    title: string;
}

interface MyRoomItemProps {
    _id: string;
    myRoomdoubleClick: (id: string) => void;
    joinedusers: any[];
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

const ChatArea = styled.div`
    overflow: auto;
`;

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

const OpenRoomItem = styled.div`
    &:hover {
        background-color: yellow;
    }
`;

const OpenRoomItemWrapper = ({
    id,
    openRoomdoubleClick,
    title,
}: OpenRoomItemProps) => {
    const ondoubleClick = () => openRoomdoubleClick(id);
    return <OpenRoomItem onDoubleClick={ondoubleClick}>{title}</OpenRoomItem>;
};

const MyRoomItemWrapper = ({
    _id,
    joinedusers,
    myRoomdoubleClick,
}: MyRoomItemProps) => {
    const ondoubleClick = () => myRoomdoubleClick(_id);
    return (
        <ItemComponentBlock onDoubleClick={ondoubleClick}>
            <RoomContentTopDiv>
                <NameSpanComponentBlock>
                    {joinedusers.map(member => (
                        <NameSpanComponent key={member.userid}>
                            {member.nickname},
                        </NameSpanComponent>
                    ))}
                </NameSpanComponentBlock>
                <ShowTimeComponent>9:10</ShowTimeComponent>
            </RoomContentTopDiv>
            {/* <LastContentBox>{room.Lastmessage.content}</LastContentBox> */}
        </ItemComponentBlock>
    );
};

const MyRoomListComponent = ({
    roomList,
    myRoomdoubleClick,
}: RoomComponentProps) => (
    <ChatArea className="chat">
        <RoomTitleComponent>내 채팅</RoomTitleComponent>
        {roomList.map(room => (
            <MyRoomItemWrapper
                key={room._id}
                _id={room._id}
                joinedusers={room.joinedusers}
                myRoomdoubleClick={myRoomdoubleClick}
            />
        ))}
    </ChatArea>
);

const OpenRoomListComponent = ({
    openroomList,
    openRoomdoubleClick,
}: OpenRoomComponentProps) => (
    <ChatArea className="chat">
        {openroomList.map(openroom => (
            <OpenRoomItemWrapper
                key={openroom._id}
                id={openroom._id}
                openRoomdoubleClick={openRoomdoubleClick}
                title={openroom.title}
            ></OpenRoomItemWrapper>
        ))}
    </ChatArea>
);

const RoomComponent = ({
    roomList,
    openroomList,
    openRoomdoubleClick,
    myRoomdoubleClick,
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
                    render={() => (
                        <MyRoomListComponent
                            roomList={roomList}
                            myRoomdoubleClick={myRoomdoubleClick}
                        />
                    )}
                />
                <Route
                    exact
                    path="/(chat|chat/openroom)"
                    render={() => (
                        <OpenRoomListComponent
                            openroomList={openroomList}
                            openRoomdoubleClick={openRoomdoubleClick}
                        />
                    )}
                />
            </Switch>
        </RoomComponentBlock>
    );
};

export default RoomComponent;
