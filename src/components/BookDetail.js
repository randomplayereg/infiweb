import React from 'react';

import {Grid, Row, Col, Image, Label, Well, Badge, Button, Panel, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';

import {Sidebar} from 'primereact/components/sidebar/Sidebar';
import MyFancyComponent from './MyFancyComponent';

class Test extends React.Component {
    render() {

        const propsName = Object.keys(this.props.info);
        console.log(propsName);

        const styles = {
            boxed: {
                borderRadius: '25px',
                border: '2px solid #337AB7'
            },
            thumbnail: {
                padding: '30px'
            },
            info: {
                padding: '30px'
            }
        }

        return (
            <Grid fluid style={styles.boxed}>
                <Col md={3} style={styles.thumbnail}>
                    {/* <img src={this.props.info.image} alt="Thumbnail" width="500" height="600"/> */}
                    <Row>
                        <Image src={this.props.info.image} alt="Thumbnail"/>
                    </Row>
                </Col>
                <Col md={9} style={styles.info}>
                    <Row>
                        <h2><Label>{this.props.info.title}</Label></h2>
                    </Row>
                    <Row>
                        <Label>{this.props.info.author}</Label>
                    </Row>
                    <Row>
                        <Label>Mô tả: </Label>
                    </Row>
                    <Row>
                        <Well>{this.props.info.summary}</Well>
                    </Row>
                        
                </Col>
            </Grid>
        )
    }
}

class Instance extends React.Component {

    constructor(props, context) {
        super(props, context);
    
        this.state = {
          panelRequestOpen: false,
          mapVisible: false
        };   

        this.fetchLocation();
    }

    fetchLocation() {
        const instance = this.props.info;

        let url = `https://thedung.pythonanywhere.com/api/user/profile/${instance.user.email}`
        return fetch(url,
            {
                method: "GET",
                headers: {
                    "Authorization" : 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiYWRtaW4iLCJjcmVhdGVfdGltZSI6IjIwMTgtMDMtMDRUMDI6NTc6MjMuOTgxMjUzKzAwOjAwIiwiZW1haWwiOiJ0aGVkdW5nMjcwOUBnbWFpbC5jb20iLCJpZCI6MX0.dhZvtbK9YrUzdRObkurnRp89bCH7yy2L3sdaUbWQu0k'
                }
            })
            .then((response) => response.json())
            .then((json => {
                this.setState({
                    userAddress: `${json.location.detail}, ${json.location.ward}, ${json.location.district}, ${json.location.city}, ${json.location.country}`
                })
                
            }))
            // .then((json => {
            //     Geocode.setApiKey('AIzaSyAQDOsz5Zdwks9zGw9lfDfW4LiNaP_tIV0');                
            //     Geocode.fromAddress(`
            //         ${json.location.detail},
            //         ${json.location.ward},
            //         ${json.location.district},
            //         ${json.location.city},
            //         ${json.location.country}`)
            //     .then(
            //         response => {
            //             const { lat, lng } = response.results[0].geometry.location;
            //             this.setState({
            //                 userLocation: {lat, lng},
            //                 userAddress: 
            //                     json.location.detail + ',' +
            //                     json.location.ward + ',' +
            //                     json.location.district + ',' +
            //                     json.location.city
            //             });
            //             console.log('type');
            //             console.log(this.state.userLocation);
            //         },
            //         error => {
            //             console.log(error);
            //         }
            //     );
            // }));        
    }

    renderSendRequest() {

        const styles = {
            sendButton: {
                float: 'right'
            },
            messageBox: {
                marginBottom: '5px'
            }
        }

        return (
            <Panel 
                expanded={this.state.panelRequestOpen}
                onToggle={()=>{}}
                >
                <Panel.Collapse>
                    <Panel.Body>
                        <FormGroup>
                            <ControlLabel>Lời nhắn</ControlLabel>
                            <FormControl 
                                componentClass="textarea" 
                                placeholder="Gửi lời nhắn tới người chủ sách..." 
                                onChange={(e)=>console.log(`${e.target.value}`)}
                                style={styles.messageBox}
                                />
                            <Button bsStyle="info" style={styles.sendButton}>Gửi yêu cầu mượn</Button>
                        </FormGroup>
                    </Panel.Body>
                </Panel.Collapse>
            </Panel>
        )
    }

    renderMap() {

        const instance = this.props.info;

        const styles = {
            container: {
                height: '430px'
            }
        };

        return (
            <Sidebar 
                visible={this.state.mapVisible} 
                position="bottom" 
                className="ui-sidebar-md"
                style={styles.container}
                onHide={ () => this.setState({mapVisible:false}) }
                >
                <Grid fluid>
                    <Row>
                        <Col md={6}>
                            {this.state.userAddress && 
                                <MyFancyComponent
                                    userAddress={this.state.userAddress}
                                    // userAddress={'Dong Hoi, Quang Binh'}
                                />
                            }
                        </Col>
                        <Col>
                            <h1>{this.state.userAddress}</h1>
                        </Col>
                    </Row>
                </Grid>
            </Sidebar>
        );
    }

    render() {

        const styles = {
            avatar: {
                maxWidth: '50px',
                maxHeight: '50px'
            },
            textInfo: {
                verticalAlign: 'baseline'
            },
            borrowButton: {
                float: 'right',
                position: 'relative'
            },
            instance: {
                padding: '10px',
                backgroundColor: '#ddffff',
                borderLeft: '6px solid #ccc',
                display: 'flex'
            }
        };

        const instance = this.props.info;        

        return (
            [       
            <Row key={'info'} style={styles.instance}>
                <Col md={2}>
                    <Image src={instance.user.avatar} circle style={styles.avatar}/>
                </Col>
                <Col md={4} style={styles.textInfo}>
                    <Row>
                        Email: {instance.user.email}
                    </Row>
                    <Row>
                        Ten: {instance.user.real_name}
                    </Row>
                </Col>
                <Col md={2}>
                    <Button
                        bsStyle="danger"
                        onClick={() => this.setState({mapVisible: true})}>
                        Xem vị trí
                    </Button>
                    {this.renderMap()}
                </Col>
                <Col md={6}>
                    <Button style={styles.borrowButton}
                        bsStyle="primary" 
                        onClick={() => this.setState({ panelRequestOpen: !this.state.panelRequestOpen })}
                        >
                        Yêu cầu mượn
                    </Button>
                </Col>
            </Row>,
            <Row key={'action'}>
                {this.renderSendRequest()}
            </Row>            
            ]
        )
    }
}

class BookDetail extends React.Component {
    constructor(props){
        super(props);
    }    

    componentDidMount() {
        this.fetchOriginal();
        this.fetchInstance();

        //doing some asynchronous call here which dispatches an action 
        //and updates the state -> which inturn renders the component again.
        //I want component to be rendered after this happended. Is it possible ?
    }

    fetchOriginal() {
        let url = `https://thedung.pythonanywhere.com/api/book/original/${this.props.code}`;
        return fetch(url,
            {
                method: "GET",
                headers: {
                    "Authorization" : 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiYWRtaW4iLCJjcmVhdGVfdGltZSI6IjIwMTgtMDMtMDRUMDI6NTc6MjMuOTgxMjUzKzAwOjAwIiwiZW1haWwiOiJ0aGVkdW5nMjcwOUBnbWFpbC5jb20iLCJpZCI6MX0.dhZvtbK9YrUzdRObkurnRp89bCH7yy2L3sdaUbWQu0k'
                }
            })
            .then((response) => response.json())
            .then((json => {
                this.setState({
                    original: json
                });
                return json;
            }));
    }

    fetchInstance() {
        let url = `https://thedung.pythonanywhere.com/api/book/instance/${this.props.code}`;
        return fetch(url,
            {
                method: "GET",
                headers: {
                    "Authorization" : 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiYWRtaW4iLCJjcmVhdGVfdGltZSI6IjIwMTgtMDMtMDRUMDI6NTc6MjMuOTgxMjUzKzAwOjAwIiwiZW1haWwiOiJ0aGVkdW5nMjcwOUBnbWFpbC5jb20iLCJpZCI6MX0.dhZvtbK9YrUzdRObkurnRp89bCH7yy2L3sdaUbWQu0k'
                }
            })
            .then((response) => response.json())
            .then((json => {
                this.setState({
                    instance: json
                });
                return json;
            }));
    }

    renderBook() {
        return(
            <Test 
                info = {this.state.original}
                />
        )
    }

    renderInstance() {

        const styles = {
            badgeGood: {
                backgroundColor: 'green',
                fontSize: '1.5em'
            },
            badgeBad: {
                backgroundColor: 'red',
                fontSize: '1.5em'
            }
        }

        let result = [];
        const instanceBundle = this.state.instance;        

        result.push(
            <h2 key={'overview'}>
                {instanceBundle.length > 0 ? 
                    <Badge style={styles.badgeGood}>{instanceBundle.length}</Badge>
                    :
                    <Badge style={styles.badgeBad}>{instanceBundle.length}</Badge>
                }
                {' '}nguời dùng đang có cuốn sách này!
            </h2>
        );

        instanceBundle.forEach((item) => {
            console.log(item);

            result.push(
                <Instance key={item.user.email}
                    info = {item}
                    />
            )
        });

        return (
            <Grid fluid>
                {result}
            </Grid>
        )
    }

    render() {
        return(
            <div>
                {this.state && this.state.original && this.renderBook()}
                <div><hr/></div>
                {this.state && this.state.instance && this.renderInstance()}
            </div>
        )
    }
}

export default BookDetail;