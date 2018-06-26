import React from 'react';
import {Navbar, NavItem, Nav, NavDropdown, MenuItem} from 'react-bootstrap';

import {FormGroup, FormControl, Button, DropdownButton, Dropdown, Badge} from 'react-bootstrap';
import {Glyphicon} from 'react-bootstrap';
import LogInModal from "./LogInModal";

import {NavLink} from 'react-router-dom';

class NavigationBar extends React.Component {

    state = {
        loggedIn: (typeof localStorage.getItem('token') === 'undefined' || localStorage.getItem('token') === null)
    };

    handleClick = (eventKey) => {
        console.log(eventKey);
        switch (eventKey) {
            case "dashboard":
                alert('Hi');
                break;
            case "login":
                this.child.handleShow();
                break;
            case "logout":
                this.logout();
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

    logout = async () => {
        let url = 'https://thedung.pythonanywhere.com/api/user/logout';
        const call = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization' : 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiYWRtaW4iLCJjcmVhdGVfdGltZSI6IjIwMTgtMDMtMDRUMDI6NTc6MjMuOTgxMjUzKzAwOjAwIiwiZW1haWwiOiJ0aGVkdW5nMjcwOUBnbWFpbC5jb20iLCJpZCI6MX0.dhZvtbK9YrUzdRObkurnRp89bCH7yy2L3sdaUbWQu0k',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                'email' : localStorage.getItem('uid'),
                'token' : `Token ${localStorage.getItem('token')}`
            })
        });
        const response = await call.json();
        if (response.error_code === 0) {
            alert('Successfully logged out');
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            localStorage.removeItem('uid');
            window.location.replace('/');
        }
    }

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
                        <Button type="submit"><Glyphicon glyph="search" /></Button>
                    </Navbar.Form>
                </Navbar.Collapse>
            </Nav>
            <Nav pullRight>
                <NavItem eventKey={"notification"}>
                    <Dropdown noCaret>
                        <Dropdown.Toggle>
                            <Glyphicon glyph="bell" />
                            <Badge>4</Badge>                            
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="super-colors">
                            <MenuItem eventKey="1">This request</MenuItem>
                            <MenuItem eventKey="2">That request</MenuItem>
                            <MenuItem eventKey="3">Another one</MenuItem>
                            <MenuItem eventKey="4">And another one</MenuItem>
                        </Dropdown.Menu>
                    </Dropdown>
                </NavItem>
                {!this.state.loggedIn ?
                    // <NavItem eventKey={"dashboard"} onSelect={this.handleClick}>{localStorage.getItem('username')}</NavItem>
                    <NavItem>
                        <DropdownButton
                            bsStyle={'default'}
                            title={localStorage.getItem('username')}
                            >
                                <MenuItem eventKey="corner" onSelect={this.handleClick}>Góc của tôi</MenuItem>
                                <MenuItem divider />
                                <MenuItem eventKey="logout" onSelect={this.handleClick}>Đăng xuất</MenuItem>
                        </DropdownButton>
                    </NavItem>
                    :
                    [
                        <NavItem eventKey={"signup"} onSelect={this.handleClick}>Đăng ký</NavItem>, 
                        <NavItem eventKey={"login"} onSelect={this.handleClick}>Đăng nhập</NavItem>
                    ]
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