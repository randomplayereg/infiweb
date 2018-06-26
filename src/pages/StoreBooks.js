/*global google*/
import React from 'react';

import {Grid, Row, Col} from 'react-bootstrap'

import {Menu} from 'primereact/components/menu/Menu';

import {Breadcrumb} from 'react-bootstrap';

import ItemView from "./Store/ItemView";
import Header from "../components/Header";
import Footer from "../components/Footer";

// test
import {GMap} from 'primereact/components/gmap/GMap';

class StoreBooks extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            subCategories: [],
            subCategoryBooks: []
        };
        this.fetchData();
    }

    fetchData = async () =>{
        const api_books = await fetch(("https://thedung.pythonanywhere.com/api/book/" + this.props.language + "/" + this.props.code),
            {
                method: "GET",
                headers: {
                    "Authorization": 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiYWRtaW4iLCJjcmVhdGVfdGltZSI6IjIwMTgtMDMtMDRUMDI6NTc6MjMuOTgxMjUzKzAwOjAwIiwiZW1haWwiOiJ0aGVkdW5nMjcwOUBnbWFpbC5jb20iLCJpZCI6MX0.dhZvtbK9YrUzdRObkurnRp89bCH7yy2L3sdaUbWQu0k'
                }
            });
        const data = await api_books.json();
        console.log(data);
        let res = [];
        data.forEach((item) => {
            console.log(item);
            res.push(
                {
                    label: item.title,
                    command:(event)=>{
                        console.log(event);
                        console.log(item.books);
                        this.setState({
                            subCategoryBooks: this.applyView(item.books)
                        });
                    }
                }
            )
        });
        this.setState({
            subCategories: res
        });
    };

    applyView = (bundle) => {
        let n = bundle.length;
        let res = [];
        while (n > 0) {
            if (Math.floor(n/3) > 0) {
                res.push(
                    <Row key={n-1}>
                        <Col md={4}>
                            <ItemView props={bundle[n - 1]}/>
                        </Col>
                        <Col md={4}>
                            <ItemView props={bundle[n - 2]}/>
                        </Col>
                        <Col md={4}>
                            <ItemView props={bundle[n - 3]}/>
                        </Col>
                    </Row>
                );
            }
            if (n === 2) {
                res.push(
                    <Row key={n-2}>
                        <Col md={4}>
                            <ItemView props={bundle[n - 1]}/>
                        </Col>
                        <Col md={4}>
                            <ItemView props={bundle[n - 2]}/>
                        </Col>
                    </Row>
                );
            }
            if (n === 1) {
                res.push(
                    <Row key={n-1}>
                        <Col md={4}>
                            <ItemView props={bundle[n - 1]}/>
                        </Col>
                    </Row>
                );

            }
            n = n - 3;
        }
        return res;
    };

    render() {
        return(
            <div>
                <Header/>
                <Breadcrumb>
                    <Breadcrumb.Item href="/store">Store</Breadcrumb.Item>
                    <Breadcrumb.Item active>
                        {this.props.language}
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>
                        {this.props.code}
                    </Breadcrumb.Item>
                </Breadcrumb>
                <Grid>
                    <Row>
                        <Col md={2}>
                            <Menu model={this.state.subCategories}/>
                        </Col>
                        <Col md={8}>
                            <div>{this.props.language}</div>
                            <div>{this.props.code}</div>
                            {this.state.subCategoryBooks}
                        </Col>
                        <Col md={2}>
                        </Col>
                    </Row>
                </Grid>
                <Footer/>
            </div>
        )
    }
}

export default StoreBooks;