import React from 'react';
import { Card, ListGroup, ListGroupItem, Container, Row, Col, TabPane, TabContent, Nav, NavItem, NavLink, Fa } from 'mdbreact';
import { Switch, Route, Link } from 'react-router-dom';

import {ruben} from '../Ruben';

class SideMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card style={{width: '100%', marginTop: '1rem'}}>
                <ListGroup>
                    <Link to={"/home"} className={"list-group-item purple text-white"}>
                        <Fa icon="home" className="fa-2x"/> {ruben.home}
                    </Link>
                    <Link to="/browse" className={"list-group-item purple text-white"}>
                        <Link to="/browse" className={"text-white"}><Fa icon="th-large" className="fa-2x"/> {ruben.browse}</Link>
                    </Link>
                    <Link to="/exchange" className={"list-group-item purple text-white"}>
                        <Fa icon="random" className="fa-2x"/> {ruben.exchange}
                    </Link>
                </ListGroup>
            </Card>
        );
    }
}

export default SideMenu;