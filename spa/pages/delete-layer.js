import React from 'react';
import app from 'ampersand-app'
import ampersandMixin from 'ampersand-react-mixin';
import MessagePage from './message';

export default React.createClass({
    mixins: [ampersandMixin],

    displayName: 'LayerDeletePage',

    onClickDelete () {
      const {layer} = this.props
      layer.destroy({
        success: function () {
          app.router.redirectTo('/layers');
        },
        error: function () {
          app.router.renderPage(<MessagePage title='Error deleting layer.' />);
        },
      });

    },

    render () {
        const {layer} = this.props

        return (
            <div className='container'>
              <h2>Are you sure you want to delete {layer.title} layer?</h2>
              <button type='button' className='button button-warn' onClick={this.onClickDelete}>Delete</button>
              <br/>
              <br/>
              <a href="/layers">Return to Layers</a>
            </div>
        )
    }
})
