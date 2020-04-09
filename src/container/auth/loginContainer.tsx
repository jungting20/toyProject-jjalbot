import React, { useCallback, useEffect } from 'react';
import AuthFormComponent from '../../component/Login/AuthFormComponent';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { set_email, set_password, fetch_login } from '../../modules/login';
import { fetchLogin } from '../../lib/api/userapi';

const LoginContainer = () => {
    const { email, password } = useSelector(
        (state: RootState) => state.auth.login
    );
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
        console.log(email, password, '엥');
        dispatch(fetch_login({ email, password }));
    };

    return (
        <AuthFormComponent
            changeEmail={changeEmail}
            changepassword={changePassword}
            submit={submit}
            email={email}
            password={password}
        />
    );
};

export default LoginContainer;
