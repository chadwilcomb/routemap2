import app from 'ampersand-app'
import Model from 'ampersand-model'
import authMixin from '../helpers/api-auth-mixin'

export default Model.extend(authMixin, {

  url () {
    return app.apiUrl + '/api/users/' + this.email;
  },

  props: {
    email: 'string',
    firstName: 'string',
    lastName: 'string',
  }
  
});
