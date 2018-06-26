import React from 'react';
import {Nav, NavItem} from 'react-bootstrap';

import {Label, Glyphicon} from 'react-bootstrap';

import {Carousel, Button} from 'react-bootstrap';

import {ListGroup, ListGroupItem} from 'react-bootstrap';

import {NavLink} from 'react-router-dom';

class CategoryCarousel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            direction: null,
            tree: this.fetchCategory(),
            carItems: []
        };
        this.fetchCategory = this.fetchCategory.bind(this);
        this.handleSelectCarousel = this.handleSelectCarousel.bind(this);
        this.handleSelectCategory = this.handleSelectCategory.bind(this);
        
        
    }
    
    fetchCategory = async () => {
        const call = await fetch("https://thedung.pythonanywhere.com/api/book/subcategories",
            {
                method: "GET",
                headers: {
                    "Authorization" : 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiYWRtaW4iLCJjcmVhdGVfdGltZSI6IjIwMTgtMDMtMDRUMDI6NTc6MjMuOTgxMjUzKzAwOjAwIiwiZW1haWwiOiJ0aGVkdW5nMjcwOUBnbWFpbC5jb20iLCJpZCI6MX0.dhZvtbK9YrUzdRObkurnRp89bCH7yy2L3sdaUbWQu0k'
                }
            });
        const data = await call.json();

        let res = [];
        data.forEach((item) => {
            let child = this.applyView(item);
            res.push(child);
        });
        this.setState({
            carItems: res
        });
    };

    applyView(data) {
        var styles = {
            overallColor: {
                // backgroundColor: '#ffe8e8',
                //display: 'center'
            },
            labelColor: {
                // backgroundColor: '#ff6666',
                color: '#fbff89',
                maxWidth: '100%',
                margin: 'auto'
            },
            padding: {
                marginLeft: '20px',
                marginRight: '20px'
            },
            languageColor: {
                color: ''
            }
        }

        var listGroup = (parentID, list) => {
            console.log('list group');
            console.log(list);
            var res = [];
            list.forEach((item) => {
                res.push(
                    <a key={item.title} href={`/store/${parentID}/${item.code}`}>
                        <ListGroupItem key={item.title} onClick={this.handleSelectCategory} bsStyle="info">
                            {item.title}
                        </ListGroupItem>
                    </a>
               );
            });
            return res;
        }

        console.log('apply');
        console.log(data);
        console.log(data.categories);

        return (
            <Carousel.Item key={data.id}>
                <div style={styles.padding}>
                    <h5>
                        {
                            data.id === 'VN' ?
                                <Glyphicon glyph="font" />
                                :
                                <Glyphicon glyph="globe" />
                        }
                        <span> {data.name}</span>
                    </h5>
                    <ListGroup>
                        {listGroup(data.id, data.categories)}
                    </ListGroup>
                </div>
            </Carousel.Item>
        )
    }

    handleSelectCarousel(selectedIndex, e) {
        // alert(`selected=${selectedIndex}, direction=${e.direction}`);
        this.setState({
          index: selectedIndex,
          direction: e.direction
        });        
    }    

    handleSelectCategory(selectedIndex, key) {
        // alert(`${selectedIndex} + ${key}`);
    }

	render() {

        var styles = {
            overallColor: {
                // backgroundColor: '#ffe8e8',
                //display: 'center'
            },
            labelColor: {
                // backgroundColor: '#ff6666',
                color: '#fbff89',
                maxWidth: '100%',
                margin: 'auto'
            },
            padding: {
                marginLeft: '20px',
                marginRight: '20px'
            },
            languageColor: {
                color: ''
            }
        }

    	return(
            <Carousel
                activeIndex={this.state.index}
                direction={this.state.direction}
                onSelect={this.handleSelectCarousel}
                indicators={false}
                slide={true}
                interval={1500}>
                {this.state.carItems}
            </Carousel>
    	)
  	}
}

export default CategoryCarousel;

