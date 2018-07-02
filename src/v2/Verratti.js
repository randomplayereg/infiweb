import React from 'react';
import NavigationM from "./NavigationM";
import SpotlightM from "./SpotlightM";

class Verratti extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return(
            <div>
                <NavigationM
                    clicked={'Home'}/>
                <SpotlightM />
            </div>
        )
    }
}

export default Verratti;