import 'babel-polyfill';

import './styles/app.scss';

import React from "react";
import {render} from "react-dom";
import {Router, Route, browserHistory} from 'react-router';

import Layout from "./app/components/Layout";
import Slider from "./app/components/Slider";

render(
    <Router history={browserHistory}>
        <Route component={Layout}>
            <Route path="/" component={Slider} />
        </Route>
    </Router>,
    document.getElementById("root")
);
