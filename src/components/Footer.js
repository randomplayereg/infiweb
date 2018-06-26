import React from 'react';
import Info from "./Footer/Info";
import Copyright from "./Footer/Copyright";

class Footer extends React.Component {
    render() {
        const styles = {
            container: {
                marginTop: '400px'
            }
        }
        return(
            <div style={styles.container}>
                <hr/>
                <Info/>
                <Copyright/>
            </div>
        )
    }
}

export default Footer;