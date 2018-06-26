import React from 'react';

import './Card.css';
import ItemView from '../pages/Store/ItemView';

class CardGrid extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            level: props.level
        }
    }

    fetchData = async () => {
        // const api_call = async ("",)
    };

    card = (props) => {
        <article className="card">
            <figure className="card__thumbnail">
                <img src={props.image}/>
            </figure>
            <a href="#" className="button">{props.code}</a>
        </article>
    }

    render() {      

        var styles = {

        };

        var props = {
            image: "http://placekitten.com/700/287",
            title: "Yo",
            author: "weee"
        }

        return(
            <section className="card-container">
                <article className="card">
                    <header className="card__title">
                        <h3>Hello World</h3>
                    </header>
                    <figure className="card__thumbnail">
                        <img src="http://placekitten.com/700/287"/>
                    </figure>
                    <main className="card__description">
                        Lorem Ipsum dolor amet sun Lorem Ipsum dolor amet sun Lorem Ipsum dolor amet sun
                    </main>
                    <a href="#" className="button">Call to Action</a>
                </article>
                <article className="card">
                    <header className="card__title">
                        <h3>Hello World</h3>
                    </header>
                    <figure className="card__thumbnail">
                        <img src="http://placekitten.com/700/287"/>
                    </figure>
                    <main className="card__description">
                        Lorem Ipsum dolor amet sun Lorem Ipsum dolor amet sun Lorem Ipsum dolor amet sun
                    </main>
                    <a href="#" className="button">Call to Action</a>
                </article>
                <article className="card">
                    <header className="card__title">
                        <h3>Hello World</h3>
                    </header>
                    <figure className="card__thumbnail">
                        <img src="http://placekitten.com/700/287"/>
                    </figure>
                    <main className="card__description">
                        Lorem Ipsum dolor amet sun Lorem Ipsum dolor amet sun Lorem Ipsum dolor amet sun
                    </main>
                    <a href="#" className="button">Call to Action</a>
                </article>
            </section>
        )
    }
}

CardGrid.defaultProps = {
    level: 'VN01',
    cardList: null
};

export default CardGrid;