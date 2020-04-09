import React from 'react';
import { Switch, Route } from 'react-router-dom';
import jjalBotPage from './jjalBotPage';
import jjalBOtorderedPage from './jjalBotOrderedPage';
import LoginPage from './loginPage';
import Divslidepage from './chatPage';
import styled from 'styled-components';
import ChatPage from './chatPage';

const RootRouterBlock = styled.div`
    width: 100%;
`;

function Router() {
    return (
        <Switch>
            <Route path="/jjalbot" component={jjalBotPage} />
            <Route path="/jjalbotordered" component={jjalBOtorderedPage} />
            <Route path="/chat" component={ChatPage} />
            <Route path="/login" component={LoginPage} />
        </Switch>
    );
}

const RootRouter = () => (
    <RootRouterBlock>
        <Router />
    </RootRouterBlock>
);

export default RootRouter;
