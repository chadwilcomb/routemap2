import React from 'react';
import ampersandMixin from 'ampersand-react-mixin';
import LayersTable from '../components/layers-table';

export default React.createClass({

  mixins: [ampersandMixin],

  displayName: 'ProjectDetailPage',

  render () {

    const {project} = this.props

    return (
      <div className='details-page'>
        <h1 style={{ marginBottom: '0' }}>{project.title}</h1>
        <div className='grid-flex-container'>
          <div className='grid-flex-cell'>
            Description: <strong>{project.description}</strong>
          </div>
          <div className='grid-flex-cell'>
            State: <strong>{project.state}</strong>
          </div>
        </div>
        <div className='grid-flex-container'>
          <div className='grid-flex-cell'>
            Created On: <strong>{project.created.toLocaleString()}</strong>
          </div>
          <div className='grid-flex-cell'>
            Created By: <strong>{project.creator.email}</strong>
          </div>
        </div>
        <div className='grid-flex-container'>
          <div className='grid-flex-cell'>
            Modified On: <strong>{project.modified.toLocaleString()}</strong>
          </div>
          <div className='grid-flex-cell'>
            Modified By: <strong>{project.modifier.email}</strong>
          </div>
        </div>
        <div className='grid-flex-container'>
          <div className='grid-flex-cell'>
            <h3 style={{ marginBottom: '0' }}>Project Layers:</h3>
            <LayersTable layers={project.layers} />
          </div>
        </div>
        <div>
          <a href={project.update_url} className='button button-approve'>Edit Project</a>
        </div>
        <a href="/projects">Return to Projects</a>
      </div>
    )
  }
});
