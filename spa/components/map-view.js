import app from 'ampersand-app'
import React from 'react'
import L from 'mapbox.js'

export default React.createClass({
    displayName: 'MapView',

    componentDidMount: function() {

      const {features} = this.props;
      if (features.features.length > 1000) {
        features.features = features.features.slice(0,1000);
      }

      L.mapbox.accessToken = 'pk.eyJ1IjoibmV3ZmllbGRzIiwiYSI6Ikk3TmFfYWMifQ.yxfeME9vJaT2GyCbnzsBzw';

      const map = this.map = L.mapbox.map(this.getDOMNode(), 'examples.map-i86nkdio');
      const layer = L.mapbox.featureLayer(features).addTo(map);
      map.fitBounds(layer.getBounds());
      // map.on('click', this.onMapClick);
      // map.fitWorld();
    },
    componentWillUnmount: function() {
        // this.map.off('click', this.onMapClick);
        this.map = null;
    },
    onMapClick: function() {
        // Do some wonderful map things...
    },

    render () {
        return (
            <div className='map' style={{ height: '500px' }} ></div>
        )
    }
})
