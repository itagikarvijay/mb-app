import React from 'react';
import Work from '../work/Work'
import User from '../user/User'
import Login from "../login/Login";
import {
    BrowserRouter as Router,
    Route,
} from "react-router-dom";

const RouteConfig = () => (
    <Router>
        <Route path="/" exact component={Login} />
        <Route path="/work" component={Work} />
        <Route path="/register" component={User} />
    </Router>
);

export default RouteConfig;