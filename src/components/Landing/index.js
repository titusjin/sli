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
    console.log('hello world', role)
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
      console.log('ready to render event-container')
      return (
        <EventContainer setLoginRole={this.handleUserRole} />
      )
    }
  }
  render () {
    console.log('into landing component render ...')
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
