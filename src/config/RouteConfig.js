import React from 'react';
import App from '../App'
import Work from '../work/Work'
import {
    BrowserRouter as Router,
    Route,
  } from "react-router-dom";
  
const RouteConfig = () => (
    <Router>
        <Route exact path="/" component={App} />
        <Route exact path="/work" component={Work} />
    </Router>
);

export default RouteConfig;