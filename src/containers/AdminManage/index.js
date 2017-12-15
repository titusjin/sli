/**
 * Admin manage page
 *
 * @author titus
 */

import React from 'react'

import { bindActionCreators } from 'redux'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import * as actions from './actions'

import moment from 'moment'
import DateTime from 'react-datetime'

import styles from './styles.css'
import classNames from 'classnames/bind'
let cx = classNames.bind(styles)

const contextTypes = {
  router: React.PropTypes.object.isRequired
}

class AdminManage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      start: '',
      end: '',
      eventCode:''
    }

    this.handleStartDatetime = this.handleStartDatetime.bind(this)
    this.handleEndDatetime = this.handleEndDatetime.bind(this)
    this.handleTextInput = this.handleTextInput.bind(this)
    this.addEvent = this.addEvent.bind(this)
    this.backLogin = this.backLogin.bind(this)
  }

  componentWillMount(){
    this.props.actions.fetchEvents();
  }

  handleTextInput(e){
    let ob = {}
    ob[e.target.name] = e.target.value
    this.setState(ob)
  }
  handleStartDatetime(momdate){
    this.setState({
      start: momdate.valueOf()
    });
  }
  handleEndDatetime(momdate){
    this.setState({
      start: momdate.valueOf()
    });
  }

  addEvent(){
    console.log('trigger add-event action');
  }

  backLogin(){
    this.context.router.push('/landing')
  }

  render(){
    console.log(this.props.containerReducer);


    if(this.props.containerReducer.login){
      return (
        <div className={cx('container')}>
          <div className={cx('content')}>
            <div className={cx('content-title')}>
              <span>Create New Enent</span>
            </div>
            <div className={cx('content-input')}>
              <div className={cx('content-item')}>
                <input className={cx('input-item')} type='text' name='eventName' placeholder='input evnet name' onChange={this.handleTextInput} />
                <input className={cx('input-item')} type='text' name='eventCode' placeholder='input evnet code' onChange={this.handleTextInput} />

                <DateTime className={cx('dateTime-input')} inputProps={{ placeholder: 'Start datetime'}} onChange={this.handleStartDatetime}/>
                <DateTime inputProps={{ placeholder: 'End datetime', name: 'endDatetime'}} onChange={this.handleEndDatetime}/>

                <button className={cx('input-btn')} type="submit" onClick={this.addEvent}>
                  Add
                </button>
              </div>
            </div>
          </div>
          <div className={cx('content')}>
            <div>
              <div className={cx('content-title')}>
                <span>Mange Events</span>
              </div>
            </div>
          </div>
        </div>
      )
    }else{
      { this.backLogin() }
    }
  }
}

AdminManage.contextTypes = contextTypes

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
    containerReducer: AdminContainerReducer
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminManage)
