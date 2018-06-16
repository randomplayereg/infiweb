import React from 'react';
import {Navbar, NavItem, Nav, NavDropdown, MenuItem} from 'react-bootstrap'
import LogInModal from "./LogInModal";

import {NavLink} from 'react-router-dom'

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
                <NavItem eventKey={"store"} href="/store">
                    Store
                </NavItem>
                <NavItem eventKey={"trasaction"} href="/transaction">
                    Transaction
                </NavItem>
                <NavItem eventKey={"explore"} href="/explore">
                    Explore
                </NavItem>
                {/*<NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">*/}
                    {/*<MenuItem eventKey={3.1}>Action</MenuItem>*/}
                    {/*<MenuItem eventKey={3.2}>Another action</MenuItem>*/}
                    {/*<MenuItem eventKey={3.3}>Something else here</MenuItem>*/}
                    {/*<MenuItem divider />*/}
                    {/*<MenuItem eventKey={3.4}>Separated link</MenuItem>*/}
                {/*</NavDropdown>*/}
            </Nav>
            <Nav pullRight>
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