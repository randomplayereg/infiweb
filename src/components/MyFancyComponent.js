import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAQDOsz5Zdwks9zGw9lfDfW4LiNaP_tIV0&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px`, width: `600px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
)
(
    (props) =>
    <GoogleMap
        defaultZoom={15}
        defaultCenter={{ lat: 10.773659, lng: 106.694152}}
        center={{ lat: props.lat, lng: props.lng}}
    >
        {/*{props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} onClick={props.onMarkerClick} />}*/}
        <Marker 
            position={{ lat: props.lat, lng: props.lng }} 
            onClick={props.onMarkerClick}/>
    </GoogleMap>
);

class MyFancyComponent extends React.PureComponent {
    state = {
        isMarkerShown: true,
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

    render() {
        return (
            <MyMapComponent
                isMarkerShown={this.state.isMarkerShown}
                onMarkerClick={this.handleMarkerClick}
                lat={this.props.lat}
                lng={this.props.lng}
            />
        )
    }
}

export default MyFancyComponent;