import React from 'react';

import {Steps} from 'primereact/components/steps/Steps';

class Tab extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="content-section implementation" style={styles.container}>
                    <h3>Clickable</h3>
                    <Steps model={this.props.items} activeIndex={this.props.activeIndex} readOnly={false} style={styles.step}/>
                </div>
            </div>
        );
    }
}

const styles = {
    container: {
        marginBottom: '25px'
    },
    step: {
        maxWidth: '100%',
        display: 'block'
    }
};

export default Tab;