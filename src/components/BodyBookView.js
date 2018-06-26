import React from 'react';

import {Grid, Row, Col} from 'react-bootstrap';
import BookDetail from './BookDetail';
import SideNavigation from './SideNavigation';

class BodyBookView extends React.Component {
    
    render() {
        var styles = {
        };
      
        return(
            <Grid>
                <Row>
                    <Col md={2}>
                        <SideNavigation />
                    </Col>
                    <Col md={8}>
                        <BookDetail 
                            code={this.props.code}
                            />
                    </Col>
                    <Col md={2}>
                        <img src="https://picsum.photos/195/500" style={styles.rightside}/>
                    </Col>
                </Row>                
            </Grid>
        )
    }
}

export default BodyBookView;