import React from 'react';

import Header from "../components/Header";
import Footer from "../components/Footer";
import BodyBookView from '../components/BodyBookView';

class BookView extends React.Component {
    render() {        
        return(
            <div>
                <Header/>
                <BodyBookView
                    code={this.props.code}
                    />
                <Footer/>
            </div>
        )
    }
}

export default BookView;