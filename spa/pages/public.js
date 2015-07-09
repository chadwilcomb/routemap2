import React from 'react';
import app from 'ampersand-app';

export default React.createClass({
    displayName: 'PublicPage',

    getInitialState () {
        return {
            username: '',
            password: '',
            error: ''
        };
    },

    onSubmitForm (event) {
      var _this = this;
      event.preventDefault();

      _this.setState({ error: false });
      const {me} = this.props;

      me.set(this.state);

      me.fetch({
        error: function (model, response, options) {
          _this.setState({ error: 'Your username and/or password are incorrect' });
        },
        success: function () {
          app.router.redirectTo('/beers');
        }
      });
    },

    onUsernameChange (event) {
      this.setState({
        username: event.target.value
      });
    },

    onPasswordChange (event) {
      this.setState({
        password: event.target.value
      });
    },

    render () {
        const {username,password,error} = this.state;

        return (
          <div className='container'>
            <h1>RouteMap</h1>
            <form name='signinForm' onSubmit={this.onSubmitForm} >
              <fieldset>
                <legend>Sign In</legend>

                <div className={error ? 'message message-error' : 'hidden'}>{error}</div>

                <div className='form-element'>
                  <label htmlFor='inputUsername'>Username</label>
                  <input id='inputUsername' onChange={this.onUsernameChange} name='inputUsername' placeholder='Enter username' className='form-input' type='text' value={username} required/>
                </div>

                <div className='form-element'>
                  <label htmlFor='inputPassword'>Password</label>
                  <input id='inputPassword' onChange={this.onPasswordChange} name='inputPassword' placeholder='Enter password' className='form-input' type='password'  value={password} required/>
                </div>

                <button type='submit' className='button button-primary'>Sign in</button>
                <br/>
                <br/>
                <a href='/register'>Register user</a>
              </fieldset>
            </form>
          </div>
        )
    }
});
