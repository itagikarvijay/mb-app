import React from 'react';
import Work from '../work/Work'
import User from '../user/User'
import Product from "../products/Product";
import Login from "../login/Login";
import {
    BrowserRouter as Router,
    Route,
} from "react-router-dom";
import Invoice from '../invoice/invoice';

const RouteConfig = () => (
    <Router>
        <Route path="/" exact component={Login} />
        <Route path="/work" component={Work} />
        <Route path="/register" component={User} />
        <Route path="/product" component={Product} />
        <Route path="/invoice" component={Invoice} />
    </Router>
);

export default RouteConfig;