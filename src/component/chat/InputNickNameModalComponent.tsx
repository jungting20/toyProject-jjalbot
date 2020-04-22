import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

interface InputNickModalProps {
    nickname: string;
    changeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    inputsubmit: () => void;
    cancelsubmit: () => void;
}

interface Modalvisible {
    visible: boolean;
}

type TotalModalProps = InputNickModalProps & Modalvisible;

const ModalOverlay = styled.div<Modalvisible>`
    display: ${props => (props.visible ? 'block' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: ${palette.gray[2]};
`;

const Modal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 320px;
    border-radius: 10px;
    background-color: white;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    & > * {
        &:first-child {
            margin-top: 16px;
        }
        margin-left: 16px;
        margin-right: 16px;
    }
    p.title {
        font-size: 16pt;
        font-weight: bold;
        color: #333;
    }
    .content {
        border-top: 1px solid #bebebe;
        margin-top: 16px;
        p {
            padding: 8px;
            font-size: 12pt;
            color: #999;
        }
    }

    .button-wrap {
        margin: 0;
        margin-top: 8px;
        button {
            width: 100%;
            padding: 12px 0;
            border-radius: 0 0 10px 10px;
            background-color: #ad7cef;
            font-size: 13pt;
            color: white;
            border: 0;
            cursor: pointer;
            &:hover {
                background-color: #7f49c8;
            }
            &:active {
                background-color: #7e49c8;
            }
        }
    }
`;

const InputNickNameModalComponent = ({
    nickname,
    visible,
    changeInput,
    inputsubmit,
    cancelsubmit,
}: TotalModalProps) => {
    return (
        <>
            <ModalOverlay visible={visible}>
                <Modal>
                    <p className="title">사용할 닉네임을 입력해주세요</p>
                    <div className="content">
                        <input value={nickname} onChange={changeInput} />
                    </div>
                    <div className="button-wrap">
                        <button onClick={inputsubmit}> 확인 </button>
                        <button onClick={cancelsubmit}> 취소 </button>
                    </div>
                </Modal>
            </ModalOverlay>
        </>
    );
};

export default InputNickNameModalComponent;
