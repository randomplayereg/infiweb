import React from 'react';

import {Carousel, Grid, Row, Col, Image} from 'react-bootstrap';

import './SpotlightM.css';

class SpotlightM extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <Grid
                // style={{display: 'flex'}}
            >
                <Row>
                    <Carousel
                        interval={0}>
                        <Carousel.Item>
                            <img width={900} height={500} alt="900x500" src="../images/spotlight1.jpg" />
                            <Carousel.Caption>
                                <h3>First slide label</h3>
                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img width={900} height={500} alt="900x500" src="../images/spotlight2.jpg" />
                            <Carousel.Caption>
                                <h3>Second slide label</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img width={900} height={500} alt="900x500" src="../images/spotlight3.jpg" />
                            <Carousel.Caption>
                                <h3>Third slide label</h3>
                                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </Row>
                <Row className="cardDiv">
                    <div className={"card"}>
                    <Image height={300} src="../images/marker_blue.png" thumbnail/>
                    </div>
                    <div className={"card"}>
                    <Image height={300} src="../images/spotlight1.jpg" thumbnail/>
                    </div>
                    <div className={"card"}>
                    <Image height={300} src="../images/ad3.jpg" thumbnail/>
                    </div>
                </Row>
            </Grid>
        )
    }
}

export default SpotlightM;