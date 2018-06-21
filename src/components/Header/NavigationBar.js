import React from 'react';
import {Navbar, NavItem, Nav, NavDropdown, MenuItem} from 'react-bootstrap';

import {FormGroup, FormControl, Button} from 'react-bootstrap';
import LogInModal from "./LogInModal";

import {NavLink} from 'react-router-dom';

class NavigationBar extends React.Component {

    state = {
        loggedIn: false
    };

    handleClick = (eventKey) => {
        console.log(eventKey);
        switch (eventKey) {
            case "login":
                this.child.handleShow();
                break;
            case "store_view":
                break;
            case "transaction_view":
                break;
            case "map_view":
                break;
            default:
                break;
        }
    };

    navBar = (
        <Navbar>
            <Navbar.Header>
                <Navbar.Brand>
                    <NavLink to='/'>Infibook</NavLink>
                </Navbar.Brand>
            </Navbar.Header>
            <Nav>
                <Navbar.Collapse>
                    <Navbar.Form pullLeft>
                        <FormGroup>
                            <FormControl type="text" placeholder="Search" />
                        </FormGroup>{' '}
                        <Button type="submit">Search</Button>
                    </Navbar.Form>
                </Navbar.Collapse>
            </Nav>
            <Nav pullRight>
                {/* <NavItem>
                    <Button bsStyle="primary">Primary</Button>
                </NavItem> */}
                <NavItem eventKey={"store"} href="/store">
                    Store
                </NavItem>
                <NavItem eventKey={"explore"} href="/explore">
                    Explore
                </NavItem>
                {!this.state.loggedIn ?
                    <NavItem eventKey={"login"} onSelect={this.handleClick}>Login/Logout/Signup</NavItem>
                    :
                    [<NavItem>Sign in</NavItem>, <NavItem>Sign up</NavItem>]
                }
            </Nav>
        </Navbar>
    );

    render() {
        return(
            <div>
                {this.navBar}
                <LogInModal onRef = {ref => (this.child = ref)} />
            </div>
        )
    }
}

export default NavigationBar;