import React from 'react';
import app from 'ampersand-app'
import ampersandMixin from 'ampersand-react-mixin';
import MessagePage from './message';
import LayerSelector from '../components/layers-selector';

export default React.createClass({
    mixins: [ampersandMixin],

    displayName: 'ProjectEditPage',

    onSubmitForm (event) {
        event.preventDefault();
        const {project} = this.props;
        app.router.renderPage(<MessagePage title='Saving project details...' />);
        project.save(this.state, {
          success: function () {
            app.router.redirectTo('/projects');
          },
          error: function () {
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

    render () {
        const {project, layers} = this.props;

        return (
          <div>
            <h1>Edit Project</h1>
            <form name='createProjectForm' onSubmit={this.onSubmitForm}>
              <fieldset>
                <legend>Project Info</legend>

                <div className='form-element'>
                  <label htmlFor='title'>Title</label>
                  <input onChange={this.onPropChange} defaultValue={project.title} id='title' name='title' type='text' placeholder='Title' className='form-input' required/>
                </div>

                <div className='form-element'>
                  <label htmlFor='description'>Description</label>
                  <input onChange={this.onPropChange} defaultValue={project.description} id='description' name='description' type='text' placeholder='Description' className='form-input' required/>
                </div>

                <div className='form-element'>
                  <label htmlFor='state'>State</label>
                  <select onChange={this.onPropChange} defaultValue={project.state} id='state' name='state' className='form-input'>
                    <option value='staged'>Staged</option>
                    <option value='live'>Live</option>
                  </select>
                </div>

                <LayerSelector layers={layers} project={project} />

                <button type='submit' className='button button-primary'>Save Changes</button>
                <button type='reset' className='button button-neutral'>Reset</button>

              </fieldset>
            </form>
          </div>
        )
    }
});
