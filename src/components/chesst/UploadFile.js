import React from 'react';

import { Container, Row, Col, Input, Button, Fa, Card, CardBody } from 'mdbreact';

import FileBase64 from 'react-file-base64';

export default class UploadFile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            files: []
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileInput = React.createRef();
    }

    getFiles(files){
        this.setState({ files: files });

        console.log(files);
    }

    handleSubmit(event) {
        event.preventDefault();

        console.log(event);

        const file = this.state.files[0];
        console.log(file.base64);

        debugger

        let url = "https://thedung.pythonanywhere.com/api/user/profile/update/avatar";
        fetch(
            url,
            {
                method: "PUT",
                headers: {
                    'Authorization' : 'Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0eXBlIjoidXNlciIsImNyZWF0ZV90aW1lIjoiMjAxOC0wNy0yNVQwNDoyMjo0Mi40OTI2MjkrMDA6MDAiLCJlbWFpbCI6InVzZXIxMUBnbWFpbC5jb20ifQ.3xgBP0cJqFQz-TM5IohwDLuNPuJPR77ZvlMeASA50Z4',
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    email: "user11@gmail.com",
                    avatar: file.base64
                })
            }
        )
            .then(response => response.json())
            .then(json => console.log(json))
    }


    render() {
        return (
            <Container className={"d-flex justify-content-lg-center mt-3"}>
                <Row style={{minWidth: "512px"}}>
                    <Col md="12">
                        <Card>
                            <CardBody>
                                <form onSubmit={this.handleSubmit}>
                                    <FileBase64
                                        multiple={ true }
                                        onDone={ this.getFiles.bind(this) } />
                                    <br />
                                    <button type="submit">Submit</button>
                                </form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}