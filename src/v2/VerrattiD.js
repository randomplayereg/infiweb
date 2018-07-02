import React from 'react';
import NavigationM from "./NavigationM";

import {Grid, Row, Col, Modal, Image, Button, FormGroup, FormControl, ControlLabel, Dropdown, Glyphicon,
    MenuItem, Well} from 'react-bootstrap';

import { ProgressCircle } from 'react-desktop/windows';

import { Box, Text } from 'react-desktop/macOs';

import './VerrattiW.css';

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

const OrangeButton = (props) => {
    return (
        <Button
            bsStyle="danger"
            onClick={props.viewDirection}
        >
            Xem trên bản đồ
        </Button>
    )
};

const GreenButton = (props) => {
    return (
        <Button
            bsStyle="success"
            onClick={()=>props.acceptRequest(props.toCode)}
        >
            Đồng ý
        </Button>
    )
};

const BlueButton = (props) => {
    return(
        <Button
            bsStyle="primary"
            onClick={()=>props.declineRequest(props.toCode)}
        >
            Từ chối
        </Button>
    )
};

const MessageBox = (props) => {
    return (
        <Row>
            <FormGroup>
                <ControlLabel>Lời nhắn: </ControlLabel>
                <FormControl
                    componentClass="textarea"
                    placeholder="Viết một tin nhắn"
                    onChange={props.onMessageChange}
                />
            </FormGroup>
        </Row>
    )
};

const LocationPicker = (props) => {
    return(
        <Row>
            <Col md={2}>
                <Dropdown id="dropdown-custom-1">
                    <Dropdown.Toggle>
                        <Glyphicon glyph="plus-sign" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="super-colors">

                        <MenuItem eventKey="1">
                            profile
                        </MenuItem>

                        <MenuItem eventKey="2">
                            device
                        </MenuItem>

                        <MenuItem eventKey="3">
                            thu cong
                        </MenuItem>

                    </Dropdown.Menu>
                </Dropdown>
            </Col>
            <Col md={10}>
                <Well bsSize="small">
                    {props.addressToShow}
                </Well>
            </Col>
        </Row>
    )
};

const Weapons = (props) => {

    return(
        <Row>
            <div style={{float: 'right'}}>
                {this.props.V &&
                <OrangeButton
                    viewDirection={props.viewDirection}
                />
                }
                 {this.props.A &&
                 <GreenButton
                     acceptRequest={props.acceptRequest}
                     toCode={props.toCode}
                 />
                 }
                {this.props.D &&
                <BlueButton
                    declineRequest={props.declineRequest}
                    toCode={props.toCode}
                />
                }
            </div>
        </Row>
    )
};

// I GAVE UP, AAAAAAAAAAANT

const R3_Buttons = (props) => {
    return (
        <Row>
            <div style={{float: 'right'}}>
                <BlueButton
                    declineRequest={props.declineRequest}
                    toCode={props.toCode}
                />
            </div>
        </Row>
    )
}

// actually, i need to graduate so... :(

const ProgressCyka = (props) => {
    return (
        <Modal show={props.proShow} onHide={props.hideProgress} backdrop={"static"}>
            <Modal.Body>
                <ProgressCircle
                    color={'#9b859b'}
                    size={100}
                    hidden={!props.proShow}
                    style={{
                        margin: 'auto'
                    }}
                />
            </Modal.Body>
        </Modal>

    )
};

function statusToString(code, isOwner) {
    switch (code) {
        case '3':
            return isOwner ? 'Co nguoi gui request' : 'Cho doi hoi am';
            break;
        case '4':
            return isOwner ? 'REply dia chi' : 'Waiting';
            break;
        case '15':
            return isOwner ? 'O15' : 'R15';
            break;
        case '6':
            return isOwner ? 'O6' : 'R6';
            break;
        case '8':
            return isOwner ? 'O8' : 'R8';
            break;
        case '11':
            return isOwner ? 'O11' : 'R11';
            break;
        case '12':
            return isOwner ? 'O12' : 'R12';
            break;
        case '16':
            return isOwner ? 'O116' : 'R16';
            break;
        case '14':
            return isOwner ? 'O14' : 'R14';
            break;
    }
}

const TransactionInfo = (props) => {

    // TODO: check dang nhap
    const currentEmail = localStorage.getItem('uid');

    const styles = {
        infoContainer: {
            padding: '0px 0px',
            backgroundColor: '#9b859b'
        }
    };

    return (
        <Row style={{marginTop: '15px'}}>
            <Col md={12} style={styles.infoContainer}>
                <Col md={5} style={{margin: 'auto'}}>
                    <Image src={props.info.book_image} thumbnail/>
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
        </Row>
    )
};

class VerrattiD extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            proShow: false
        };

        this.onMessageChange = this.onMessageChange.bind(this);

        this.showProgress = this.showProgress.bind(this);
        this.hideProgress = this.hideProgress.bind(this);
        this.annoyingFucker = this.annoyingFucker.bind(this);

        this.fetchTransaction = this.fetchTransaction.bind(this);

        this.viewDirection = this.viewDirection.bind(this);
        this.acceptRequest = this.acceptRequest.bind(this);
        this.declineRequest = this.declineRequest.bind(this);
    }

    componentDidMount() {
        this.showProgress();
        this.fetchTransaction();
        this.annoyingFucker(900);
    }

    onMessageChange(e){
        console.log(e.target.value);
        this.setState({
            message: e.target.value
        })
    }

    showProgress(){
        this.setState({ proShow: true });
    }

    annoyingFucker(sec) {
        setTimeout(() => {
            this.hideProgress();
        }, sec);
    }

    hideProgress(){
        this.setState({ proShow: false });
    }

    fetchTransaction() {
        let currentEmail = localStorage.getItem('uid');

        if (typeof(currentEmail)==="undefined") {
            alert('no login');
        }

        let url = `https://thedung.pythonanywhere.com/api/transaction/${this.props.id}`;

        let token = `Token ${localStorage.getItem('token')}`;

        fetch(
            url,
            {
                method: 'GET',
                headers: {
                    'Authorization' : token
                }
            }
        )
            .then(
                response => response.json(),
                error => {
                    alert(error);
                    this.handleClose();
                }
            )
            .then(
                json => {
                    console.log(json);
                    this.setState({
                        thiccAss: json
                    });
                }
            );
    }

    viewDirection() {
        alert('xem duong di');
    }

    acceptRequest(toCode) {
        alert('accept' + toCode);
    }

    declineRequest(toCode) {
        alert('decline' + toCode);
    }

    render() {
        return(
            <div>
                <ProgressCyka
                    proShow={this.state.proShow}
                    hideProgress={this.hideProgress}
                />

                <NavigationM/>

                <Grid>
                    {this.state && this.state.thiccAss &&
                        <TransactionInfo
                            info={this.state.thiccAss}
                        />
                    }
                    {/*TODO: tin nhan*/}
                    {this.state && this.state.thiccAss &&
                    <Row>
                        <Box label="." padding="10px 30px">
                            <Text><h4>
                                {this.state.thiccAss.last_message == null || this.state.thiccAss.last_message === "" ?
                                    "Không có tin nhắn nào được gửi đi trong lần trả lời gần nhất"
                                    :
                                    this.state.thiccAss.last_message
                                }
                            </h4></Text>
                        </Box>
                    </Row>
                    }
                </Grid>
            </div>
        )
    }
}

export default VerrattiD;