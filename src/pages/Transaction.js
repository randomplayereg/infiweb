import React from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import BodyTransaction from '../components/BodyTransaction';

class Transaction extends React.Component {
    render() {
        return(
            <div>
                <Header/>
                <BodyTransaction />
                <Footer/>
            </div>
        )
    }
}

export default Transaction;