import React from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";

class Transaction extends React.Component {
    render() {
        return(
            <div>
                <Header/>
                <p>transaction</p>
                <Footer/>
            </div>
        )
    }
}

export default Transaction;