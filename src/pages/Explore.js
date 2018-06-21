import React from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import MyFancyComponent from "../components/MyFancyComponent";
import DemoGeo from "../components/DemoGeo";

class Explore extends React.Component {
    render() {
        return(
            <div>
                <Header/>
                <div>Explore</div>
                <MyFancyComponent/>
                <DemoGeo/>
                <Footer/>
            </div>
        )
    }
}

export default Explore;