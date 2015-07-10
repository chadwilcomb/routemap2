import React from 'react';
import ampersandMixin from 'ampersand-react-mixin';
import LayersTable from '../components/layers-table';

export default React.createClass({
    mixins: [ampersandMixin],

    displayName: 'LayersPage',

    render () {
        const {layers} = this.props;
        return (
          <div>
            <h1>Layer Inventory</h1>

            <LayersTable layers={layers} />

            <a href='layers/create' className='button button-outlined'><i className='fa fa-plus'></i> Add a layer</a>
          </div>
        )
    }
});
