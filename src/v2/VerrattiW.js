import React from 'react';
import NavigationM from "./NavigationM";

import {Grid, Row, Col, Modal, Image, Button, Panel} from 'react-bootstrap';

import { ProgressCircle } from 'react-desktop/windows';

import './VerrattiW.css';

import {Sidebar} from 'primereact/components/sidebar/Sidebar';
import MyFancyComponent from '../components/MyFancyComponent';

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

function convertTime(raw) {
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    // parseFloat(raw);
    var date = new Date(raw*1000);

    date.setDate(date.getDate() - 1);
// Hours part from the timestamp
    var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
// Minutes part from the timestamp
    var month = date.getMonth() + 1;
    month = month < 10 ? "0" + month : month;
// Seconds part from the timestamp
    var year = date.getFullYear();

// Will display time in 10:30:23 format
    var formattedTime = year + '-' + month + '-' + day;
    return formattedTime;
}

const DirectionPop = (props) => {

    const styles = {
        container: {
            height: '430px'
        }
    };


    return (
        <Sidebar
            visible={props.mapVisible}
            position="bottom"
            className="ui-sidebar-md"
            style={styles.container}
            //TODO: hideMap
            onHide={props.hideMap}
        >
            <Grid fluid>
                <Row>
                    <Col md={6}>
                        <MyFancyComponent
                            userAddress={props.userAddress}


                            superLat={props.superLat}
                            superLng={props.superLng}

                            style={styles.backend}

                            showMarker={true}
                            routeFinding={false}

                            onRef={ref => this.child = ref}
                            // userAddress={'Dong Hoi, Quang Binh'}
                        />
                    </Col>
                    <Col md={6}>
                        <h1>{props.userAddress}</h1>
                    </Col>
                </Row>
            </Grid>
        </Sidebar>
    )
};

const OwnerList = (props) => {

    let stack = [];

    const styles = {
        nameContainer: {
            display: 'flex'
        },
        nameStyle: {
            marginTop: '14px',
            fontSize: '31px',
            fontWeight: 'bold'
        }
    };

    props.instances.forEach(
        (instance) => {

            let addr = `${instance.book.location.detail}, ${instance.book.location.ward}, ${instance.book.location.district}, ${instance.book.location.city}`;

            stack.push(
                <Panel>
                    <Panel.Heading>
                        {/*<Panel.Title componentClass="h3">Panel heading with a title</Panel.Title>*/}
                        <Grid fluid>
                            <Row>
                                <Col md={1}>
                                    <Image src={instance.user.avatar} style={{maxWidth: '60px', maxHeight: '60px'}} circle/>
                                </Col>
                                <Col md={8} style={styles.nameContainer}>
                                    <h4 style={styles.nameStyle}>{instance.user.real_name}</h4>
                                </Col>
                                <Col md={3}>
                                </Col>
                            </Row>
                        </Grid>
                    </Panel.Heading>
                    <Panel.Body>
                        <Grid fluid>
                            <Row md={2}/>

                            <Row md={8}>
                                <h4>Dia chi chu sach: {addr}</h4>
                                <h4>Su dung de: muon</h4>
                                <h4>Thoi gian cho muon: {parseInt(instance.book.duration) % 7 === 0 ? `${parseInt(instance.book.duration) / 7} tuan` : `${instance.book.duration} ngay` }</h4>
                                <h4>Co san: {instance.book.available === true ? `Co` : `Khong`}</h4>
                                <h4>Noi dung lien quan: </h4>
                                <h4>Cam nhan cua chu sach: {instance.book.review}</h4>
                            </Row>

                            <Row md={2}/>
                        </Grid>
                    </Panel.Body>
                    <Panel.Footer style={{minHeight: '60px'}}>
                        <Button
                            style={{float: 'right'}}
                            onClick={()=>props.sendRequest(instance.book.code)}
                        >
                            Muon
                        </Button>
                        <Button
                            style={{float: 'right'}}
                            onClick={()=>props.showDirection(addr, instance.book.location.lat, instance.book.location.lng)}
                        >
                            Xem tren ban do
                        </Button>
                    </Panel.Footer>
                </Panel>
            )
        }
    );

    return(
        <div id='ownerList'>
            {stack}
        </div>
    )
};

