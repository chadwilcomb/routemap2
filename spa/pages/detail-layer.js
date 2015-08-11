import React from 'react';
import ampersandMixin from 'ampersand-react-mixin';
import MapView from '../components/map-view';

export default React.createClass({

  mixins: [ampersandMixin],

  displayName: 'LayerDetailPage',

  render () {

    const {layer} = this.props

    return (
      <div className='details-page'>
        <h1 style={{ marginBottom: '0' }}>{layer.title}</h1>
        <div className='grid-flex-container'>
          <div className='grid-flex-cell'>
            Description: <strong>{layer.description}</strong>
          </div>
        </div>
        <div className='grid-flex-container'>
          <div className='grid-flex-cell'>
            URL: <strong>{layer.url()}</strong>
          </div>
        </div>
        <div className='grid-flex-container'>
          <div className='grid-flex-cell'>
            Created by <strong>{layer.creator.email}</strong> on <strong>{layer.created.toLocaleString()}</strong>
          </div>
        </div>
        <div className='grid-flex-container'>
          <div className='grid-flex-cell'>
            Last modified by <strong>{layer.modifier.email}</strong> on <strong>{layer.modified.toLocaleString()}</strong>
          </div>
        </div>
        <MapView features={layer.features}/>

        <a href="/layers">Return to Layers</a>
      </div>
    )
  }
});
