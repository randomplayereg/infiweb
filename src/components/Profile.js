import React from 'react';
import { Container, Row, Col, Input, Button, Fa, Card, CardBody } from 'mdbreact';

import Switch from "react-switch";

export default class Profile extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            checked: [true, true, true, true, true, true]
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(checked, id) {
        let tmp = this.state.checked;
        tmp[id] = checked;
        this.setState({ checked: tmp });
    }

    render() {
        return (
            <Row className={"mt-3"}>
                <Col md="8">
                    <Card>
                        <CardBody>
                            PROFILE
                            <Row>
                                <Col md={4}>
                                    <img
                                        src="https://thedung.pythonanywhere.com/media/images/avatar/user11-gmail-com/avatar.png"
                                        width={"150px"}
                                        height={"150px"}
                                        />
                                </Col>
                                <Col md={8}>
                                    <h4>user11@gmail.com</h4>
                                    <h4>Tieu Phong</h4>
                                    <h4>11 Mac Dinh Chi, ...</h4>
                                </Col>
                            </Row>
                            <Row>
                                <h1><b>Gioi thieu</b></h1>
                            </Row>
                            <Row>
                                <h1><b>Sach</b></h1>
                            </Row>
                            <Row className={"grey"}>
                                <Col md={3}>
                                    <img
                                        src="https://thedung.pythonanywhere.com/media/images/book/S%E1%BB%B1%20t%C3%ADch%20tr%E1%BA%A7u%20cau/VN05010000.jpeg"
                                    />
                                </Col>
                                <Col md={4}>
                                    <Row>
                                        sU tIch rtau cau
                                    </Row>
                                    <Row>
                                        <label htmlFor="normal-switch">
                                            <h6 style={{display: "inline"}}>aVAILablE:</h6>
                                            <Switch
                                                style={{display: "inline"}}
                                                onChange={(checked) => this.handleChange(checked, 0)}
                                                checked={this.state.checked[0]}
                                                id="normal-switch"
                                            />
                                        </label>
                                    </Row>
                                </Col>
                                <Col md={5} style={{display: "inline"}}>
                                    <Button color={"#ccc"}>chI tIet</Button>
                                    <Button color={"#ccc"}>suA thong tIn</Button>
                                    <Button color={"#ccc"}>xoA</Button>
                                </Col>
                            </Row>
                            <Row className={"grey"}>
                                <Col md={3}>
                                    <img
                                        src="https://thedung.pythonanywhere.com/media/images/book/S%E1%BB%B1%20t%C3%ADch%20tr%E1%BA%A7u%20cau/VN05010000.jpeg"
                                    />
                                </Col>
                                <Col md={4}>
                                    <Row>
                                        sU tIch rtau cau
                                    </Row>
                                    <Row>
                                        <label htmlFor="normal-switch">
                                            <h6 style={{display: "inline"}}>aVAILablE:</h6>
                                            <Switch
                                                style={{display: "inline"}}
                                                onChange={(checked) => this.handleChange(checked, 1)}
                                                checked={this.state.checked[1]}
                                                id="normal-switch"
                                            />
                                        </label>
                                    </Row>
                                </Col>
                                <Col md={5} style={{display: "inline"}}>
                                    <Button color={"#ccc"}>chI tIet</Button>
                                    <Button color={"#ccc"}>suA thong tIn</Button>
                                    <Button color={"#ccc"}>xoA</Button>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        )
    }
}