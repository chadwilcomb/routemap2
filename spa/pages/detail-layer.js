import React from 'react';
import ampersandMixin from 'ampersand-react-mixin';

export default React.createClass({

  mixins: [ampersandMixin],

  displayName: 'LayerDetailPage',

  render () {

    const {layer} = this.props

    return (
      <div className='container'>
        <p>Title: <strong>{layer.title}</strong></p>
        <p>Description: <strong>{layer.description}</strong></p>
        <p>Features: <i>{JSON.stringify(layer.features)}</i></p>
        <a href="/layers">Return to Layers</a>
      </div>
    )
  }
});
