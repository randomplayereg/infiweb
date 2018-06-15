import React from 'react';

import styles from './ItemView.css';

import testing from './ic_launcher-web.png'

class ItemView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            title: props.props.title,
            author: props.props.author,
            imgs: props.props.image
        };
    }

    render() {
        return(
            <div className="holder">
                <img src={this.state.imgs} alt={'Thumbnail'} className="image"/>
                <div className="show-up">
                    <div className="text">{this.state.title}</div>
                    <div className="text">{this.state.author}</div>
                </div>
            </div>
        )
    }
}

export default ItemView;