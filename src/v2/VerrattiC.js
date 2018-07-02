import React from 'react';

import {Grid, Row, Col, Modal, Tab, Tabs, Image, Label, Well, Badge, ButtonGroup, Button, Panel, FormGroup,
    FormControl, ControlLabel, Alert, Glyphicon, ButtonToolbar, Dropdown, MenuItem, Checkbox} from 'react-bootstrap';

import { Box, Text } from 'react-desktop/macOs';

import Geocode from "./Utils/Geocode";

import {geolocated} from 'react-geolocated';

import MyFancyComponent from '../components/MyFancyComponent';
import NavigationM from "./NavigationM";

function prepareData(details) {
    var formBody = [];
    for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    return formBody;
}

const MessageBox = (props) => (
    <FormGroup>
        <ControlLabel><h4>Bạn có thể nhắn tin trả lời vào bên dưới: </h4></ControlLabel>
        <FormControl
            componentClass="textarea"
            placeholder="Viết một tin nhắn"
            onChange={props.onChange}
        />
    </FormGroup>
)

class SelectionControl extends React.Component {
    constructor(props) {
        super(props);
    }

    renderItems() {
        const data = this.props.items;
        let res = [];
        data.forEach(
            (item) => {
                res.push(
                    <option value={`${item.code}`}>{item.name}</option>
                )
            }
        )
        return res;
    }

    render() {
        return(
            [
                <ControlLabel key='label'>{this.props.propName}</ControlLabel>,
                <FormControl key='inputselect' componentClass="select" placeholder="select" onChange={this.props.handleChange}>
                    {this.renderItems()}
                </FormControl>
            ]
        )
    }
}

