import React from 'react';

import {Breadcrumb, Grid, Col, Row, Nav, NavItem, Panel, Tab, Modal, Glyphicon} from 'react-bootstrap';
import NavigationM from "./NavigationM";

import { ProgressCircle } from 'react-desktop/windows';

import './VerrattiQ.css';

const BreadFast = (props) => {

    let breast = [];
    if (props.language != null && props.category != null) {
        breast.push([
            <Breadcrumb.Item onClick={props.goBack}>Tủ sách</Breadcrumb.Item>,
            <Breadcrumb.Item active>{props.language.name}-{props.category.title}</Breadcrumb.Item>
        ])
    } else {
        breast.push(
            <Breadcrumb.Item active>Tủ sách</Breadcrumb.Item>,
        )
    }

    return (
        <Grid style={{marginTop: '20px'}}>
            <Row>
                <Breadcrumb>
                    {breast}
                </Breadcrumb>
            </Row>
        </Grid>
    )
};

const SideNav = (props) => {

    let subCategoryItems = [];
    let bookBundle = [];
    let count = 1;
    props.category.subs.forEach(
        (subCategory) => {
            subCategoryItems.push(
                <NavItem eventKey={`${count}`}>{subCategory.title}</NavItem>
            );

            let bookItems = [];
            subCategory.books.forEach(
                (book) => {
                    bookItems.push(
                        <article className="card"
                                 onClick={()=>{
                                     window.location.href = `/v2/library/detail/${book.id}`
                                 }}>
                            {/*<header className="card__title">*/}
                            {/*</header>*/}
                            <figure className="card__thumbnail">
                                <img src={book.image}  style={{height: '250px', width: '250px'}}/>
                            </figure>

                            <main className="card__description">
                                {book.title}
                            </main>

                            <main className="card__description">
                                Author: {book.author}
                            </main>

                            <main className="card__description">
                                Rating: {book.rating}
                            </main>

                        </article>
                    )
                }
            );

            bookBundle.push(
                <Tab.Pane eventKey={`${count}`}>
                    <section className="card-container">
                        {bookItems}
                    </section>
                </Tab.Pane>
            );

            count++;
        }
    );

    return (
        <Tab.Container id="left-tabs-example" defaultActiveKey="1">
            <Row className="clearfix">
                <Col md={2}>
                    <Nav bsStyle="pills" stacked>
                        {/*<NavItem eventKey="first">Tab 1</NavItem>*/}
                        {/*<NavItem eventKey="second">Tab 2</NavItem>*/}
                        {subCategoryItems}
                    </Nav>
                </Col>
                <Col md={10}>
                    <Tab.Content animation>
                        {/*<Tab.Pane eventKey="first">Tab 1 content</Tab.Pane>*/}
                        {/*<Tab.Pane eventKey="second">Tab 2 content</Tab.Pane>*/}
                        {bookBundle}
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    )
};

const CategoryList = (props) => {
    return (
        <article className="card" onClick={()=>props.categoryClick(props.language, props.category)}>
            {/*<header className="card__title">*/}
            {/*</header>*/}
            <figure className="card__thumbnail">
                <img src={props.category.image}/>
            </figure>
            <header className="card__title">
                {props.category.title}
            </header>
            {/*<main className="card__description">*/}
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
                  <section className="card-container">
                      {IdiNahui}
                  </section>
           </Panel.Body>
        </Panel>
    )
};

class VerrattiQ extends React.Component {
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
                <NavigationM
                    clicked={'Library'}/>

                <Grid>
                    <Row>
                        <Modal show={this.state.show} onHide={this.handleClose} backdrop={"static"}>
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
                    </Row>
                    <Row>
                        <BreadFast
                            language={this.state.pickedLanguage}
                            category={this.state.pickedCategory}
                            goBack={this.handleGoBack}
                        />
                    </Row>
                    {this.state && this.state.pickedLanguage == null && this.state.pickedCategory == null && this.state.pickedSubcategory == null &&
                    <Row>
                        <Col md={2}>
                        </Col>
                        <Col md={10}>
                            {/*<Panel>*/}
                                {/*<Panel.Heading>*/}
                                    {/*<Panel.Title componentClass="h3">Tieng Anh</Panel.Title>*/}
                                {/*</Panel.Heading>*/}
                                {/*<Panel.Body>*/}
                                    {/*<section className="card-container">*/}
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
                </Grid>
            </div>
        )
    }
}

export default VerrattiQ;