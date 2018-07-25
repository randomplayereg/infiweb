//eslint-disable import/first

import React from 'react';
import { Container, Row, Col, Card, CardBody, Button } from "mdbreact";
import '../css/ad.css';
import CrossfadeImage from "react-crossfade-image";
import ImageGallery from 'react-image-gallery';

const img_url = {
    img1: `https://vietnambiz.vn/stores/news_dataimages/trangth/082017/08/21/in_article/2426_pnc-khaitruong-2.jpg`,
    img2: `http://bizweb.dktcdn.net/100/060/876/files/tan-viet-01.jpg`,
    img3: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3eQ6-CfKaFcQHLfQXapQILr5DLSnCkQRz0iwKnVQhBlePmEW2`,
    img4: `http://static.asiawebdirect.com/m/.imaging/1140x760/website/bangkok/portals/bangkok-com/homepage/magazine/best-currency-exchanges/pagePropertiesImage.jpg`,
    img5: `https://www.bookworks.com/wp-content/uploads/user/5668/books-crop.jpg`,
    img6: `http://thegioibantin.com/wp-content/uploads/2013/11/hi-852-generic-books-8col.jpg`,
    img7: `http://waynehastings.com/wp-content/uploads/2014/11/book_category.jpg`,
    img8: `https://dbbaifpm4v92h.cloudfront.net/assets/splash/brand/tga/catholic_bible.jpg`
};

const part1 = [
    {
        original: img_url.img1,
        thumbnail: img_url.img1,
        originalClass: "fixed-size"
    },
    {
        original: img_url.img2,
        thumbnail: img_url.img2,
        originalClass: "fixed-size"
    },
    {
        original: img_url.img3,
        thumbnail: img_url.img3,
        originalClass: "fixed-size"
    }
];


const part2 = [
    img_url.img4,
    img_url.img5,
];

const part3 = [
    img_url.img6,
    img_url.img7,
    img_url.img8,
];

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fade2: 0,
            fade3: 0
        }
    }

    componentDidMount() {
        setInterval(
            () => {
                if (this.state.fade2 === 0) {
                    this.setState({
                        fade2: 1
                    })
                } else {
                    this.setState({
                        fade2: 0
                    })
                }
            },
            2000
        );

        setInterval(
            () => {
                if (this.state.fade3 === 0) {
                    this.setState({
                        fade3: 1
                    })
                } else {
                    this.setState({
                        fade3: 0
                    })
                }
            },
            2000
        )
    }

    render() {



        return (
            <Row className={"mt-3"}>
                <Col md="8">
                    <Row>
                        <Col md={12}>
                            <ImageGallery
                                items={part1}
                                showNav={false}
                                showThumbnails={false}
                                showFullscreenButton={false}
                                showPlayButton={false}
                                showBullets={false}
                                showIndex={false}
                                autoPlay={true}
                                slideInterval={3000}
                                infinite={true}
                            />
                        </Col>
                    </Row>
                    <Row className={"mt-3"}>
                        <Col md={6}>
                            <CrossfadeImage
                                src={part2[this.state.fade2]}
                                style={{
                                    width: "490px",
                                    maxHeight: "275px"
                                }}
                                />
                        </Col>
                        <Col md={6}>
                            <CrossfadeImage
                                src={part3[this.state.fade3]}
                                style={{
                                    width: "490px",
                                    maxHeight: "275px",
                                    border: "solid 1px purple"
                                }}
                            />
                        </Col>
                    </Row>
                </Col>
                <Col md="4"
                // test
                    style={{height: "500px", backgroundColor: "orange"}}
                >
                    Space
                </Col>
            </Row>
        )
    }
}