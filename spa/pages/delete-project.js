import React from 'react';
import app from 'ampersand-app'
import ampersandMixin from 'ampersand-react-mixin';
import MessagePage from './message';

export default React.createClass({
    mixins: [ampersandMixin],

    displayName: 'ProjectDeletePage',

    onClickDelete () {
      const {project} = this.props
      project.destroy({
        success: function () {
          app.router.redirectTo('/projects');
        },
        error: function (model, response) {
          console.log(response);
          app.router.renderPage(<MessagePage title='Error deleting project.' />);
        },
      });

    },

    render () {
        const {project} = this.props

        return (
            <div>
              <h2>Are you sure you want to delete {project.title} project?</h2>
              <button type='button' className='button button-warn' onClick={this.onClickDelete}>Delete</button>
              <br/>
              <br/>
              <a href="/projects">Return to Projects</a>
            </div>
        )
    }
})
