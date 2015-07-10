import React from 'react';
import ampersandMixin from 'ampersand-react-mixin';

export default React.createClass({
    mixins: [ampersandMixin],

    displayName: 'ProjectsPage',

    render () {
        const {projects} = this.props;
        return (
          <div>
            <h1>Projects</h1>
            <table className='table-with-hover'>
              <thead>
                <tr><th></th><th>Title</th><th>Description</th><th>State</th><th>Modified On</th><th></th><th></th><th></th></tr>
              </thead>
              <tbody>
              {projects.map((project) => {
                return (
                  <tr key={project._id}>
                  <td><a href={project.details_url} title='Details'><i className='fa fa-globe'></i></a></td>
                    <td><a href={project.details_url} title='Details'>{project.title}</a></td>
                    <td>{project.description}</td>
                    <td>{project.state}</td>
                    <td>{project.modified.toLocaleString()}</td>
                    <td><a href={project.update_url} className='fa fa-pencil color green' title='Edit'></a></td>
                    <td><a href={project.delete_url} className='fa fa-trash-o color red' title='Delete'></a></td>
                  </tr>
                )
              })}
              </tbody>
            </table>
            <a href='projects/create' className='button button-outlined'><i className='fa fa-plus'></i> Add a project</a>
          </div>
        )
    }
});
