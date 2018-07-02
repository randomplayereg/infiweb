import React from 'react';

import Home from './pages/Home'
import Error from './components/Error'

import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Store from "./pages/Store";
import Transaction from "./pages/Transaction";
import Explore from "./pages/Explore";
import Shelf from './pages/Shelf';
import BookView from './pages/BookView';
import UserCorner from './components/UserCorner';
import TransactionDetail from './components/TransactionDetail';
import Authorization from "./v2/Authorization";
import NavigationM from "./v2/NavigationM";
import Verratti from "./v2/Verratti";
import VerrattiQ from "./v2/VerrattiQ";
import VerrattiW from "./v2/VerrattiW";
import VerrattiC from "./v2/VerrattiC";

class App extends React.Component {
    ComponentCategory = ({ match }) => {
        if (match.params.language === "VN") {
            if (['01','02','03','04','05','06','07','08','09'].includes(match.params.category)) {
                return (
                    // <StoreBooks language={match.params.language} category={match.params.category}/>
                    // <BookContent language={match.params.language} category={match.params.category}/>
                    <Shelf language={match.params.language} category={match.params.category}/>
                )
            } else {
                return (
                    <div>Not Found</div>
                )
            }
        }
        if (match.params.language === "EN") {
            if (['02','03'].includes(match.params.category)) {
                return (
                    // <StoreBooks language={match.params.language} category={match.params.category}/>
                    // <BookContent language={match.params.language} category={match.params.category}/>
                    <Shelf language={match.params.language} category={match.params.category}/>
                )
            } else {
                return (
                    <div>Not Found</div>
                )
            }
        }
    };

    ComponentDetailBook = ({ match }) => {
        if (match.params.code !== "") {
            return (
                <BookView 
                    code={match.params.code}
                    />
            )
        }
    }

    ComponentDetailTransaction = ({ match }) => {
        if (match.params.id !== "") {
            return (
                <TransactionDetail
                    id={match.params.id}
                    />
            )
        }
    };

    ComponentDetail = ({ match }) => {
        if (match.params.code !== "") {
            return (
                <VerrattiW
                    code={match.params.code}
                />
            )
        }
    };

    ComponentDMM = ({ match }) => {
        if (match.params.id !== "") {
            return (
                <VerrattiC
                    id={match.params.id}
                />
            )
        }
    };

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path='/' component={Home} exact/>
                    <Route path='/store' component={Store} exact/>

                    <Route
                        path="/store/:language(VN|EN)/:category(01|02|03|04|05|06|07|08|09)"
                        component={this.ComponentCategory}
                        exact
                    />

                    <Route 
                        path="/store/:code"
                        component={this.ComponentDetailBook}
                        />

                    <Route 
                        path="/transaction/:id"
                        component={this.ComponentDetailTransaction}
                        exact
                        />

                    <Route 
                        path="/mycorner"
                        component={UserCorner}
                        exact
                        />

                    <Route path='/transaction' component={Transaction} exact/>
                    <Route path='/explore' component={Explore} exact/>


                    <Route path={'/v2'} component={Authorization} exact/>
                    <Route path={'/v2/home'} component={Verratti} exact/>
                    <Route path={'/v2/library'} component={VerrattiQ} exact/>

                    <Route path={'/v2/library/detail/:code'} component={this.ComponentDetail} exact/>

                    <Route path={'/v2/transaction/:id'} component={this.ComponentDMM} exact/>

                    <Route component={Error}/>
                </Switch>
            </BrowserRouter>
        );

    }
}

export default App;