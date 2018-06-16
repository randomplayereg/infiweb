import React from 'react';

import styles from './ItemView.css';

import testing from './ic_launcher-web.png'

class ItemView extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return(
            <div className="holder">
                <img src={this.props.props.image} alt={'Thumbnail'} className="image-book"/>
                <div className="show-up">
                    <div className="text">{this.props.props.title}</div>
                    <div className="text">{this.props.props.author}</div>
                </div>
            </div>
        )
    }
}

export default ItemView;