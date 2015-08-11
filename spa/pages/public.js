import React from 'react';
import app from 'ampersand-app';

export default React.createClass({
    displayName: 'PublicPage',

    getInitialState () {
        return {
            email: '',
            password: '',
            error: ''
        };
    },

    onSubmitForm (event) {
      var _this = this;
      event.preventDefault();

      _this.setState({ error: '' });
      const {me} = this.props;

      me.set(this.state);

      me.fetch({
        error: function (model, response, options) {
          console.log(response);
          _this.setState({ error: 'Your email and/or password are incorrect' });
        },
        success: function () {
          me.authenticated = true;
          app.router.redirectTo('/layers');
        }
      });
    },

    onEmailChange (event) {
      this.setState({
        email: event.target.value
      });
    },

    onPasswordChange (event) {
      this.setState({
        password: event.target.value
      });
    },

    render () {
        const {email,password,error} = this.state;

        return (
          <div className='container'>
            <h1>RouteMap</h1>
            <form name='signinForm' onSubmit={this.onSubmitForm} >
              <fieldset>
                <legend>Sign In</legend>

                <div className={error ? 'message message-error' : 'hidden'}>{error}</div>

                <div className='form-element'>
                  <label htmlFor='inputEmail'>Email</label>
                  <input id='inputEmail' onChange={this.onEmailChange} name='inputEmail' placeholder='Enter email' className='form-input' type='email' value={email} required/>
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
