/**
 * Regist/update Diver basic information component
 *
 * @author titus
 * @since 2017.10
 */

'use strict'

import React from 'react'

import { Button, FormControl, FormGroup, Col, Checkbox } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import Select from 'react-select'
import moment from 'moment'
import _ from 'lodash'
import swalTrigger from '~/src/utils/swalTrigger'

import RegistDiverPro from '~/src/components/RegistDiverPro'
import RegistDiverBusiness from '~/src/components/RegistDiverBusiness'

import styles from './styles.css'
import classNames from 'classnames/bind'
let cx = classNames.bind(styles)

import countryMapping from '~/src/utils/countries.json'
import {
    FormattedMessage,
    FormattedHTMLMessage,
    defineMessages,
    injectIntl,
    intlShape
} from 'react-intl'

let placeHolderMessage = defineMessages({
  emailPlaceHolderMessage: {
    id: 'placeHolder.loginEmailPlaceHolderMessage',
    defaultMessage: 'Enter your email address'
  },
  applyNewAccountEmailPlaceHolderMessage: {
    id: 'placeHolder.applyNewAccountEmailPlaceHolderMessage',
    defaultMessage: 'Enter your email address'
  },
  passwordPlaceHolderMessage: {
    id: 'placeHolder.loginPasswordPlaceHolderMessage',
    defaultMessage: 'Enter your password'
  },
  emailConfirmPlaceHolderMessage: {
    id: 'placeHolder.emailConfirmPlaceHolderMessage',
    defaultMessage: 'Confirm your email address'
  },
  passwordConfirmPlaceHolderMessage: {
    id: 'placeHolder.passwordConfirmPlaceHolderMessage',
    defaultMessage: 'Confirm your password'
  },
  userNamePlaceHolderMessage: {
    id: 'placeHolder.userName',
    defaultMessage: 'User Name'
  },
  firstNamePlaceHolderMessage: {
    id: 'placeHolder.firstNamePlaceHolderMessage',
    defaultMessage: 'First Name'
  },
  lastNamePlaceHolderMessage: {
    id: 'placeHolder.lastNamePlaceHolderMessage',
    defaultMessage: 'Last Name'
  }
})

let swalInfoMessage = defineMessages({
  fillUserName: {
    id: 'swalInfoMessage.fillUserName',
    defaultMessage: 'Please fill in your user name. Thanks!'
  },
  confirmUserNameNPassword: {
    id: 'swalInfoMessage.confirmUserNameNPassword',
    defaultMessage: 'Please confirm your email and password. Thanks!'
  },
  fillUserNameNPassword: {
    id: 'swalInfoMessage.fillUserNameNPassword',
    defaultMessage: 'Please make sure your email and password are filled in. Thanks!'
  },
  mustFillInFields: {
    id: 'swalInfoMessage.mustFillInFields',
    defaultMessage: 'Fields that must be filled in : '
  }
})

