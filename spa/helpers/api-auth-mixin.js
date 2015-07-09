import app from 'ampersand-app';

export default {
  ajaxConfig () {
    if (!app.me.isRegister) {
      return {
        headers: app.me.authHeader,
        timeout: 20000
      }
    }
  }
}
