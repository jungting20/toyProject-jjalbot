import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';

interface AuthFormComponentProps {
    changeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
    changepassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
    submit: (e: React.FormEvent<HTMLFormElement>) => void;
    email: string;
    password: string;
}

const AuthBlock = styled.div``;

const WhiteBox = styled.div`
    .logo-area {
        display: block;
        padding-bottom: 2rem;
        text-align: center;
        font-weight: bold;
        letter-spacing: 2px;
    }

    box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
    padding: 2rem;
    width: 360px;
    background: white;
    border-radius: 2px;
`;

const AuthFormBlcok = styled.div`
    h3 {
        margin: 0;
        color: ${palette.gray[8]};
        margin-bottom: 1rem;
    }
`;

const StyledInput = styled.input`
    font-size: 1rem;
    border: none;
    border-bottom: 1px solid ${palette.gray[5]};
    padding-bottom: 0.5rem;
    outline: none;
    width: 100%;
    &:focus {
        color: $oc-teal-7;
        border-bottom: 1px solid ${palette.gray[7]};
    }
    & + & {
        margin-top: 1rem;
    }
`;

const Footer = styled.div`
    margin-top: 2rem;
    text-align: right;
    a {
        color: ${palette.gray[6]};
        text-decoration: underline;
        &:hover {
            color: ${palette.gray[9]};
        }
    }
`;

const AuthFormComponent = (props: AuthFormComponentProps) => {
    return (
        <AuthBlock>
            <WhiteBox>
                <div className="logo-area">
                    <Link to="/">REACTERS</Link>
                </div>
            </WhiteBox>
            <AuthFormBlcok>
                <h3>로그인</h3>
                <form onSubmit={props.submit}>
                    <StyledInput
                        autoComplete="username"
                        name="username"
                        placeholder="이메일"
                        onChange={props.changeEmail}
                        value={props.email}
                    />
                    <StyledInput
                        autoComplete="new-password"
                        name="password"
                        placeholder="비밀번호"
                        type="password"
                        onChange={props.changepassword}
                        value={props.password}
                    />
                    <Button>로그인</Button>
                </form>
            </AuthFormBlcok>
        </AuthBlock>
    );
};

export default AuthFormComponent;
