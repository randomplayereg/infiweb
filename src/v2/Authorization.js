import React from "react";
import { Button, FormGroup, FormControl, InputGroup, Glyphicon, Modal } from "react-bootstrap";
import "./Login.css";

import bg from "../images/login_bg.jpg";

import { ProgressCircle } from 'react-desktop/windows';

class Authorization extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            email: "",
            password: "",
            hideProgress: true,
            show: false
        };
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        this.setState({
            hideProgress: false,
            show: true
        });

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
                            alert('Wrong email or password');
                            this.setState({
                                hideProgress: true,
                                show: false
                            })
                        }
                    } else {
                        localStorage.setItem('token', json.token);
                        localStorage.setItem('username', json.real_name);
                        localStorage.setItem('uid', json.email);

                        setTimeout(() => {
                            window.location.replace('/v2/home');
                        }, 2000);
                    }
                }
            );
    };

    render() {

        const styles = {
            backgr: {
                background: `url(${bg})`,
                width: '100%',
                minHeight: '1080px'
            },
            form: {
                marginTop: '10%'
            },
            glyph: {
                // color: '#9b859b',
                color: '#87CEFA'
            },
            rightFloat: {
                float: 'right'
            },
            roundedButton: {
                borderRadius: '50%',
                color: '#fff',
                backgroundColor: '#9b859b',
                height: '100px',
                width: '100px',
                margin: 'auto'
            }
        };

        return (
            <div style={styles.backgr}>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Body>
                        <ProgressCircle
                            color={'#9b859b'}
                            size={200}
                            hidden={this.state.hideProgress}
                            style={{
                                zIndex: '10',
                                margin: 'auto'
                            }}
                        />
                    </Modal.Body>
                </Modal>
                <div className="Login">
                    <div className="login-container">
                        <form
                            onSubmit={this.handleSubmit}
                            style={styles.form}
                        >
                            <h1>InfiBook</h1>
                            <FormGroup controlId="email" bsSize="large">
                                <InputGroup>
                                    <InputGroup.Addon>
                                        <Glyphicon glyph={'user'} style={styles.glyph}/>
                                    </InputGroup.Addon>
                                    <FormControl
                                        autoFocus
                                        type="email"
                                        value={this.state.email}
                                        onChange={this.handleChange}

                                        placeholder={'Email'}
                                    />
                                </InputGroup>
                            </FormGroup>

                            <FormGroup controlId="password" bsSize="large">
                                <InputGroup>
                                    <InputGroup.Addon>
                                        <Glyphicon glyph={'lock'} style={styles.glyph}/>
                                    </InputGroup.Addon>
                                    <FormControl
                                        value={this.state.password}
                                        onChange={this.handleChange}
                                        type="password"

                                        placeholder={'Password'}
                                    />
                                </InputGroup>
                            </FormGroup>

                            <div>
                                <a style={styles.rightFloat}>Forgot password?</a>
                            </div>

                            <div className="button-container">
                                <Button
                                    block
                                    bsSize="large"
                                    // disabled={!this.validateForm()}
                                    type="submit"
                                    style={styles.roundedButton}
                                >
                                    Login
                                </Button>
                            </div>

                            <Button
                                block
                                bsSize="large"
                                style={{
                                    backgroundColor: '#3b5998',
                                    color: 'white',
                                    fontSize: '13px'
                                }}>
                                Sign in with Facebook
                            </Button>

                            <Button
                                block
                                bsSize="large"
                                style={{
                                    backgroundColor: '#be001c',
                                    color: 'white',
                                    fontSize: '13px'
                                }}>
                                Sign in with Google
                            </Button>

                            <p style={{textAlign: 'center', marginTop: '10px'}}>Don't have an account? <strong><a>SignUp</a></strong></p>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Authorization;