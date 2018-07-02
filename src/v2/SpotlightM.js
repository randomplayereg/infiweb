import React from 'react';

import {Carousel, Grid, Row, Col, Image} from 'react-bootstrap';

import './SpotlightM.css';

class SpotlightM extends React.Component {
    constructor(props){
        super(props);
    }



    render() {
        const carour = [
            `http://static.asiawebdirect.com/m/.imaging/1140x760/website/bangkok/portals/bangkok-com/homepage/magazine/best-currency-exchanges/pagePropertiesImage.jpg`,
            `https://www.bookworks.com/wp-content/uploads/user/5668/books-crop.jpg`,
            `http://thegioibantin.com/wp-content/uploads/2013/11/hi-852-generic-books-8col.jpg`,
            `https://vietnambiz.vn/stores/news_dataimages/trangth/082017/08/21/in_article/2426_pnc-khaitruong-2.jpg`,
            `http://bizweb.dktcdn.net/100/060/876/files/tan-viet-01.jpg`,
            `https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS3eQ6-CfKaFcQHLfQXapQILr5DLSnCkQRz0iwKnVQhBlePmEW2`
        ];

        return (
            <Grid
                // style={{display: 'flex'}}
            >
                <Row>
                    <Carousel
                        interval={2000}>
                        <Carousel.Item>
                            <img width={900} height={500} alt="900x500" src={carour[0]} />
                            <Carousel.Caption>
                                {/*<h3>First slide label</h3>*/}
                                {/*<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>*/}
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img width={900} height={500} alt="900x500" src={carour[1]} />
                            <Carousel.Caption>
                                {/*<h3>Second slide label</h3>*/}
                                {/*<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>*/}
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img width={900} height={500} alt="900x500" src={carour[2]} />
                            <Carousel.Caption>
                                {/*<h3>Third slide label</h3>*/}
                                {/*<p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>*/}
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </Row>
                <Row className="cardDiv">
                    <div className={"card"}>
                    <Image height={300} src={carour[3]} thumbnail/>
                    </div>
                    <div className={"card"}>
                    <Image height={300} src={carour[4]} thumbnail/>
                    </div>
                    <div className={"card"}>
                    <Image height={300} src={carour[5]} thumbnail/>
                    </div>
                </Row>
            </Grid>
        )
    }
}

export default SpotlightM;