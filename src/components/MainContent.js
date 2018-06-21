import React from 'react';

import {Grid, Row, Col, Panel, Button} from 'react-bootstrap';
import CardGrid from './CardGrid';

class MainContent extends React.Component {
    
    render() {

        var styles = {
            fill: {
                color: 'red',
                backgroundColor: 'red'
            },
            flexbox: {
                display: 'flex',
                backgroundColor: 'yellow'
            },
            split: {
                width: '100%'
            },
            contain: {
                display: 'inline'
            }            
        };
      
        return(
            <Grid fluid>
                <Row>
                    <Col md={6}>
                        <Panel bsStyle="success" style={styles.split}>
                            <Panel.Heading>
                                <Panel.Title componentClass="h3">Chia se</Panel.Title>
                            </Panel.Heading>
                            <Panel.Body>
                                <p>Infibook là nơi để bạn có thể chia sẻ sách của mình với mọi người!</p>
                                <Button bsStyle="primary">Chia sẻ ngay!</Button>
                            </Panel.Body>
                        </Panel>
                    </Col>
                    <Col md={6}>
                        <Panel bsStyle="info" style={styles.split}>
                            <Panel.Heading>
                                <Panel.Title componentClass="h3">Chia se</Panel.Title>
                            </Panel.Heading>
                            <Panel.Body>
                                <p>Infibook là nơi để bạn có thể chia sẻ sách của mình với mọi người!</p>
                                <Button bsStyle="primary">Chia sẻ ngay!</Button>
                            </Panel.Body>
                        </Panel>
                    </Col>                    
                </Row>
                <Row>
                    <h1>Cac cuon sach duoc chia se nhieu...</h1>
                    <CardGrid/>
                </Row>
            </Grid>
        )
    }
}

export default MainContent;