import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
// import RouteConfig from '../src/config/RouteConfig';
import { Provider } from "react-redux";
import store from "./app-store/store";
// import Work from './work/Work';
import  App  from "./App";
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <RouteConfig /> */}
      <App />
    </Provider>
  </React.StrictMode>

  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
