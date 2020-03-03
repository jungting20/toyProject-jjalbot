import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Imglazyloading from './imglazyloading';
import Imgorderedloading from './imgorderedloading';
import Gitsearchpage from './gitsearchpage';
import Divslidepage from './divslidepage';
import styled from 'styled-components';

const RootRouterBlock = styled.div`
    width: 100%;
`;

function Router() {
    return (
        <Switch>
            {/* 나머지가 아닐경우 imglzy,/ */}
            <Route path="/imglzy" component={Imglazyloading} />
            <Route path="/imgord" component={Imgorderedloading} />
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
