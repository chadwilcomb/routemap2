import Model from 'ampersand-model';
import app from 'ampersand-app'
import authMixin from '../helpers/api-auth-mixin';

export default Model.extend(authMixin, {

  url () {
    let url = app.apiUrl + '/api/layers/';
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
    features: 'object',
    created: 'date'
  },

  derived: {
    details_url: {
      deps: ['id'],
      fn () {
        return 'layers/' + this.getId();
      }
    },
    update_url: {
      deps: ['id'],
      fn () {
        return 'layers/edit/' + this.getId();
      }
    },
    delete_url: {
      deps: ['id'],
      fn () {
        return 'layers/delete/' + this.getId();
      }
    }
  },

  fetch () {
    Model.prototype.fetch.apply(this, arguments);
  }
});
