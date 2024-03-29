import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from "react-router"
import { createBrowserHistory } from "history"
import 'antd/dist/antd.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App';
import reportWebVitals from './reportWebVitals'
import WebFont from "webfontloader"
WebFont.load({google: {families: ["Roboto:300,400,500,600,700"]}})

const history = createBrowserHistory()

ReactDOM.render(
  // <React.StrictMode>
  <Router history={history}>
    <App />
  </Router>,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