class VerrattiC extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.messageChange = this.messageChange.bind(this);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleShowDirection = this.handleShowDirection.bind(this);
        this.handleCloseDirection = this.handleCloseDirection.bind(this);

        this.handleChangeStreetNr = this.handleChangeStreetNr.bind(this);
        this.handleChangeDistrict = this.handleChangeDistrict.bind(this);
        this.handleChangeWard = this.handleChangeWard.bind(this);
        this.handleChangeCity = this.handleChangeCity.bind(this);

        this.state = {
            customLocationShow: false,
            streetNr: '',
            activeTab: 1,
            directionShow: false,
            message: ''
        };

        this.pickProfileLocation = this.pickProfileLocation.bind(this);
        this.pickDeviceLocation = this.pickDeviceLocation.bind(this);
        this.customizeDeviceLocation = this.customizeDeviceLocation.bind(this);

        this.fetchLocationCodeData = this.fetchLocationCodeData.bind(this);
        this.fetchTransaction = this.fetchTransaction.bind(this);
        this.fetchBetaLocation = this.fetchBetaLocation.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTabChange = this.handleTabChange.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);

        this.convertLatLng = this.convertLatLng.bind(this);

        // owner action button
        this.O3_acceptRequest = this.O3_acceptRequest.bind(this);
        this.O3_declineRequest = this.O3_declineRequest.bind(this);
        this.O15_changeBookStatus = this.O15_changeBookStatus.bind(this);
        this.O6_notReady = this.O6_notReady.bind(this);

        this.O11_acceptReturn = this.O11_acceptReturn.bind(this);
        this.O11_declineReturn = this.O11_declineReturn.bind(this);

        this.O16_retrieveBook = this.O16_retrieveBook.bind(this);

        // requester action button
        this.R4_acceptRequest = this.R4_acceptRequest.bind(this);
        this.R4_declineRequest = this.R4_declineRequest.bind(this);

        this.R6_tookBook = this.R6_tookBook.bind(this);

        this.R8_requestReturn = this.R8_requestReturn.bind(this);

        this.R12_acceptRequest = this.R12_acceptRequest.bind(this);
        this.R12_declineRequest = this.R12_declineRequest.bind(this);

        this.fetchTransaction();
        this.fetchLocationCodeData();
    }

    messageChange(e) {
        console.log(e.target.value);
        this.setState({
            message: e.target.value
        })
    }

    handleClose() {
        this.setState({
            customLocationShow: false
        });
    }

    handleCloseDirection() {
        this.setState({
            directionShow: false
        });
    }

    handleShow() {
        this.setState({
            customLocationShow: true
        });
    }

    handleShowDirection() {
        if (this.state.important) {
            this.setState({
                directionShow: true
            });
        } else {
            alert('Hay chon dia chi xuat phat cua ban');
        }
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

                if (json.requester_email === localStorage.getItem('uid')){
                    this.fetchBetaLocation();
                };
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



    renderR3() {
        const data = this.state.transactionData;

        function cancelRequest() {

            let url = `https://thedung.pythonanywhere.com/api/transaction/cancel-request`;

            const body = prepareData(
                {
                    'id': data.id
                }
            );

            const token = `Token ${localStorage.getItem('token')}`

            fetch(
                url,
                {
                    method: "PUT",
                    headers: {
                        "Authorization" : token
                    },
                    body: body
                }
            )
                .then(
                    (response) => {
                        console.log(response);

                        // TODO: check success repsonse
                        if (true) {
                            window.location.reload();
                        }

                        return response.json()
                    }
                )
                .then(
                    (
                        json => {
                            console.log(json);
                        }
                    )
                )
        }

        return (
            <Row style={{marginTop: '13px'}}>
                <div style={{float: 'right'}}>
                    <Button bsStyle="danger" bsSize="large" onClick={cancelRequest}>
                        Cancel
                    </Button>
                </div>
            </Row>
        )
    }

    R4_acceptRequest() {

        const currentEmail = localStorage.getItem('uid');

        if ((typeof(currentEmail) == "undefined") || (currentEmail == "")) {
            alert('No login');
        };

        const data = this.state.transactionData;

        const token = `Token ${localStorage.getItem('token')}`;

        const body = prepareData(
            {
                'id': data.id,
                'code': 15,
                'last_message': this.state.message
            }
        );

        let url = `https://thedung.pythonanywhere.com/api/transaction/change-status/requester`;
        fetch(
            url,
            {
                method: "PUT",
                headers: {
                    "Authorization" : token
                },
                body: body
            }
        )
            .then(
                (response) => {
                    return response.json()
                }
            )
            .then(
                (
                    json => {
                        console.log(json);
                        window.location.reload();
                    }
                )
            )
    }

    R4_declineRequest() {

        const currentEmail = localStorage.getItem('uid');

        if ((typeof(currentEmail) == "undefined") || (currentEmail == "")) {
            alert('No login');
        };

        const data = this.state.transactionData;

        const token = `Token ${localStorage.getItem('token')}`;

        const body = prepareData(
            {
                'id': data.id,
                'code': 3,
                'last_message': this.state.message
            }
        );

        let url = `https://thedung.pythonanywhere.com/api/transaction/change-status/requester`;
        fetch(
            url,
            {
                method: "PUT",
                headers: {
                    "Authorization" : token
                },
                body: body
            }
        )
            .then(
                (response) => {
                    return response.json()
                }
            )
            .then(
                (
                    json => {
                        console.log(json);
                        window.location.reload();
                    }
                )
            )
    }

    fetchBetaLocation() {
        const currentEmail = localStorage.getItem('uid');
        const token = `Token ${localStorage.getItem('token')}`;

        let url = `https://thedung.pythonanywhere.com/api/location/user/${currentEmail}/3`;
        fetch(
            url,
            {
                method: "GET",
                headers: {
                    "Authorization" : token
                }
            }
        )
            .then(
                (response) => {
                    return response.json()
                }
            )
            .then(
                (
                    json => {
                        console.log(json);
                        this.setState({
                            address: {
                                important: {
                                    location_code: json.code,
                                    detail: json.detail,
                                    type: json.type,
                                    lat: json.lat,
                                    lng: json.lng
                                },
                                toString: `${json.detail}, ${json.ward}, ${json.district}, ${json.city}, ${json.country}`
                            },
                            important: {
                                location_code: json.code,
                                detail: json.detail,
                                type: json.type,
                                lat: json.lat,
                                lng: json.lng
                            }
                        });
                        console.log(this.state.address);
                    }
                )
            )
    }

    renderR4() {

        const data = this.state.transactionData;
        const ownerLocation = data.location;


        return(
            [
                <Row>
                    <MessageBox
                        onChange={this.messageChange}
                    />
                </Row>,

                <Row>
                    <h4>Địa điểm nhận: {`${ownerLocation.detail}, ${ownerLocation.ward}, ${ownerLocation.district}, ${ownerLocation.city}`}</h4>
                </Row>,

                <Row>
                    <div style={{float: 'right'}}>
                        <Button bsStyle="warning" bsSize="large" onClick={this.handleShowDirection}>
                            Show direction
                        </Button>
                        <Button bsStyle="success" bsSize="large" onClick={this.R4_acceptRequest}>
                            Accept
                        </Button>
                        <Button bsStyle="primary" bsSize="large" onClick={this.R4_declineRequest}>
                            Decline
                        </Button>
                    </div>
                </Row>,

                <Row>
                    {this.state && this.state.important && this.state.address &&
                    <Modal show={this.state.directionShow} onHide={this.handleCloseDirection}>

                        <Modal.Header closeButton>
                            <Modal.Title>Xem quang duong di</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <MyFancyComponent
                                showMarker={false}

                                routeFinding={true}

                                userAddress={this.state.address.toString}

                                origin={{
                                    lat: this.state.important.lat,
                                    lng: this.state.important.lng
                                }}

                                destination={{
                                    lat: ownerLocation.lat,
                                    lng: ownerLocation.lng
                                }}

                                onRef={ref => this.child = ref}
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.handleCloseDirection}>Close</Button>
                        </Modal.Footer>

                    </Modal>
                    }
                </Row>
                ]
        )
    }

    renderR15() {

        const data = this.state.transactionData;
        const ownerLocation = data.location;

        return(
            [
            <Row style={{marginTop: '13px'}}>
                <div style={{float: 'right'}}>
                    <Button bsStyle="warning" bsSize="large" onClick={this.handleShowDirection}>
                        Show direction
                    </Button>
                </div>
            </Row>,
            <Row>
                {this.state && this.state.important && this.state.address &&
                <Modal show={this.state.directionShow} onHide={this.handleCloseDirection}>

                    <Modal.Header closeButton>
                        <Modal.Title>Xem quang duong di</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <MyFancyComponent
                            showMarker={false}

                            routeFinding={true}

                            userAddress={this.state.address.toString}

                            origin={{
                                lat: this.state.important.lat,
                                lng: this.state.important.lng
                            }}

                            destination={{
                                lat: ownerLocation.lat,
                                lng: ownerLocation.lng
                            }}

                            onRef={ref => this.child = ref}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleCloseDirection}>Close</Button>
                    </Modal.Footer>

                </Modal>
                }
            </Row>
            ]
        )
    }

    R6_tookBook() {
        const currentEmail = localStorage.getItem('uid');

        if ((typeof(currentEmail) == "undefined") || (currentEmail == "")) {
            alert('No login');
        };

        const data = this.state.transactionData;

        const token = `Token ${localStorage.getItem('token')}`;

        const body = prepareData(
            {
                'id': data.id,
                'code': 8,
                'last_message': this.state.message
            }
        );

        let url = `https://thedung.pythonanywhere.com/api/transaction/change-status/requester`;
        fetch(
            url,
            {
                method: "PUT",
                headers: {
                    "Authorization" : token
                },
                body: body
            }
        )
            .then(
                (response) => {
                    return response.json()
                }
            )
            .then(
                (
                    json => {
                        console.log(json);
                        window.location.reload();
                    }
                )
            )
    }

    renderR6() {

        const data = this.state.transactionData;
        const ownerLocation = data.location;

        return(
            [
                <Row>
                    <MessageBox
                        onChange={this.messageChange}
                    />
                </Row>,

                <Row>
                    <h4>Địa điểm nhận: {`${ownerLocation.detail}, ${ownerLocation.ward}, ${ownerLocation.district}, ${ownerLocation.city}`}</h4>
                </Row>,


                <Row>
                    <div style={{float: 'right'}}>
                        <Button bsStyle="warning" bsSize="large" onClick={this.handleShowDirection}>
                            Xem trên bản đồ
                        </Button>
                        <Button bsStyle="success" bsSize="large" onClick={this.R6_tookBook}>
                            Tôi đã lấy sách
                        </Button>
                    </div>
                </Row>,

                <Row>
                    {this.state && this.state.important && this.state.address &&
                    <Modal show={this.state.directionShow} onHide={this.handleCloseDirection}>

                        <Modal.Header closeButton>
                            <Modal.Title>Xem quang duong di</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <MyFancyComponent
                                showMarker={false}

                                routeFinding={true}

                                userAddress={this.state.address.toString}

                                origin={{
                                    lat: this.state.important.lat,
                                    lng: this.state.important.lng
                                }}

                                destination={{
                                    lat: ownerLocation.lat,
                                    lng: ownerLocation.lng
                                }}

                                onRef={ref => this.child = ref}
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.handleCloseDirection}>Close</Button>
                        </Modal.Footer>

                    </Modal>
                    }
                </Row>
            ]
        )
    }

    R8_requestReturn() {
        const currentEmail = localStorage.getItem('uid');

        if ((typeof(currentEmail) == "undefined") || (currentEmail == "")) {
            alert('No login');
        };

        const data = this.state.transactionData;

        const token = `Token ${localStorage.getItem('token')}`;

        const body = prepareData(
            {
                'id': data.id,
                'code': 11,
                'last_message': this.state.message
            }
        );

        let url = `https://thedung.pythonanywhere.com/api/transaction/change-status/requester`;
        fetch(
            url,
            {
                method: "PUT",
                headers: {
                    "Authorization" : token
                },
                body: body
            }
        )
            .then(
                (response) => {
                    return response.json()
                }
            )
            .then(
                (
                    json => {
                        console.log(json);
                        window.location.reload();
                    }
                )
            )
    }

    renderR8() {

        const data = this.state.transactionData;
        const ownerLocation = data.location;

        return(
            [
            <Row>
                <MessageBox
                    onChange={this.messageChange}
                />
            </Row>,

            <Row>
                <h4>Địa điểm nhận: {`${ownerLocation.detail}, ${ownerLocation.ward}, ${ownerLocation.district}, ${ownerLocation.city}`}</h4>
            </Row>,

            <Row>
                <h4>Ngày bắt đầu: {`${data.time_start_exchange}`}</h4>
            </Row>,

            <Row>
                <h4>Ngày trả: {`${data.time_expire_exchange}`}</h4>
            </Row>,

            <Row>
                <div style={{float: 'right'}}>
                    <Button bsStyle="primary" bsSize="large" onClick={this.R8_requestReturn}>
                        Tôi muốn trả sách
                    </Button>
                </div>
            </Row>,
            ]
        )
    }

    renderR11(){
        return(
            [
                <Row>

                </Row>
            ]
        )
    }

    R12_acceptRequest() {
        const currentEmail = localStorage.getItem('uid');

        if ((typeof(currentEmail) == "undefined") || (currentEmail == "")) {
            alert('No login');
        };

        const data = this.state.transactionData;

        const token = `Token ${localStorage.getItem('token')}`;

        const body = prepareData(
            {
                'id': data.id,
                'code': 16,
                'last_message': this.state.message
            }
        );

        let url = `https://thedung.pythonanywhere.com/api/transaction/change-status/requester`;
        fetch(
            url,
            {
                method: "PUT",
                headers: {
                    "Authorization" : token
                },
                body: body
            }
        )
            .then(
                (response) => {
                    return response.json()
                }
            )
            .then(
                (
                    json => {
                        console.log(json);
                        window.location.reload();
                    }
                )
            )
    }

    R12_declineRequest() {
        const currentEmail = localStorage.getItem('uid');

        if ((typeof(currentEmail) == "undefined") || (currentEmail == "")) {
            alert('No login');
        };

        const data = this.state.transactionData;

        const token = `Token ${localStorage.getItem('token')}`;

        const body = prepareData(
            {
                'id': data.id,
                'code': 11,
                'last_message': this.state.message
            }
        );

        let url = `https://thedung.pythonanywhere.com/api/transaction/change-status/requester`;
        fetch(
            url,
            {
                method: "PUT",
                headers: {
                    "Authorization" : token
                },
                body: body
            }
        )
            .then(
                (response) => {
                    return response.json()
                }
            )
            .then(
                (
                    json => {
                        console.log(json);
                        window.location.reload();
                    }
                )
            )
    }

    renderR12() {
        const data = this.state.transactionData;
        const ownerLocation = data.location;
        const returnLocation = data.location_return;


        return(
            [
                <Row>
                    <MessageBox
                        onChange={this.messageChange}
                    />
                </Row>,

                <Row>
                    <h4>Địa điểm nhận: {`${ownerLocation.detail}, ${ownerLocation.ward}, ${ownerLocation.district}, ${ownerLocation.city}`}</h4>
                </Row>,

                <Row>
                    <h4>Địa điểm trả: {`${returnLocation.detail}, ${returnLocation.ward}, ${returnLocation.district}, ${returnLocation.city}`}</h4>
                </Row>,

                <Row>
                    <h4>Ngày bắt đầu: {`${data.time_start_exchange}`}</h4>
                </Row>,

                <Row>
                    <h4>Ngày trả: {`${data.time_expire_exchange}`}</h4>
                </Row>,

                <Row>
                    <div style={{float: 'right'}}>
                        <Button bsStyle="warning" bsSize="large" onClick={this.handleShowDirection}>
                            Show direction
                        </Button>
                        <Button bsStyle="success" bsSize="large" onClick={this.R12_acceptRequest}>
                            Accept
                        </Button>
                        <Button bsStyle="primary" bsSize="large" onClick={this.R12_declineRequest}>
                            Decline
                        </Button>
                    </div>
                </Row>,

                <Row>
                    {this.state && this.state.important && this.state.address &&
                    <Modal show={this.state.directionShow} onHide={this.handleCloseDirection}>

                        <Modal.Header closeButton>
                            <Modal.Title>Xem quang duong di</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <MyFancyComponent
                                showMarker={false}

                                routeFinding={true}

                                userAddress={this.state.address.toString}

                                origin={{
                                    lat: this.state.important.lat,
                                    lng: this.state.important.lng
                                }}

                                destination={{
                                    lat: returnLocation.lat,
                                    lng: returnLocation.lng
                                }}

                                onRef={ref => this.child = ref}
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.handleCloseDirection}>Close</Button>
                        </Modal.Footer>

                    </Modal>
                    }
                </Row>
            ]
        )
    }

    renderR16() {
        const data = this.state.transactionData;
        const ownerLocation = data.location;
        const returnLocation = data.location_return;

        return(
            [
                <Row>
                    <h4>Địa điểm nhận: {`${ownerLocation.detail}, ${ownerLocation.ward}, ${ownerLocation.district}, ${ownerLocation.city}`}</h4>
                </Row>,

                <Row>
                    <h4>Địa điểm trả: {`${returnLocation.detail}, ${returnLocation.ward}, ${returnLocation.district}, ${returnLocation.city}`}</h4>
                </Row>,

                <Row>
                    <h4>Ngày bắt đầu: {`${data.time_start_exchange}`}</h4>
                </Row>,

                <Row>
                    <h4>Ngày trả: {`${data.time_expire_exchange}`}</h4>
                </Row>,

                <Row style={{marginTop: '13px'}}>
                    <div style={{float: 'right'}}>
                        <Button bsStyle="warning" bsSize="large" onClick={this.handleShowDirection}>
                            Show direction
                        </Button>
                    </div>
                </Row>,

                <Row>
                    {this.state && this.state.important && this.state.address &&
                    <Modal show={this.state.directionShow} onHide={this.handleCloseDirection}>

                        <Modal.Header closeButton>
                            <Modal.Title>Xem quang duong di</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <MyFancyComponent
                                showMarker={false}

                                routeFinding={true}

                                userAddress={this.state.address.toString}

                                origin={{
                                    lat: this.state.important.lat,
                                    lng: this.state.important.lng
                                }}

                                destination={{
                                    lat: returnLocation.lat,
                                    lng: returnLocation.lng
                                }}

                                onRef={ref => this.child = ref}
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.handleCloseDirection}>Close</Button>
                        </Modal.Footer>

                    </Modal>
                    }
                </Row>
            ]
        )
    }

    renderR14() {
        const data = this.state.transactionData;
        const ownerLocation = data.location;
        const returnLocation = data.location_return;
        return(
            [
            <Row>
                <h4>Địa điểm nhận: {`${ownerLocation.detail}, ${ownerLocation.ward}, ${ownerLocation.district}, ${ownerLocation.city}`}</h4>
            </Row>,

            <Row>
                <h4>Địa điểm trả: {`${returnLocation.detail}, ${returnLocation.ward}, ${returnLocation.district}, ${returnLocation.city}`}</h4>
            </Row>,

            <Row>
                <h4>Ngày bắt đầu: {`${data.time_start_exchange}`}</h4>
            </Row>,

            <Row>
                <h4>Ngày trả: {`${data.time_expire_exchange}`}</h4>
            </Row>,
            ]
        )
    }

    pickProfileLocation() {
        const currentEmail = localStorage.getItem('uid');
        const token = `Token ${localStorage.getItem('token')}`;

        let url = `https://thedung.pythonanywhere.com/api/location/user/${currentEmail}/1`;
        fetch(
            url,
            {
                method: "GET",
                headers: {
                    "Authorization" : token
                }
            }
        )
            .then(
                (response) => {
                    return response.json()
                }
            )
            .then(
                (
                    json => {
                        console.log(json);
                        this.setState({
                            address: {
                                important: {
                                    location_code: json.code,
                                    detail: json.detail,
                                    type: json.type,
                                    lat: json.lat,
                                    lng: json.lng
                                },
                                toString: `${json.detail}, ${json.ward}, ${json.district}, ${json.city}, ${json.country}`
                            },
                            important: {
                                location_code: json.code,
                                detail: json.detail,
                                type: json.type,
                                lat: json.lat,
                                lng: json.lng
                            }
                        });
                        console.log(this.state.address)
                    }
                )
            )
    }

    pickDeviceLocation() {
        const currentEmail = localStorage.getItem('uid');
        const token = `Token ${localStorage.getItem('token')}`;

        let url = `https://thedung.pythonanywhere.com/api/location/user/${currentEmail}/3`;
        fetch(
            url,
            {
                method: "GET",
                headers: {
                    "Authorization" : token
                }
            }
        )
            .then(
                (response) => {
                    return response.json()
                }
            )
            .then(
                (
                    json => {
                        if (json.error_code || json.error_message) {
                            alert(json.error_message);
                            return;
                        };
                        this.setState({
                            address: {
                                important: {
                                    location_code: json.code,
                                    detail: json.detail,
                                    type: json.type,
                                    lat: json.lat,
                                    lng: json.lng
                                },
                                toString: `${json.detail}, ${json.ward}, ${json.district}, ${json.city}, ${json.country}`
                            },
                            important: {
                                location_code: json.code,
                                detail: json.detail,
                                type: json.type,
                                lat: json.lat,
                                lng: json.lng
                            }
                        });
                        console.log(this.state.address)
                    }
                )
            )
    }

    customizeDeviceLocation() {
        this.handleShow();
    }

    O3_acceptRequest() {
        if (!this.state || !this.state.important) {
            alert('Hãy chọn địa điểm giao sách trước khi trả lời yêu cầu!');
            return;
        }

        const currentEmail = localStorage.getItem('uid');

        if ((typeof(currentEmail) == "undefined") || (currentEmail == "")) {
            alert('No login');
        };

        const data = this.state.transactionData;

        const body = prepareData(
            {
                'id': data.id,
                'code': 4,
                'location_code': this.state.important.location_code,
                'detail': this.state.important.detail,
                // 'type': this.state.important.type,
                'type': 2,
                'lat': this.state.important.lat,
                'lng': this.state.important.lng,
                // TODO:
                'last_message': this.state.message
            }
        );

        let url = `https://thedung.pythonanywhere.com/api/transaction/response-with-location`;

        const token = `Token ${localStorage.getItem('token')}`;

        fetch(
            url,
            {
                method: "PUT",
                headers: {
                    "Authorization" : token
                },
                body: body
            }
        )
            .then(
                (response) => {
                    console.log(response);

                    // TODO: check success repsonse
                    if (true) {
                        window.location.reload();
                    }

                    return response.json()
                }
            )
            .then(
                (
                    json => {
                        console.log(json);
                    }
                )
            )
    }

    O3_declineRequest() {
        let url = `https://thedung.pythonanywhere.com/api/transaction/reply-request`;

        const data = this.state.transactionData;

        const body = prepareData(
            {
                'id': data.id,
                'code': 1
            }
        );

        const token = `Token ${localStorage.getItem('token')}`

        fetch(
            url,
            {
                method: "PUT",
                headers: {
                    "Authorization" : token
                },
                body: body
            }
        )
            .then(
                (response) => {
                    console.log(response);

                    // TODO: check success repsonse
                    if (true) {
                        window.location.reload();
                    }

                    return response.json()
                }
            )
            .then(
                (
                    json => {
                        console.log(json);
                    }
                )
            )
    }

    renderO3() {
        const data = this.state.transactionData;
        return(
            [
                <Row>
                    <MessageBox
                        onChange={this.messageChange}
                    />
                </Row>,

                <Row>
                    <h4>Bạn cần thêm địa chỉ </h4>
                </Row>,

                <Row>
                </Row>,

                <Row>
                    {this.renderCustomLocationModal()}
                    <ButtonGroup>
                        <Button onClick={this.pickProfileLocation}> Sử dụng địa chỉ cá nhân của tôi</Button>
                        <Button onClick={this.pickDeviceLocation}> Sử dụng địa chỉ mặc định</Button>
                        <Button onClick={this.customizeDeviceLocation}> Thêm địa điểm thủ công</Button>
                    </ButtonGroup>
                </Row>,

                <Row>
                    <h4>
                        Địa điểm nhận: {this.state && this.state.address && this.state.address.toString}
                    </h4>
                </Row>,

                <Row>
                    <div style={{float: 'right'}}>
                        <Button bsSize="large" bsStyle="success" onClick={this.O3_acceptRequest}>
                            Chấp nhận
                        </Button>
                        <Button bsSize="large" bsStyle="primary" onClick={this.O3_declineRequest}>
                            Từ chối
                        </Button>
                    </div>
                </Row>
            ]
        )
    }

    renderO4() {
        return(
            [
                <Row>

                </Row>
            ]
        )
    }

    O15_changeBookStatus() {

        const data = this.state.transactionData;

        let url = `https://thedung.pythonanywhere.com/api/transaction/change-status/owner`;

        const body = prepareData(
            {
                'id': data.id,
                'code': 6,
                //TODO:
                'last_message': this.state.message
            }
        );

        const token = `Token ${localStorage.getItem('token')}`

        fetch(
            url,
            {
                method: "PUT",
                headers: {
                    "Authorization" : token
                },
                body: body
            }
        )
            .then(
                (response) => {
                    console.log(response);

                    // TODO: check success repsonse
                    if (true) {
                        window.location.reload();
                    }

                    return response.json()
                }
            )
            .then(
                (
                    json => {
                        console.log(json);
                    }
                )
            )
    }

    renderO15() {
        const data = this.state.transactionData;
        const ownerLocation = data.location;
        return(
            [
                <Row>
                    <h4>Địa điểm nhận: {`${ownerLocation.detail}, ${ownerLocation.ward}, ${ownerLocation.district}, ${ownerLocation.city}`}</h4>
                </Row>,

                <Row>
                    <div style={{float: 'right', marginTop: '13px'}}>
                        <Button bsStyle="success" bsSize="large" onClick={this.O15_changeBookStatus}>
                            Chuyển trạng thái sách sang sẵn sàng
                        </Button>
                    </div>
                </Row>
            ]
        )
    }

    O6_notReady() {
        const data = this.state.transactionData;

        let url = `https://thedung.pythonanywhere.com/api/transaction/change-status/owner`;

        const body = prepareData(
            {
                'id': data.id,
                'code': 15,
                //TODO:
                'last_message': this.state.message
            }
        );

        const token = `Token ${localStorage.getItem('token')}`

        fetch(
            url,
            {
                method: "PUT",
                headers: {
                    "Authorization" : token
                },
                body: body
            }
        )
            .then(
                (response) => {
                    console.log(response);

                    // TODO: check success repsonse
                    if (true) {
                        window.location.reload();
                    }

                    return response.json()
                }
            )
            .then(
                (
                    json => {
                        console.log(json);
                    }
                )
            )
    }

    renderO6() {
        const data = this.state.transactionData;
        const ownerLocation = data.location;
        return(
            [
            <Row>
                <h4>Địa điểm nhận: {`${ownerLocation.detail}, ${ownerLocation.ward}, ${ownerLocation.district}, ${ownerLocation.city}`}</h4>
            </Row>,
            <Row>
                <div style={{float: 'right', marginTop: '13px'}}>
                    <Button bsStyle="danger" bsSize="large" onClick={this.O6_notReady}>
                        Chuyển trạng thái sách về chưa sẵn sàng
                    </Button>
                </div>
            </Row>
            ]
        )
    }

    renderO8() {
        const data = this.state.transactionData;
        const ownerLocation = data.location;
        return(
            [
                <Row>
                    <h4>Địa điểm nhận: {`${ownerLocation.detail}, ${ownerLocation.ward}, ${ownerLocation.district}, ${ownerLocation.city}`}</h4>
                </Row>,

                <Row>
                    <h4>Ngày bắt đầu: {`${data.time_start_exchange}`}</h4>
                </Row>,

                <Row>
                    <h4>Ngày trả: {`${data.time_expire_exchange}`}</h4>
                </Row>
            ]
        )
    }

    O11_acceptReturn() {

        if (!this.state || !this.state.important) {
            alert('Hãy chọn địa điểm giao sách trước khi trả lời yêu cầu!');
            return;
        }

        const currentEmail = localStorage.getItem('uid');

        // check bugs

        //// login or not
        if ((typeof(currentEmail) === "undefined") || (currentEmail === "")) {
            alert('No login');
            return;
        }

        //// setup address or not
        // TODO: undefined => "undefined"
        if (typeof(this.state.important) === "undefined") {
            alert('Chua setup dia chi giao dich');
            return;
        }
        //TODO: what if no important state???

        const data = this.state.transactionData;

        const body = prepareData(
            {
                'id': data.id,
                'code': 12,
                'location_code': this.state.important.location_code,
                'detail': this.state.important.detail,
                // 'type': this.state.important.type,
                'type': 2,
                'lat': this.state.important.lat,
                'lng': this.state.important.lng,
                // TODO:
                'last_message': this.state.message
            }
        );

        let url = `https://thedung.pythonanywhere.com/api/transaction/response-with-location`;

        const token = `Token ${localStorage.getItem('token')}`;

        fetch(
            url,
            {
                method: "PUT",
                headers: {
                    "Authorization" : token
                },
                body: body
            }
        )
            .then(
                (response) => {
                    console.log(response);

                    // TODO: check success repsonse
                    if (true) {
                        window.location.reload();
                    }

                    return response.json()
                }
            )
            .then(
                (
                    json => {
                        console.log(json);
                    }
                )
            )
    }

    O11_declineReturn() {
        const data = this.state.transactionData;

        let url = `https://thedung.pythonanywhere.com/api/transaction/change-status/owner`;

        const body = prepareData(
            {
                'id': data.id,
                'code': 8,
                //TODO:
                'last_message': this.state.message
            }
        );

        const token = `Token ${localStorage.getItem('token')}`;

        fetch(
            url,
            {
                method: "PUT",
                headers: {
                    "Authorization" : token
                },
                body: body
            }
        )
            .then(
                (response) => {
                    console.log(response);

                    // TODO: check success repsonse
                    if (true) {
                        window.location.reload();
                    }

                    return response.json()
                }
            )
            .then(
                (
                    json => {
                        console.log(json);
                    }
                )
            )
    }

    renderO11() {
        return(
            [
                <Row>
                    <MessageBox
                    onChange={this.messageChange}
                    />
                </Row>,

                <Row>
                    <h4>Bạn cần thêm địa chỉ </h4>
                </Row>,

                <Row>
                </Row>,

                <Row>
                    {this.renderCustomLocationModal()}
                    <ButtonGroup>
                        <Button onClick={this.pickProfileLocation}> Sử dụng địa chỉ cá nhân của tôi</Button>
                        <Button onClick={this.pickDeviceLocation}> Sử dụng địa chỉ mặc định</Button>
                        <Button onClick={this.customizeDeviceLocation}> Thêm địa điểm thủ công</Button>
                    </ButtonGroup>
                </Row>,

                <Row>
                    <h4>
                        Địa điểm nhận sách: {this.state && this.state.address && this.state.address.toString}
                    </h4>
                </Row>,

                <Row>
                    <div style={{float: 'right'}}>
                        <Button bsSize="large" bsStyle="success" onClick={this.O11_acceptReturn}>
                            Chấp nhận
                        </Button>
                        <Button bsSize="large" bsStyle="primary" onClick={this.O11_declineReturn}>
                            Từ chối
                        </Button>
                    </div>
                </Row>
            ]
        )
    }

    renderO12() {
        const data = this.state.transactionData;
        const ownerLocation = data.location;
        const returnLocation = data.location_return;
        return(
            [
                <Row>
                    <h4>Địa điểm nhận: {`${ownerLocation.detail}, ${ownerLocation.ward}, ${ownerLocation.district}, ${ownerLocation.city}`}</h4>
                </Row>,

                <Row>
                    <h4>Địa điểm trả: {`${returnLocation.detail}, ${returnLocation.ward}, ${returnLocation.district}, ${returnLocation.city}`}</h4>
                </Row>,

                <Row>
                    <h4>Ngày bắt đầu: {`${data.time_start_exchange}`}</h4>
                </Row>,

                <Row>
                    <h4>Ngày trả: {`${data.time_expire_exchange}`}</h4>
                </Row>
            ]
        )
    }

    O16_retrieveBook() {
        const data = this.state.transactionData;

        let url = `https://thedung.pythonanywhere.com/api/transaction/change-status/owner`;

        const body = prepareData(
            {
                'id': data.id,
                'code': 14,
                //TODO:
                'last_message': this.state.message
            }
        );

        const token = `Token ${localStorage.getItem('token')}`;

        fetch(
            url,
            {
                method: "PUT",
                headers: {
                    "Authorization" : token
                },
                body: body
            }
        )
            .then(
                (response) => {
                    console.log(response);

                    // TODO: check success repsonse
                    if (true) {
                        window.location.reload();
                    }

                    return response.json()
                }
            )
            .then(
                (
                    json => {
                        console.log(json);
                    }
                )
            )
    }

    renderO16() {
        const data = this.state.transactionData;
        const ownerLocation = data.location;
        const returnLocation = data.location_return;
        return(
            [
                <Row>
                    <h4>Địa điểm nhận: {`${ownerLocation.detail}, ${ownerLocation.ward}, ${ownerLocation.district}, ${ownerLocation.city}`}</h4>
                </Row>,

                <Row>
                    <h4>Địa điểm trả: {`${returnLocation.detail}, ${returnLocation.ward}, ${returnLocation.district}, ${returnLocation.city}`}</h4>
                </Row>,

                <Row>
                    <h4>Ngày bắt đầu: {`${data.time_start_exchange}`}</h4>
                </Row>,

                <Row>
                    <h4>Ngày trả: {`${data.time_expire_exchange}`}</h4>
                </Row>,

                <Row>
                    <div style={{float: 'right'}}>
                        <Button bsSize="large" bsStyle="success" onClick={this.O16_retrieveBook}>
                            Chấp nhận
                        </Button>
                    </div>
                </Row>
            ]
        )
    }

    renderO14() {
        const data = this.state.transactionData;
        const ownerLocation = data.location;
        const returnLocation = data.location_return;
        return(
            [
                <Row>
                    <h4>Địa điểm nhận: {`${ownerLocation.detail}, ${ownerLocation.ward}, ${ownerLocation.district}, ${ownerLocation.city}`}</h4>
                </Row>,

                <Row>
                    <h4>Địa điểm trả: {`${returnLocation.detail}, ${returnLocation.ward}, ${returnLocation.district}, ${returnLocation.city}`}</h4>
                </Row>,

                <Row>
                    <h4>Ngày bắt đầu: {`${data.time_start_exchange}`}</h4>
                </Row>,

                <Row>
                    <h4>Ngày trả: {`${data.time_expire_exchange}`}</h4>
                </Row>
            ]
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

    renderCanceled() {
        return(
            <div>
                <h1>Giao dich da bi huy!</h1>
            </div>
        )
    }

    renderAction() {
        const data = this.state.transactionData;

        const currentEmail = localStorage.getItem('uid');

        var res;

        switch (data.status) {
            case 3:
                res = (data.requester_email == currentEmail) ? this.renderR3() : this.renderO3();
                break;
            case 4:
                res = (data.requester_email == currentEmail) ? this.renderR4() : this.renderO4();
                break;
            case 15:
                res = (data.requester_email == currentEmail) ? this.renderR15() : this.renderO15();
                break;
            case 6:
                res = (data.requester_email == currentEmail) ? this.renderR6() : this.renderO6();
                break;
            case 8:
                res = (data.requester_email == currentEmail) ? this.renderR8() : this.renderO8();
                break;
            case 11:
                res = (data.requester_email == currentEmail) ? this.renderR11() : this.renderO11();
                break;
            case 12:
                res = (data.requester_email == currentEmail) ? this.renderR12() : this.renderO12();
                break;
            case 16:
                res = (data.requester_email == currentEmail) ? this.renderR16() : this.renderO16();
                break;
            case 14:
                res = (data.requester_email == currentEmail) ? this.renderR14() : this.renderO14();
                break;
            case 5:
                res = this.renderCanceled();
            default:
                break;
        }
        return(
            // <Row>
            <div>
                {res}
            </div>
            // </Row>
        )
    }

    filterBundle(level) {
        const data = this.state.locationData;
        switch (level) {
            case "cities":
                return data[level]
                break;
            case "districts":
                var d = data.cities.find(
                    (item) => {
                        return item.code == this.state.city.code
                    }
                );
                return d.districts;
                break;
            case "wards":
                var d = data.cities.find(
                    (item) => {
                        return item.code == this.state.city.code
                    }
                );
                var dd = d.districts.find(
                    (item) => {
                        return item.code == this.state.district.code
                    }
                );
                return dd.wards;
                break;
        }
    }

    fetchLocationCodeData() {

        const token = `Token ${localStorage.getItem('token')}`;

        let url = `https://thedung.pythonanywhere.com/api/location/data`;
        fetch(
            url,
            {
                method: "GET",
                headers: {
                    "Authorization" : token
                }
            }
        )
            .then(
                (response) => {
                    return response.json()
                }
            )
            .then(
                (
                    json => {
                        this.setState({
                            locationData: json
                        });

                        this.setState({
                            city: {
                                name: json.cities[0].name,
                                code: json.cities[0].code
                            },
                            district: {
                                name: json.cities[0].districts[0].name,
                                code: json.cities[0].districts[0].code
                            },
                            ward: {
                                name: json.cities[0].districts[0].wards[0].name,
                                code: json.cities[0].districts[0].wards[0].code
                            }
                        });

                        this.setState({
                            city_items: this.filterBundle("cities"),
                            district_items: this.filterBundle("districts"),
                            ward_items: this.filterBundle("wards")
                        });
                    }
                )
            );
    }

    renderOption(bundle) {
        const data = bundle;
        let res = [];
        data.forEach(
            (item) => {
                res.push(
                    <option value={`${item.code}`}>{item.name}</option>
                )
            }
        );
        return res;
    }

    handleChangeStreetNr = (e) => {
        this.setState({ streetNr: e.target.value });
    }

    handleChangeCity = (e) => {
        console.log(e.target.value);
        // hien tai chi co 1 thanh pho nen ko can cap nhat cai nay
        // alert('city');
    }

    handleChangeDistrict = (e) => {
        console.log(e.target.value);

        const chosenDistrict = e.target.value;
        const data = this.state.locationData;

        var d = data.cities.find(
            (item) => {
                return item.code == this.state.city.code
            }
        );
        var dd = d.districts.find(
            (item) => {
                return item.code == chosenDistrict;
            }
        );

        this.setState({
            district: {
                name: dd.name,
                code: dd.code
            }
        });

        this.setState({
            ward_items: dd.wards
        })
        this.setState({
            ward: {
                name: dd.wards[0].name,
                code: dd.wards[0].code
            }
        })
    }

    handleChangeWard = (e) => {
        console.log(e.target.value);

        const chosenWard = e.target.value;
        const data = this.state.locationData;

        var d = data.cities.find(
            (item) => {
                return item.code == this.state.city.code;
            }
        );
        var dd = d.districts.find(
            (item) => {
                return item.code == this.state.district.code;
            }
        );

        var ddd = dd.wards.find(
            (item) => {
                return item.code == chosenWard;
            }
        )

        this.setState({
            ward: {
                name: ddd.name,
                code: ddd.code
            }
        })
    }


    renderHandwriteLocation() {

        return (
            <form>
                <FormGroup controlId="formControlsSelect">

                    <SelectionControl
                        propName={"Thành phố"}
                        handleChange={this.handleChangeCity}
                        items={this.state.city_items}
                    />

                    <SelectionControl
                        propName={"Quận"}
                        handleChange={this.handleChangeDistrict}
                        items={this.state.district_items}
                    />

                    <SelectionControl
                        propName={"Phường"}
                        handleChange={this.handleChangeWard}
                        items={this.state.ward_items}
                    />

                    <ControlLabel>Số nhà và tên đường</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.streetNr}
                        placeholder="Chi tiết..."
                        onChange={this.handleChangeStreetNr}
                    />

                </FormGroup>
            </form>
        )
    }

    handleSubmit = (e) => {
        e.preventDefault();

        Geocode.setApiKey("AIzaSyAQDOsz5Zdwks9zGw9lfDfW4LiNaP_tIV0");

        var self = this;
        switch (this.state.activeTab) {
            case 1: {
                console.log(`${this.state.streetNr}, ${this.state.ward.name}, ${this.state.district.name}, ${this.state.city.name}`);

                Geocode.fromAddress(`${this.state.streetNr}, ${this.state.ward.name}, ${this.state.district.name}, ${this.state.city.name}`)
                    .then(
                        response => {
                            const { lat, lng } = response.results[0].geometry.location;
                            console.log(lat, lng);

                            self.setState({
                                important: {
                                    location_code: `VN${this.state.city.code}${this.state.district.code}${this.state.ward.code}`,
                                    detail: `${this.state.streetNr}`,
                                    type: 2,
                                    lat: lat,
                                    lng: lng
                                },
                                address: {
                                    toString: `${this.state.streetNr}, ${this.state.ward.name}, ${this.state.district.name}, ${this.state.city.name}`
                                }
                            })

                        },
                        error => {
                            alert(error);
                            console.error(error);
                        }
                    );
                break;
            }
            case 2: {
                alert('2');
                break;
            }
            case 3: {
                alert('3');
                break;
            }
            default:
                break;
        }
        this.handleClose();
    }

    handleTabChange(key) {
        // alert(`selected ${key}`);

        switch (key) {
            case 2: {
                this.convertLatLng(this.props.coords.latitude, this.props.coords.longitude);
                break;
            }
        }

        this.setState({ activeTab: key });
    }

    test() {
        return (
            <div>
                <p>City: {`${this.state.city.code}:${this.state.city.name}`}</p>
                <p>District: {`${this.state.district.code}:${this.state.district.name}`}</p>
                <p>Ward: {`${this.state.ward.code}:${this.state.ward.name}`}</p>
                <p>Detail: {`${this.state.streetNr}`}</p>
            </div>
        )
    }

    test2() {
        return(
            <div>
                <pre>
                    <p>{this.state.address.toString}</p>
                    {/*<p>{this.state.important.location_code}</p>*/}
                    {/*<p>{this.state.important.detail}</p>*/}
                    {/*<p>{this.state.important.type}</p>*/}
                    {/*<p>{this.state.important.lat}</p>*/}
                    {/*<p>{this.state.important.lng}</p>*/}
                </pre>
            </div>
        )
    }

    convertLatLng(lat, lng) {
        Geocode.setApiKey("AIzaSyAQDOsz5Zdwks9zGw9lfDfW4LiNaP_tIV0");

        var self = this;

        Geocode.fromLatLng(`${lat}`, `${lng}`)
            .then(
                response => {
                    const address = response.results[0].formatted_address;
                    const locationData = this.state.locationData;

                    var parts = address.split(', ');
                    if (parts.length == 5) {
                        let locationCode = "";

                        var country = parts[4];
                        var city = parts[3];
                        var district = parts[2];
                        var ward = parts[1];
                        var detail = parts[0];

                        if (country == 'Việt Nam' || country == 'Vietnam') {
                            locationCode += "VN";
                            if (city == "Hồ Chí Minh") {
                                locationCode += "01";

                                const districts = locationData.cities[0].districts;

                                const d = districts.find(
                                    (item) => {
                                        return item.name == district
                                    }
                                );

                                if (d) {
                                    locationCode += d.code;
                                    const dd = d.wards.find(
                                        (item) => {
                                            return item.name == ward
                                        }
                                    )
                                    if (dd) {
                                        locationCode += dd.code;
                                        self.setState({
                                            important: {
                                                location_code: locationCode,
                                                detail: detail,
                                                type: 2,
                                                lat: lat,
                                                lng: lng
                                            },
                                            address: {
                                                important: {
                                                    location_code: locationCode,
                                                    detail: detail,
                                                    type: 2,
                                                    lat: lat,
                                                    lng: lng
                                                },
                                                toString: `${address}`
                                            }
                                        });
                                    } else {
                                        alert('Chúng tôi hiện chưa hỗ trợ địa điểm này! Mong bạn thông cảm!');
                                        return;
                                    }
                                } else {
                                    alert('Chúng tôi hiện chưa hỗ trợ địa điểm này! Mong bạn thông cảm!');
                                    return;
                                }

                            } else {
                                alert('Chúng tôi hiện chưa hỗ trợ địa điểm này! Mong bạn thông cảm!');
                                return;
                            }
                        }
                    } else {
                        alert('Chúng tôi hiện chưa hỗ trợ địa điểm này! Mong bạn thông cảm!');
                        return;
                    }

                    self.setState({
                        address: {
                            toString: address
                        }
                    });
                    console.log(address);
                },
                error => {
                    alert(error);
                    console.error(error);
                }
            );
    }

    renderGetCurrentLocation() {



        return (
            !this.props.isGeolocationAvailable ?
                <div>Your browser does not support Geolocation</div>
                :
                !this.props.isGeolocationEnabled ?
                    <div>Geolocation is not enabled</div>
                    :
                    this.props.coords ?
                        <table>
                            <tbody>
                            <tr><td>Vĩ độ</td><td>{this.props.coords.latitude}</td></tr>
                            <tr><td>Kinh độ</td><td>{this.props.coords.longitude}</td></tr>
                            </tbody>
                        </table>
                        :
                        <div>Getting the location data&hellip; </div>
        )
    }

    handleConfirm() {

        const coor = this.child.child.state.center;

        this.setState({
            pickedCoor: coor
        });

        const self = this;

        Geocode.setApiKey("AIzaSyAQDOsz5Zdwks9zGw9lfDfW4LiNaP_tIV0");

        Geocode.fromLatLng(coor.lat, coor.lng)
            .then(
                response => {
                    const address = response.results[0].formatted_address;
                    const locationData = this.state.locationData;

                    var parts = address.split(', ');

                    if (parts.length == 5) {
                        let locationCode = "";

                        var country = parts[4];
                        var city = parts[3];
                        var district = parts[2];
                        var ward = parts[1];
                        var detail = parts[0];

                        if (country === 'Việt Nam' || country === 'Vietnam') {
                            locationCode += "VN";
                            if (city === "Hồ Chí Minh") {
                                locationCode += "01";

                                const districts = locationData.cities[0].districts;

                                const d = districts.find(
                                    (item) => {
                                        return item.name == district
                                    }
                                );

                                if (d) {
                                    locationCode += d.code;
                                    const dd = d.wards.find(
                                        (item) => {
                                            // TODO:
                                            return item.name == ward || item.name == ward.substring(7)
                                        }
                                    )
                                    if (dd) {
                                        locationCode += dd.code;
                                        self.setState({
                                            important: {
                                                location_code: locationCode,
                                                detail: detail,
                                                type: 2,
                                                lat: coor.lat,
                                                lng: coor.lng
                                            },
                                            address: {
                                                important: {
                                                    location_code: locationCode,
                                                    detail: detail,
                                                    type: 2,
                                                    lat: coor.lat,
                                                    lng: coor.lng
                                                },
                                                toString: `${address}`
                                            }
                                        });
                                    } else {
                                        alert('Chúng tôi hiện chưa hỗ trợ địa điểm này! Mong bạn thông cảm!');
                                        return;
                                    }
                                }  else {
                                    alert('Chúng tôi hiện chưa hỗ trợ địa điểm này! Mong bạn thông cảm!');
                                    return;
                                }
                            } else {
                                alert('Chúng tôi hiện chưa hỗ trợ địa điểm này! Mong bạn thông cảm!');
                                return;
                            }
                        } else {
                            alert('Chúng tôi hiện chưa hỗ trợ địa điểm này! Mong bạn thông cảm!');
                            return;
                        }
                    }  else {
                        alert('Chúng tôi hiện chưa hỗ trợ địa điểm này! Mong bạn thông cảm!');
                        return;
                    }

                    self.setState({
                        address: {
                            toString: address
                        }
                    });
                    console.log(address);
                },
                error => {
                    alert(error);
                    console.error(error);
                }
            );
    }

    renderPickOnMap() {

        const styles = {
            backend: {
                position: 'relative'
                // top: '0',
                // left: '0',
                // width: '100%',
                // height: '100%'
            },
            frontend: {
                position: 'absolute',
                top: '40%',
                left: '47%'
            },
            centerButton: {
                float: 'right'
            }
        };

        return(
            <div>
                <div style={styles.backend}>
                    <MyFancyComponent
                        // height={`400px`}
                        style={styles.backend}
                        showMarker={false}

                        routeFinding={false}

                        // userAddress={'Dong Hoi, Quang Binh'}
                        onRef={ref => this.child = ref}
                    />
                    <div
                        style={styles.frontend}
                    >
                        <Image src={require('../images/marker_blue.png')} width='40px' height='40px'/>
                    </div>
                </div>
                <div>
                    <Button style={styles.centerButton} onClick={this.handleConfirm}>Ok</Button>
                </div>
            </div>
        )
    }

    renderCustomLocationModal() {
        return (
            <Modal show={this.state.customLocationShow} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm địa điểm thủ công</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tabs
                        defaultActiveKey={1}
                        animation={true}
                        activeKey={this.state.activeTab}
                        onSelect={this.handleTabChange}
                    >
                        <Tab eventKey={1} title="Nhập địa chỉ theo tên đường phố">
                            <h4>Nhập địa chỉ theo tên đường phố</h4>
                            {this.state && this.state.locationData && this.state.city && this.state.district && this.state.ward && this.renderHandwriteLocation()}
                            {/* <hr />
                            {this.state && this.state.locationData && this.state.city && this.state.district && this.state.ward && this.test()}
                            {this.state && this.state.important && this.test2()} */}
                        </Tab>
                        <Tab eventKey={2} title="Lấy vị trí hiện tại">
                            <h4>Vị trí hiện tại</h4>
                            {this.renderGetCurrentLocation()}
                            <hr />
                            {this.state && this.state.important && this.test2()}
                        </Tab>
                        <Tab eventKey={3} title="Chọn trên bản đồ">
                            {this.renderPickOnMap()}
                            <hr />
                            {this.state && this.state.important && this.test2()}
                        </Tab>
                    </Tabs>
                </Modal.Body>
                <Modal.Footer>
                    <div style={{float: 'left'}}>
                        <FormGroup>
                            <Checkbox inline>Chỉnh làm địa chỉ mặc định</Checkbox>
                        </FormGroup>
                    </div>
                    <Button bsStyle="success" onClick={this.handleSubmit}>Submit</Button>
                    <Button onClick={this.handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }

    render() {
        return(
            <div>



                <NavigationM/>

                <Grid>
                    {this.state && this.state.transactionData &&
                        [
                            <TransactionInfo
                                info={this.state.transactionData}
                            />,

                            this.renderAction()
                        ]
                    }

                    

                    {/*<Row>*/}
                        {/*<Col md={2}>*/}
                            {/*???*/}
                        {/*</Col>*/}

                        {/*<Col md={8}>*/}
                            {/*{this.state && this.state.transactionData &&*/}
                            {/*this.renderBookInfo()*/}
                            {/*}*/}
                            {/*<hr/>*/}
                            {/*{this.state && this.state.transactionData &&*/}
                            {/*this.renderAction()*/}
                            {/*}*/}
                        {/*</Col>*/}
                        {/*<Col md={2}>*/}
                            {/*<h1>Weeee</h1>*/}
                        {/*</Col>*/}
                    {/*</Row>*/}
                </Grid>
            </div>
        )
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////

const TransactionInfo = (props) => {

    // TODO: check dang nhap
    const currentEmail = localStorage.getItem('uid');

    const styles = {
        infoContainer: {
            padding: '0px 0px',
            backgroundColor: '#9b859b'
        }
    };

    function statusToString(code, isOwner) {
        switch (code) {
            case '5':
                return 'Giao dich bi huy';
            case '3':
                return isOwner ? 'Co nguoi gui request' : 'Cho doi hoi am';

            case '4':
                return isOwner ? 'REply dia chi' : 'Waiting';

            case '15':
                return isOwner ? 'O15' : 'R15';

            case '6':
                return isOwner ? 'O6' : 'R6';

            case '8':
                return isOwner ? 'O8' : 'R8';

            case '11':
                return isOwner ? 'O11' : 'R11';

            case '12':
                return isOwner ? 'O12' : 'R12';

            case '16':
                return isOwner ? 'O116' : 'R16';

            case '14':
                return isOwner ? 'O14' : 'R14';

        }
    }

    return (
        [
            <Row style={{marginTop: '15px'}}>
                <Col md={12} style={styles.infoContainer}>
                    <Col md={5} style={{margin: 'auto'}}>
                        <div style={{display: 'flex'}}>
                            <Image src={props.info.book_image} thumbnail style={{margin: 'auto'}}/>
                        </div>
                    </Col>
                    <Col md={7}>
                        <Row>
                            <h4><strong>{props.info.book_name}</strong></h4>
                        </Row>
    
                        <Row>
                            <h4>Chủ sở hữu: {props.info.owner_name}</h4>
                        </Row>
    
                        <Row>
                            <h4>Người mượn: {props.info.requester_name}</h4>
                        </Row>
    
                        <Row>
                            <h4>Trạng thái sách: {statusToString(props.info.status.toString(), currentEmail === props.owner_email)}</h4>
                        </Row>
                    </Col>
                </Col>
            </Row>,
            <Row>
                <Box label="." padding="10px 30px">
                    <Text><h4>
                        {props.info.last_message == null || props.info.last_message === "" ?
                            "Không có tin nhắn nào được gửi đi trong lần trả lời gần nhất"
                            :
                            `Lời nhắn mới nhất: ${props.info.last_message}`
                        }
                    </h4></Text>
                </Box>
            </Row>
        ]
    )
};
/////////////////////////////////////////////////////////////////////////////////////////////////

export default
geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})
(VerrattiC);