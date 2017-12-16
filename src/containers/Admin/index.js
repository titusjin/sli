/**
 *  admin container
 *
 *  @author titus
 */

import React from 'react'
import * as actions from './actions'
import { bindActionCreators } from 'redux'

import { Link } from 'react-router'
import { connect } from 'react-redux'

import styles from './styles.css'
import classNames from 'classnames/bind'
let cx = classNames.bind(styles)

const contextTypes = {
  router: React.PropTypes.object.isRequired
}

class AdminContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }

    this.handleInput = this.handleInput.bind(this)
    this.setLoginRole = this.setLoginRole.bind(this)
    this.login = this.login.bind(this)
    this.checkLogin = this.checkLogin.bind(this)
    this.gotoAdminMangePage = this.gotoAdminMangePage.bind(this)
  }

  handleInput (e) {
    let ob = {}
    ob[e.target.name] = e.target.value;
    this.setState(ob);
  }
  login(){
    this.props.actions.login({
      email: this.state.email,
      password: this.state.password
    });
  }
  checkLogin(){
    if(this.props.reducer.loginIncompolete){
      const warningStyle = {
        color: 'red'
      }
      return(
        <div style={warningStyle}>
          Something wrong with ur login infor, pls check
        </div>
      )
    }
  }

  setLoginRole(){
    this.props.setLoginRole('')
  }

  gotoAdminMangePage(){
    this.context.router.push('/amdin/manage')
  }

  render () {
    if(this.props.reducer.login){
      return (
        <div>
          <span>processing...</span>
          { this.gotoAdminMangePage() }
        </div>
      )
    }else{
      return (
        <div className={cx('content')}>
          <div className={cx('content-title')}>
            <span>Login</span>
          </div>
          <div className={cx('content-input')}>
            <div className={cx('content-item')}>
              <input className={cx('input-item')} type='text' name='email' placeholder='email' onChange={this.handleInput} />
              <input className={cx('input-item')} type='password' name='password' placeholder='password' onChange={this.handleInput} />

              { this.checkLogin() }

              <button className={cx('input-btn')} type="submit" onClick={this.login}>
                Enter
              </button>
            </div>
            <div className={cx('input-gap-text')}> or </div>
            <div className={cx('content-item')}>
              <label onClick={this.setLoginRole}>
                <a href='#'>Join Event as Audience</a>
              </label>
            </div>
          </div>
        </div>
      )
    }
  }
}

AdminContainer.contextTypes = contextTypes

/**
 * Redux needed implement
 */
function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

function mapStateToProps ({AdminContainerReducer}) {
  return {
    reducer: AdminContainerReducer
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminContainer)
