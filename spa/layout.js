import React from 'react'
import NavHelper from './components/nav-helper'
import ampersandMixin from 'ampersand-react-mixin'

export default React.createClass({
  mixins: [ampersandMixin],

  displayName: 'Layout',

  render () {

    const {me} = this.props;

    return (
      <NavHelper>
        <nav className='top-nav top-nav-light cf' role='navigation'>
          <input id='menu-toggle' className='menu-toggle' type='checkbox'/>
          <label htmlFor='menu-toggle'>Menu</label>
          <ul className='list-unstyled list-inline cf'>
            <li><a href='/'><strong>RouteMap</strong></a></li>
            <li className='has-dropdown'>
              <a className='active'>Layers</a>
              <div className='icon-arrow-down'></div>
              <ul className='list-unstyled dropdown cf'>
                <li><a href='/layers'>List</a></li>
                <li><a href='/layers/create'>Create</a></li>
              </ul>
            </li>
            <li className='pull-right'>{me.username} <a href='/logout'>Logout</a></li>
          </ul>
        </nav>
        <div className='container'>
          { this.props.children }
        </div>
      </NavHelper>
    )
  }
})
