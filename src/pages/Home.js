import React from 'react';
import Spotlight from "./Home/Spotlight";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Body from '../components/Body';

class Home extends React.Component {
    render() {
        return(
            <div>
                <Header/>
                <Body/>
                <Footer/>
            </div>
        )
    }
}

export default Home;