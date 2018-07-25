import React from 'react';

import {Container, Navbar, NavbarBrand, NavbarNav, NavItem, NavbarToggler, Collapse, FormInline, Button, NavLink, DropdownItem, Dropdown, DropdownMenu, DropdownToggle} from 'mdbreact';

import {Link} from 'react-router-dom';

import { ruben } from "../Ruben";

class TopBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
            isWideEnough: false,
            dropdownOpen: false
        };
        this.onClick = this.onClick.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    onClick(){
        this.setState({
            collapse: !this.state.collapse,
        });
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    render() {
        return (
            <Navbar color="indigo" dark expand="md" scrolling sticky>
                <NavbarBrand href="/">
                    <strong>InfiBook</strong>
                </NavbarBrand>
                { !this.state.isWideEnough && <NavbarToggler onClick = { this.onClick } />}
                <Collapse isOpen = { this.state.collapse } navbar>

                    <NavbarNav left>
                        <NavItem>
                            <form className="form-inline md-form mt-0">
                                <input className="form-control mr-sm-2 mb-0 text-white" type="text" placeholder="Search book" aria-label="Search"/>
                            </form>
                        </NavItem>
                    </NavbarNav>

                    <NavbarNav right>
                        <NavItem>
                            <Link to="/signup" className={"nav-link"}>{ruben.signup}</Link>
                        </NavItem>
                        <NavItem>
                            <Link to="/signin" className={"nav-link"}>{ruben.signin}</Link>
                        </NavItem>
                        <NavItem>
                            <NavLink to="#">Inbox</NavLink>
                        </NavItem>
                        <NavItem>
                            <Link to="/new-book" className={"nav-link"}>{ruben.new_book}</Link>
                        </NavItem>
                        <NavItem>
                            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                <DropdownToggle nav caret>Emin</DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem>
                                        <Link to={'/profile'}>{ruben.profile}</Link>
                                    </DropdownItem>
                                    <DropdownItem>Log out</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </NavItem>
                    </NavbarNav>

                </Collapse>
            </Navbar>
        );
    }
}

export default TopBar;