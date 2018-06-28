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
    }

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
                    <Route component={Error}/>
                </Switch>
            </BrowserRouter>
        );

    }
}

export default App;