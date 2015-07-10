import React from 'react';
import ampersandMixin from 'ampersand-react-mixin';

export default React.createClass({
    mixins: [ampersandMixin],

    displayName: 'LayersTable',

    render () {
        const {layers} = this.props;
        return (
            <table className='table-with-hover'>
              <thead>
                <tr><th>Title</th><th>Description</th><th>Created By</th><th>Created On</th><th>Modified By</th><th>Modified On</th><th></th><th></th><th></th></tr>
              </thead>
              <tbody>
              {layers.map((layer) => {
                return (
                  <tr key={layer._id}>
                    <td>{layer.title}</td>
                    <td>{layer.description}</td>
                    <td>{layer.creator.email}</td>
                    <td>{layer.created.toLocaleString()}</td>
                    <td>{layer.modifier.email}</td>
                    <td>{layer.modified.toLocaleString()}</td>
                    <td><a href={layer.details_url} className='fa fa-globe' title='Details'></a></td>
                    <td><a href={layer.update_url} className='fa fa-pencil color green' title='Edit'></a></td>
                    <td><a href={layer.delete_url} className='fa fa-trash-o color red' title='Delete'></a></td>
                  </tr>
                )
              })}
              </tbody>
            </table>
        )
    }
});
