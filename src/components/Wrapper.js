import React from 'react';
import { Container, Row, Col, TabPane, TabContent, Nav, NavItem, NavLink, Fa } from 'mdbreact';
import { Switch, Route } from 'react-router-dom';
import SideMenu from "./SideMenu";

import Home from "./Home";
import Browse from "./Browse";
import Exchange from "./Exchange";
import Profile from "./Profile";
import Signin from "./Signin";
import Signup from "./Signup";
import Activate from "./Activate";
import New from "./New";

export default class Wrapper extends React.Component {
    render() {
        return (
            <div>
                <div className={"row"}>
                    <Col md="2" style={{borderRight: "solid 1px grey"}}>
                        <SideMenu/>
                    </Col>
                    <Col md={"10"}>
                        <Switch>
                            <Route path={'/'} component={Home} exact/>
                            <Route path={'/home'} component={Home} exact/>

                            <Route path={'/browse'} component={Browse} exact/>

                            <Route path={'/exchange'} component={Exchange} exact/>

                            <Route path={'/profile'} component={Profile} exact/>

                            <Route path={'/signin'} component={Signin} exact/>

                            <Route path={'/signup'} component={Signup} exact/>

                            <Route path={'/signup/activate'} render={()=><Activate/>} exact/>

                            <Route path={'/new-book'} render={()=><New/>} exact />

                            <Route render={()=><h1>Error</h1>}/>
                        </Switch>
                    </Col>
                </div>
                <div className={"row black mt-5"} style={{minHeight: "143px"}}>

                </div>
            </div>
        )
    }
}