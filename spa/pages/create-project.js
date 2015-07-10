import React from 'react';
import app from 'ampersand-app'
import ampersandMixin from 'ampersand-react-mixin';
import MessagePage from './message';

export default React.createClass({

    mixins: [ampersandMixin],

    displayName: 'ProjectCreatePage',

    onSubmitForm (event) {
        event.preventDefault();
        const _this = this;
        const {project} = this.props;

        app.router.renderPage(<MessagePage title='Saving project details...' />);

        project.save(_this.state, {
          success: function () {
            app.router.redirectTo('/projects');
          },
          error: function (model, response) {
            console.log(response);
            app.router.renderPage(<MessagePage title='Error saving project.' />);
          },
        });
    },

    onPropChange (event) {
      const {name, value, type} = event.target;
      let state = {};
      state[name] = type === 'number' ? parseInt(value, 10) : value;
      this.setState(state);
    },

    getInitialState () {
      return {
        title: '',
        description: '',
        state: 'staged',
        error: ''
      };
    },

    render () {
      const {title,description,state,error} = this.state;

      return (
        <div>
          <h1>Add a project</h1>
          <form name='createProjectForm' onSubmit={this.onSubmitForm}>
            <fieldset>
              <legend>Project Info</legend>

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
                <label htmlFor='state'>State</label>
                <select onChange={this.onPropChange} id='state' name='state' className='form-input'>
                  <option value='staged'>Staged</option>
                  <option value='live'>Live</option>
                </select>
              </div>

              <button type='submit' className='button button-primary'>Create!</button>

            </fieldset>
          </form>
        </div>
      )
    }
})
