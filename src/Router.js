import React from 'react';

import {BrowserRouter, Route, Switch} from 'react-router-dom'

import TestT from './components/TestT';
import TopBar from "./components/TopBar";
import Wrapper from "./components/Wrapper";

class Router extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loggedIn: localStorage.getItem("token") !== null,
            email: "",
            password: ""
        }
    }


    render() {
        return (
            <BrowserRouter>
                <div>
                    <TestT/>
                    <TopBar/>
                    <Wrapper/>
                </div>
            </BrowserRouter>
        );

    }
}

export default Router;