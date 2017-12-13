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

import AdminContainer from '~/src/containers/Admin'
import EventContainer from '~/src/containers/Event'

const contextTypes = {
  router: React.PropTypes.object.isRequired
}

class Landing extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      loginRole: ""
    }

    this.handleLandingOptions = this.handleLandingOptions.bind(this)
    this.handleUserRole = this.handleUserRole.bind(this)
    this.handleVEentCode = this.handleVEentCode.bind(this)
  }

  handleLandingOptions () {
    console.log('hrere the stat like : ', this.state);


    if (this.state.loginRole === 'admin') {
      return (
        <AdminContainer />
      )
    } else {
      console.log('ready to show EventContainer++++')

      return (
        <EventContainer setLoginRole={this.handleUserRole} />
      )
    }
  }

  handleUserRole (role) {
    console.log('hello world', role)
    this.setState({
      loginRole: role
    })
  }

  handleVEentCode (e) {
    console.log(e.target.value)
  }

  render () {
    console.log('enter render ')

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

Landing.contextTypes = contextTypes
export default Landing
