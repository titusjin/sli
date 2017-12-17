/**
 * landing page
 *
 * @author titus
 */

import React from 'react'
import logo from '~/src/images/logo.png'

import styles from './styles.css'
import classNames from 'classnames/bind'
let cx = classNames.bind(styles)

import AdminContainer from '~/src/containers/Admin'
import EventContainer from '~/src/containers/Event'

class Landing extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      loginRole: ""
    }

    this.handleLandingOptions = this.handleLandingOptions.bind(this)
    this.handleUserRole = this.handleUserRole.bind(this)
  }

  handleUserRole (role) {
    this.setState({
      loginRole: role
    })
  }
  handleLandingOptions () {
    if (this.state.loginRole === 'admin') {
      return (
        <AdminContainer setLoginRole={this.handleUserRole}/>
      )
    } else {
      return (
        <EventContainer setLoginRole={this.handleUserRole} />
      )
    }
  }
  render () {
    return (
      <div className={cx('container')}>
        <div className={cx('title')}>
          <img src={logo} className={cx('logo')} />
        </div>
        { this.handleLandingOptions() }
      </div>
    )
  }
}

export default Landing
