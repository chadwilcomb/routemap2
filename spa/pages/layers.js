import React from 'react';
import ampersandMixin from 'ampersand-react-mixin';

export default React.createClass({
    mixins: [ampersandMixin],

    displayName: 'LayersPage',

    render () {
        const {layers} = this.props;

        return (
          <div>
            <h1>Layer Inventory</h1>
            <table className='table-with-hover'>
              <thead>
                <tr><th></th><th>Title</th><th>Description</th><th>Created</th><th></th><th></th></tr>
              </thead>
              <tbody>
              {layers.map((layer) => {
                return (
                  <tr key={layer._id}>
                    <td><span className='fa fa-globe'></span></td>
                    <td><a href={layer.details_url}>{layer.title}</a></td>
                    <td><a href={layer.details_url}>{layer.description}</a></td>
                    <td><a href={layer.details_url}>{layer.created.toLocaleString()}</a></td>
                    <td><a href={layer.update_url} className='fa fa-pencil color green'></a></td>
                    <td><a href={layer.delete_url} className='fa fa-trash-o color red'></a></td>
                  </tr>
                )
              })}
              </tbody>
            </table>
            <a href='layers/create' className='button button-outlined'><i className='fa fa-plus'></i> Add a layer</a>
          </div>
        )
    }
});
