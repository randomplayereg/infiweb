import React from 'react';

import Header from "../components/Header";
import Footer from "../components/Footer";
import BodyShelf from '../components/BodyShelf';

class Shelf extends React.Component {
    render() {        
        return(
            <div>
                <Header/>
                <BodyShelf
                    language={this.props.language}
                    category={this.props.category}/>
                <Footer/>
            </div>
        )
    }
}

export default Shelf;