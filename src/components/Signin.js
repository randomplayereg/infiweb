import React from 'react';

import { Container, Row, Col, Input, Button, Fa, Card, CardBody } from 'mdbreact';

import { ruben } from "../Ruben";

import { Link } from 'react-router-dom';

export default class Signin extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {

        const styles = {
            roundBtn: {
                borderRadius: "65px",
                height: "130px",
                width: "130px",
                padding: "5px"
            },
            purifyLink: {
                textDecoration: "none",
                textShadow: "none",
                color: "black"
            }
        }

        return (
            <Container className={"d-flex justify-content-lg-center mt-3"}>
                <Row style={{minWidth: "512px"}}>
                    <Col md={"12"}>
                        <Card>
                            <CardBody>
                                <form>
                                    <p className="h4 text-center py-4">{ruben.signin}</p>
                                    <div className="grey-text">
                                        <Input label="Your email" icon="user" group type="email" validate error="wrong" success="right"/>
                                        <Input label="Your password" icon="key" group type="password" validate/>
                                    </div>

                                    <div className={"row d-flex justify-content-end"}>
                                        <p style={{float: "right"}}>{ruben.forgot_password}</p>
                                    </div>

                                    <div className="text-center justify-content-center">
                                        <Button color="cyan" type="submit" style={styles.roundBtn}>{ruben.signin}</Button>
                                    </div>

                                    <div className="d-flex p-2">
                                        <Button color="cyan" type="submit" block >{ruben.signin}</Button>
                                    </div>

                                    <div className="d-flex p-2">
                                        <Button color="cyan" type="submit" block >{ruben.signin}</Button>
                                    </div>

                                    <div className="d-flex justify-content-center">
                                        {ruben.no_account}{' '}<b><u><Link to={"/signup"} style={styles.purifyLink}>{ruben.signup}</Link></u></b>
                                    </div>

                                </form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}