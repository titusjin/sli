/**
 *  admin container
 *
 *  @author titus
 */

import React from 'react'
import * as actions from './actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import _ from 'lodash'

import styles from './styles.css'
import classNames from 'classnames/bind'
let cx = classNames.bind(styles)

class AdminContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  render(){
    return (
      <div className={cx('content')}>
        <div className={cx('content-title')}>
          <span>Login</span>
        </div>
        <div className={cx('content-input')}>
          <div className={cx('content-item')}>
            <input className={cx('input-item')} type="text" name="eventCode" placeholder="Input evnet Code" onChange={ this.handleVEentCode }/>
          </div>
          <div className={cx('content-item')}>
            <input type="radio" name="land-choose" value="admin" checked={ this.state.checkedOption === 'admin' } onChange={ this.handleUserLanding }/>
            <label>Login As Admin</label>
          </div>
        </div>
      </div>
    )
  }
}

/**
 * Redux needed implement
 */
function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

function mapStateToProps ({RegistBusinessFormReducer}) {
  return {
    reducer: RegistBusinessFormReducer
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminContainer)
