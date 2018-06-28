import React from 'react';

import {Grid, Row, Col, Tab, Tabs, Image, Label, Well, Badge, Button, Panel, FormGroup, FormControl, ControlLabel, Alert, Glyphicon, ButtonToolbar, Dropdown, MenuItem} from 'react-bootstrap';

class TransactionDetail extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.fetchTransaction();
    }

    fetchTransaction() {
        let url = `https://thedung.pythonanywhere.com/api/transaction/${this.props.id}`;

        fetch(
            url,
            {
                method: "GET",
                headers: {
                    "Authorization" : 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiYWRtaW4iLCJjcmVhdGVfdGltZSI6IjIwMTgtMDMtMDRUMDI6NTc6MjMuOTgxMjUzKzAwOjAwIiwiZW1haWwiOiJ0aGVkdW5nMjcwOUBnbWFpbC5jb20iLCJpZCI6MX0.dhZvtbK9YrUzdRObkurnRp89bCH7yy2L3sdaUbWQu0k'
                }
            }
        )
        .then((response) => response.json())
        .then((json => {
            console.log(json);
            this.setState({
                transactionData: json
            });
        }))
    }

    renderBookInfo() {
        const data = this.state.transactionData;

        return(
            <Row>
                <Col md={4}>
                    <Image src={data.book_image} />
                </Col>
                <Col md={8}>
                    <h4>{data.book_name}</h4>
                    <h4>Owner: {data.owner_name}</h4>
                    <h4>Requester: {data.requester_name}</h4>
                    <h4>Status: {data.status} </h4>
                </Col>
            </Row>
        )
    }

    renderActionReplyOne() {
        const data = this.state.transactionData;

        const styles = {
            sendButton: {
                float: 'right'
            },
            messageBox: {
                marginBottom: '5px'
            },
            pullRight: {
                float: 'right',
                padding: '0px',
                marginTop: '0px',
                marginBottom: '0px'
            }            
        }

        return (
            <div>
                <Alert bsStyle="info">
                    <div>
                        Bạn cần gửi kèm địa chỉ mà bạn sẽ giao sách cho người mượn.
                        <Dropdown bsStyle="success"style={styles.pullRight}>

                            <Dropdown.Toggle>
                                <Glyphicon glyph="plus" bsStyle="success"/>
                            </Dropdown.Toggle>

                            <Dropdown.Menu >
                                <MenuItem eventKey="1">Địa chỉ của profile</MenuItem>
                                <MenuItem eventKey="2">Địa chỉ tùy chỉnh hiện tại</MenuItem>
                                <MenuItem eventKey="3">Địa chỉ tùy chỉnh chỉnh sửa</MenuItem>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </Alert>
                <FormControl 
                    componentClass="textarea" 
                    placeholder={`Gửi trả lời cho ${data.requester_name}`}
                    onChange={(e)=> this.setState({ requestMessage: e.target.value})}
                    style={styles.messageBox}
                    />
                <Button bsStyle="info" style={styles.sendButton} onClick={this.sendRequest}>Trả lời</Button>
            </div>
        )
    }

    renderAction() {
        const data = this.state.transactionData;

        return(
            [
                <Row>
                    <Well>{data.last_message == null ? "Nothing here" : data.last_message}</Well>
                </Row>
                ,
                <Row>
                    {this.renderActionReplyOne()}
                </Row>           
            ]
        )
    }

    render() {
        return(
            <Grid>
                <Row>
                    <Col md={2}>
                        ???
                    </Col>
                    
                    <Col md={8}>
                        {this.state && this.state.transactionData && 
                            this.renderBookInfo()
                        }
                        <hr/>
                        {this.state && this.state.transactionData && 
                            this.renderAction()
                        }
                    </Col>
                    <Col md={2}>
                        <h1>Weeee</h1>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default TransactionDetail;