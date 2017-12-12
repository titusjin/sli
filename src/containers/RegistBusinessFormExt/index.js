/**
 *  regist form container
 *
 *  @since 2017.10
 *  @author titus
 */

'use strict'

import React from 'react'
import * as actions from './actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import _ from 'lodash'

import styles from './styles.css'
import classNames from 'classnames/bind'
let cx = classNames.bind(styles)

import Loader from '~/src/components/Loader'
import RegistDiverBanner from '~/src/components/RegistDiverBanner'
import RegistDiverBasicInfoExt from '~/src/components/RegistDiverBasicInfoExt'

import { Button, Image, Form, FormControl, FormGroup, ControlLabel, Col } from 'react-bootstrap'

class RegistBusinessFormExt extends React.Component {
  constructor (props) {
    super(props)

    this.handleCreateUser = this.handleCreateUser.bind(this)
    this.handleLogInUser = this.handleLogInUser.bind(this)
    this.fillMoreAccountInfo = this.fillMoreAccountInfo.bind(this)

    this.displayResellerFinish = this.displayResellerFinish.bind(this)
  }

  handleCreateUser (data) {
        // TODO calling api to create new user
    this.props.actions.callCreateUserAPI(data)
  }
  handleLogInUser (data) {
    this.props.actions.callLoginAPI(data)
  }
  fillMoreAccountInfo (data) {
    this.props.actions.callFillMoreUserInfo(data.userInfo)
  }

  displayResellerFinish () {
    let shopURI = 'https://shop.deepblu.com'

    if (this.props.reducer.existingReseller) {
      return (
        <div>
          <p>
                        Your Deepblu Reseller status remains the same, and you are welcomed to use your current account to continue ordering at Deepblu Shop as usual.
                    </p>
        </div>
      )
    } else {
      return (
        <div>
          <p>
                    Also, your application of Deepblu Reseller Program is now being processed.<br />
            {`Once verified, you will receive a confirmation email with the full details of the program, and your account will be upgraded to Reseller, allowing you to purchase the COSMIQ+ Dive Computer at the wholesale price in the Deepblu Shop: `}
            <a href='https://shop.deepblu.com' className={cx('logoLink')}>
              { shopURI }
            </a><br />
          </p>

          <p>
                    Please give us some time to verify your application. If you have any queries, please visit our <a href='http://about.deepblu.com/intro_reseller.html' className={cx('logoLink')}>support pages</a> or email us at
                    <a className={cx('logoLink')} href={`mailto:sales@deepblu.com`}>
                    sales@deepblu.com
                    </a>.
                    </p>
        </div>
      )
    }
  }

  render () {
    let shopURI = 'https://shop.deepblu.com'

    if (this.props.reducer.finalFinish) {
            // window.open(`https://www.deepblu.com/${ this.props.reducer.businessData.entityId}/information`, "_blank");

      let link = `https://www.deepblu.com/org/${this.props.reducer.businessData.entityId}/information`
      return (
        <div className={cx('container')}>
          <RegistDiverBanner diver='n' />

          <div className={cx('basicwrapper')}>
            <div horizontal className={cx('final')}>
              <div className={cx('endPageText')}>
                <div>
                                    Application Sent
                                </div>
                <div>
                                    Success!
                                </div>
              </div>
              <div className={cx('endPageText')}>
                <div className={cx('contentText')}>
                  <p>
                    {
                                        `We've created a regular account for you with the email and password you provided. The email will be sent to `
                                    }
                    <span className={cx('logoLink')}>
                          { this.props.reducer.userEmail }
                        </span>
                  </p>
                  <p>
                    {
                                        'Now you have a business profile and it is how your followers view you. So make sure it’s looking good! Complete all information, add a profile picture and cover photo. '
                                    }
                    <a
                          href={link} className={cx('logoLink')}>
                                            Your business profile
                                        </a>
                  </p>
                </div>
              </div>

              <div style={{paddingTop: '20'}}>
                <a
                  href='https://www.deepblu.com' className={cx('logoLink')}>
                                    Explore With Deepblu
                                </a>
              </div>
            </div>
          </div>
        </div>
      )
    } else if (this.props.reducer.resellerFinish) {
            // window.open(`https://www.deepblu.com/${ this.props.reducer.businessData.entityId}/information`, "_blank");

      let link = `https://www.deepblu.com/org/${this.props.reducer.businessData.entityId}/information`
      return (
        <div className={cx('container')}>
          <RegistDiverBanner diver='n' />

          <div className={cx('basicwrapper')}>
            <div horizontal className={cx('final')}>
              <div className={cx('endPageText')}>
                                Application Sent
                            </div>
              <div>
                                Success!
                            </div>

              <div className={cx('endPageText')}>
                <div className={cx('contentText')}>
                  <p>
                        {
                                        `We've created a regular account for you with the email and password you provided. The email will be sent to `
                                    }
                        <span className={cx('logoLink')}>
                          { this.props.reducer.userEmail }
                        </span>
                      </p>
                  <p>
                        {
                                        'Now you have a business profile and it is how your followers view you. So make sure it’s looking good! Complete all information, add a profile picture and cover photo. '
                                    }
                        <a href={link} className={cx('logoLink')}>
                                            Your business profile
                                        </a>
                      </p>

                  { this.displayResellerFinish()}

                </div>
              </div>

              <div style={{paddingTop: '20'}}>
                <a href='https://www.deepblu.com' className={cx('logoLink')}>
                                    Explore With Deepblu
                                </a>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className={cx('container')}>
          <Loader isLoading={this.props.reducer.showLoad} />

          <div className={cx('basicwrapper')}>
            <Form horizontal className={cx('formdisplay')}>
              <RegistDiverBasicInfoExt
                userInfo={this.props.reducer.userInfo}
                deepbluId={this.props.reducer.deepbluId}
                changeProOption={false}
                diver={false}
                handleCreateUser={this.handleCreateUser}
                handleLogInUser={this.handleLogInUser}
                                // showUserExtraInfo =
                                // { this.props.reducer.showUserExtraInfo }
                fillMoreAccountInfo={this.fillMoreAccountInfo}
                showCreateBusiness={this.props.reducer.showCreateBusiness}
                finish={this.props.reducer.finish}
                applyBusiness={this.props.actions.applyBusiness}
                applyBusinessResult={this.props.reducer.applyBusinessResult}
                applyReseller={this.props.actions.applyReseller}
                            />
            </Form>
          </div>
          <RegistDiverBanner diver='n' />
        </div>
      )
    }
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

function mapStateToProps ({RegistBusinessFormReducerExt}) {
  return {
    reducer: RegistBusinessFormReducerExt
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistBusinessFormExt)