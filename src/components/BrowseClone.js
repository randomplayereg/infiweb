import React from 'react';

import {Nav, NavItem, Panel, Tab, Modal} from 'react-bootstrap';

import {Container, Col, Row, Breadcrumb, BreadcrumbItem, TabPane, TabContent, NavLink, Fa} from 'mdbreact';

import { ProgressCircle } from 'react-desktop/windows';

import { Link } from 'react-router-dom';

import '../css/VerrattiQ.css';

import { ruben } from "../Ruben";

var classnames = require('classnames');

const BreadFast = (props) => {

    let breast = [];
    if (props.language != null && props.category != null) {
        breast.push([
            <BreadcrumbItem onClick={props.goBack}>
                <Link to={'/browse'}>{ruben.browse}</Link>
            </BreadcrumbItem>
            ,
            <BreadcrumbItem active>{props.language.name} / {props.category.title}</BreadcrumbItem>
        ])
    } else {
        breast.push(
            <BreadcrumbItem active>{ruben.browse}</BreadcrumbItem>,
        )
    }

    return (
        <Row className={'ml-3 mt-3'}>
            <Col md={2}/>
            <Col md={8}>
                <Breadcrumb>
                    {breast}
                </Breadcrumb>
            </Col>
            <Col md={2}/>
        </Row>
    )
};

class SideNav extends React.Component {

    constructor(props) {
        super(props);
        this.toggleVerticalPills = this.toggleVerticalPills.bind(this);
        this.state = {
            activeItemVerticalPills: '1',
        };
    }

    toggleVerticalPills(tab) {
        debugger
        if (this.state.activeItemVerticalPills !== tab) {
            this.setState({
                activeItemVerticalPills: tab
            });
        }
    }

    render() {

        let subCategoryItems = [];
        let bookBundle = [];
        let count = 1;
        let subCount = 1;
        this.props.category.subs.forEach(
            (subCategory) => {
                let k = subCount;
                subCategoryItems.push(
                    <NavItem key={subCount}>
                        <h4
                            className={classnames(
                                {tabactive: this.state.activeItemVerticalPills === `${k}`},
                                {tabnormal: this.state.activeItemVerticalPills !== `${k}`}
                            )}
                            onClick={() => {
                                this.toggleVerticalPills(`${k}`);
                            }}
                        >
                            {subCategory.title}
                        </h4>
                    </NavItem>
                );
                subCount = subCount + 1
            }
        );

        this.props.category.subs.forEach(
            (subCategory) => {
                // debugger
                // subCategoryItems.push(
                //     <NavItem key={subCount}>
                //         <h4
                //             className={classnames(
                //                 { tabactive: this.state.activeItemVerticalPills === `${subCount}` },
                //                 { tabnormal: this.state.activeItemVerticalPills !== `${subCount}` }
                //             )}
                //             onClick={() => { this.toggleVerticalPills(`${subCount}`); }}
                //         >
                //             {subCategory.title}
                //         </h4>
                //     </NavItem>
                // );
                // subCount++;

                let bookItems = [];
                subCategory.books.forEach(
                    (book) => {
                        bookItems.push(
                            <Link
                                className="grid-cell"
                                to={`/browse/book/${book.id}`}
                                // onClick={()=>{
                                //     window.location.href = `/v2/library/detail/${book.id}`
                                // }}
                            >
                                {/*<header className="grid-cell__title">*/}
                                {/*</header>*/}
                                <figure className="grid-cell__thumbnail">
                                    <img src={book.image}  style={{height: '250px', width: '250px'}}/>
                                </figure>

                                <main className="grid-cell__description">
                                    {book.title}
                                </main>

                                <main className="grid-cell__description">
                                    Author: {book.author}
                                </main>

                                <main className="grid-cell__description">
                                    Rating: {book.rating}
                                </main>

                            </Link>
                        )
                    }
                );

                bookBundle.push(
                    <TabPane tabId={`${count}`}>
                        <section className="grid-cell-container">
                            {bookItems}
                        </section>
                    </TabPane>
                );

                count++;
            }
        );

        return (

            <Row>
                <Col md="2">
                    <Nav pills color="primary" className="flex-column">
                        {subCategoryItems}
                    </Nav>
                </Col>
                <Col md="8">
                    <TabContent activeItem={this.state.activeItemVerticalPills}>
                        {bookBundle}
                    </TabContent>
                </Col>
                <Col md={"2"}/>
            </Row>

            // <Tab.Container id="left-tabs-example" defaultActiveKey="1">
            //     <Row className="clearfix">
            //         <Col md={2}>
            //             <Nav bsStyle="pills" stacked>
            //                 {/*<NavItem eventKey="first">Tab 1</NavItem>*/}
            //                 {/*<NavItem eventKey="second">Tab 2</NavItem>*/}
            //                 {subCategoryItems}
            //             </Nav>
            //         </Col>
            //         <Col md={10}>
            //             <Tab.Content animation>
            //                 {/*<Tab.Pane eventKey="first">Tab 1 content</Tab.Pane>*/}
            //                 {/*<Tab.Pane eventKey="second">Tab 2 content</Tab.Pane>*/}
            //                 {bookBundle}
            //             </Tab.Content>
            //         </Col>
            //     </Row>
            // </Tab.Container>
        )
    }
};

