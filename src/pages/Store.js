import React from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";

import {Grid, Row, Col} from 'react-bootstrap';

import {TieredMenu} from 'primereact/components/tieredmenu/TieredMenu'

import ListView from "./Store/ListView";
import Tab from "./Store/Tab";
import ItemView from "./Store/ItemView";

const items=[
    {
        label: 'Sach tieng anh',
        items: [
            {
                label: 'IT'
            },
            {
                label: 'Van hoc'
            }
        ]
    },
    {
        label: 'Sach tieng viet',
        items: [
            {
                label: 'Tieu thuyet',
                items: [
                    {
                        label: 'Trinh tham'
                    },
                    {
                        label: 'Tuoi teen'
                    }
                ]
            },
            {
                label: 'Van hoc',
                items: [
                    {
                        label: 'Kinh dien'
                    },
                    {
                        label: 'Van hoc nuoc ngoai'
                    }
                ]
            }
        ]
    }
];

// TODO: call api to get data and pass it to tiered menu

class Store extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            activeIndex:0,
            items:[],
            listview: []
        };
        this.fetchData();
    }

    fetchData = async () => {
        const api_call = await fetch("https://thedung.pythonanywhere.com/api/book/exchange/data",
            {
                method: "PUT",
                headers: {
                    "Authorization" : 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiYWRtaW4iLCJjcmVhdGVfdGltZSI6IjIwMTgtMDMtMDRUMDI6NTc6MjMuOTgxMjUzKzAwOjAwIiwiZW1haWwiOiJ0aGVkdW5nMjcwOUBnbWFpbC5jb20iLCJpZCI6MX0.dhZvtbK9YrUzdRObkurnRp89bCH7yy2L3sdaUbWQu0k'
                }
            });
        const data = await api_call.json();

        this.setState({
            items:[
                {
                    label: Object.keys(data)[0],
                    command: (event) => {
                        // this.growl.show({severity:'info', summary:'First Step', detail: event.item.label});
                        this.setState({activeIndex:0});
                        alert(event.item.label);
                        this.setState({
                            listview: this.applyView(data[event.item.label])
                        });
                    }
                },
                {
                    label: Object.keys(data)[1],
                    command: (event) => {
                        // this.growl.show({severity:'info', summary:'Seat Selection', detail: event.item.label});
                        this.setState({activeIndex:1});
                        alert(event.item.label);
                        this.setState({
                            listview: this.applyView(data[event.item.label])
                        });
                    }
                },
                {
                    label: Object.keys(data)[2],
                    command: (event) => {
                        // this.growl.show({severity:'info', summary:'Pay with CC', detail: event.item.label});
                        this.setState({activeIndex:2});
                        alert(event.item.label);
                        this.setState({
                            listview: this.applyView(data[event.item.label])
                        });
                    }
                },
                {
                    label: Object.keys(data)[3],
                    command: (event) => {
                        // this.growl.show({severity:'info', summary:'Last Step', detail: event.item.label});
                        this.setState({activeIndex:3});
                        alert(event.item.label);
                        this.setState({
                            listview: this.applyView(data[event.item.label])
                        });
                    }
                },
                {
                    label: Object.keys(data)[4],
                    command: (event) => {
                        // this.growl.show({severity:'info', summary:'Last Step', detail: event.item.label});
                        this.setState({activeIndex:4});
                        alert(event.item.label);
                        this.setState({
                            listview: this.applyView(data[event.item.label])
                        });
                    }
                }
            ]
        });

        let name = Object.keys(data)[this.state.activeIndex];
        if (name === "category") {name = "discovery"}
        this.setState({
            listview: this.applyView(data[name])
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
                <Grid>
                    <Row>
                        <Tab activeIndex={this.state.activeIndex} items={this.state.items}/>
                    </Row>
                    <Row>
                        <Col md={2}>
                            <TieredMenu model={items}/>
                        </Col>
                        <Col md={8} >
                            <ListView listview={this.state.listview}/>
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