import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

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

const roomlist = [
    {
        roomnumber: 1,
        id: ['정호', '탈슈'],
        length: 4,
        title: '테스트1',
        chatlist: [
            {
                createdat: '09:11',
                message: '아니 인생',
            },
            {
                createdat: '09:11',
                message: '아니 인생',
            },
            {
                createdat: '09:11',
                message: '아니 인생',
            },
            {
                createdat: '09:11',
                message: '아니 인생',
            },
            {
                createdat: '09:11',
                message: '아니 인생',
            },
        ],
    },
    {
        roomnumber: 2,
        id: ['정호', '탈슈'],
        length: 2,
        title: '테스트2',
        chatlist: [
            {
                createdat: '09:11',
                message: '아니 인생',
            },
            {
                createdat: '09:11',
                message: '아니 인생',
            },
            {
                createdat: '09:11',
                message: '아니 인생',
            },
            {
                createdat: '09:11',
                message: '아니 인생',
            },
            {
                createdat: '09:11',
                message: '아니 인생',
            },
        ],
    },
    {
        roomnumber: 3,
        id: ['정호', '탈슈'],
        length: 3,
        title: '테스트3',
        chatlist: [
            {
                createdat: '09:11',
                message: '아니 인생',
            },
            {
                createdat: '09:11',
                message: '아니 인생 sadijasdjadlaljdasjklasjldjaslkdjlkasj',
            },
            {
                createdat: '09:11',
                message: '아니 인생',
            },
            {
                createdat: '09:11',
                message: '아니 인생',
            },
            {
                createdat: '09:11',
                message:
                    '아니 인생 sadijasdjadlaljdasjklasjldjaslkdjlkasjasdasdasdasd',
            },
        ],
    },
];

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

const RoomComponent = () => {
    return (
        <RoomComponentBlock>
            <OptionArea className="option" />
            <ChatArea className="chat">
                <RoomTitleComponent>채팅</RoomTitleComponent>
                {roomlist.map(room => (
                    <ItemComponentBlock>
                        <RoomContentTopDiv>
                            <NameSpanComponentBlock>
                                {room['id'].map(user => (
                                    <NameSpanComponent>
                                        {user},
                                    </NameSpanComponent>
                                ))}
                            </NameSpanComponentBlock>
                            <ShowTimeComponent>9:10</ShowTimeComponent>
                        </RoomContentTopDiv>
                        <LastContentBox>
                            {
                                room['chatlist'][room['chatlist'].length - 1][
                                    'message'
                                ]
                            }
                        </LastContentBox>
                    </ItemComponentBlock>
                ))}
            </ChatArea>
        </RoomComponentBlock>
    );
};

export default RoomComponent;
