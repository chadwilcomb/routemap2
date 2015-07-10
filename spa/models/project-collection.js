import Collection from 'ampersand-rest-collection';
import app from 'ampersand-app';
import Project from './project';
import authMixin from '../helpers/api-auth-mixin';

export default Collection.extend(authMixin, {

    url () {
      return app.apiUrl + '/api/projects';
    },

    model: Project,

    mainIndex: '_id',

});
