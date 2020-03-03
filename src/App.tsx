import React from 'react';
import './App.css';
import RootRouter from './pages';
import Header from './component/common/Header';
import Layout from './component/common/Layout';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
    return (
        <Layout>
            <Router>
                <Header />
                <RootRouter />
            </Router>
        </Layout>
    );
}
export default App;
