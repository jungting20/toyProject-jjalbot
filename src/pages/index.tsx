import React from 'react';
import { Switch, Route } from 'react-router-dom';
import jjalBotPage from './jjalBotPage';
import jjalBOtorderedPage from './jjalBotOrderedPage';
import Gitsearchpage from './gitsearchpage';
import Divslidepage from './divslidepage';
import styled from 'styled-components';

const RootRouterBlock = styled.div`
    width: 100%;
`;

function Router() {
    return (
        <Switch>
            <Route path="/jjalbot" component={jjalBotPage} />
            <Route path="/jjalbotordered" component={jjalBOtorderedPage} />
            <Route path="/gitsearch" component={Gitsearchpage} />
            <Route path="/divslide" component={Divslidepage} />
        </Switch>
    );
}

const RootRouter = () => (
    <RootRouterBlock>
        <Router />
    </RootRouterBlock>
);

export default RootRouter;
