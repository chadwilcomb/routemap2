import Collection from 'ampersand-rest-collection';
import app from 'ampersand-app';
import Layer from './layer';
import authMixin from '../helpers/api-auth-mixin';

export default Collection.extend(authMixin, {

    url () {
      return app.apiUrl + '/api/layers';
    },

    model: Layer,

    mainIndex: '_id',

});
