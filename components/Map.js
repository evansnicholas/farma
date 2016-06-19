import React from "react";

export default class Map extends React.Component {
  getDisplayName() {
    return "Map";
  }

  constructor(props) {
    super(props);
    this.initMap = this.initMap.bind(this);
    this.map = null;
  }

  initMap(ref) {
    this.map = new google.maps.Map(ref, {
      center: {lat: 50, lng: 0},
      scrollwheel: false,
      zoom: 2
    });

    const onSelectCountry = this.props.onSelectCountry;

    this.map.addListener('click', function(event) {
      onSelectCountry(event.latLng);
    });
  }

  render() {
    return (
      <div className="map" ref={(ref) => {
        if (ref !== null && this.map === null) {
          this.initMap(ref);
        }
      }} />
    );
  }
}
