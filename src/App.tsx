import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Header from './component/common/Header';
import Layout from './component/common/Layout';
import RootRouter from './pages';

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
