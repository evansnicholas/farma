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

    const onAddCountry = this.props.onAddCountry;

    this.map.addListener('click', function(event) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      onAddCountry("UK");
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
