import React from 'react';

import testing from './ic_launcher-web.png'

class CategoryView extends React.Component {
    constructor(props){
        super(props);
        debugger
        this.state = {
            title: props.props.title,
            imgs: props.props.image
        };
    }

    render() {
        return(
            <div className="holder">
                <img src={this.state.imgs} alt={"Help!"} className="image"/>
                <div className="show-up">
                    <div className="text">{this.state.title}</div>
                </div>
                <hr/>
                <div>{this.state.title}</div>
            </div>
        )
    }
}

export default CategoryView;