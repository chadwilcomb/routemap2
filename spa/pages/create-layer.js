import React from 'react';
import app from 'ampersand-app'
import ampersandMixin from 'ampersand-react-mixin';
import geojsonValidate from 'geojson-validation';
import MessagePage from './message';

export default React.createClass({

    mixins: [ampersandMixin],

    displayName: 'LayerCreatePage',

    onSubmitForm (event) {
        event.preventDefault();
        const _this = this;
        const {layer} = this.props;
        geojsonValidate.valid(this.state.features, function (valid, errors) {
          if (!valid) {
            const errMsg = errors.map((error) => { return error.mesage + ' '; });
            _this.setState({
              error: 'Invalid GeoJSON: ' + errMsg
            });
          } else {
            app.router.renderPage(<MessagePage title='Saving layer details...' />);
            layer.save(_this.state, {
              success: function () {
                app.router.redirectTo('/layers');
              },
              error: function (model, response) {
                console.log(response);
                app.router.renderPage(<MessagePage title='Error saving layer.' />);
              },
            });
          }
        });
    },

    onPropChange (event) {
      const {name, value, type} = event.target;
      let state = {};
      if (value && name === 'features') {
        try {
          state[name] = JSON.parse(value);
          this.setState({ error: ''});
        }
        catch (err) {
          this.setState({
            error: 'Invalid GeoJSON: ' + err.message
          });
        }
      } else {
        state[name] = value;
      }
      this.setState(state);
    },

    getInitialState () {
      return {
        title: '',
        description: '',
        features: '',
        error: ''
      };
    },

    render () {
      const {title,description,features,error} = this.state;

      return (
        <div>
          <h1>Add a layer</h1>
          <form name='createLayerForm' onSubmit={this.onSubmitForm}>
            <fieldset>
              <legend>Layer Info</legend>

              <div className={error ? 'message message-error' : 'hidden'}>{error}</div>

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
