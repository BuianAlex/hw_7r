import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => (
  <div>
    <img className="mark" src={'./img/' + text} alt="mark" />
  </div>
);

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 12
  };

  render() {
    console.log(this.props);
    
    return (
      <>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAqlBsm7HZc5gk_UhchSTQOlPmKQz5Gc2c" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={this.props.center.lat}
            lng={this.props.center.lng}
            text="map_pin.svg"
          />
        </GoogleMapReact>
      </>
    );
  }
}

export default SimpleMap;
