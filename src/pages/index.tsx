import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Imglazyloading from './imglazyloading';
import Imgorderedloading from './imgorderedloading';
import Gitsearchpage from './gitsearchpage';
import Divslidepage from './divslidepage';

function Indexpage() {
    return (
        <Router>
            <Route path="/imglzy" component={Imglazyloading} />
            <Route path="/imgord" component={Imgorderedloading} />
            <Route path="/gitsearch" component={Gitsearchpage} />
            <Route path="/divslide" component={Divslidepage} />
        </Router>
    );
}

export default Indexpage;
