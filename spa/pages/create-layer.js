import React from 'react';
import app from 'ampersand-app'
import ampersandMixin from 'ampersand-react-mixin';
import MessagePage from './message';

export default React.createClass({
    mixins: [ampersandMixin],

    displayName: 'LayerCreatePage',

    onSubmitForm (event) {
        event.preventDefault();
        const {layer} = this.props;
        layer.save(this.state, {
          success: function () {
            app.router.redirectTo('/layers');
          },
          error: function () {
            app.router.renderPage(<MessagePage title='Error saving layer.' />);
          },
        });
    },

    onPropChange (event) {
      const {name, value, type} = event.target;
      let state = {};
      state[name] = type === 'number' ? parseInt(value, 10) : value;
      this.setState(state);
    },

    render () {
        return (
          <div className='container'>
            <h1>Add a layer</h1>
            <form name='createLayerForm' onSubmit={this.onSubmitForm}>
              <fieldset>
                <legend>Layer Info</legend>

                <div className='form-element'>
                  <label htmlFor='title'>Title</label>
                  <input onChange={this.onPropChange} id='title' name='title' type='text' placeholder='Title' className='form-input' required/>
                </div>

                <div className='form-element'>
                  <label htmlFor='description'>Description</label>
                  <input onChange={this.onPropChange} id='description' name='description' type='text' placeholder='Description' className='form-input' required/>
                </div>

                <div className='form-element'>
                  <label htmlFor='features'>Features</label>
                  <textarea rows='8' onChange={this.onPropChange} id='features' name='features' type='text' placeholder='Copy/Paste GeoJSON here' className='form-input' required/>
                </div>

                <button type='submit' className='button button-primary'>Add!</button>

              </fieldset>
            </form>
          </div>
        )
    }
})
