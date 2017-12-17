/**
 * question container
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

import thumbUpImage from '~/src/images/thumbup.png'

const contextTypes = {
  router: React.PropTypes.object.isRequired
}

class QuestionContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      newQuestion: '',
      username: ''
    }

    this.setQContent = this.setQContent.bind(this)
    this.saveQ = this.saveQ.bind(this)
    this.setUserName = this.setUserName.bind(this)
    this.backToLanding = this.backToLanding.bind(this)
  }

  setUserName(e){
    this.setState({
      username: e.target.value
    })
  }

  setQContent(e){
    this.setState({
      newQuestion: e.target.value
    })
  }
  saveQ(){
    console.log('saveQ');
    let saveObj = {
      content: this.state.newQuestion,
      eventId: this.props.EventContainerReducer.question[0].eventId,
      username: this.state.username
    }
    this.props.actions.saveQ(saveObj)
  }

  backToLanding(){
    console.log('are we here ....');
    this.context.router.push('/landing')
  }

  render () {
    const smallTitle = {
      fontSize:'12'
    }
    const thubupNumManageQ = {
      paddingRight: '2rem'
    }

    return (
      <div className={cx('container')}>
        <div className={cx('content')}>
          <div className={cx('content-title')}>
            <span>Questions</span>
          </div>
          <div className={cx('content-input')}>

            <div className={cx('input-wrapper')}>
              <input type="text" name="author" className={cx('authorNmae-input')} placeholder="plewase inpout your name" onChange={this.setUserName}/>
              <textarea className={cx('edit-textArea')} onChange={this.setQContent}></textarea>
              <button className={cx('save-btn')} onClick={this.saveQ}>Save</button>
            </div>

            {this.props.EventContainerReducer.question.map(q => {
              console.log(q);
              return (
                <div id={q.eventId} className={cx('sigleMange-q')}>
                  <div><span>{q.username}</span></div>
                  <div style={smallTitle}>
                    <img src={thumbUpImage} className={cx('thumbupImage-mangeQ')}/>
                    <span style={thubupNumManageQ}>{q.thumbUpCount}</span>
                    <span>
                      {moment(parseInt(q.timestamp)).format('MMMM Do YYYY, h:mm:ss a')}
                    </span>
                  </div>
                  <div>
                    <p>{q.content}</p>
                  </div>
                </div>
              )
            })}
          </div>
          {/* <button className={cx('exit-btn')} onClick={this.backToLanding}>Exit This Event</button> */}
        </div>
      </div>
    )
  }
}

QuestionContainer.contextTypes = contextTypes

/**
 * Redux needed implement
 */
function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

function mapStateToProps ({EventContainerReducer}) {
  return {
    EventContainerReducer: EventContainerReducer
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionContainer)
