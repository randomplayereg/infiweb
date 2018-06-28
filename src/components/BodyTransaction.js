import React from 'react';

import {Grid, Row, Col, Tab, Tabs, Image, Label, Well, Badge, Button, Panel, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';

import './Card.css';

class BodyTransaction extends React.Component {

    constructor(props, context) {
        super(props, context);
    
        // this.handleSelect = this.handleSelect.bind(this);
    
        // this.state = {
        //     key: 1
        // };

        this.fetchTransaction();
    }

    fetchTransaction = async () => {
        const currentEmail = localStorage.getItem('uid');
        if (typeof(currentEmail) == undefined) {
            alert('no login');
            return
        }

        let url = `https://thedung.pythonanywhere.com/api/transaction/get-all/${currentEmail}`;
        
        fetch(
            url,
            {
                method: "GET",
                headers: {
                    "Authorization" : 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiYWRtaW4iLCJjcmVhdGVfdGltZSI6IjIwMTgtMDMtMDRUMDI6NTc6MjMuOTgxMjUzKzAwOjAwIiwiZW1haWwiOiJ0aGVkdW5nMjcwOUBnbWFpbC5jb20iLCJpZCI6MX0.dhZvtbK9YrUzdRObkurnRp89bCH7yy2L3sdaUbWQu0k'
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

    // handleSelect(key) {
    //     alert(`selected ${key}`);
    //     this.setState({ key });
    // }

    renderOwner() {

        const bundle = this.state.ownerBundle;

        var res = [];
        bundle.forEach((item) => {
            res.push(
                <article className="card">
                    <header className="card__title">
                        <h3>{item.book_name}</h3>
                    </header>
                    <figure className="card__thumbnail">
                        <img src={`${item.book_image}`}/>
                    </figure>
                    <main className="card__description">
                        {item.requester_name} đang muốn mượn
                    </main>
                    <a href={``} className="button">Call to Action</a>
                </article>
            )
        });

        return(
            <section className="card-container">
                {res}
            </section>
        )
    }

    renderRequester() {

        const bundle = this.state.requesterBundle;

        var res = [];
        bundle.forEach((item) => {
            res.push(
                <article className="card">
                    <header className="card__title">
                        <h3>{item.book_name}</h3>
                    </header>
                    <figure className="card__thumbnail">
                        <img src={`${item.book_image}`}/>
                    </figure>
                    <main className="card__description">                        
                        của {item.owner_name}
                    </main>
                    <a href={`/transaction/${item.id}`} className="button">Call to Action</a>
                </article>
            )
        });

        return(
            <section className="card-container">
                {res}
            </section>
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
                        <Row>
                            <Tabs
                                // defaultActiveKey={0}
                            >
                                <Tab eventKey={1} title="Sách bạn đang cho mượn">
                                    {this.state && this.state.ownerBundle && this.renderOwner()}
                                </Tab>
                                <Tab eventKey={2} title="Sách bạn đang mượn">
                                    {this.state && this.state.requesterBundle && this.renderRequester()}
                                </Tab>
                            </Tabs>
                        </Row>
                        <Row>
                            <h1>Content</h1>
                        </Row>
                    </Col>
                    <Col md={2}>
                        <h1>Weeee</h1>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default BodyTransaction;