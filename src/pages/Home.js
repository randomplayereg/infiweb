import React from 'react';
import Spotlight from "./Home/Spotlight";
import Header from "../components/Header";
import Footer from "../components/Footer";

class Home extends React.Component {
    render() {
        return(
            <div>
                <Header/>
                <Spotlight/>
                <Footer/>
            </div>
        )
    }
}

export default Home;