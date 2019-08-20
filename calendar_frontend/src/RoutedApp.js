import React from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import App from './App';
import Signup from './components/Signup'

class RoutedApp extends React.Component {

    render() {
        return (
            <Router>
                <Route exact path="/" component={App}/>
                <Route exact path="/signup" component={Signup}/>
            </Router>
        );
    }

};

export default RoutedApp;