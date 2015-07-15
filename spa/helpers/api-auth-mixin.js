import app from 'ampersand-app';

export default {
  ajaxConfig () {
    return {
      headers: app.me.authHeader,
      xhrFields: {
        timeout: 20000
      }
    }
  }
}
