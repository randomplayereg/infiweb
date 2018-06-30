import React from 'react';

import {Grid, Row, Col, Modal, Tab, Tabs, Image, Label, Well, Badge, ButtonGroup, Button, Panel, FormGroup, 
    FormControl, ControlLabel, Alert, Glyphicon, ButtonToolbar, Dropdown, MenuItem, Checkbox} from 'react-bootstrap';

import Geocode from "./Utils/Geocode";

import {geolocated} from 'react-geolocated';

import MyFancyComponent from './MyFancyComponent';

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

class TransactionDetail extends React.Component {

    constructor(props, context) {
        super(props, context);

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
            directionShow: false
        };

        this.pickProfileLocation = this.pickProfileLocation.bind(this);
        this.pickDeviceLocation = this.pickDeviceLocation.bind(this);
        this.customizeDeviceLocation = this.customizeDeviceLocation.bind(this);

        this.fetchLocationCodeData = this.fetchLocationCodeData.bind(this);
        this.fetchTransaction = this.fetchTransaction.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTabChange = this.handleTabChange.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);

        this.convertLatLng = this.convertLatLng.bind(this);

        this.O3_acceptRequest = this.O3_acceptRequest.bind(this);

        this.R4_acceptRequest = this.R4_acceptRequest.bind(this);

        this.fetchTransaction();        
        this.fetchLocationCodeData();        
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
        debugger
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
            <div>
                <h1>Dang cho hoi am</h1>
                <Button bsStyle="danger" onClick={cancelRequest}>
                    Cancel
                </Button>
            </div>
        )
    }

    R4_acceptRequest() {

        const currentEmail = localStorage.getItem('uid');

        if ((typeof(currentEmail) == undefined) || (currentEmail == "")) {
            alert('No login');
        };

        const data = this.state.transactionData;

        const token = `Token ${localStorage.getItem('token')}`;

        const body = prepareData(
            {
                'id': data.id,
                'code': 15,
                'last_message': 'status 15 => accepted'
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

    renderR4() {

        const data = this.state.transactionData;
        const ownerLocation = data.location;
        

        return(
            <div>
                <h1>Nguoi muon gui dia chi nhan sach</h1>
                <h2>Tin nhan Element</h2>

                <h2>Chon dia chi xuat phat cua ban: </h2>
                <ButtonGroup>
                    <Button onClick={this.pickProfileLocation}> Su dung dia chi profile</Button>
                    <Button onClick={this.pickDeviceLocation}> Su dung dia chi may</Button>
                    <Button onClick={this.customizeDeviceLocation}> Su dung dia chi may (thay doi)</Button>
                </ButtonGroup>

                <h2>Dia chi xuat phat: {this.state && this.state.address && this.state.address.toString} </h2>                
                <h2>Dia chi lay sach: {`${ownerLocation.detail}, ${ownerLocation.ward}, ${ownerLocation.district}, ${ownerLocation.city}`}</h2>


                <Button bsStyle="info" onClick={this.handleShowDirection}>
                    Show direction
                </Button>



                <Button bsStyle="success" onClick={this.R4_acceptRequest}>
                    Accept
                </Button>
                <Button bsStyle="danger">
                    Decline
                </Button>

                {this.state && this.state.important &&
                    <Modal show={this.state.directionShow} onHide={this.handleCloseDirection}>

                        <Modal.Header closeButton>
                            <Modal.Title>Xem quang duong di</Modal.Title>
                        </Modal.Header>                    
                        <Modal.Body>
                            <MyFancyComponent
                                showMarker={false}

                                routeFinding={true}

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

                {this.renderCustomLocationModal()}
            </div>
        )
    }

    renderR15() {
        return(
            <div>
                <h1>Doi nguoi cho muon chuyen trang thai sach thanh sang sang</h1>
            </div>
        )
    }

    renderR6() {
        return(
            <div>
                <h1>Toi da lay cuon sach chua nhi?</h1>
                <Button bsStyle="success">
                    I took the book!
                </Button>
            </div>
        )
    }

    renderR8() {
        return(
            <div>
                <h1>Sach hay vleu, ay dm quen tra</h1>
                <Button bsStyle="info">
                    I want to return the book
                </Button>
            </div>
        )
    }

    renderR11(){
        return(
            <div>
                <h1>Cho y kien chu sach, xem dc quyen tra sach ko</h1>                
            </div>
        )
    }

    renderR12() {
        return(            
            <div>
                <h1>Hmmm, de coi co tra vo dia chi no dc ko, hmmmmm......</h1>
                <h2>Chac la ok, a ma khoan, deo biet nua, cu nhan cho no cai tin nhan phat</h2>
                <Button bsStyle="success">
                    Accept
                </Button>
                <Button bsStyle="danger">
                    Decline
                </Button>
            </div>
        )
    }

    renderR16() {
        return(
            <div>
                <h1>Dong y voi dia diem chu sach dua ra, dang cho chu sach xac nhan da lya sach chua</h1>
            </div>
        )
    }

    renderR14() {
        return(            
            <div>
                <h1>Hoat dong trao doi ket thuc tot dep!</h1>
            </div>
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
        
        let url = `https://thedung.pythonanywhere.com/api/location/user/${currentEmail}/2`;
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
        const currentEmail = localStorage.getItem('uid');

        if ((typeof(currentEmail) == undefined) || (currentEmail == "")) {
            alert('No login');
        };

        const data = this.state.transactionData;

        const body = prepareData(
            {
                'id': data.id,
                'code': 4,
                'location_code': this.state.important.location_code,
                'detail': this.state.important.detail,
                'type': this.state.important.type,
                'lat': this.state.important.lat,
                'lng': this.state.important.lng,
                // TODO:
                'last_message': 'coming soon'
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

    renderO3() {
        const data = this.state.transactionData;

        function declineRequest() {
            let url = `https://thedung.pythonanywhere.com/api/transaction/reply-request`;

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

        return(
            <div>
                {this.renderCustomLocationModal()}
                <h1>Ai request day nhi, de xem xet... De gui no cai dia chi lun xD</h1>
                <h2>Pick dia chi</h2>
                <ButtonGroup>
                    <Button onClick={this.pickProfileLocation}> Su dung dia chi profile</Button>
                    <Button onClick={this.pickDeviceLocation}> Su dung dia chi may</Button>
                    <Button onClick={this.customizeDeviceLocation}> Su dung dia chi may (thay doi)</Button>
                </ButtonGroup>
                <h2>
                    Dia chi de xuat: {this.state && this.state.address && this.state.address.toString} 
                </h2>
                <h2>Tin nhan Element</h2>
                <Button bsStyle="success" onClick={this.O3_acceptRequest}>
                    Accept
                </Button>
                <Button bsStyle="danger" onClick={declineRequest}>
                    Decline
                </Button>
            </div>
        )
    }

    renderO4() {
        return(
            <div>
                <h1>Cho nguoi muon sach hoi am voi dia chi ma toi da gui</h1>
            </div>
        )
    }

    renderO15() {
        return(
            <div>
                <h1>Nguoi muon dong y dia diem, chuyen sach sang trang thai san sang</h1>
                <Button bsStyle="success">
                    Ready
                </Button>

            </div>
        )
    }

    renderO6() {
        return(
            <div>
                <h1>Sau khi san sang, co the doi lai khong san sang</h1>
                <Button bsStyle="danger">
                    Not ready
                </Button>
            </div>
        )
    }

    renderO8() {
        return(
            <div>
                <h1>Ok, gio sach no cam roi, dm co bi scam ko ta??? :thinking:</h1>                
            </div>
        )
    }

    renderO11() {
        return(
            <div>
                <h1>Mun tra sach roi a? De coi...</h1>
                <h2>Nhan tin cho no coi</h2>
                <h2>Cho m them cai dia chi ne`</h2>
                <Button bsStyle="success">
                    Accept
                </Button>
                <Button bsStyle="danger">
                    Decline
                </Button>
            </div>
        )
    }

    renderO12() {
        return(
            <div>
                <h1>Cho xem ng muon co dong y voi dia diem tra sach ko?</h1>
            </div>
        )
    }    

    renderO16() {
        return(
            <div>
                <h1>No tra sach cho minh chua nhi??? D:</h1>
                <Button bsStyle="success">
                    I got the book back!
                </Button>
            </div>
        )
    }

    renderO14() {
        return(
            <div>
                <h1>Cuoc trao doi da ket thuc tot dep</h1>
            </div>
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
                res = (data.requester_email == currentEmail) ? this.renderR3() : this.renderO3(this);
                break;
            case 4:
                res = (data.requester_email == currentEmail) ? this.renderR4() : this.renderO4();
                break;
            case 15:
                res = (data.requester_email == currentEmail) ? this.renderR15() : this.render15();
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
            [
                <Row>
                    <Well>{data.last_message == null ? "Nothing here" : data.last_message}</Well>
                </Row>
                ,
                <Row>
                    {res}
                    {/* {this.renderActionReplyOne()} */}
                </Row>           
            ]
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
                        propName={"City"}
                        handleChange={this.handleChangeCity}
                        items={this.state.city_items}
                        />
                    
                    <SelectionControl
                        propName={"District"}
                        handleChange={this.handleChangeDistrict}
                        items={this.state.district_items}
                        />

                    <SelectionControl
                        propName={"Ward"}
                        handleChange={this.handleChangeWard}
                        items={this.state.ward_items}
                        />

                    <ControlLabel>So nha va ten duong</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.streetNr}
                        placeholder="So nha va ten duong..."
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
                                type: 3,
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
        alert(`selected ${key}`);

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
                    <p>{this.state.important.location_code}</p>
                    <p>{this.state.important.detail}</p>
                    <p>{this.state.important.type}</p>
                    <p>{this.state.important.lat}</p>
                    <p>{this.state.important.lng}</p>
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
                                                type: 3,
                                                lat: lat,
                                                lng: lng
                                            }
                                        });
                                    }
                                }

                            }
                        }                                                
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
                        <tr><td>latitude</td><td>{this.props.coords.latitude}</td></tr>
                        <tr><td>longitude</td><td>{this.props.coords.longitude}</td></tr>
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
                                                type: 3,
                                                lat: coor.lat,
                                                lng: coor.lng
                                            }
                                        });
                                    }
                                }

                            }
                        }                                                
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
                position: 'relative',
                top: '50%',
                left: '50%'
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
                    <Button style={styles.centerButton} onClick={this.handleConfirm}> Xac nhan </Button>
                </div>
            </div>
        )
    }

    renderCustomLocationModal() {
        return (
            <Modal show={this.state.customLocationShow} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Tuy chinh vi tri di dong</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tabs 
                        defaultActiveKey={1} 
                        animation={true}
                        activeKey={this.state.activeTab}
                        onSelect={this.handleTabChange}
                        >
                        <Tab eventKey={1} title="Nhap dia chi">
                            <h4>Nhap dia chi detail roi chon quan, thanh pho</h4>        
                            {this.state && this.state.locationData && this.state.city && this.state.district && this.state.ward && this.renderHandwriteLocation()}
                            {/* <hr />
                            {this.state && this.state.locationData && this.state.city && this.state.district && this.state.ward && this.test()}
                            {this.state && this.state.important && this.test2()} */}
                        </Tab>
                        <Tab eventKey={2} title="Lay vi tri hien tai">
                            <h4>Lay vi tri hien tai</h4>
                            {this.renderGetCurrentLocation()}
                            <hr />
                            {this.state && this.state.important && this.test2()}
                        </Tab>
                        <Tab eventKey={3} title="Chon tren ban do">
                            {this.renderPickOnMap()}
                            <hr />
                            {this.state && this.state.important && this.test2()}
                        </Tab>
                    </Tabs>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="success" onClick={this.handleSubmit}>Submit</Button>                    
                    <Button onClick={this.handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
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

export default 
    geolocated({
        positionOptions: {
            enableHighAccuracy: false,
        },
        userDecisionTimeout: 5000,
    })
(TransactionDetail);