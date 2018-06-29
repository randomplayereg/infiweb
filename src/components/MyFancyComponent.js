import React from "react"
import { compose, withProps, lifecycle } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAQDOsz5Zdwks9zGw9lfDfW4LiNaP_tIV0&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px`, width: `100%` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap,
    lifecycle({
        componentDidMount() {            
            this.props.geodude();
        }
    })
)
(
    (props) =>
    <GoogleMap
        defaultZoom={15}
        defaultCenter={{ lat: 10.773659, lng: 106.694152}}
        center={{ lat: props.lat, lng: props.lng}}
        onClick={props.test}
    >
        {/*{props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} onClick={props.onMarkerClick} />}*/}
        <Marker 
            position={{ lat: props.lat, lng: props.lng }} 
            onClick={props.onMarkerClick}/>
    </GoogleMap>
);

class MyFancyComponent extends React.PureComponent {

    constructor(props) {
        super(props);

        this.geodude = this.geodude.bind(this);
    }

    state = {
        isMarkerShown: true,
        lat: 10.773659,
        lng: 106.694152
    }

    componentDidMount() {
        // this.delayedShowMarker()        
    }

    delayedShowMarker = () => {
        // setTimeout(() => {
        //     this.setState({ isMarkerShown: true })
        // }, 3000)
    }

    handleMarkerClick = () => {
        // this.setState({ isMarkerShown: false })
        // this.delayedShowMarker()
    }

    geodude() {
        let geocoder = new window.google.maps.Geocoder();

        var self = this;
        geocoder.geocode( { 'address': this.props.userAddress}, function(results, status) {
            if (status == 'OK') {
                const location = results[0].geometry.location;
                
                self.setState({
                    lat: location.lat(),
                    lng: location.lng()
                })
            } else {
                console.log('Geocode was not successful for the following reason: ' + status);
            }
        });
    }

    render() {



        return (
            <div>
                <MyMapComponent
                    isMarkerShown={this.state.isMarkerShown}
                    onMarkerClick={this.handleMarkerClick}
                    lat={this.state.lat}
                    lng={this.state.lng}
                    geodude={this.geodude}
                />
            </div>
        )
    }
}

export default MyFancyComponent;