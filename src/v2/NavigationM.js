import React from 'react';

import {Grid, Row, Col, Glyphicon} from 'react-bootstrap';

import {NavLink} from 'react-router-dom';

import './NavigationM.css';

class NavigationM extends React.Component {
    constructor(props) {
        super(props);

        this.appendStyle = this.appendStyle.bind(this);
    }

    // color: #dedbdb;

    appendStyle(clicked) {
        if (this.props.clicked)
            if (this.props.clicked == clicked) {
                return {
                    color: '#ffc423'
                }
            };
        return {};
    }

    render() {
        return (
            <Grid>
                <Row>
                    <Col>
                        <small>English | Tiếng Việt</small>

                        <small style={{float: 'right'}}>Sign in | Sign up</small>
                    </Col>
                </Row>
                <Row>
                    <Col md={12} className={"navDiv"}>
                        <h1
                            onClick={() => {window.location.href = '/v2/home'}}
                            style={this.appendStyle('Home')}
                        >
                            <Glyphicon glyph={'home'}/> LogoHome
                        </h1>
                        <h1
                            onClick={() => {window.location.href = '/v2/library'}}
                            style={this.appendStyle('Library')}
                        >
                            <Glyphicon glyph={'book'}/> Sach
                        </h1>
                        <h1
                            onClick={() => {window.location.href = '/'}}
                            style={this.appendStyle('Transaction')}
                        >
                            <Glyphicon glyph={'transfer'}/> Trao doi
                        </h1>
                        <h1
                            onClick={() => {window.location.href = '/'}}
                            style={this.appendStyle('Setting')}
                        >
                            <Glyphicon glyph={'cog'}/> Tai khoan
                        </h1>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default  NavigationM;