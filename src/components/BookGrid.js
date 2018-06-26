import React from 'react';

import './Card.css';

class BookGrid extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            bookItems: []
        }

        console.log(props);
    }

    // applyList() {
        
    // }

    // applyView(data) {
    //     return (
            
    //             <article className="card">
    //                 <header className="card__title">
    //                     <h3>Hello World</h3>
    //                 </header>
    //                 <figure className="card__thumbnail">
    //                     <img src="http://placekitten.com/700/287"/>
    //                 </figure>
    //                 <main className="card__description">
    //                     Lorem Ipsum dolor amet sun Lorem Ipsum dolor amet sun Lorem Ipsum dolor amet sun
    //                 </main>
    //                 <a href="#" className="button">Call to Action</a>
    //             </article>
    //     )
    // }

    render() {
        return(
            <section className="card-container">
                {this.state.bookItems}
            </section>
        )
    }
}

BookGrid.defaultProps = {
    language: 'VN',
    category: '01',
    subcategory: '01',
    bookItems: []
};

export default BookGrid;