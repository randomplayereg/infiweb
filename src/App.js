import React from 'react';

import Home from './pages/Home'
import Error from './components/Error'

import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Store from "./pages/Store";
import Transaction from "./pages/Transaction";
import Explore from "./pages/Explore";
import StoreBooks from "./pages/StoreBooks";

class App extends React.Component {
    ComponentWithRegex = ({ match }) => {
        if (match.params.language === "VN") {
            if (['01','02','03','04','05','06','07','08','09'].includes(match.params.code)) {
                return (
                    <StoreBooks language={match.params.language} code={match.params.code}/>
                )
            } else {
                return (
                    <div>Not Found</div>
                )
            }
        }
        if (match.params.language === "EN") {
            if (['02','03'].includes(match.params.code)) {
                return (
                    <StoreBooks language={match.params.language} code={match.params.code}/>
                )
            } else {
                return (
                    <div>Not Found</div>
                )
            }
        }
    };
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path='/' component={Home} exact/>
                    <Route path='/store' component={Store} exact/>

                    <Route
                        path="/store/:language(VN|EN)/:code(01|02|03|04|05|06|07|08|09)"
                        component={this.ComponentWithRegex}
                        exact
                    />

                    <Route path='/transaction' component={Transaction} exact/>
                    <Route path='/explore' component={Explore} exact/>
                    <Route component={Error}/>
                </Switch>
            </BrowserRouter>
        );

    }
}

export default App;