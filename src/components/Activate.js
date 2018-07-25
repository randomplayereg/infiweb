import React from 'react';

import {Pin} from "react-desktop";
import { Container, Row, Col, Card, CardBody, Button } from "mdbreact";

import { ruben } from "../Ruben";

class Activate extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            pin: null
        };

        this.onPinChange = value => {
            this.setState({
                pin: value
            })
        };

        this.submitPin = () => {
            alert(this.state.pin);
        }

        this.resendPin =() => {

        }
    }

    render() {

        return (

            <Container className={"d-flex justify-content-lg-center mt-3"}>
                <Row style={{minWidth: "512px"}}>
                    <Col md="12">
                        <Card>
                            <CardBody>
                                <p className="h4 text-center py-4">{ruben.verify_email}</p>
                                <div className={"d-flex justify-content-center"}>
                                    <Pin
                                        onChange={this.onPinChange}
                                        length={4}
                                        reveal
                                        margin={"auto"}
                                    />
                                </div>
                            </CardBody>
                            <Button color="cyan" onClick={this.submitPin}>{ruben.send}</Button>
                            <Button color="cyan" onClick={this.resendPin}>{ruben.resend}</Button>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Activate;