const CategoryList = (props) => {
    return (
        <article className="grid-cell" onClick={()=>props.categoryClick(props.language, props.category)}>
            {/*<header className="grid-cell__title">*/}
            {/*</header>*/}
            <figure className="grid-cell__thumbnail">
                <img src={props.category.image}/>
            </figure>
            <header className="grid-cell__title">
                {props.category.title}
            </header>
            {/*<main className="grid-cell__description">*/}
            {/*Lorem Ipsum dolor amet sun Lorem Ipsum dolor amet sun Lorem Ipsum dolor amet sun*/}
            {/*</main>*/}
            {/*<a href="#" className="button">Call to Action</a>*/}
        </article>
    )
};

const PanelBlyat = (props) => {

    let IdiNahui = [];

    props.categories.forEach(
        (item) => {
            console.log(item);
            IdiNahui.push(
                <CategoryList
                    key={item.title}
                    language={props.language}
                    category={item}
                    categoryClick={props.categoryClick}
                />
            )
        }
    );

    return(
        <Panel>
            <Panel.Heading>
                <Panel.Title componentClass="h3">{props.language.name}</Panel.Title>
            </Panel.Heading>
            <Panel.Body>
                <section className="grid-cell-container">
                    {IdiNahui}
                </section>
            </Panel.Body>
        </Panel>
    )
};

class BrowseClone extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            pickedLanguage: null,
            pickedCategory: null,
            pickedSubcategory: null,

            show: true,
            bigDick: null
        };

        this.handleSelect = this.handleSelect.bind(this);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleGoBack = this.handleGoBack.bind(this);

        this.annoyingFucker = this.annoyingFucker.bind(this);

        this.test = this.test.bind(this);

        this.fetchTree = this.fetchTree.bind(this);
    }

    test(lan, cate) {
        // alert(lan.name + lan.id + cate.title + cate.code);


        this.handleShow();
        this.setState({
            pickedLanguage: lan,
            pickedCategory: cate
        });
        this.annoyingFucker(800);
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

    handleSelect(selectedKey) {
        alert(`selected ${selectedKey}`);
    }

    handleGoBack() {
        this.handleShow();
        this.setState({
            pickedLanguage: null,
            pickedCategory: null
        });
        this.annoyingFucker(500);
    }

    componentDidMount() {
        this.fetchTree();
        this.annoyingFucker(1200);
    }

    fetchTree() {

        let url = `https://thedung.pythonanywhere.com/api/book/web/all`;
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
                // this.setState({
                //     console.log(json);
                // });

                this.setState({
                    bigDick: json
                });

                // this.handleClose();
            }));
    }

    render() {
        return(
            <div>
                <BreadFast
                    language={this.state.pickedLanguage}
                    category={this.state.pickedCategory}
                    goBack={this.handleGoBack}
                />
                {this.state && this.state.pickedLanguage == null && this.state.pickedCategory == null && this.state.pickedSubcategory == null &&
                <Row>
                    <Col md={12}>
                        {/*<Panel>*/}
                        {/*<Panel.Heading>*/}
                        {/*<Panel.Title componentClass="h3">Tieng Anh</Panel.Title>*/}
                        {/*</Panel.Heading>*/}
                        {/*<Panel.Body>*/}
                        {/*<section className="grid-cell-container">*/}
                        {/*<CategoryList/>*/}
                        {/*<CategoryList/>*/}
                        {/*</section>*/}
                        {/*</Panel.Body>*/}
                        {/*</Panel>*/}
                        {this.state && this.state.bigDick &&
                        [
                            <PanelBlyat
                                language={this.state.bigDick[0]}
                                categories={this.state.bigDick[0].categories}
                                categoryClick={this.test}
                            />,
                            <PanelBlyat
                                language={this.state.bigDick[1]}
                                categories={this.state.bigDick[1].categories}
                                categoryClick={this.test}
                            />
                        ]
                        }
                    </Col>
                </Row>
                }
                {this.state && this.state.pickedLanguage != null && this.state.pickedCategory != null && this.state.pickedSubcategory == null &&
                <Row>
                    <Col md={12}>
                        <SideNav
                            language={this.state.pickedLanguage}
                            category={this.state.pickedCategory}
                        />
                    </Col>
                </Row>
                }
            </div>
        )
    }
}

export default BrowseClone;