import React from 'react';

import Home from './pages/Home'
import Error from './components/Error'

import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Store from "./pages/Store";
import Transaction from "./pages/Transaction";
import Explore from "./pages/Explore";

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path='/' component={Home} exact/>
                    <Route path='/store' component={Store} exact/>
                    <Route path='/transaction' component={Transaction} exact/>
                    <Route path='/explore' component={Explore} exact/>
                    <Route component={Error}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;