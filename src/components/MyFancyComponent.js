/* eslint-disable no-undef */
import React from "react"
// import { compose, withProps, lifecycle } from "recompose"
// import { withScriptjs, withGoogleMap, GoogleMap, Marker, DirectionsRenderer } from "react-google-maps"

const { compose, withProps, lifecycle } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} = require("react-google-maps");

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
            this.props.onRef(this);

            if (this.props.routeFinding && this.props.routeFinding == true) {
                const DirectionsService = new google.maps.DirectionsService();

                DirectionsService.route({
                    origin: new google.maps.LatLng(this.props.origin.lat, this.props.origin.lng),
                    destination: new google.maps.LatLng(this.props.destination.lat, this.props.destination.lng),
                    travelMode: google.maps.TravelMode.DRIVING,
                }, (result, status) => {
                    if (status === google.maps.DirectionsStatus.OK) {
                    this.setState({
                        directions: result,
                    });
                    } else {
                    console.error(`error fetching directions ${result}`);
                    }
                });
            }
        },
        componentWillUnmount() {
            //TODO:
            // this.props.onRef(undefined);
        },
        componentWillMount() {
            const refs = {}
      
            this.setState({
                center: {
                    lat: 41.9, lng: -87.624
                },
                markers: [],
                onMapMounted: ref => {
                    refs.map = ref;
                },
                onCenterChanged: () => {
                    const newCenter = refs.map.getCenter();
                    this.setState({
                        center: {
                            lat: newCenter.lat(),
                            lng: newCenter.lng()
                        }
                    })
                },
            })
        }
    })
)
(
    (props) =>
    <GoogleMap
        ref={props.onMapMounted}
        onCenterChanged={props.onCenterChanged}

        defaultZoom={15}
        defaultCenter={{ lat: 10.773659, lng: 106.694152}}
        center={{ lat: props.lat, lng: props.lng}}        
        // containerElement={<div style={{ height: `200px`, width: `100%` }} />}
        
    >
        {props.showMarker && 
            <Marker 
                position={{ lat: props.lat, lng: props.lng }} 
                onClick={props.onMarkerClick}/>
        }

        {props.directions && <DirectionsRenderer directions={props.directions} />}
    </GoogleMap>
);

const MyOtherMapComponent = withScriptjs(
    withGoogleMap(
        (props) =>
            <GoogleMap
                defaultZoom={15}
                defaultCenter={{ lat: 10.773659, lng: 106.694152}}
                center={{ lat: props.lat, lng: props.lng}}        
                >
                {props.showMarker && 
                    <Marker 
                        position={{ lat: props.lat, lng: props.lng }} 
                        onClick={props.onMarkerClick}/>
                }
            </GoogleMap>
    )
)

class MyFancyComponent extends React.PureComponent {

    constructor(props) {
        super(props);

        this.geodude = this.geodude.bind(this);
        this.graveler = this.graveler.bind(this);
    }

    state = {
        lat: this.props.superLat ? this.props.superLat : 10.773659,
        lng: this.props.superLng ? this.props.superLng : 106.694152
    }

    componentDidMount() {
        // this.delayedShowMarker()             
        this.props.onRef(this);

    }

    componentWillUnmount() {
        // TODO:
        // this.props.onRef(undefined);
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

        var self = this;

        let geocoder = new window.google.maps.Geocoder();


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

    graveler() {

    }

    investigation() {
        debugger
        return(
            []
        )
    }

    render() {



        return (
            <div>
                {this.props.superLat && this.props.superLng ?
                    <MyMapComponent

                        showMarker={this.props.showMarker}

                        routeFinding={this.props.routeFinding}
                        origin={this.props.origin}
                        destination={this.props.destination}

                        onMarkerClick={this.handleMarkerClick}
                        lat={this.props.superLat}
                        lng={this.props.superLng}
                        geodude={this.graveler}

                        onRef={ref => this.child = ref}

                        // height={this.props.height}
                    />
                    :
                    <MyMapComponent

                        showMarker={this.props.showMarker}

                        routeFinding={this.props.routeFinding}
                        origin={this.props.origin}
                        destination={this.props.destination}

                        onMarkerClick={this.handleMarkerClick}
                        lat={this.state.lat}
                        lng={this.state.lng}
                        geodude={this.geodude}

                        onRef={ref => this.child = ref}

                        // height={this.props.height}
                    />

                }
                {/*<MyMapComponent*/}

                    {/*showMarker={this.props.showMarker}*/}

                    {/*routeFinding={this.props.routeFinding}*/}
                    {/*origin={this.props.origin}*/}
                    {/*destination={this.props.destination}*/}

                    {/*onMarkerClick={this.handleMarkerClick}*/}
                    {/*lat={this.state.lat}*/}
                    {/*lng={this.state.lng}*/}
                    {/*geodude={this.geodude}*/}

                    {/*onRef={ref => this.child = ref}*/}

                    {/*// height={this.props.height}*/}
                {/*/>*/}

                {/* <MyOtherMapComponent
                    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAQDOsz5Zdwks9zGw9lfDfW4LiNaP_tIV0&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: this.props.height, width: `100%` }} />}
                    mapElement={<div style={{ height: `100%` }} />}

                    showMarker={this.props.showMarker}

                    onMarkerClick={this.handleMarkerClick}
                    lat={this.state.lat}
                    lng={this.state.lng}
                    geodude={this.geodude}

                    /> */}
                {/* {this && this.child && this.investigation()} */}
            </div>
        )
    }
}

export default MyFancyComponent;