import React from 'react';

import {Grid, Row, Col, Thumbnail, Glyphicon, Button} from 'react-bootstrap';

class UserCorner extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {        

        const styles = {
            container: {
                border: '2px solid red',
                padding: '5px'
            },
            pullRight: {
                float: 'right'
            }
        }

        return(
            <Grid fluid>            
                <Row>
                    <div style={styles.pullRight}>
                        <Button 
                            // style={{backgroundColor: 'red'}}
                            >
                            <Glyphicon glyph="pencil"  />
                        </Button>
                    </div>
                </Row>
                <Row style={styles.container}>
                    <Col md={2}>
                        <Thumbnail alt="200x200" src="https://picsum.photos/200/200"/>
                    </Col>
                    <Col md={10}>
                        <h4>Khong tu</h4>
                        <h4>Chinh xac tung con chim</h4>
                        <h4>1001 duong Jesus, quan Zorro, thanh pho Superman</h4>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default UserCorner;