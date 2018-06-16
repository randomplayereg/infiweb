import React from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";

import {Grid, Row, Col} from 'react-bootstrap';
import {Breadcrumb} from 'react-bootstrap';
import {Panel} from 'react-bootstrap';

import {NavLink} from 'react-router-dom'

import ListView from "./Store/ListView";
import ItemView from "./Store/ItemView";
import CategoryView from "./Store/CategoryView";

// TODO: call api to get data and pass it to tiered menu

class Store extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            activeIndex:0,
            catTree:[],
            listview: [],
            categoryListView: []
        };
        this.fetchData();
    }

    fetchData = async () => {
        const api_book_exchange_data = await fetch("https://thedung.pythonanywhere.com/api/book/exchange/data",
            {
                method: "PUT",
                headers: {
                    "Authorization" : 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiYWRtaW4iLCJjcmVhdGVfdGltZSI6IjIwMTgtMDMtMDRUMDI6NTc6MjMuOTgxMjUzKzAwOjAwIiwiZW1haWwiOiJ0aGVkdW5nMjcwOUBnbWFpbC5jb20iLCJpZCI6MX0.dhZvtbK9YrUzdRObkurnRp89bCH7yy2L3sdaUbWQu0k'
                }
            });
        const book_exchange_data = await api_book_exchange_data.json();
        console.log(book_exchange_data['category']);
        const category_data = book_exchange_data['category'];

        let res = [];
        category_data.forEach((item) => {

            let child = this.applyCategoryView(item);
            res.push(
                <Panel key={item.id} bsStyle="success">
                    <Panel.Heading>
                        <Panel.Title componentClass="h3">{item.name}</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                        {child}
                        {/*<ListView listview={this.state.listview}/>*/}
                    </Panel.Body>
                </Panel>
            );
        });
        this.setState({
           categoryListView: res
        });
        //
        // this.setState({
        //     listview: this.applyCategoryView(category_data[0])
        // });
        //
        // const api_book_subcategory = await fetch("")
        //
        // let for_list_view = [];
    };

    // applyEachCategoryView = (data) => {
    //     let res = [];
    //     data.forEach((item) => {
    //
    //         item['categories'].forEach((item) => {
    //             const CategoryView = this.applyCategoryView();
    //
    //         });
    //
    //         res.push(
    //             <Panel bsStyle="success">
    //                 <Panel.Heading>
    //                     <Panel.Title componentClass="h3">{item.name}</Panel.Title>
    //                 </Panel.Heading>
    //                 <Panel.Body>
    //                     <ListView listview={this.state.listview}/>
    //                 </Panel.Body>
    //             </Panel>
    //             this.applyCategoryView(item)
    //         );
    //     })
    //     return res;
    // };
    //
    applyCategoryView = (data) => {
        debugger
        const bundle = data['categories'];
        let n = bundle.length;
        let res = [];
        while (n > 0) {
            if (Math.floor(n/3) > 0) {
                res.push(
                    <Row key={n-1}>
                        <Col md={4}>
                            <CategoryView props={bundle[n - 1]}/>
                            <NavLink to={"/store/" + data.id + "/" + bundle[n-1].code}>{data.id + '||' + bundle[n-1].code}</NavLink>
                        </Col>
                        <Col md={4}>
                            <CategoryView props={bundle[n - 2]}/>
                            <NavLink to={"/store/" + data.id + "/" + bundle[n-2].code}>{data.id + '||' + bundle[n-2].code}</NavLink>
                        </Col>
                        <Col md={4}>
                            <CategoryView props={bundle[n - 3]}/>
                            <NavLink to={"/store/" + data.id + "/" + bundle[n-3].code}>{data.id + '||' + bundle[n-3].code}</NavLink>
                        </Col>
                    </Row>
                );
            }
            if (n === 2) {
                res.push(
                    <Row key={n-2}>
                        <Col md={4}>
                            <CategoryView props={bundle[n - 1]}/>
                            <NavLink to={"/store/" + data.id + "/" + bundle[n-1].code}>{data.id + '||' + bundle[n-1].code}</NavLink>
                        </Col>
                        <Col md={4}>
                            <CategoryView props={bundle[n - 2]}/>
                            <NavLink to={"/store/" + data.id + "/" + bundle[n-2].code}>{data.id + '||' + bundle[n-2].code}</NavLink>
                        </Col>
                    </Row>
                );
            }
            if (n === 1) {
                res.push(
                    <Row key={n-1}>
                        <Col md={4}>
                            <NavLink to={"/store/" + data.id + "/" + bundle[n-1].code}>{data.id + '||' + bundle[n-1].code}</NavLink>
                        </Col>
                    </Row>
                );

            }
            n = n - 3;
        }
        return res;
    };
    //
    // applyView = (bundle) => {
    //     let n = bundle.length;
    //     let res = [];
    //     while (n > 0) {
    //         if (Math.floor(n/3) > 0) {
    //             res.push(
    //                 <Row key={n-1}>
    //                     <Col md={4}>
    //                         <ItemView props={bundle[n - 1]}/>
    //                     </Col>
    //                     <Col md={4}>
    //                         <ItemView props={bundle[n - 2]}/>
    //                     </Col>
    //                     <Col md={4}>
    //                         <ItemView props={bundle[n - 3]}/>
    //                     </Col>
    //                 </Row>
    //             );
    //         }
    //         if (n === 2) {
    //             res.push(
    //                 <Row key={n-2}>
    //                     <Col md={4}>
    //                         <ItemView props={bundle[n - 1]}/>
    //                     </Col>
    //                     <Col md={4}>
    //                         <ItemView props={bundle[n - 2]}/>
    //                     </Col>
    //                 </Row>
    //             );
    //         }
    //         if (n === 1) {
    //             res.push(
    //                 <Row key={n-1}>
    //                     <Col md={4}>
    //                         <ItemView props={bundle[n - 1]}/>
    //                     </Col>
    //                 </Row>
    //             );
    //
    //         }
    //         n = n - 3;
    //     }
    //     return res;
    // };

    render() {
        return(
            <div>
                <Header/>
                <Breadcrumb>
                    <Breadcrumb.Item href="/store">Store</Breadcrumb.Item>
                    {/*<Breadcrumb.Item href="http://getbootstrap.com/components/#breadcrumbs">*/}
                        {/*Library*/}
                    {/*</Breadcrumb.Item>*/}
                    {/*<Breadcrumb.Item active>Data</Breadcrumb.Item>*/}
                </Breadcrumb>
                <Grid>
                    <Row>
                        <Col md={10} >
                            {/*<Panel bsStyle="success">*/}
                                {/*<Panel.Heading>*/}
                                    {/*<Panel.Title componentClass="h3">Panel heading</Panel.Title>*/}
                                {/*</Panel.Heading>*/}
                                {/*<Panel.Body>*/}
                                    {/*<ListView listview={this.state.listview}/>*/}
                                {/*</Panel.Body>*/}
                            {/*</Panel>*/}
                            {this.state.categoryListView}
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

const styles = {
    inline: {
        display: "inline"
    }
};

export default Store;