import React from 'react';

import { Container, Row, Col, Input, Button, Fa, Card, CardBody } from 'mdbreact';

import { ruben } from "../Ruben";

import { Link } from 'react-router-dom';

import '../css/loginbtn.css';

export default class Signin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        }

        this.changeInput = (e) => {
            e.preventDefault();
            console.log(e.target.id + ": " + e.target.value);
            this.setState({
                [e.target.id]: e.target.value
            })
        }

        this.logIn = (e) => {
            e.preventDefault();

            const md5Base64 = require('md5-base64');
            const encodedPassword = md5Base64(this.state.password);
            console.log('pw use md5-base64: ' + encodedPassword);

            var self = this;

            // const fetch = window.fetch.bind(window);

            let url = `https://thedung.pythonanywhere.com/api/user/login`;

            fetch(url,
                {
                    method: 'POST',
                    headers: {
                        'Authorization' : 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiYWRtaW4iLCJjcmVhdGVfdGltZSI6IjIwMTgtMDMtMDRUMDI6NTc6MjMuOTgxMjUzKzAwOjAwIiwiZW1haWwiOiJ0aGVkdW5nMjcwOUBnbWFpbC5jb20iLCJpZCI6MX0.dhZvtbK9YrUzdRObkurnRp89bCH7yy2L3sdaUbWQu0k'
                    },
                    body: JSON.stringify({
                        email: this.state.email,
                        password: encodedPassword,
                        login_type: this.state.email,
                        fcm_token: "fzYu1WW46Rs:APA91bF5_KMWd5FJaXtjoauWzlxIFhOPcZ-BwZpsIj-keErX_6tfXlWUvWngSoj6PnLgMDcBrJ5M6YFwS370H6CPQ-YIZm3nCzwqXTEll4ug8b0oPwiFrK3m0dkO9126K5UVBzXYyL39"
                    })
                })
                .then(response => response.json())
                .then(
                    json => {
                        console.log(json);
                        if (json.error_code) {
                            if (json.error_code == 11) {
                                alert("Sai thông tin đăng nhập");
                            }
                            if (json.error_code == 5) {
                                alert("Chưa xác nhận Email")
                            }
                        } else {
                            alert("Đăng nhập thành công")
                            localStorage.setItem('token', json.token);
                            localStorage.setItem('username', json.real_name);
                            localStorage.setItem('uid', json.email);

                            window.location.href = "/";
                        }
                    }
                );
        }
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
                                <form onSubmit={this.logIn}>
                                    <p className="h4 text-center py-4">{ruben.signin}</p>
                                    <div className="grey-text">
                                        <Input label="Your email" icon="user" group type="email" id={"email"} validate error="wrong" success="right" onChange={this.changeInput}/>
                                        <Input label="Your password" icon="key" group type="password" id={"password"} validate onChange={this.changeInput}/>
                                    </div>

                                    <div className={"row d-flex justify-content-end"}>
                                        <p style={{float: "right"}}>{ruben.forgot_password}</p>
                                    </div>

                                    <div className="text-center justify-content-center">
                                        <Button color="secondary" type="submit" style={styles.roundBtn}>{ruben.signin}</Button>
                                    </div>

                                    <div className="d-flex p-2">
                                        <Button className="indigo darken-1" block onClick={()=>{alert('This feature is not supported yet')}}>{ruben.signin_fb}</Button>
                                    </div>

                                    <div className="d-flex p-2">
                                        <Button className="red darken-4" block onClick={()=>{alert('This feature is not supported yet')}}>{ruben.signin_gg}</Button>
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