class VerrattiW extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            show: true,
            mapVisible: false,
            userAddress: 'Ho Chi Minh, Vietnam'
        };

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.annoyingFucker = this.annoyingFucker.bind(this);

        this.sendRequest = this.sendRequest.bind(this);
        this.showDirection = this.showDirection.bind(this);

        this.openMap = this.openMap.bind(this);
        this.hideMap = this.hideMap.bind(this);

        this.fetchOriginal = this.fetchOriginal.bind(this);
        this.fetchInstances = this.fetchInstances.bind(this);
        this.fetchOriginal();
        this.fetchInstances();
    }

    annoyingFucker(sec) {
        setTimeout(() => {
            this.handleClose();
        }, sec);
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    componentDidMount() {
        this.annoyingFucker(1800);
    }

    sendRequest(book_code) {

        this.handleShow();

        let currentEmail = localStorage.getItem('uid');

        if (typeof(currentEmail)==="undefined") {
            alert('no login');
        };

        let url = `https://thedung.pythonanywhere.com/api/transaction/request-book`;

        let token = `Token ${localStorage.getItem('token')}`;

        let body = prepareData(
            {
                code: book_code,
                email: currentEmail
            }
        );

        fetch(
            url,
            {
                method: 'PUT',
                headers: {
                    'Authorization' : token
                },
                body: body
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
                    window.location.href = `/v2/transaction/${json.id}`
                }
            );


        // alert('send request');
    }

    openMap() {
        this.setState({
            mapVisible: true
        })
    }

    hideMap() {
        this.setState({
            mapVisible: false
        })
    }

    showDirection(address, superLat, superLng) {
        // alert('show direction');

        this.setState({
            userAddress: address,
            superLat: superLat,
            superLng: superLng
        });

        setTimeout(() => {
            this.setState({
                mapVisible: true
            });
        }, 500);

    }

    fetchOriginal() {
        let url = `https://thedung.pythonanywhere.com/api/book/original/${this.props.code}`;
        // TODO: token
        let adminToken = `Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiYWRtaW4iLCJjcmVhdGVfdGltZSI6IjIwMTgtMDMtMDRUMDI6NTc6MjMuOTgxMjUzKzAwOjAwIiwiZW1haWwiOiJ0aGVkdW5nMjcwOUBnbWFpbC5jb20iLCJpZCI6MX0.dhZvtbK9YrUzdRObkurnRp89bCH7yy2L3sdaUbWQu0k`;

        fetch(
            url,
            {
                method: "GET",
                headers: {
                    "Authorization" : adminToken
                }
            }
        )
            .then((response) => response.json())
            .then((json => {
                console.log(json);
                this.setState({
                    original: json
                });

            }));
    }

    fetchInstances() {
        let url = `https://thedung.pythonanywhere.com/api/book/instance/${this.props.code}`;
        // TODO: token
        let adminToken = `Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiYWRtaW4iLCJjcmVhdGVfdGltZSI6IjIwMTgtMDMtMDRUMDI6NTc6MjMuOTgxMjUzKzAwOjAwIiwiZW1haWwiOiJ0aGVkdW5nMjcwOUBnbWFpbC5jb20iLCJpZCI6MX0.dhZvtbK9YrUzdRObkurnRp89bCH7yy2L3sdaUbWQu0k`;

        fetch(
            url,
            {
                method: "GET",
                headers: {
                    "Authorization" : adminToken
                }
            }
        )
            .then((response) => response.json())
            .then((json => {
                console.log(json);
                this.setState({
                    instances: json
                });
            }));
    }

    render() {

        const styles = {
            originalContainer: {
                padding: '0px 0px',
                backgroundColor: '#9b859b'
            },
            panenka: {
                marginTop: '20px',
                marginBottom: '0px',
                padding: '0px 5px'
            }
        };

        return(
            <div>
                <Modal show={this.state.show} onHide={this.handleClose} backdrop={"static"}
                       style={{marginTop: '400px'}}
                >
                    <Modal.Body>
                        <ProgressCircle
                            color={'#9b859b'}
                            size={100}
                            hidden={!this.state.show}
                            style={{
                                margin: 'auto'
                            }}
                        />
                    </Modal.Body>
                </Modal>

                <NavigationM />

                <Grid>
                    <Row style={styles.panenka}>
                        <Panel
                            // style={{marginBottom: '0px'}}
                        >
                            <Panel.Heading>Thông tin cuốn sách</Panel.Heading>
                        </Panel>
                    </Row>
                    {this.state && this.state.original &&
                    <Row style={{marginTop: '5px'}}>
                        <Col md={12} style={styles.originalContainer}>
                            <Col md={5} style={{margin: 'auto'}}>
                                <Image src={this.state.original.image} thumbnail/>
                            </Col>
                            <Col md={7}>
                                <Row>
                                    <h4><strong>{this.state.original.title}</strong></h4>
                                </Row>

                                <Row>
                                    <h4>Author: {this.state.original.author}</h4>
                                </Row>

                                <Row>
                                    <h4>Rating: {this.state.original.rating}</h4>
                                </Row>

                                <Row>
                                    <h4>Translator: {this.state.original.translator}</h4>
                                </Row>

                                <Row>
                                    <h4>Publisher: {this.state.original.publisher}</h4>
                                </Row>
                            </Col>
                        </Col>
                    </Row>
                    }
                    {this.state && this.state.original &&
                    <Row>
                        <Col md={12}>
                            <h5>{this.state.original.number_exchange} book(s) are available now</h5>
                            <Button
                                style={{
                                    margin: '8px 8px',
                                    borderRadius: '13%',
                                    border: 'solid 1px #9b859b',
                                    color: '#9b859b'
                                }}>
                                Add to my book
                            </Button>

                            <Button
                                style={{
                                    margin: '8px 8px',
                                    borderRadius: '13%',
                                    border: 'solid 1px #9b859b',
                                    color: '#9b859b'
                                }}
                                onClick={
                                    ()=>{
                                        document.getElementById('ownerList').scrollIntoView();
                                    }
                                }
                            >
                                Get this book
                            </Button>
                        </Col>
                    </Row>
                    }
                    {this.state && this.state.original &&
                    <Row>
                        <Col md={12}>
                            <Row style={{
                                marginLeft: '16px',
                                padding: '8px'
                            }}>
                                <u>Chi tiết:</u>
                                <h5>Size: {this.state.original.size_width} x {this.state.original.size_height}</h5>
                                <h5>Weight: {this.state.original.weight} g</h5>
                                <h5>Total page: {this.state.original.total_page}</h5>
                                {/*<h5>Ngày xuất bản: {this.state.original.publish_date}</h5>*/}
                                <h5>Ngày xuất bản: {convertTime(this.state.original.publish_date)}</h5>
                                <u>Tóm tắt:</u>
                                <h5>{this.state.original.summary}</h5>
                            </Row>
                        </Col>
                    </Row>
                    }

                    <Row style={styles.panenka}>
                        <Panel
                            // style={{marginBottom: '0px'}}
                        >
                            <Panel.Heading>Thông tin những người sở hữu</Panel.Heading>
                        </Panel>
                    </Row>
                    {this.state && this.state.instances &&
                        <OwnerList
                            instances={this.state.instances}
                            showDirection={this.showDirection}
                            sendRequest={this.sendRequest}
                            />
                    }
                    {this.state && this.state.userAddress && this.state.superLat && this.state.superLng &&
                        <DirectionPop
                            mapVisible={this.state.mapVisible}
                            hideMap={this.hideMap}
                            userAddress={this.state.userAddress}
                            superLat={this.state.superLat}
                            superLng={this.state.superLng}
                        />
                    }
                    {/*afiaoigjaeogrijaeogjeoirjaego;ri*/}

                </Grid>
            </div>
        )
    }
}

export default VerrattiW;