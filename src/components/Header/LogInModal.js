import React from 'react'
import {Button, Modal} from 'react-bootstrap'
import {FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap'
import {Form, Col, Checkbox} from 'react-bootstrap'

class LogInForm extends React.Component {
    constructor(props){
        super(props);

        this.handlePWChange = this.handlePWChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleSummit = this.handleSummit.bind(this);        

        // this.state = {
        //     email: undefined,
        //     password: undefined
        // };
    }

    state = {
        email: "",
        password: ""
    }

    handleEmailChange(e){
        this.setState({
            email: e.target.value
        });
    }

    handlePWChange(e){
        this.setState({
            password: e.target.value
        });
    }

    handleSummit = async (e) => {

        var handlerAfterSubmit = (response) => {
            if (response.status === 200){
                console.log('ok');
                //const data = api_call.json();
            } else {
                console.log('not right');
            }
        };

        e.preventDefault();

        const md5Base64 = require('md5-base64');
        const hash = md5Base64(this.state.password);
        console.log('pw use md5-base64: ' + hash);
        const api_call = await fetch('https://thedung.pythonanywhere.com/api/user/login',
            {
                method: 'POST',
                headers: {
                    'Authorization' : 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiYWRtaW4iLCJjcmVhdGVfdGltZSI6IjIwMTgtMDMtMDRUMDI6NTc6MjMuOTgxMjUzKzAwOjAwIiwiZW1haWwiOiJ0aGVkdW5nMjcwOUBnbWFpbC5jb20iLCJpZCI6MX0.dhZvtbK9YrUzdRObkurnRp89bCH7yy2L3sdaUbWQu0k'
                },
                body: JSON.stringify({
                    email: this.state.email,
                    password: hash,
                    login_type: this.state.email,
                    fcm_token: "fzYu1WW46Rs:APA91bF5_KMWd5FJaXtjoauWzlxIFhOPcZ-BwZpsIj-keErX_6tfXlWUvWngSoj6PnLgMDcBrJ5M6YFwS370H6CPQ-YIZm3nCzwqXTEll4ug8b0oPwiFrK3m0dkO9126K5UVBzXYyL39"
                })
            });
        const data = await api_call.json();
        console.log(data);
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.real_name);
        localStorage.setItem('uid', data.email);

        window.location.replace('/');
    }

    render() {
        return (
            <Form horizontal onSubmit={this.handleSummit}>
                <FormGroup controlId="formHorizontalEmail">
                    <Col componentClass={ControlLabel} sm={2}>
                        Email
                    </Col>
                    <Col sm={10}>
                        <FormControl type="email" placeholder="Email" onChange={this.handleEmailChange}/>
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword">
                    <Col componentClass={ControlLabel} sm={2}>
                        Password
                    </Col>
                    <Col sm={10}>
                        <FormControl type="password" placeholder="Password" onChange={this.handlePWChange}/>
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col smOffset={2} sm={10}>
                        <Checkbox>Remember me</Checkbox>
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col smOffset={2} sm={10}>
                        <Button type="submit">Sign in</Button>
                    </Col>
                </FormGroup>
            </Form>
        )
    }
}

class LogInModal extends React.Component{
    constructor(props) {
        super(props);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    state = {
        show: false
    };

    componentDidMount() {
        this.props.onRef(this)
    }
    componentWillUnmount() {
        this.props.onRef(undefined)
    }

    handleShow() {
        this.setState({ show: true });
        console.log('show clicked');
    };

    handleClose() {
        this.setState({ show: false });
        console.log('close clicked');
    };

    render() {
        return (
            <div>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Log in</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <LogInForm onRef = {ref => this.child = ref}/>
                        <hr />

                        <p>sign up</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default LogInModal;