import Model from 'ampersand-model';
import app from 'ampersand-app'
import User from './user.js'
import authMixin from '../helpers/api-auth-mixin';
import LayerCollection from './layer-collection'

export default Model.extend(authMixin, {

  url () {
    let url = app.apiUrl + '/api/projects/';
    if (this.isNew()) {
      return url;
    } else {
      return url + this.getId();
    }
    return url;
  },

  idAttribute: '_id',

  props: {
    _id: 'string',
    title: 'string',
    description: 'string',
    state: { type: 'string', required: true, default: 'staged', values: ['staged', 'live'], allowNull: false },
    creator: User,
    created: 'date',
    modifier: User,
    modified: 'date'
  },

  collections: {
    layers: LayerCollection
  },

  derived: {
    details_url: {
      deps: ['id'],
      fn () {
        return '/projects/' + this.getId();
      }
    },
    update_url: {
      deps: ['id'],
      fn () {
        return '/projects/edit/' + this.getId();
      }
    },
    delete_url: {
      deps: ['id'],
      fn () {
        return '/projects/delete/' + this.getId();
      }
    }
  },

  fetch () {
    Model.prototype.fetch.apply(this, arguments);
  }
});
