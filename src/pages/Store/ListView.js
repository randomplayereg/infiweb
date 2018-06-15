import React from 'react';
import ItemView from "./ItemView";

import {Grid, Row, Col} from 'react-bootstrap';

class ListView extends React.Component {
    constructor(props) {
        super(props);

        // this.fetchData = this.fetchData.bind(this);
        // this.applyView = this.applyView.bind(this);

        this.state = {
            total: 0,
            list: [
                {
                    title: '2+2',
                    author: 'one'
                },
                {
                    title: 'is 4',
                    author: 'two'
                },
                {
                    title: 'minus 1',
                    author: 'three'
                },
                {
                    title: 'is 3',
                    author: 'four'
                },
                {
                    title: 'quick maths',
                    author: 'five'
                }
            ]
        };
    }

    render() {
        return(
            <Grid fluid={true}>
                <div><p></p></div>
                {this.props.listview}
            </Grid>
        )
    }
}

export default ListView;