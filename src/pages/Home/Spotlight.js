import React from 'react';
import {Jumbotron, Button} from 'react-bootstrap';
import {Container, Grid, Row, Col} from 'react-bootstrap';
import ControlledCarousel from "./Carousel";

class Spotlight extends React.Component {
    render() {
        return(
            <Grid>
                <Row>
                    <Col md={12}>
                        <Jumbotron style={styles.jumbo}>
                            <h1>Welcome to Infibook!</h1>
                            <p>
                                This site is under construction, please come back later :D
                            </p>
                            <p>
                                <Button bsStyle="primary">Learn more</Button>
                            </p>
                        </Jumbotron>
                    </Col>
                </Row>
                <Row>
                    <ControlledCarousel/>
                </Row>
            </Grid>
        )
    }
}

const bgImage = '/images/login_bg.jpeg';
const styles = {
    jumbo: {
        backgroundImage: `url(${bgImage})`,
        width: '100%'
    }
}

export default Spotlight;