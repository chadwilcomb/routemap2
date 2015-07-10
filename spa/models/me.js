import xhr from 'xhr'
import app from 'ampersand-app'
import Model from 'ampersand-model'
import ProjectCollection from './project-collection'
import LayerCollection from './layer-collection'
import authMixin from '../helpers/api-auth-mixin'

export default Model.extend(authMixin, {

  url () {
    let url = app.apiUrl + '/api/users/';
    if (this.isRegister) {
      return url;
    }
    return url + this.email;
  },

  initialize () {
    if (window.localStorage.me) {
      this.set(JSON.parse(window.localStorage.me));
    }
    this.on('change:email change:password', this.updateAuthHeader);
    this.on('change', this.syncToLocalStorage);
    this.on('sync', this.onSync);
  },

  props: {
    joined: 'date',
    email: 'string',
    password: 'string',
    firstName: 'string',
    lastName: 'string',
  },

  session: {
    authenticated: {
      type: 'boolean',
      default: false
    },
    isRegister: {
      type: 'boolean',
      default: false
    },
    authHeader: 'object'
  },

  collections: {
    projects: ProjectCollection,
    layers: LayerCollection
  },

  syncToLocalStorage () {
    window.localStorage.me = JSON.stringify({
      email: this.email,
      authHeader: this.authHeader,
      authenticated: this.authenticated
    });
  },

  updateAuthHeader () {
    this.authHeader = window.localStorage.authHeader = {
      Authorization: 'Basic ' + btoa(this.email + ":" + this.password)
    };
  },

  onSync (model, resp, options) {
    model.set({
      authenticated: true,
      isRegister: false
    });
  },

  fetchInitialData () {
    this.layers.fetch();
  }

});
