import React from 'react';
import NavigationM from "./NavigationM";

import {Grid, Row, Col, Tab, Nav, NavItem, ButtonGroup, Button} from 'react-bootstrap';

import './VerrattiQ.css';

import './VerrattiE.css';

const SideNav = (props) => {

    const ownerData = props.ownerData;
    const requesterData = props.requesterData;

    let ownerBundle = [];
    let requesterBundle = [];

    ownerData.forEach(
        (item) => {
            ownerBundle.push(
                <article className="card"
                         onClick={()=>{
                             window.location.href = `/v2/transaction/${item.id}`
                         }}>
                    {/*<header className="card__title">*/}
                    {/*</header>*/}
                    <figure className="card__thumbnail">
                        <img src={item.book_image}  style={{height: '250px', width: '250px'}}/>
                    </figure>

                    <main className="card__description">
                        Chủ sở hữu: {item.owner_name}
                    </main>

                    <main className="card__description">
                        Người mượn: {item.requester_name}
                    </main>

                    <main className="card__description">
                        Trạng thái sách: {item.status}
                    </main>

                </article>
            )
        }
    );

    requesterData.forEach(
        (item) => {
            requesterBundle.push(
                <article className="card"
                         onClick={()=>{
                             window.location.href = `/v2/transaction/${item.id}`
                         }}>
                    {/*<header className="card__title">*/}
                    {/*</header>*/}
                    <figure className="card__thumbnail">
                        <img src={item.book_image}  style={{height: '250px', width: '250px'}}/>
                    </figure>

                    <main className="card__description">
                        Chủ sở hữu: {item.owner_name}
                    </main>

                    <main className="card__description">
                        Người mượn: {item.requester_name}
                    </main>

                    <main className="card__description">
                        Trạng thái sách: {item.status}
                    </main>

                </article>
            )
        }
    );

    let renderO = (
        <Tab.Pane eventKey="1">
            <Grid fluid>
                <Col>
                    <Row>
                        <ButtonGroup style={{display: 'inline'}}>
                            <Button onClick={()=>props.phanHoi(true)}>Phản hồi</Button>
                            <Button onClick={()=>props.dangDienRa(true)}>Đang diễn ra</Button>
                            <Button onClick={()=>props.ketThuc(true)}>Kết thúc</Button>
                            <Button onClick={()=>props.hangDoi(true)}>Hàng đợi</Button>
                        </ButtonGroup>
                    </Row>
                    <Row>
                        <section className="card-container">
                            {ownerBundle}
                        </section>
                    </Row>
                </Col>
            </Grid>
        </Tab.Pane>
    );

    let renderR = (
        <Tab.Pane eventKey="2">
            <Col>
                <Row>
                    <ButtonGroup style={{display: 'inline'}}>
                        <Button onClick={()=>props.phanHoi(true)}>Phản hồi</Button>
                        <Button onClick={()=>props.dangDienRa(true)}>Đang diễn ra</Button>
                        <Button onClick={()=>props.ketThuc(true)}>Kết thúc</Button>
                        <Button onClick={()=>props.hangDoi(true)}>Hàng đợi</Button>
                    </ButtonGroup>
                </Row>
                <Row>
                    <section className="card-container">
                        {requesterBundle}
                    </section>
                </Row>
            </Col>
        </Tab.Pane>
    );

    return(
        <Tab.Container id="left-tabs-example" defaultActiveKey="1">
            <Row className="clearfix">
                <Col md={2}>
                    <Nav bsStyle="pills" stacked>
                        <NavItem eventKey="1" style={{backgroundColor: 'orange', color: 'white'}}>Chủ giao dịch</NavItem>
                        <NavItem eventKey="2" style={{backgroundColor: 'purple', color: 'white'}}>Giao dịch mượn</NavItem>
                    </Nav>
                </Col>
                <Col md={10}>
                    <Tab.Content animation>
                        {
                            [
                                renderO,
                                renderR
                            ]
                        }
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    )
};

class VerrattiE extends React.Component {

    constructor(props){
        super(props);

        this.fetchTransaction = this.fetchTransaction.bind(this);1

        this.phanHoi = this.phanHoi.bind(this);
        this.dangDienRa = this.dangDienRa.bind(this);
        this.ketThuc = this.ketThuc.bind(this);
        this.hangDoi = this.hangDoi.bind(this);


        this.fetchTransaction();
    }

    phanHoi(isOwner) {
        if (isOwner) {
            alert('11');
            // loc phan hoi CHU SACH
        } else {
            alert('21');
            // loc phan hoi MUON SACH
        }
    }

    dangDienRa(isOwner) {
        if (isOwner) {
            // loc phan hoi CHU SACH
        } else {
            // loc phan hoi MUON SACH
        }
    }

    ketThuc(isOwner) {
        if (isOwner) {
            // loc phan hoi CHU SACH
        } else {
            // loc phan hoi MUON SACH
        }
    }

    hangDoi(isOwner) {
        if (isOwner) {
            // loc phan hoi CHU SACH
        } else {
            // loc phan hoi MUON SACH
        }
    }

    fetchTransaction() {
        let currentEmail = localStorage.getItem('uid');
        //TODO: no login
        let url = `https://thedung.pythonanywhere.com/api/transaction/get-all/${currentEmail}`;
        let token = `Token ${localStorage.getItem('token')}`;

        fetch(
            url,
            {
                method: "GET",
                headers: {
                    "Authorization" : token
                }
            })
            .then((response) => response.json())
            .then((json => {
                this.setState({
                    transactionBundle: json,
                    ownerBundle: json.filter((item) => {return item.owner_email == currentEmail}),
                    requesterBundle: json.filter((item) => {return item.requester_email == currentEmail})
                });
            }))
    }

    render(){
        return(
            <div>
                <NavigationM
                    clicked={'Transaction'}
                />

                <Grid>
                    <Row style={{marginTop: '16px'}}>
                        {this.state && this.state.transactionBundle &&
                            <SideNav
                                ownerData={this.state.ownerBundle}
                                requesterData={this.state.requesterBundle}
                                phanHoi={this.phanHoi}
                                dangDienRa={this.dangDienRa}
                                ketThuc={this.ketThuc}
                                hangDoi={this.hangDoi}
                                />
                        }
                    </Row>
                </Grid>
            </div>
        )
    }

}

export default VerrattiE;