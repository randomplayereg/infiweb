import React from 'react';

import {Grid, Row, Col, Panel, Button} from 'react-bootstrap';

import {Label} from 'react-bootstrap';

import {ButtonToolbar, DropdownButton, MenuItem, PageHeader} from 'react-bootstrap';

import BookGrid from './BookGrid';

import './BookContent.css'
import './Card.css';

class BookContent extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            tagViews: [],
            bookItems: [],
            bundle: []
        }

        this.fetchCategory();        

        this.fetchHeader();
    }

    sayHi = (key) => {
        this.applyBookList(this.state.bundle, key);
    }

    fetchCategory = async () => {
        const call = await fetch(`https://thedung.pythonanywhere.com/api/book/${this.props.language}/${this.props.category}`,
            {
                method: "GET",
                headers: {
                    "Authorization" : 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiYWRtaW4iLCJjcmVhdGVfdGltZSI6IjIwMTgtMDMtMDRUMDI6NTc6MjMuOTgxMjUzKzAwOjAwIiwiZW1haWwiOiJ0aGVkdW5nMjcwOUBnbWFpbC5jb20iLCJpZCI6MX0.dhZvtbK9YrUzdRObkurnRp89bCH7yy2L3sdaUbWQu0k'
                }
            });
        const data = await call.json();        

        let res = [];
        let count = 0;
        data.forEach((item, count) => {
            let tag = this.applyTag(item, count);
            res.push(tag);
            res.push(' ');
            count++;
        });
        this.setState({
            tagViews: res,
            bundle: data
        });
        this.applyBookList(this.state.bundle, data[0].code);
    };

    applyTag(data, count) {
        
        const st = ["success", "warning", "danger", "info", "default", "primary"];

        return (
                <button> 
                <Label 
                    key={data.code} 
                    bsStyle={`${st[count % 6]}`}
                    onClick={() => this.sayHi(data.code)}
                    // bsStyle={}
                    >
                    {data.title}
                </Label>
                </button>
        )
    }

    applyBookList(data, key) {

        let the_content = data.find((item) => {
            return (item.code===key)
        });

        var res = [];
        the_content.books.forEach((item) => {
            res.push(
                <article className="card">
                    <header className="card__title">
                        <h3>{item.title}</h3>
                    </header>
                    <figure className="card__thumbnail">
                        <img src={`${item.image}`}/>
                    </figure>
                    <main className="card__description">
                        {item.number_exchange} books 
                    </main>
                    <a href={`/store/${item.id}`} className="button">Call to Action</a>
                </article>
            )
        });
        this.setState({
            bookItems: res
        })
    }

    fetchHeader = async () => {
        const call = await fetch(`https://thedung.pythonanywhere.com/api/book/subcategories`,
        {
            method: "GET",
            headers: {
                "Authorization" : 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiYWRtaW4iLCJjcmVhdGVfdGltZSI6IjIwMTgtMDMtMDRUMDI6NTc6MjMuOTgxMjUzKzAwOjAwIiwiZW1haWwiOiJ0aGVkdW5nMjcwOUBnbWFpbC5jb20iLCJpZCI6MX0.dhZvtbK9YrUzdRObkurnRp89bCH7yy2L3sdaUbWQu0k'
            }
        });
        const data = await call.json();     
        
        let the_content = data.find((item) => {
            return (item.id === this.props.language)
        });

        let name = the_content.categories.find((item) => {
            return (item.code === this.props.category)
        });

        this.setState({
            header: (
                <PageHeader>
                    {the_content.name} <small>{name.title}</small>
                </PageHeader>
            )
        })
    }

    render() {
        return(
            <Grid fluid>
                <Row>
                    {this.state.header}
                </Row>
                <Row>
                    <Col>
                        {this.state.tagViews}
                        <section className="card-container">
                            {this.state.bookItems}
                        </section>
                    </Col>                    
                </Row>
            </Grid>
        )
    }
}

export default BookContent;