class RegistDiverBasicInfo extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      accountExist: false,
      accountNotExist: false,
      emailConfirm: true,
      passwordConfirm: true,
      confirmEmail: '',
      confirmPass: '',
      male: false,
      female: false,
      other: false,

      proyes: false,
      prono: false,
      showMoreExtra: false,
      showApplyPro: false,
      data: {},

      birthday: '',          // just to record the birthday stirng
      userNameEmpty: false
    }

    if (props.userInfo && props.userInfo.gender && props.userInfo.gender) {
      if (props.userInfo.gender.toLowerCase() === 'male') {
        this.state.male = true
        this.state.female = false
        this.state.other = false
    } else if (props.userInfo.gender.toLowerCase() === 'female') {
        this.state.female = true
        this.state.male = false
        this.state.other = false
    } else if (prop.userInfo.gender.toLowerCase() === 'other') {
        this.state.other = true
        this.state.male = false
        this.state.female = false
      }
    }

    this.setAcccountExist = this.setAcccountExist.bind(this)
    this.setFirstName = this.setFirstName.bind(this)
    this.setLastName = this.setLastName.bind(this)
    this.setEmail = this.setEmail.bind(this)
    this.checkEmail = this.checkEmail.bind(this)
    this.setPassword = this.setPassword.bind(this)
    this.checkPassword = this.checkPassword.bind(this)

    this.renderExistingAccountInfo = this.renderExistingAccountInfo.bind(this)
    this.renderNoAccountInfo = this.renderNoAccountInfo.bind(this)
    this.handleUserAccount = this.handleUserAccount.bind(this)
    this.handleBirthday = this.handleBirthday.bind(this)
    this.setGender = this.setGender.bind(this)
    this.handleNationality = this.handleNationality.bind(this)
    this.setUserName = this.setUserName.bind(this)
    this.setProOption = this.setProOption.bind(this)
    this.fillMoreAccountInfo = this.fillMoreAccountInfo.bind(this)
    this.renderMore = this.renderMore.bind(this)
    this.renderFillMore = this.renderFillMore.bind(this)

    this.displayProOption = this.displayProOption.bind(this)

    this.setTextInput = this.setTextInput.bind(this)
    this.setUserRelatedTextInput = this.setUserRelatedTextInput.bind(this)

    this.renderDifferentSlogan = this.renderDifferentSlogan.bind(this)

    this.cleanOutPreData = this.cleanOutPreData.bind(this)
  }

  componentWillMount () {
    let countrySelect = []
    countryMapping.forEach( (o) => {
      let temp = {}
      temp.label = o.en
      temp.value = o.isoCode

      countrySelect.push(temp)
    })

    this.setState({
      countrySelect: countrySelect
    })
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.userInfo) {
      let preData = this.state.data

      this.setState({
        data: { ...preData, userInfo: nextProps.userInfo }
      })

      if (!_.isEqual(this.props.userInfo, nextProps.userInfo)) {
        let birthday = moment().format('MM/DD/YYYY')
        if (nextProps.userInfo.Birthday && !_.isEmpty(nextProps.userInfo.Birthday)) {
          let Birthday = nextProps.userInfo.Birthday
          birthday = Birthday.Month + '/' + Birthday.Day + '/' + Birthday.Year
        }

        let gender = ''
        if (nextProps.userInfo.gender) {
          if (nextProps.userInfo.gender.toLowerCase() === 'male') {
            this.setState({
              male: true,
              female: false,
              other: false,
              birthday: moment(birthday)
            })
        } else if (nextProps.userInfo.gender.toLowerCase() === 'female') {
            this.setState({
              male: false,
              female: true,
              other: false,
              birthday: moment(birthday)
            })
          } else {
            this.setState({
              male: false,
              female: false,
              other: true,
              birthday: moment(birthday)
            })
          }
        } else {
          this.setState({
            birthday: moment(birthday)
          })
        }
      }
    }

    if (nextProps.certMetas !== this.props.certMetas && (nextProps.certMetas && !_.isEmpty(nextProps.certMetas))) {
      let certOrgs = []
      let certLevels = []
      _.forEach(nextProps.certMetas, function (o) {
        let orgresult = {
          'value': o.organizationName,
          'label': o.organizationName
        }

        if (o.organizationName === 'VDST' && o.certificationRole === 'Pro') {
          let levelResult = {
            'value': o.certificationLevel,
            'label': o.certificationLevel
          }
          certLevels.push(levelResult)
        }
        certOrgs.push(orgresult)
      })

      this.setState({
        certMetas: nextProps.certMetas,
        certOrgSelect: certOrgs,
        certLevelSelect: certLevels
      })
    }
  }

    // Put value into state.data.userInfo
  setUserRelatedTextInput (e) {
    let preData = this.state.data
    let preUserInfo = this.state.data.userInfo

    let id = e.target.id
    let value = e.target.value

    let userInfo = { ...preUserInfo }
    userInfo[id] = value
    let result = { ...preData, userInfo: userInfo }

    if (id === 'userName') {
      if (!value) {
        this.setState({
          userNameEmpty: true
        })
      } else {
        this.setState({
          userNameEmpty: false
        })
      }
    }

    this.setState({
      data: result
    })
  }

    // put data into state.data
  setTextInput (e) {
    let preData = this.state.data

    let id = e.target.id
    let value = e.target.value

    let result = { ...preData }
    result[id] = value

    this.setState({
      data: result
    })
  }

  setFirstName (e) {
    let value = e.target.value
    let preData = { ...this.state.data }

    this.setState({
      data: { ...preData, firstName: value }
    })
  }
  setLastName (e) {
    let value = e.target.value
    let preData = { ...this.state.data }

    this.setState({
      data: { ...preData, lastName: value }
    })
  }

  setEmail (e) {
    let value = e.target.value
    let preData = { ...this.state.data }

    if (this.state.confirmEmail) {
      if (value === this.state.confirmEmail) {
        this.setState({
          data: { ...preData, email: value },
          emailConfirm: true
        })
      } else {
        this.setState({
          data: { ...preData, email: value },
          emailConfirm: false
        })
      }
    } else {
      this.setState({
        data: { ...preData, email: value },
        emailConfirm: true
      })
    }
  }
  checkEmail (e) {
    let confirmEmail = e.target.value
    if (this.state.data.email !== confirmEmail) {
      this.setState({
        emailConfirm: false,
        confirmEmail: confirmEmail
      })
    } else {
      this.setState({
        emailConfirm: true,
        confirmEmail: confirmEmail
      })
    }
  }
  setPassword (e) {
    let value = e.target.value
    let preData = {...this.state.data}

    if (this.state.confirmPass) {
      if (value === this.state.confirmPass) {
        this.setState({
          data: { ...preData, password: value },
          passwordConfirm: true
        })
      } else {
        this.setState({
          data: { ...preData, password: value },
          passwordConfirm: false
        })
      }
    } else {
      this.setState({
        data: { ...preData, password: e.target.value },
        passwordConfirm: true
      })
    }
  }
  checkPassword (e) {
    let confirmPass = e.target.value

    if (this.state.data.password !== confirmPass) {
      this.setState({
        passwordConfirm: false,
        confirmPass: confirmPass
      })
    } else {
      this.setState({
        passwordConfirm: true,
        confirmPass: confirmPass
      })
    }
  }

  handleBirthday (date) {
    let Birthday = {
      Year: date.format('YYYY'),
      Month: date.format('M'),
      Day: date.format('D')
    }

    let preData = this.state.data
    let preUserInfo = this.state.data.userInfo
    this.setState({
      birthday: date,
      data: {
        ...preData,
        userInfo: { ...preUserInfo, Birthday: Birthday }
      }
    })
  }

  setGender (e) {
    let result = e.target.value
    let preData = this.state.data
    let preUserInfo = this.state.data.userInfo

    if (result == 'Male') {
      this.setState({
        male: true,
        female: false,
        other: false,
        data: { ...preData, userInfo: { ...preUserInfo, gender: result } }
      })
    } else if (result == 'Female') {
      this.setState({
        male: false,
        female: true,
        other: false,
        data: { ...preData, userInfo: { ...preUserInfo, gender: result } }
      })
    } else {
      this.setState({
        male: false,
        female: false,
        other: true,
        data: { ...preData, userInfo: { ...preUserInfo, gender: result } }
      })
    }
  }

  handleNationality (v) {
    let preData = this.state.data
    let preUserInfo = this.state.data.userInfo

    this.setState({
      data: {
        ...preData,
        countryCode: v,
        userInfo: {
          ...preUserInfo,
          _mailAddress: {
            country: v
          }
        }
      }
    })
  }

  setUserName (e) {
    let preData = this.state.data
    this.setState({
      data: { ...preData, userName: e.target.value }
    })
  }

  setProOption (e) {
    let result = e.target.value
    let preData = this.state.data

    if (result == 'y') {
      this.setState({
        proyes: true,
        prono: false,
        showMoreExtra: true,
        data: { ...preData, showMoreExtra: result }
      })
    } else {
      this.setState({
        proyes: false,
        prono: true,
        showMoreExtra: true,
        data: { ...preData, showMoreExtra: result }
      })
    }
  }
  setAcccountExist (e) {
    let result = e.target.value

    if (result == 'y') {
      this.setState({
        accountExist: true,
        accountNotExist: false
      })
    } else {
      this.setState({
        accountExist: false,
        accountNotExist: true
      })
    }
  }

    /**
     *  Acions start from here ...
     */
  handleUserAccount (e) {
    const { formatMessage } = this.props.intl

    console.log('IN handleUserAccount method , the target id like : ', e.target.id)

    if (this.state.data.email && this.state.data.password) {
      if (e.target.id == 'loginUser') {
        this.props['handleLogInUser'](this.state.data)
      } else {
        if ((this.state.confirmEmail && this.state.confirmPass) &&
                    (this.state.emailConfirm && this.state.passwordConfirm)) {
          if (this.state.data.userName) {
            this.props['handleCreateUser'](this.state.data)
          } else {
            let message = formatMessage(swalInfoMessage.fillUserName)
            swalTrigger.triggerGeneralAlert('fail', message)
          }
        } else {
          let message = formatMessage(swalInfoMessage.confirmUserNameNPassword)
          swalTrigger.triggerGeneralAlert('fail', message)
        }
      }
    } else {
      let message = formatMessage(swalInfoMessage.fillUserNameNPassword)
      swalTrigger.triggerGeneralAlert('fail', message)
    }
  }

    /**
     * call api to fill in more user information
     */
  fillMoreAccountInfo () {
    const { formatMessage } = this.props.intl

    if (this.props.diver) {
            // if( this.props.userInfo.userDiveType == 'Pro' ){
            //     this.props.fillMoreRegistDiverAccountInfo( this.state.data, true );
            // }else{
      this.props.fillMoreRegistDiverAccountInfo(this.state.data, this.state.proyes)
            // }
    } else {
      let result = this.checkFillMoreAcccountInfo(this.state.data.userInfo)
      if (result) {
        let message = formatMessage(swalInfoMessage.mustFillInFields)
        swalTrigger.triggerGeneralAlert('fail', message + result)
      } else {
        this.props.fillMoreAccountInfo(this.state.data)
      }
    }
  }
  checkFillMoreAcccountInfo (userInfo) {
    let result = ''
    if (!userInfo.firstName) {
      result += 'first name, '
    }
    if (!userInfo.lastName) {
      result += 'last name, '
    }
    if (!userInfo.gender) {
      result += 'gender, '
    }
    if (_.isEmpty(userInfo.Birthday)) {
      result += 'birthday, '
    }
    if (!userInfo._mailAddress || !userInfo._mailAddress.country) {
      result += 'nationality, '
    }
    if (!userInfo.userName) {
      result += 'user name '
    }
    return result
  }

    //  * Below methods for generate html
    /*
      render firstName...etc data
     */
  renderFillMore () {
    const { formatMessage } = this.props.intl

    if (this.props.diver) {
            /**
             *  display create user form and not to apply for Pro
             */
      return (
        <div className={cx('basicInfoContainer')}>
          <FormGroup controlId='firstName'>
            <Col sm={3}>
              <label className={cx('ControlLabel')}>
                <FormattedMessage
                  id={'moreInfo.firstName'}
                  defaultMessage={'First Name'}
                                />
              </label>
            </Col>
            <Col sm={7}>
              <FormControl
                type='text'
                placeholder={
                                    formatMessage(placeHolderMessage.firstNamePlaceHolderMessage)
                                }
                value={
                                    this.state.data.userInfo.firstName ? this.state.data.userInfo.firstName
                                    : ''
                                }
                onChange={this.setUserRelatedTextInput} />
            </Col>
          </FormGroup>
          <FormGroup controlId='lastName'>
            <Col sm={3}>
              <label className={cx('ControlLabel')}>
                <FormattedMessage
                  id={'moreInfo.lastName'}
                  defaultMessage={'Last Name'}
                                />
              </label>
            </Col>
            <Col sm={7}>
              <FormControl
                type='text'
                placeholder={
                                    formatMessage(placeHolderMessage.lastNamePlaceHolderMessage)
                                }
                value={
                                    this.state.data.userInfo.lastName ? this.state.data.userInfo.lastName
                                    : ''
                                }
                onChange={this.setUserRelatedTextInput} />
            </Col>
          </FormGroup>
          <FormGroup controlId='gender'>
            <Col sm={3}>
              <label className={cx('ControlLabel')}>
                <FormattedMessage
                  id={'moreInfo.gender'}
                  defaultMessage={'Gender'}
                                />
              </label>
            </Col>
            <Col sm={7}>
              <Checkbox className={cx('checkboxStyle')} inline
                checked={this.state.male}
                onChange={this.setGender}
                value='Male' >
                <span>
                  <FormattedMessage
                    id={'moreInfo.male'}
                    defaultMessage={'Male'}
                                    />
                </span>
              </Checkbox>
              <Checkbox className={cx('checkboxStyle')} inline
                checked={this.state.female}
                onChange={this.setGender}
                value='Female' >
                <span>
                  <FormattedMessage
                    id={'moreInfo.female'}
                    defaultMessage={'Female'}
                                    />
                </span>
              </Checkbox>
              <Checkbox className={cx('checkboxStyle')} inline
                checked={this.state.other}
                onChange={this.setGender}
                value='Other' >
                <span>
                  <FormattedMessage
                    id={'moreInfo.other'}
                    defaultMessage={'Other'}
                                    />
                </span>
              </Checkbox>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col sm={3}>
              <label className={cx('ControlLabel')}>
                <FormattedMessage
                  id={'moreInfo.birthday'}
                  defaultMessage={'Birthday'}
                                />
              </label>
            </Col>
            <Col sm={7}>
              <DatePicker
                selected={this.state.birthday}
                onChange={this.handleBirthday} />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col sm={3}>
              <label className={cx('ControlLabel')}>
                <FormattedMessage
                  id={'moreInfo.nationality'}
                  defaultMessage={'Nationality'}
                                />
              </label>
            </Col>
            <Col sm={7}>
              <Select
                name='nationality'
                value={
                                    (
                                        this.props.userInfo &&
                                        this.props.userInfo._mailAddress && this.props.userInfo._mailAddress.country
                                    )
                                    ? this.props.userInfo._mailAddress.country
                                    : (
                                        (
                                            this.state.data.userInfo && this.state.data.userInfo._mailAddress && this.state.data.userInfo._mailAddress.country
                                        ) ? this.state.data.userInfo._mailAddress.country
                                        : ''
                                    )
                                }
                options={this.state.countrySelect}
                onChange={this.handleNationality}
                            />
            </Col>
          </FormGroup>

          <FormGroup>
            <Button
              bsStyle='primary'
              className='pull-center'
              onClick={this.fillMoreAccountInfo}
              block
              style={{
                display: !this.props.showApplyPro ? '' : 'none' }}
                        >
              <FormattedHTMLMessage
                id={'general.NextStep'}
                defaultMessage={'Next'}
                            />
            </Button>
          </FormGroup>
        </div>
      )
    } else {
            /**
             * display create business form
             */
      return (
        <div>
          <div className={cx('basicInfoContainer')}>
            <FormGroup controlId='firstName'>
              <Col sm={3}>
                <label className={cx('ControlLabel')}>
                  <FormattedHTMLMessage
                    id={'moreInfo.firstName'}
                    defaultMessage={'First Name'}
                                    />&#42;
                                </label>
              </Col>
              <Col sm={7}>
                <FormControl
                  type='text'
                  placeholder={
                                        formatMessage(placeHolderMessage.firstNamePlaceHolderMessage)
                                    }
                  onChange={this.setUserRelatedTextInput}
                  value={
                                        this.state.data.userInfo.firstName ? this.state.data.userInfo.firstName
                                        : ''
                                    }
                  disabled={this.props.showCreateBusiness}
                                />
              </Col>
            </FormGroup>
            <FormGroup controlId='lastName'>
              <Col sm={3}>
                <label className={cx('ControlLabel')}>
                  <FormattedHTMLMessage
                    id={'moreInfo.lastName'}
                    defaultMessage={'Last Name'}
                                    />&#42;
                                </label>
              </Col>
              <Col sm={7}>
                <FormControl
                  type='text'
                  placeholder={
                                        formatMessage(placeHolderMessage.lastNamePlaceHolderMessage)
                                    }
                  onChange={this.setUserRelatedTextInput}
                  value={
                                        this.state.data.userInfo.lastName ? this.state.data.userInfo.lastName
                                        : ''
                                    }
                  disabled={this.props.showCreateBusiness}
                                />
              </Col>
            </FormGroup>
            <FormGroup controlId='gender'>
              <Col sm={3}>
                <label className={cx('ControlLabel')}>
                  <FormattedHTMLMessage
                    id={'moreInfo.gender'}
                    defaultMessage={'Gender'}
                                    />&#42;
                                </label>
              </Col>
              <Col sm={7}>
                <Checkbox className={cx('checkboxStyle')} inline
                  checked={this.state.male}
                  onChange={this.setGender}
                  value='Male'
                  disabled={this.props.showCreateBusiness}>
                  <span>
                    <FormattedHTMLMessage
                          id={'moreInfo.male'}
                          defaultMessage={'Male'}
                                        />
                  </span>
                </Checkbox>
                <Checkbox className={cx('checkboxStyle')} inline
                  checked={this.state.female}
                  onChange={this.setGender}
                  value='Female'
                  disabled={this.props.showCreateBusiness}>
                  <span>
                    <FormattedHTMLMessage
                          id={'moreInfo.female'}
                          defaultMessage={'Female'}
                                        />
                  </span>
                </Checkbox>
                <Checkbox className={cx('checkboxStyle')} inline
                  checked={this.state.other}
                  onChange={this.setGender}
                  value='Other'
                  disabled={this.props.showCreateBusiness}>
                  <span>
                    <FormattedHTMLMessage
                          id={'moreInfo.other'}
                          defaultMessage={'Other'}
                                        />
                  </span>
                </Checkbox>
              </Col>
            </FormGroup>
            <FormGroup controlId='Birthday'>
              <Col sm={3}>
                <label className={cx('ControlLabel')}>
                  <FormattedHTMLMessage
                    id={'moreInfo.birthday'}
                    defaultMessage={'Birthday'}
                                    />&#42;
                                </label>
              </Col>
              <Col sm={7}>
                <DatePicker
                  selected={this.state.birthday}
                  onChange={this.handleBirthday}
                  disabled={this.props.showCreateBusiness} />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col sm={3}>
                <label className={cx('ControlLabel')}>
                  <FormattedHTMLMessage
                    id={'moreInfo.nationality'}
                    defaultMessage={'Nationality'}
                                    />&#42;
                                </label>
              </Col>
              <Col sm={7}>
                <Select
                  name='nationality'
                  value={
                                        (
                                            this.props.userInfo &&
                                            this.props.userInfo._mailAddress && this.props.userInfo._mailAddress.country
                                        )
                                        ? this.props.userInfo._mailAddress.country
                                        : (
                                            (
                                                this.state.data.userInfo && this.state.data.userInfo._mailAddress && this.state.data.userInfo._mailAddress.country
                                            ) ? this.state.data.userInfo._mailAddress.country
                                            : ''
                                        )
                                     }
                  options={this.state.countrySelect}
                  onChange={this.handleNationality}
                  disabled={this.props.showCreateBusiness}
                                />
              </Col>
            </FormGroup>

            <FormGroup>
              <Button bsStyle='primary'
                className='pull-center'
                onClick={this.fillMoreAccountInfo}
                block
                style={{
                  display: !this.props.showCreateBusiness ? '' : 'none' }}>
                <FormattedHTMLMessage
                  id={'general.NextStep'}
                  defaultMessage={'Next'}
                                />
              </Button>
            </FormGroup>
          </div>
          { this.renderCreateBusiness() }
        </div>
      )
    }
  }

  renderCreateBusiness () {
    if (this.props.showCreateBusiness) {
      return (
        <RegistDiverBusiness
          showCreateBusiness={this.props.showCreateBusiness}
          userInfo={this.props.userInfo}
          applyBusiness={this.props.applyBusiness}
          applyBusinessResult={this.props.applyBusinessResult}
          applyReseller={this.props.applyReseller}
                />
      )
    }
  }

  renderMore () {
    if (this.props.changeProOption) {
      if (this.state.proyes || this.props.existProApplyAmb) {
        return (
          <RegistDiverPro
            userInfo={this.state.data.userInfo}
            fillMoreAccountInfo={this.props.fillMoreRegistDiverAccountInfo}
            fillExtraUserInfoSuccess={this.props.fillExtraUserInfoSuccess}

            proyes={this.state.proyes}

            showApplyPro={this.props.showApplyPro}
            certMetas={this.props.certMetas}
            saveProData={this.props.saveProData}
            ambContinue={this.props.ambContinue}

            finish={this.props.finish}
            countrySelect={this.state.coutrySelect}
            saveAmbData={this.props.saveAmbData}

            directRenderProFinalPage={this.props.directRenderProFinalPage}
                    />
        )
      } else if (this.state.showMoreExtra) {
        return this.renderFillMore()
      }
    } else {
      return this.renderFillMore()
    }
  }

  renderAccountInfo () {
    if (this.state.accountExist) {
      return this.renderExistingAccountInfo()
    } else if (this.state.accountNotExist) {
      return this.renderNoAccountInfo()
    }
  }

    /**
     * [ clean out previous this.state.data to prevent previoud input data shown on page]
     */
  cleanOutPreData () {
    if (this.state.data) {
      // let preData = this.state.data
      this.setState({
        data: {}
      })
    }
  }
  renderExistingAccountInfo () {
    const { formatMessage } = this.props.intl
    return (
      <div className={cx('basicInfoContainer')}>
        <FormGroup controlId='email'>
          <Col sm={3}>
            <label className={cx('ControlLabel over')}>
              <FormattedHTMLMessage
                id={'basicInfo.EmailAddress'}
                defaultMessage={'Email Address'}
              />&#42;
            </label>
          </Col>
          <Col sm={7}>
            <FormControl
              type='text'
              placeholder={
                formatMessage(placeHolderMessage.emailPlaceHolderMessage)
              }
              value={ this.state.data.email }
              onChange={this.setTextInput}
              disabled={!_.isEmpty(this.state.data.userInfo)} />
          </Col>
        </FormGroup>

        <FormGroup controlId='password'>
          <Col sm={3}>
            <label
              className={cx('ControlLabel')}>
              <FormattedHTMLMessage
                id={'basicInfo.password'}
                defaultMessage={'Password'}
              />&#42;
            </label>
          </Col>
          <Col sm={7}>
            <FormControl
              type='password'
              placeholder={
                formatMessage(placeHolderMessage.passwordPlaceHolderMessage)
              }
              value={ this.state.data.password }
              onChange={this.setTextInput}
              disabled={!_.isEmpty(this.state.data.userInfo)} />
          </Col>
        </FormGroup>
        <div style={{ 'textAlign': 'right' }}>
          <a href='https://www.deepblu.com/discover/live?call=forgetpassword'>
            <FormattedHTMLMessage
              id={'basicInfo.forgetPassword'}
              defaultMessage={'Forget Password'}
            />
          </a>
        </div>
        <FormGroup>
          <Button
            bsStyle='primary'
            id='loginUser'
            className='pull-center'
            onClick={this.handleUserAccount} block
            style={{
              display: !this.state.data.userInfo ? '' : 'none'
            }}>
            <FormattedHTMLMessage
              id={'general.NextStep'}
              defaultMessage={'Next'}
            />
          </Button>
        </FormGroup>
      </div>
    )
  }

  renderNoAccountInfo () {
    // this.cleanOutPreData();
    const emailConfirm = this.state.emailConfirm
    const passwordConfirm = this.state.passwordConfirm

    const email = this.state.data.email
    const password = this.state.data.password
    const userInfo = this.props.userInfo
    const { formatMessage } = this.props.intl

    return (
      <div className={cx('basicInfoContainer')}>
        <FormGroup controlId='email'>
          <Col sm={3}>
            <label
              className={cx('ControlLabel')}>
              <FormattedHTMLMessage
                id={'basicInfo.EmailAddress'}
                defaultMessage={'Email Address'}
            />&#42;
            </label>
          </Col>
          <Col sm={7}>
            <FormControl
              type='text'
              placeholder={
                formatMessage(placeHolderMessage.applyNewAccountEmailPlaceHolderMessage)
              }
              value={ this.state.email }
              onChange={this.setEmail}
              disabled={!_.isEmpty(this.state.data.userInfo)} />
          </Col>
        </FormGroup>

        <FormGroup controlId='accountconfirm'>
          <Col sm={3}>
            <label className={cx('ControlLabel')}>
              <FormattedHTMLMessage
                id={'basicInfo.emailConfirm'}
                defaultMessage={'Confirm Email Address'}
              />&#42;
            </label>
          </Col>
          <Col sm={7}>
            <FormControl
              type='text'
              placeholder={
                formatMessage(placeHolderMessage.emailConfirmPlaceHolderMessage)
              }
              value={ this.state.confirmEmail }
              onChange={this.checkEmail}
              disabled={!_.isEmpty(this.state.data.userInfo)}
            />
            <div
              style={{
                display:
                  ( !emailConfirm )
                    ? ''
                    : 'none',
                color: 'red' }}>
              <FormattedHTMLMessage
                id={'basicInfo.emailConfirmFailAlert'}
                defaultMessage={
                  'The email addresses do not match. the same. Try again!'
                }
              />
            </div>
          </Col>
        </FormGroup>

        <FormGroup controlId='password'>
          <Col sm={3}>
            <label className={cx('ControlLabel')}>
              <FormattedHTMLMessage
                id={'basicInfo.password'}
                defaultMessage={'Password'}
              />&#42;
            </label>
          </Col>
          <Col sm={7}>
            <FormControl
              type='password'
              placeholder={
                formatMessage(placeHolderMessage.passwordPlaceHolderMessage)
              }
              onChange={this.setPassword}
              disabled={!_.isEmpty(this.state.data.userInfo)} />
          </Col>
        </FormGroup>
        <FormGroup controlId='passconfirm'>
          <Col sm={3}>
            <label className={cx('ControlLabel')}>
              <FormattedHTMLMessage
                id={'basicInfo.passwordConfirm'}
                defaultMessage={'Confirm Password'}
                            />&#42;
                        </label>
          </Col>
          <Col sm={7}>
            <FormControl
              type='password'
              placeholder={
                formatMessage(placeHolderMessage.passwordConfirmPlaceHolderMessage)
              }
              onChange={this.checkPassword}
              disabled={!_.isEmpty(this.state.data.userInfo)} />
            <div style={{
              display: (!passwordConfirm) ? '' : 'none', color: 'red' }}>
              <FormattedHTMLMessage
                id={'basicInfo.passwordConfirmFailAlert'}
                defaultMessage={'The passwords not the same. Try again!'}
                                />
            </div>
          </Col>
        </FormGroup>
        <FormGroup
          controlId='userName'
          style={{ display: (this.props.userInfo) ? 'NONE' : '' }}>
          <Col sm={3}>
            <label className={cx('ControlLabel')}>
              <FormattedHTMLMessage
                id={'basicInfo.userName'}
                defaultMessage={'User Name'}
                            />&#42;
                        </label>
          </Col>
          <Col sm={7}>
            <FormControl
              type='text'
              placeholder={
                formatMessage(placeHolderMessage.userNamePlaceHolderMessage)
              }
              onChange={this.setUserName}
              disabled={!_.isEmpty(this.state.data.userInfo)} />
          </Col>
        </FormGroup>
        <FormGroup>
          <Button
            bsStyle='primary'
            id='createUser'
            onClick={this.handleUserAccount} block
            disabled={
              !emailConfirm || !passwordConfirm
            }
            style={{
              display: this.props.userInfo ? 'NONE' : ''}}>
            <FormattedHTMLMessage
              id={'general.NextStep'}
              defaultMessage={'Next'}
            />
          </Button>
        </FormGroup>
      </div>
    )
  }

  renderDifferentSlogan () {
    if (this.props.userInfo.userDiveType == 'Pro') {
      return (
        <label className={cx('ControlLabel')}>
          <FormattedHTMLMessage
            id='basicInfo.uploadAnotherDiveProCert'
            defaultMessage='Do you want to upload new Dive Pro certification'
          />&#42;
        </label>
      )
    } else {
      return (
        <label className={cx('ControlLabel')}>
          <FormattedHTMLMessage
            id='basicInfo.applyProDiver'
            defaultMessage='Do You Want to be Dive Pro'
          />&#42;
        </label>
      )
    }
  }

  /**
   * [ display pro option section ]
   */
  displayProOption () {
    return (
      <FormGroup controlId='proOption'>
        <Col sm={3}>
          { this.renderDifferentSlogan() }
        </Col>
        <Col sm={6}>
          <Checkbox className={cx('checkboxStyle')}
            inline
            checked={this.state.proyes}
            onChange={this.setProOption}
            value='y' >
            <span>
              <FormattedHTMLMessage
                id='basicInfo.wantToApplyPro'
                defaultMessage='Sure'
              />
            </span>
          </Checkbox>
          <Checkbox className={cx('checkboxStyle')}
            inline
            checked={this.state.prono}
            onChange={this.setProOption}
            value='n'>
            <span>
              <FormattedHTMLMessage
                id='basicInfo.laterApplyPro'
                defaultMessage='Not Yet'
              />
            </span>
          </Checkbox>
        </Col>
        <Col sm={3} style={{'paddingTop': '5'}}>
          <a
            href='https://academy.deepblu.com/become-a-verified-dive-pro/'
            onClick={this.handleProIntro}>
            <FormattedHTMLMessage
              id='basicInfo.proIntro'
              defaultMessage='What is Dive Pro?'
            />
          </a>
        </Col>
      </FormGroup>
    )
  }
  handleProIntro (e) {
    e.preventDefault()
    window.open(e.target.href, '"_blank"')
  }

  renderUserExtraInfo () {
    const { formatMessage } = this.props.intl

    if (this.props.userInfo) {
      if (this.props.diver) {
        return (
          <div>
            <div className={cx('basicInfoContainer')}>
              <FormGroup controlId='userName'>
                <Col sm={3}>
                  <label className={cx('ControlLabel')}>
                    <FormattedHTMLMessage
                          id={'basicInfo.userName'}
                          defaultMessage={'User Name'}
                    />&#42;
                  </label>
                </Col>
                <Col sm={7} style={{ 'paddingRight': '0' }}>
                  <FormControl
                    type='text'
                    placeholder={
                      formatMessage(placeHolderMessage.userNamePlaceHolderMessage)
                    }
                    onChange={this.setUserRelatedTextInput}
                    value={
                      this.state.data.userInfo.userName ? this.state.data.userInfo.userName :
                      ''
                    }
                    disabled={this.props.fillExtraUserInfoSuccess}
                  />
                  <div
                    style={{
                      display:
                      this.state.userNameEmpty ? '' : 'none',
                      color: 'red'
                    }}>
                    <FormattedHTMLMessage
                      id={'basicInfo.userNameNotEmptyAlert'}
                      defaultMessage={'User Name should not be empty, thanks!'}
                    />
                  </div>
                </Col>
              </FormGroup>
              { this.displayProOption() }
            </div>
            { this.renderMore() }
          </div>
        )
      } else {
        return (
          <div>
            <div className={cx('basicInfoContainer')}>
              <FormGroup controlId='userName'>
                <Col sm={3}>
                  <label className={cx('ControlLabel')}>
                    <FormattedHTMLMessage
                      id={'basicInfo.userName'}
                      defaultMessage={'User Name'}
                    />&#42;
                  </label>
                </Col>
                <Col sm={7}>
                  <FormControl
                    type='text'
                    placeholder={
                      formatMessage(placeHolderMessage.userNamePlaceHolderMessage)
                    }
                    onChange={this.setUserRelatedTextInput}
                    value={
                      this.state.data.userInfo.userName ? this.state.data.userInfo.userName
                      : ''
                    }
                    disabled={this.props.showCreateBusiness}
                  />
                  <div
                    style={{ display: this.state.userNameEmpty ? '' : 'none', color: 'red' }}>
                    <FormattedHTMLMessage
                      id={'basicInfo.userNameNotEmptyAlert'}
                      defaultMessage={'User Name should not be empty, thanks!'}
                    />
                  </div>
                </Col>
              </FormGroup>
            </div>
            { this.renderMore() }
          </div>
        )
      }
    }
  }

  render () {
    return (
      <div>
        <div className={cx('basicInfoContainer')}>
          <p className={cx('introSection')}>
            <FormattedMessage
              id={'basicInfo.greeting'}
              defaultMessage={'If you already have an account with Deepblu, please enter the email and password here. If you do not have a Deepblu account, we will create one for you once you submit this form and verify your email address.'}
            />
          </p>
          <FormGroup controlId='deepbluAccountExists'>
            <Col componentClass={cx('ControlLabel')} sm={3}>
              <FormattedMessage
                id={'basicInfo.askAccount'}
                defaultMessage={'Do you have a Deepblu account?'}
              />
            </Col>
            <Col sm={8}>
              <Checkbox className={cx('checkboxStyle')}
                checked={this.state.accountExist}
                onChange={this.setAcccountExist}
                value='y'
                disabled={!_.isEmpty(this.state.data.userInfo)} >
                <span>
                  <FormattedMessage
                    id={'basicInfo.checkOptionAccountExisted'}
                    defaultMessage={'I already have a Deepblu account'}
                  />
                </span>
              </Checkbox>
              <Checkbox className={cx('checkboxStyle')}
                checked={this.state.accountNotExist}
                onChange={this.setAcccountExist}
                value='n'
                disabled={!_.isEmpty(this.state.data.userInfo)} >
                <span>
                  <FormattedMessage
                    id={'basicInfo.checkOptionNoAccount'}
                    defaultMessage={'I do not yet have a Deepblu account'}
                  />
                </span>
              </Checkbox>
            </Col>
          </FormGroup>
        </div>
        { this.renderAccountInfo() }
        { this.renderUserExtraInfo() }
      </div>
    )
  }
}

RegistDiverBasicInfo.propTypes = {
  intl: intlShape.isRequired
}

// actually this is one HOC just like redux is one of HOC implement
export default injectIntl(RegistDiverBasicInfo)
