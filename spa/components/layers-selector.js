import React from 'react';
import ampersandMixin from 'ampersand-react-mixin';

export default React.createClass({
    mixins: [ampersandMixin],

    displayName: 'LayerSelector',

    onCheck (event) {
      const {name, value, type, checked} = event.target;
      const {layers, project} = this.props;
      const layer = layers.get(value);
      layer.selected = checked;
      if (!checked) {
        project.layers.remove(layer);
      } else {
        project.layers.add(layer);
      }

    },

    render () {
        const {layers, project} = this.props;

        return (
            <table className='table-with-hover'>
              <thead>
                <tr><th>Select</th><th>Title</th><th>Description</th><th>State</th></tr>
              </thead>
              <tbody>
              {layers.map((layer) => {
                layer.selected = !!project.layers.get(layer._id);
                return (
                  <tr key={layer._id}>
                    <td><input type='checkbox' className='selectLayer' name='layer_id' value={layer._id} defaultChecked={layer.selected} onChange={this.onCheck} /></td>
                    <td>{layer.title}</td>
                    <td>{layer.description}</td>
                    <td>{layer.state}</td>
                  </tr>
                )
              })}
              </tbody>
            </table>
        )
    }
});
