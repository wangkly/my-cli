import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './dashboard'
import store from './store';
import '../style/index.less'

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<Dashboard />}></Route>
                </Routes>
            </Router>
        </Provider>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
