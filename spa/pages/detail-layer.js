import React from 'react';
import ampersandMixin from 'ampersand-react-mixin';
import MapView from '../components/map-view';

export default React.createClass({

  mixins: [ampersandMixin],

  displayName: 'LayerDetailPage',

  render () {

    const {layer} = this.props

    return (
      <div>
        <h1 style={{ marginBottom: '0' }}>{layer.title}</h1>
        <div>Description: <strong>{layer.description}</strong></div>
        <div>Created: <strong>{layer.created.toLocaleString()}</strong></div>

        <MapView features={layer.features}/>

        <a href="/layers">Return to Layers</a>
      </div>
    )
  }
});
