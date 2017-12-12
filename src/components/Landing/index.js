/**
 * landing page
 *
 * @author titus
 */

import React from 'react'
import logo from '~/src/images/logo.png'

import { Link } from 'react-router'
import { connect } from 'react-redux'

import styles from './styles.css'
import classNames from 'classnames/bind'
let cx = classNames.bind(styles)

const contextTypes = {
  router: React.PropTypes.object.isRequired
}

class Landing extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      checkedOption = ''
    }

    this.handleUserLanding = this.handleUserLanding.bind( this )
  }

  handleUserLanding (e) {
    console.log( e.target.value )
    if( e.target.checked ){
      console.log('hello')
      !e.target.checked
    }else{
      e.targe.checked = true;
    }
  }

  render () {
    return (
      <div className={cx('container')}>
        <div className={cx('title')}>
          <img src={logo} className={cx('logo')} />
        </div>
        <div className={cx('content')}>
          <div className={cx('content-title')}>
            <span>Please Select "Top u interested" or Login as Admin</span>
          </div>
          <div className={cx('content-input')}>
            <div className={cx('content-item')}>
              <input type="radio" name="land-choose" value="aud" checked={true} onChange={ this.handleUserLanding }/>
              <label>Choose One Event</label>
            </div>
            <div className={cx('content-item')}>
              <input type="radio" name="land-choose" value="admin" onChange={ this.handleUserLanding }/>
              <label>Login As Admin</label>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Landing.contextTypes = contextTypes
export default Landing
