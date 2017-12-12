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
import RegistDiverBasicInfo from '~/src/components/RegistDiverBasicInfo'

import { Button, Image, Form, FormControl, FormGroup, ControlLabel, Col } from 'react-bootstrap'
import {
    FormattedMessage,
    FormattedHTMLMessage,
    defineMessages,
    injectIntl,
    intlShape
} from 'react-intl'

class RegistDiverForm extends React.Component {
  constructor (props) {
    super(props)
    this.handleCreateUser = this.handleCreateUser.bind(this)
    this.handleLogInUser = this.handleLogInUser.bind(this)
    this.fillMoreAccountInfo = this.fillMoreAccountInfo.bind(this)

    this.renderAmbFinalPage = this.renderAmbFinalPage.bind(this)
    this.renderNoAmbFinalPage = this.renderNoAmbFinalPage.bind(this)
  }

  componentWillMount () {
  }

  handleCreateUser (data) {
    this.props.actions.callCreateUserAPI(data)
  }
  handleLogInUser (data) {
    this.props.actions.callLoginAPI(data)
  }
  fillMoreAccountInfo (data, proyes) {
    this.props.actions.callFillMoreUserInfo(data.userInfo, proyes)
  }

  renderDifferentSlogan () {
    if (this.props.reducer.userInfo.resellerType == 'Ambassador') {
      return (
        <p>
          <FormattedMessage
            id={'final.alreadyAmb'}
            defaultMessage={`Also, you are already COSMIQ+ Sales Ambassador,  please visit our `}
                />
          <a className={cx('logoLink')} href={`https://support.deepblu.com/category/sales-ambassador-reseller/`}>
            <FormattedMessage
              id={'final.supportPage'}
              defaultMessage={'support pages'}
                />
          </a>
          <FormattedMessage
            id={'final.emailSupport'}
            defaultMessage={` or email us at `}
                />
          <a className={cx('logoLink')} href={`mailto:sales@deepblu.com`}>
                    sales@deepblu.com
                </a>.
                <FormattedMessage
                  id={'final.furtherQueries'}
                  defaultMessage={` if you have any further questions. Good to see you again!`}
                />
        </p>
      )
    } else {
      return (
        <p>
          <FormattedMessage
            id={'final.waitVerifyMessage'}
            defaultMessage={`Please give us some time to verify your application. If you have any queries, please visit our `}
                    />
          <a className={cx('logoLink')} href={`https://support.deepblu.com/category/sales-ambassador-reseller/`}>
            <FormattedMessage
              id={'final.supportPage'}
              defaultMessage={'support pages'}
                        />
          </a>

          <FormattedMessage
            id={'final.emailSupport'}
            defaultMessage={` or email us at `}
                    />
          <a className={cx('logoLink')} href={`mailto:sales@deepblu.com`}>
                        sales@deepblu.com
                    </a>
        </p>
      )
    }
  }

