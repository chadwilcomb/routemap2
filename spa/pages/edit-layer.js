import React from 'react';
import app from 'ampersand-app'
import ampersandMixin from 'ampersand-react-mixin';
import MessagePage from './message';

export default React.createClass({
    mixins: [ampersandMixin],

    displayName: 'LayerEditPage',

    onSubmitForm (event) {
        event.preventDefault();
        const {layer} = this.props;
        app.router.renderPage(<MessagePage title='Saving layer details...' />);
        layer.save(this.state, {
          success: function () {
            app.router.redirectTo('/layers');
          },
          error: function () {
            app.router.renderPage(<MessagePage title='Error saving layer.' />);
          },
        });
    },

    // onPropChange (event) {
    //   const {name, value, type} = event.target;
    //   let state = {};
    //   state[name] = type === 'number' ? parseInt(value, 10) : value;
    //   this.setState(state);
    // },
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

    render () {
        const {layer} = this.props

        return (
          <div>
            <h1>Edit Layer</h1>
            <form name='createLayerForm' onSubmit={this.onSubmitForm}>
              <fieldset>
                <legend>Layer Info</legend>

                <div className='form-element'>
                  <label htmlFor='title'>Title</label>
                  <input onChange={this.onPropChange} defaultValue={layer.title} id='title' name='title' type='text' placeholder='Title' className='form-input' required/>
                </div>

                <div className='form-element'>
                  <label htmlFor='description'>Description</label>
                  <input onChange={this.onPropChange} defaultValue={layer.description} id='description' name='description' type='text' placeholder='Description' className='form-input' required/>
                </div>

                <div className='form-element'>
                  <label htmlFor='features'>Features</label>
                  <textarea rows='8' onChange={this.onPropChange} defaultValue={JSON.stringify(layer.features)} id='features' name='features' type='text' placeholder='Copy/Paste GeoJSON here' className='form-input' required/>
                </div>

                <button type='submit' className='button button-primary'>Save Changes</button>
                <button type='reset' className='button button-neutral'>Reset</button>

              </fieldset>
            </form>
          </div>
        )
    }
});
