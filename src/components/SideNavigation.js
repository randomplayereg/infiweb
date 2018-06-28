import React from 'react';
import {Nav, NavItem} from 'react-bootstrap';

import {Label, Glyphicon} from 'react-bootstrap';

import {Carousel, Button} from 'react-bootstrap';

import {ListGroup, ListGroupItem} from 'react-bootstrap';
import CategoryCarousel from './CategoryCarousel';

class SideNavigation extends React.Component {

    constructor(props, context) {
        super(props, context);
    
        this.handleSelect = this.handleSelect.bind(this);
        this.handleSelectCarousel = this.handleSelectCarousel.bind(this);
        this.handleSelectCategory = this.handleSelectCategory.bind(this);    
        this.state = {
            index: 0,
            direction: null
        };
    }

	handleSelect = (eventKey) => {
        alert(`selected: ${eventKey}`);
        
        if (eventKey === 'home') window.location.replace('/');
        if (eventKey === 'transaction') window.location.replace('/transaction');
	}

    handleSelectCarousel(selectedIndex, e) {
        // alert(`selected=${selectedIndex}, direction=${e.direction}`);
        this.setState({
          index: selectedIndex,
          direction: e.direction
        });        
    }    

    handleSelectCategory(selectedIndex) {
        alert(`${selectedIndex}`);
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

        const { index, direction, tree } = this.state;

    	return(
            <div style={styles.overallColor}>
                <Nav bsStyle="pills" stacked activeKey={'home'} onSelect={this.handleSelect}>
                    <NavItem eventKey={'home'} toogle="true"  title="Trang chủ">
                        <Glyphicon glyph="home"/>
                        <span> Trang chủ</span>
                    </NavItem>
                    <NavItem eventKey={'book'} title="Tủ sách">
                        <Glyphicon glyph="book" />
                        <span> Tủ sách</span>
                    </NavItem>
                    <NavItem eventKey={'transaction'} title="Trao đổi của bạn">
                        <Glyphicon glyph="transfer" />
                        <span> Trao đổi</span>
                    </NavItem>
                </Nav>
                <h4>
                    <Label bsStyle="default" style={styles.labelColor}>
                        <Glyphicon glyph="th-list" />
                        <span> Danh mục sách</span>
                    </Label>
                </h4>
                <CategoryCarousel/>
            </div>
    	)
  	}
}

export default SideNavigation;

