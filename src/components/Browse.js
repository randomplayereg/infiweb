import React from 'react';
import BrowseClone from "./BrowseClone";

import { Container, Row, Col, Input, Button, Fa, Card, CardBody } from 'mdbreact';

import FileBase64 from 'react-file-base64';

export default class Browse extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Row>
                <Col md="12">
                    <BrowseClone/>
                </Col>
            </Row>
        );
    }
}