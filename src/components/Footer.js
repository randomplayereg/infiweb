import React from 'react';
import Info from "./Footer/Info";
import Copyright from "./Footer/Copyright";

class Footer extends React.Component {
    render() {
        return(
            <div>
                <hr/>
                <Info/>
                <Copyright/>
            </div>
        )
    }
}

export default Footer;