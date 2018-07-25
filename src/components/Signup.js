import React from 'react';

import { Container, Row, Col, Input, Button, Fa, Card, CardBody } from 'mdbreact';

import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

import '../css/datepicker.css';

import { ruben } from "../Ruben";

export default class Signup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            birthday: null,
            gender: "Male"
        };

        this.onClickMale = this.onClickMale.bind(this);
        this.onClickFemale = this.onClickFemale.bind(this);
        this.handleChangeDate = (date) => {
            console.log(date);
            console.log(typeof(date));
            this.setState({
                birthday: date
            });
        }
    }

    onClickMale() {
        this.setState({gender: "Male"});
    }

    onClickFemale() {
        this.setState({gender: "Female"});
    }

    render() {
        return (
            <Container className={"d-flex justify-content-lg-center mt-3"}>
                <Row style={{minWidth: "512px"}}>
                    <Col md="12">
                        <Card>
                            <CardBody>
                                <form>
                                    <p className="h4 text-center py-4">{ruben.signup}</p>
                                    <div className="grey-text">
                                        <Input label={`${ruben.real_name}`} group type="text" validate error="wrong" success="right"/>
                                        <Input label={`${ruben.email}`} group type="email" validate error="wrong" success="right"/>
                                        <Input label={`${ruben.password}`} group type="password" validate error="wrong" success="right"/>
                                        <Input label={`${ruben.confirm_password}`} group type="password" validate/>

                                        <div className={"d-flex"}>
                                            <b>{ruben.gender}</b>
                                        </div>
                                        <div className={"row"}>
                                            <div className={"col"}>
                                                <Input onClick={this.onClickMale} checked={this.state.gender === "Male"} label={`${ruben.male}`} type="radio" />
                                            </div>
                                            <div className={"col"}>
                                                <Input onClick={this.onClickFemale} checked={this.state.gender === "Female"} label={`${ruben.female}`} type="radio" />
                                            </div>
                                        </div>

                                        <div className={"d-flex"}>
                                            <b>{ruben.birthday}</b>
                                        </div>
                                        <div className={"d-flex md-form form-group"}>
                                            <DatePicker
                                                selected={this.state.birthday}
                                                onChange={this.handleChangeDate}
                                                placeholderText={'DD/MM/YYYY'}
                                                dateFormat="DD/MM/YYYY"
                                                className={"md-form-input"}
                                                showMonthDropdown
                                                showYearDropdown
                                                dropdownMode="select"
                                            />
                                        </div>
                                    </div>
                                    <div className="text-center py-4 mt-3">
                                        <Button color="cyan" type="submit">{ruben.signup}</Button>
                                    </div>
                                </form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}