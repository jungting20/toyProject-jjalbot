import React, { useCallback, useEffect } from 'react';
import AuthFormComponent from '../../component/Login/AuthFormComponent';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { set_email, set_password, fetch_login } from '../../modules/login';
import { withRouter, RouteComponentProps } from 'react-router-dom';

const LoginContainer = ({ history }: RouteComponentProps) => {
    const { login, auth, authError } = useSelector(
        (state: RootState) => state.auth
    );
    const { email, password } = login;

    const dispatch = useDispatch();
    const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        dispatch(set_email(value));
    };

    const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        dispatch(set_password(value));
    };

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(fetch_login({ email, password }));
    };

    useEffect(() => {
        if (auth) {
            history.push('/chat');
        }
    }, [auth, authError]);

    return (
        <AuthFormComponent
            changeEmail={changeEmail}
            changepassword={changePassword}
            submit={submit}
            email={email}
            password={password}
            error={authError}
        />
    );
};

export default withRouter(LoginContainer);
