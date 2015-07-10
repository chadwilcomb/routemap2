import React from 'react';
import app from 'ampersand-app'
import ampersandMixin from 'ampersand-react-mixin';
import MessagePage from './message';

export default React.createClass({
    mixins: [ampersandMixin],

    displayName: 'RegisterUserPage',

    getInitialState () {
        return {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            confirm: '',
            error: ''
        };
    },

    onSubmitForm (event) {
      var _this = this;
      event.preventDefault();
      const {user} = this.props;
      this.setState({ error: '' });
      if (this.state.password !== this.state.confirm) {
        this.setState({ error: 'Passwords are not the same' });
        return false;
      }

      user.set({ isRegister: true });
      user.save(
        {
          email: this.state.email,
          password: this.state.password,
          firstName: this.state.firstName,
          lastName: this.state.lastName
        },
        {
          success: function () {
            // user.set({ isRegister: false });
            app.router.redirectTo('/layers');
          },
          error: function (model, response, options) {
            _this.setState({ error: response.responseText });
          }
        });
    },

    onPropChange (event) {
      const {name, value, type} = event.target;
      let state = {};
      state[name] = type === 'number' ? parseInt(value, 10) : value;
      this.setState(state);
    },

    render () {
      const {email,password,firstName,lastName,confirm,error} = this.state;

        return (
          <div className='container'>
            <h1>Register account for RouteMap</h1>
            <form name='registerForm' onSubmit={this.onSubmitForm}>
              <fieldset>
              <legend>Your info</legend>
                <div className={error ? 'message message-error' : 'hidden'}>{error}</div>
                <div className='form-element'>
                  <label htmlFor='inputFirstName'>First Name</label>
                  <input id='inputFirstName' onChange={this.onPropChange} name='firstName' placeholder='Enter first name' className='form-input' type='text' value={firstName} required/>
                </div>
                <div className='form-element'>
                  <label htmlFor='inputLastName'>Last Name</label>
                  <input id='inputLastName' onChange={this.onPropChange} name='lastName' placeholder='Enter last name' className='form-input' type='text' value={lastName} required/>
                </div>
                <div className='form-element'>
                  <label htmlFor='inputEmail'>Email</label>
                  <input id='inputEmail' onChange={this.onPropChange} name='email' placeholder='Enter email' className='form-input' type='email' value={email} required/>
                </div>

                <div className='form-element'>
                  <label htmlFor='inputPassword'>Password</label>
                  <input id='inputPassword' onChange={this.onPropChange} name='password' placeholder='Enter password' className='form-input' type='password' value={password} required/>
                </div>

                <div className='form-element'>
                  <label htmlFor='type'>Confirm Password</label>
                  <input id='confirm' onChange={this.onPropChange} name='confirm' type='password' placeholder='Confirm password' className='form-input' value={confirm} required/>
                </div>

                <button type='submit' className='button button-primary'>Register me!</button>
                <br/>
                <br/>
                <a href='/'>Already registered</a>
              </fieldset>
            </form>
          </div>
        )
    }
})