  renderAmbFinalPage () {
    let shopURI = 'https://shop.deepblu.com'
    return (
      <div className={cx('container')}>
        <RegistDiverBanner diver='y' />

        <div className={cx('basicwrapper')}>
          <div horizontal className={cx('final')}>
            <div className={cx('endPageText')}>
              <div>
                <FormattedMessage
                  id={'final.generalTitle'}
                  defaultMessage={'Application Sent Success!'}
                                />
              </div>
            </div>
            <div className={cx('endPageText')}>
              <div className={cx('contentText')}>
                <p>
                  <FormattedMessage
                    id={'final.regularAccount'}
                    defaultMessage={`We've created a regular account for you with the email and password you provided. The email will be sent to `}
                                    />
                  <span className={cx('logoLink')}>
                    { this.props.reducer.userEmail }
                  </span>
                </p>
                <p>
                  <FormattedMessage
                    id={'final.proAccount'}
                    defaultMessage={'Now you have a dive pro profile! Complete your profile, add in a profile picture, start logging your dives digitally and verify them. Showcase your diver experience and connect with a global community of ocean enthusiasts.'}
                                    />
                </p>
                <p>
                  <FormattedMessage
                    id={'final.ambAccount'}
                    defaultMessage={'Also, your application of Deepblu Sales Ambassador Program is now being processed.'}
                                    />
                </p>
                <p>
                  <FormattedMessage
                    id={'final.ambAccountPass'}
                    defaultMessage={'Once verified, you will receive a confirmation email with the full details of the program, and your account will be upgraded to Ambassador, allowing you to purchase the COSMIQ+ Dive Computer at the Ambassador price in the Deepblu Shop: '}
                                    />

                  <a href='https://shop.deepblu.com' className={cx('logoLink')}>
                    { shopURI }
                  </a><br />
                </p>
                { this.renderDifferentSlogan() }
              </div>
            </div>

            <div style={{paddingTop: '20'}}>
              <a
                href='https://www.deepblu.com' className={cx('logoLink')}>
                <FormattedMessage
                  id={'final.end'}
                  defaultMessage={'Explore With Deepblu'}
                                />
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderProFinalPage () {
    return (
      <div className={cx('container')}>
        <RegistDiverBanner diver='y' />

        <div className={cx('basicwrapper')}>
          <div horizontal className={cx('final')}>
            <div className={cx('endPageText')}>
              <div>
                <FormattedMessage
                  id={'final.generalTitle'}
                  defaultMessage={'Application Sent Success!'}
                                />
              </div>
            </div>
            <div className={cx('endPageText')}>
              <div className={cx('contentText')}>
                <p>
                  <FormattedMessage
                    id={'final.regularAccount'}
                    defaultMessage={`We've created a regular account for you with the email and password you provided. The email will be sent to `}
                                    />
                  <span className={cx('logoLink')}>
                    { this.props.reducer.userEmail }
                  </span>
                </p>
                <p>
                  <FormattedMessage
                    id={'final.proAccount'}
                    defaultMessage={'Now you have a dive pro profile! Complete your profile, add in a profile picture, start logging your dives digitally and verify them. Showcase your diver experience and connect with a global community of ocean enthusiasts.'}
                                    />
                </p>
              </div>
            </div>

            <div style={{paddingTop: '20'}}>
              <a
                href='https://www.deepblu.com' className={cx('logoLink')}>
                <FormattedMessage
                  id={'final.end'}
                  defaultMessage={'Explore With Deepblu'}
                                />
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderNoAmbFinalPage () {
    return (
      <div className={cx('container')}>
        <RegistDiverBanner diver='y' />

        <div className={cx('basicwrapper')}>
          <div horizontal className={cx('final')}>
            <div className={cx('endPageText')}>
              <div>
                <FormattedMessage
                  id={'final.generalTitle'}
                  defaultMessage={'Application Sent Success!'}
                                />
              </div>
            </div>
            <div className={cx('endPageText')}>
              <div className={cx('contentText')}>
                <p>
                  <FormattedMessage
                    id={'final.regularAccount'}
                    defaultMessage={`We've created a regular account for you with the email and password you provided. The email will be sent to `}
                                    />
                  <span className={cx('logoLink')}>
                    { this.props.reducer.userEmail }
                  </span>
                </p>
              </div>
            </div>

            <div style={{paddingTop: '20'}}>
              <a
                href='https://www.deepblu.com' className={cx('logoLink')}>
                <FormattedMessage
                  id={'final.end'}
                  defaultMessage={'Explore With Deepblu'}
                                />
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render () {
    if (this.props.reducer.userInfo && this.props.reducer.userInfo.resellerType == 'Ambassador') {
      return this.renderAmbFinalPage()
    } else if (this.props.reducer.profinish) {
      return this.renderProFinalPage()
    } else if (this.props.reducer.ambfinish) {
      return this.renderAmbFinalPage()
    } else if (this.props.reducer.showApplyPro && !this.props.reducer.certMetas) {
      return this.renderNoAmbFinalPage()
    } else {
      return (
        <div className={cx('container')}>
          <Loader isLoading={this.props.reducer.showLoad} />

          <div className={cx('basicwrapper')}>
            <Form horizontal className={cx('formdisplay')}>
              <RegistDiverBasicInfo
                  userInfo={this.props.reducer.userInfo}
                  changeProOption
                  diver

                  handleCreateUser={this.handleCreateUser}
                  handleLogInUser={this.handleLogInUser}

                  showUserExtraInfo={this.props.reducer.showUserExtraInfo}
                  fillMoreRegistDiverAccountInfo={this.fillMoreAccountInfo}
                  fillExtraUserInfoSuccess={
                                    this.props.reducer.fillExtraUserInfoSuccess
                                }

                  showApplyPro={
                                    this.props.reducer.showApplyPro
                                }
                  certMetas={
                                    this.props.reducer.certMetas
                                }
                  existProApplyAmb={
                                    this.props.reducer.existPro
                                }

                  saveProData={this.props.actions.callSaveProInfo}
                  ambContinue={
                                    this.props.reducer.ambContinue
                                }

                  finish={this.props.reducer.finish}
                  saveAmbData={this.props.actions.saveAmbData}
                  ambfinish={this.props.reducer.ambfinish}

                  directRenderProFinalPage={this.props.actions.directRenderProFinalPage}
                            />
            </Form>
          </div>

          <RegistDiverBanner diver='y' />
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

function mapStateToProps ({RegistDiverFormReducer}) {
  return {
    reducer: RegistDiverFormReducer
  }
}

RegistDiverForm.propTypes = {
  intl: intlShape.isRequired
}
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(RegistDiverForm))
