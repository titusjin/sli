/**
 * Regist/update Diver Pro information component
 *
 * @author titus
 * @since 2017.10
 */

'use strict'

import React from 'react'
import logo from '~/src/images/registform/logo.png'
import diver from '~/src/images/registform/select_diver.png'
import business from '~/src/images/registform/select_business.png'

import { Button, Form, FormControl, FormGroup, ControlLabel, Option, Table, Col, Image, Checkbox } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import Select from 'react-select'
import moment from 'moment'
import _ from 'lodash'
import countryTelData from 'country-telephone-data'

import styles from './styles.css'
import classNames from 'classnames/bind'
let cx = classNames.bind(styles)

import swalTrigger from '~/src/utils/swalTrigger'
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
  },
  contactPlaceHolderMessage: {
    id: 'placeHolderMessage.contactPlaceHolderMessage',
    defaultMessage: 'Address'
  },
  contactCityHolderMessage: {
    id: 'placeHolderMessage.contactCityHolderMessage',
    defaultMessage: 'City'
  },
  contactStateHolderMessage: {
    id: 'placeHolderMessage.contactStateHolderMessage',
    defaultMessage: 'State/Province/Region'
  },
  postCodeHolderMessage: {
    id: 'placeHolderMessage.postCodeHolderMessage',
    defaultMessage: 'ZIP/Postal Code'
  },
  telNumberHolderMessage: {
    id: 'placeHolderMessage.telNumberHolderMessage',
    defaultMessage: 'Phone number wihtout prefix'
  },
  faxNumberHolderMessage: {
    id: 'placeHolderMessage.faxNumberHolderMessage',
    defaultMessage: 'Fax number'
  }
})

let swalInfoMessage = defineMessages({
  mustFillInFields: {
    id: 'swalInfoMessage.mustFillInFields',
    defaultMessage: 'Fields that must be filled in : '
  },
  mustAgreeMAP: {
    id: 'swalInfoMessage.mustAgreeMAP',
    defaultMessage: "Sorry! You are not agree to our MAP , As a result we can't let you apply ambassador."
  }
})

let map = defineMessages({
  termsConditions: {
    id: 'map.termsConditions',
    defaultMessage: 'Deepblu Terms and Conditions'
  },
  privacyPolicy: {
    id: 'map.privacyPolicy',
    defaultMessage: 'Privacy Policy'
  }
})

class RegistDiverPro extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      male: false,
      female: false,
      other: false,
      certLevel: '',
      certOrg: 'VDST',
      certNumShow: true,

      logoBase64ContentFront: '',
      logoBase64ContentBack: '',
      ambyes: false,
      ambno: false,
      data: {},

      birthday: !_.isEmpty(props.userInfo.Birthday) ? moment(props.userInfo.Birthday.Month + '/' + props.userInfo.Birthday.Day + '/' + props.userInfo.Birthday.Year)
            : moment()
    }

        // this components should always get userinfo while initialized
    this.state.data.userInfo = props.userInfo

    if (props.userInfo && props.userInfo.gender && props.userInfo.gender) {
      if (props.userInfo.gender.toLowerCase() == 'male') {
        this.state.male = true
        this.state.female = false
        this.state.other = false
      } else if (props.userInfo.gender.toLowerCase() == 'female') {
        this.state.female = true
        this.state.male = false
        this.state.other = false
      } else if (props.userInfo.gender.toLowerCase() == 'other') {
        this.state.other = true
        this.state.male = false
        this.state.female = false
      }
    }

    this.setFirstName = this.setFirstName.bind(this)
    this.setLastName = this.setLastName.bind(this)

    this.handleBirthday = this.handleBirthday.bind(this)
    this.setGender = this.setGender.bind(this)

    this.handleCertOrg = this.handleCertOrg.bind(this)
    this.handleCertLevel = this.handleCertLevel.bind(this)

    this.handleNationality = this.handleNationality.bind(this)
    this.setUserName = this.setUserName.bind(this)

    this.setCertNum = this.setCertNum.bind(this)
    this.setLicenseFrontPic = this.setLicenseFrontPic.bind(this)
    this.setAmbOption = this.setAmbOption.bind(this)

    this.fillMoreAccountInfo = this.fillMoreAccountInfo.bind(this)
    this.renderProSpecific = this.renderProSpecific.bind(this)
    this.saveProData = this.saveProData.bind(this)
    this.renderAmbSpecific = this.renderAmbSpecific.bind(this)
    this.setAddress = this.setAddress.bind(this)
    this.setCity = this.setCity.bind(this)
    this.setRegion = this.setRegion.bind(this)
    this.setPostCode = this.setPostCode.bind(this)
    this.handleCounrty = this.handleCounrty.bind(this)
    this.saveAmbData = this.saveAmbData.bind(this)

    this.handleTelCodeChange = this.handleTelCodeChange.bind(this)
    this.setPhone = this.setPhone.bind(this)
    this.setWebSite = this.setWebSite.bind(this)
    this.setFaxCode = this.setFaxCode.bind(this)
    this.setFaxNumber = this.setFaxNumber.bind(this)
    this.setContactEmail = this.setContactEmail.bind(this)
    this.setEmpStatus = this.setEmpStatus.bind(this)
    this.setdiveStudentNumberEstimation = this.setdiveStudentNumberEstimation.bind(this)
    this.setDiveComputerUsage = this.setDiveComputerUsage.bind(this)

    this.setUserRelatedTextInput = this.setUserRelatedTextInput.bind(this)
    this.setmapAgreeOption = this.setmapAgreeOption.bind(this)
    this.setAmbContinue = this.setAmbContinue.bind(this)
  }

  componentWillMount () {
    let counrtySelect = []
    countryMapping.forEach(function (o) {
      let temp = {}
      temp.label = o.en
      temp.value = o.isoCode

      counrtySelect.push(temp)
    })

    let telCodeSelect = []
    countryTelData.allCountries.forEach(function (o) {
      let temp = {}
      temp.label = o.dialCode
      temp.value = o.iso2.toUpperCase()

      telCodeSelect.push(temp)
    })

    let certOrgs = []
    let certLevels = []
    if (this.props.certMetas && !_.isEmpty(this.props.certMetas)) {
      _.forEach(this.props.certMetas, function (o) {
        let orgresult = {}
        if (o.id == 'NONE001' || o.id == 'NONE002') {
          return
        } else {
          orgresult = {
            'value': o.organizationName,
            'label': o.organizationName
          }
        }

        if (o.organizationName == 'VDST' && o.certificationRole == 'Pro') {
          let levelResult = {
            'value': o.certificationLevel,
            'label': o.certificationLevel
          }
          certLevels.push(levelResult)
        }
        certOrgs.push(orgresult)
      })
    }

    this.setState({
      counrtySelect: counrtySelect,
      phoneType: [{ 'value': 'landline', 'label': 'LandLine' }, { 'value': 'mobile', 'label': 'Mobile' }],
      telCodeSelect: telCodeSelect,
      certMetas: this.props.certMetas,
      certOrgSelect: certOrgs || [],
      certLevelSelect: certLevels || []
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
          if (nextProps.userInfo.gender.toLowerCase() == 'male') {
            this.setState({
              male: true,
              female: false,
              other: false,
              birthday: moment(birthday)
            })
          } else if (nextProps.userInfo.gender.toLowerCase() == 'female') {
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

    if (nextProps.certMetas && !_.isEmpty(nextProps.certMetas)) {
      let certOrgs = []
      let certLevels = []
      _.forEach(nextProps.certMetas, function (o) {
        let orgresult = {}
        if (o.id == 'NONE001' || o.id == 'NONE002') {
          return
        } else {
          orgresult = {
            'value': o.organizationName,
            'label': o.organizationName
          }
        }

        if (o.organizationName == 'VDST' && o.certificationRole == 'Pro') {
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

  fillMoreAccountInfo () {
    const { formatMessage } = this.props.intl

    let result = this.checkFillMoreAcccountInfo(this.state.data.userInfo)
    if (result) {
      let message = formatMessage(swalInfoMessage.mustFillInFields)
      swalTrigger.triggerGeneralAlert('fail', message + result)
    } else {
      this.props.fillMoreAccountInfo(this.state.data, true)
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

  saveProData () {
    const { formatMessage } = this.props.intl

    let checkResult = this.checkSaveProData(this.state)
    if (checkResult) {
      let message = formatMessage(swalInfoMessage.mustFillInFields)
      swalTrigger.triggerGeneralAlert('fail', message + checkResult)
    } else {
      this.props.saveProData(this.state)
    }
  }
  checkSaveProData (data) {
    let needed = [ 'certOrg', 'certLevel', 'certNum', 'licenseFontPic', 'ambOption' ]
    let result = ''

    if (data.certOrg == 'RAID') {
      _.forEach(needed, function (o) {
        if (o == 'certNum' && !data[o]) {
          return true
        } else {
          if (!data[o]) {
            if (o == 'ambOption') {
              result += 'want_to_be_Ambassador '
            } else {
              result += (o + ' ')
            }
          }
        }
      })
    } else {
      _.forEach(needed, function (o) {
        if (!data[o]) {
          if (o == 'ambOption') {
            result += 'want_to_be_Ambassador '
          } else {
            result += (o + ' ')
          }
        }
      })
    }
    return result
  }

  handleCertOrg (val) {
    let certLevels = []
    _.forEach(this.state.certMetas, function (o) {
      if (o.organizationName == val && o.certificationRole == 'Pro') {
        let temp = {}
        temp.value = o.certificationLevel
        temp.label = o.certificationLevel

        certLevels.push(temp)
      }
    })

        // if( 'SSI' == val ){
    if (val == 'RAID') {
      this.setState({
        certOrg: val,
        certLevel: '',
        certLevelSelect: certLevels,
        certNumShow: false
      })
    } else {
      this.setState({
        certOrg: val,
        certLevel: '',
        certLevelSelect: certLevels,
        certNumShow: true
      })
    }
  }
  handleCertLevel (val) {
    this.setState({
      certLevel: val
    })
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

    if (id == 'userName') {
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
        data: {
          ...preData,
          userInfo: { ...preUserInfo, gender: result }
        }
      })
    } else {
      this.setState({
        male: false,
        female: false,
        other: true,
        data: {
          ...preData,
          userInfo: { ...preUserInfo, gender: result }
        }
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
      data: { ...preData, username: e.target.value }
    })
  }
  setCertNum (e) {
    this.setState({
      certNum: e.target.value
    })
  }
  setLicenseFrontPic (e) {
    let that = this
    e.preventDefault()
    let logo = e.target.files[0]

    const reader = new FileReader()
    reader.onload = function (event) {
      const dataUrl = event.target.result
      that.setState({
        logoBase64ContentFront: dataUrl,
        licenseFontPic: logo
      })
    }
    reader.readAsDataURL(logo)
  }

  setAmbContinue (e) {
    let result = e.target.value
    if (result == 'y') {
      this.setState({
        ambyes: true,
        ambno: false,
        ambContinue: e.target.value
      })
    } else {
      this.setState({
        ambyes: false,
        ambno: true,
        ambContinue: e.target.value
      })
    }
  }

  setAmbOption (e) {
    let result = e.target.value
        // let preData = this.state.data;

    if (result == 'y') {
      this.setState({
        ambyes: true,
        ambno: false,
        ambOption: result
      })
    } else {
      this.setState({
        ambyes: false,
        ambno: true,
        ambOption: result
      })
    }
  }
  setAddress (e) {
    let result = e.target.value
    let preData = this.state.data

    this.setState({
      data: { ...preData, address: result }
    })
  }
  setCity (e) {
    let result = e.target.value
    let preData = this.state.data

    this.setState({
      data: { ...preData, city: result }
    })
  }
  setRegion (e) {
    let result = e.target.value
    let preData = this.state.data

    this.setState({
      data: { ...preData, state: result }
    })
  }
  setPostCode (e) {
    let result = e.target.value
    let preData = this.state.data

    this.setState({
      data: { ...preData, zipCode: result }
    })
  }
  handleCounrty (val) {
    let result = val
    let preData = this.state.data

    let preSetTelCode = _.find(this.state.telCodeSelect, function (o) {
      return o.value == result
    })
    this.setState({
      data: { ...preData, country: result, phoneCountryCode1: '+' + preSetTelCode.label, fax: '+' + preSetTelCode.label }
    })
  }
  handleTelCodeChange (val) {
    let country = _.find(this.state.telCodeSelect, function (o) {
      return o.value == val
    })

    let result = '+' + country.label
    let preData = this.state.data
    this.setState({
      data: { ...preData, phoneCountryCode1: result }
    })
  }
  setPhone (e) {
    let result = e.target.value

    let preData = this.state.data
    this.setState({
      data: { ...preData, phone1: result }
    })
  }
  setWebSite (e) {
    let result = e.target.value

    let preData = this.state.data
    this.setState({
      data: { ...preData, webSite: result }
    })
  }
  setFaxCode (val) {
    let country = _.find(this.state.telCodeSelect, function (o) {
      return o.value == val
    })

    let result = '+' + country.label
    let preData = this.state.data
    this.setState({
      data: { ...preData, fax: result }
    })
  }
  setFaxNumber (e) {
    let preData = this.state.data
    let result = e.target.value

    this.setState({
      data: { ...preData, phone2: result }
    })
  }
  setContactEmail (e) {
    let preData = this.state.data
    let result = e.target.value

    this.setState({
      data: { ...preData, contactEmail: result }
    })
  }
  setEmpStatus (val) {
    let preData = this.state.data

    this.setState({
      data: { ...preData, employmentStatus: val }
    })
  }
  setdiveStudentNumberEstimation (val) {
    let preData = this.state.data

    this.setState({
      data: { ...preData, studentNumber: val }
    })
  }
  setDiveComputerUsage (e) {
    let preData = this.state.data

    this.setState({
      data: { ...preData, currentDiveComputer: e.target.value }
    })
  }

  setmapAgreeOption (e) {
    let result = e.target.value
    let preData = this.state.data

    if (result == 'y') {
      this.setState({
        mapAgreeno: false,
        mapAgreeyes: true,
        data: {
          ...preData,
          mapAgreeOption: 'y'
        }
      })
    } else {
      this.setState({
        mapAgreeno: true,
        mapAgreeyes: false,
        data: {
          ...preData,
          mapAgreeOption: 'n'
        }
      })
    }
  }

    /**
     *  Acions start from here ...
     */
  saveAmbData () {
    const { formatMessage } = this.props.intl

    let data = this.state.data
    let result = this.checkSaveAmbData(data)

    if (result) {
      let message = formatMessage(swalInfoMessage.mustFillInFields)
      swalTrigger.triggerGeneralAlert('fail', message + result)
    } else if (this.state.data.mapAgreeOption == 'n') {
      let message = formatMessage(swalInfoMessage.mustAgreeMAP)
      swalTrigger.triggerGeneralAlert('fail', message)
    } else {
      this.props.saveAmbData(data)
    }
  }
  checkSaveAmbData (data) {
    let needed = [ 'address', 'city', 'country', 'phoneCountryCode1', 'phone1', 'zipCode', 'mapAgreeOption']
    let result = ''

    _.forEach(needed, function (o) {
      if (!data[o]) {
        if (o == 'mapAgreeOption') {
          result += ('MAPTerm_Agreement' + ' ')
        } else {
          result += (o + ' ')
        }
      }
    })
    return result
  }

    /**
     * render start from here
     */

  renderChooseRenderAmbSpecifc () {
    if ((!this.props.proyes && this.state.data.userInfo.userDiveType == 'Pro')) {
      return (
        <div className={cx('basicInfoContainer')}>
          <FormGroup controlId='ambassadorOption'>
            <Col sm={3}>
              <label className={cx('ControlLabel')}>
                <FormattedHTMLMessage
                  id={'diveProSpecific.wantToBeAmbOption'}
                  defaultMessage={'Want to be COSMIQ+ Sales Ambassador'}
                                 />&#42;
                             </label>
            </Col>
            <Col sm={7} className={cx('inputFieldDiv')}>
              <Checkbox className={cx('checkboxStyle')}
                inline
                checked={this.state.ambyes}
                onChange={this.setAmbContinue}
                value='y'>
                <span>
                  <FormattedMessage
                    id={'diveProSpecific.wanwantToApplyAmb'}
                    defaultMessage={'I Would Love to'}
                                     />
                </span>
              </Checkbox>
              <Checkbox className={cx('checkboxStyle')}
                inline
                checked={this.state.ambno}
                onChange={this.setAmbContinue}
                value='n'>
                <span>
                  <FormattedMessage
                    id={'diveProSpecific.latlaterApplyAmb'}
                    defaultMessage={'May be later'}
                                     />
                </span>
              </Checkbox>
            </Col>
          </FormGroup>
          { this.renderAmbSpecific() }
        </div>
      )
    } else {
      return this.renderAmbSpecific()
    }
  }

  renderAmbSpecific () {
    const { formatMessage } = this.props.intl

    if (this.props.ambContinue || this.state.ambContinue == 'y') {
      return (
        <div className={cx('basicInfoContainer')}>
          <FormGroup>
            <Col sm={3}>
              <label className={cx('ControlLabel')}>
                <FormattedHTMLMessage
                  id={'amb.contactAddress'}
                  defaultMessage={'Contact Address'}
                                />&#42;
                            </label>
            </Col>
            <Col sm={7} className={cx('inputFieldDiv')}>
              <FormControl
                type='text'
                placeholder={
                                    formatMessage(placeHolderMessage.contactPlaceHolderMessage)
                                }
                onChange={this.setAddress} />
            </Col>
            <Col sm={1} style={{ 'marginRight': '0', 'paddingLeft': '0' }}>
                            &#42;
                        </Col>
          </FormGroup>

          <FormGroup>
            <Col sm={3}>
              <label className={cx('ControlLabel')} />
            </Col>
            <Col sm={7} className={cx('inputFieldDiv')}>
              <FormControl
                type='text'
                placeholder={
                                    formatMessage(placeHolderMessage.contactCityHolderMessage)
                                }
                onChange={this.setCity} />
            </Col>
            <Col sm={1} style={{ 'marginRight': '0', 'paddingLeft': '0' }}>
                            &#42;
                        </Col>
          </FormGroup>

          <FormGroup>
            <Col sm={3}>
              <label className={cx('ControlLabel')} />
            </Col>
            <Col sm={7} className={cx('inputFieldDiv')}>
              <FormControl
                type='text'
                placeholder={
                                    formatMessage(placeHolderMessage.contactStateHolderMessage)
                                }
                onChange={this.setRegion} />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col sm={3}>
              <label className={cx('ControlLabel')} />
            </Col>
            <Col sm={7} className={cx('inputFieldDiv')}>
              <FormControl
                type='text'
                placeholder={
                                    formatMessage(placeHolderMessage.postCodeHolderMessage)
                                }
                onChange={this.setPostCode} />
            </Col>
            <Col sm={1} style={{ 'marginRight': '0', 'paddingLeft': '0' }}>
                            &#42;
                        </Col>
          </FormGroup>
          <FormGroup>
            <Col sm={3}>
              <label className={cx('ControlLabel')} />
            </Col>
            <Col sm={7} className={cx('inputFieldDiv')}>
              <Select
                name='counrty'
                options={this.state.counrtySelect}
                value={this.state.data.country}
                onChange={this.handleCounrty}
                            />
            </Col>
            <Col sm={1} style={{ 'marginRight': '0', 'paddingLeft': '0' }}>
                            &#42;
                        </Col>
          </FormGroup>

          <FormGroup>
            <Col sm={3}>
              <label className={cx('ControlLabel')}>
                <FormattedHTMLMessage
                  id={'amb.contactPhone'}
                  defaultMessage={'Contact Phone'}
                                />&#42;
                            </label>
            </Col>
            <Col sm={3}>
              <Select
                name='telCode'
                value={this.state.data.phoneCountryCode1}
                options={this.state.telCodeSelect}
                onChange={this.handleTelCodeChange}
                            />
            </Col>
            <Col sm={4} className={cx('inputFieldDiv')}>
              <FormControl
                type='text'
                placeholder={
                                    formatMessage(placeHolderMessage.telNumberHolderMessage)
                                }
                onChange={this.setPhone} />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col sm={3}>
              <label className={cx('ControlLabel')}>
                <FormattedMessage
                  id={'amb.webSite'}
                  defaultMessage={'Web Site'}
                                />
              </label>
            </Col>
            <Col sm={7} className={cx('inputFieldDiv')}>
              <FormControl
                type='text'
                onChange={this.setWebSite} />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col sm={3}>
              <label className={cx('ControlLabel')}>
                <FormattedMessage
                  id={'amb.Fax'}
                  defaultMessage={'Fax'}
                                />
              </label>
            </Col>
            <Col sm={3}>
              <Select
                name='faxCode'
                value={this.state.data.fax}
                options={this.state.telCodeSelect}
                onChange={this.setFaxCode}
                            />
            </Col>
            <Col sm={4} className={cx('inputFieldDiv')}>
              <FormControl
                type='text'
                placeholder={
                                    formatMessage(placeHolderMessage.faxNumberHolderMessage)
                                }
                value={
                                    this.state.data.phone2
                                }
                onChange={this.setFaxNumber} />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col sm={3}>
              <label className={cx('ControlLabel')}>
                <FormattedHTMLMessage
                  id={'amb.contactEmail'}
                  defaultMessage={'Contact Email(if different)'}
                                />
              </label>
            </Col>
            <Col sm={7} className={cx('inputFieldDiv')}>
              <FormControl
                type='text'
                value={this.state.data.contactEmail} onChange={this.setContactEmail} />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col sm={3}>
              <label className={cx('ControlLabel')}>
                <FormattedHTMLMessage
                  id={'amb.employmentStatus'}
                  defaultMessage={'Employment Status'}
                                />
              </label>
            </Col>
            <Col sm={7} className={cx('inputFieldDiv')}>
              <Select
                name='employmentStatus'
                value={this.state.data.employmentStatus}
                options={[
                                    {'value': 'Self-Employed', 'label': 'Self-Employed'},
                                    {'value': 'Freelancer', 'label': 'Freelancer'},
                                    {'value': 'Dive Shop Employee', 'label': 'Dive Shop Employee'}
                ]}
                onChange={this.setEmpStatus}
                            />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col sm={3}>
              <label className={cx('ControlLabel')}>
                <FormattedHTMLMessage
                  id={'amb.estimatedStudentPerMonth'}
                  defaultMessage={'Estimated Number of Dive Students Taught per Month'}
                                />
              </label>
            </Col>
            <Col sm={7} className={cx('inputFieldDiv')}>
              <Select
                name='diveStudentNumberEstimation'
                value={this.state.data.studentNumber}
                options={[
                                    {'value': '10', 'label': '1-10'},
                                    {'value': '20', 'label': '11-20'},
                                    {'value': '30', 'label': '21-30'},
                                    {'value': '40', 'label': '31-40'},
                                    {'value': '40', 'label': '41-50'},
                                    {'value': '40', 'label': '51-60'},
                                    {'value': '40', 'label': '61-70'},
                                    {'value': '40', 'label': '71-80'},
                                    {'value': '40', 'label': '81-90'},
                                    {'value': '40', 'label': '91-100'},
                                    {'value': '>100', 'label': '>100'}
                ]}
                onChange={this.setdiveStudentNumberEstimation}
                            />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col sm={3}>
              <label className={cx('ControlLabel')}>
                <FormattedHTMLMessage
                  id={'amb.diveComputer'}
                  defaultMessage={'Which dive computer are you currently using'}
                                />
              </label>
            </Col>
            <Col sm={7} className={cx('inputFieldDiv')}>
              <FormControl
                type='text'
                value={this.state.data.currentDiveComputer} onChange={this.setDiveComputerUsage} />
            </Col>
          </FormGroup>

          <FormGroup controlId='mapAgreeOption'>
            <Col sm={10}>
              <label className={cx('ControlLabel')}>
                <FormattedMessage
                  id={'map.alreadyRead'}
                  values={{
                    deepbluTermsConditions: <a href=' https://www.deepblu.com/terms-of-condition'>{ formatMessage(map.termsConditions) }</a>,
                    privacyPolicy: <a href='https://www.deepblu.com/privacy-policy'> { formatMessage(map.privacyPolicy) }</a>
                  }}
                  defaultMessage={`I have read and agree to the <a href=" https://www.deepblu.com/terms-of-condition">
                                        Deepblu Terms and Conditions</a>, the
                                        <a href=" https://www.deepblu.com/privacy-policy">
                                            Privacy Policy
                                        </a>
                                         and the Minimum Advertised Price displayed below.` }
                                />&#42;
                            </label>
            </Col>
            <Col sm={7} className={cx('inputFieldDiv')}>
              <Checkbox className={cx('checkboxStyle')}
                inline
                checked={this.state.mapAgreeyes}
                onChange={this.setmapAgreeOption}
                value='y'>
                <span>
                  <FormattedMessage
                    id={'map.agree'}
                    defaultMessage={'Yes'}
                                    />
                </span>
              </Checkbox>
              <Checkbox className={cx('checkboxStyle')}
                inline
                checked={this.state.mapAgreeno}
                onChange={this.setmapAgreeOption}
                value='n'>
                <span>
                  <FormattedMessage
                    id={'map.disagree'}
                    defaultMessage={'No'}
                                    />
                </span>
              </Checkbox>
            </Col>
          </FormGroup>
          <FormGroup>
            <p className={cx('maptermContent')}>
              <FormattedHTMLMessage
                id={'map.termContent'}
                defaultMessage={
                                    `To protect the investments of Deepblu Sales Ambassadors and COSMIQ Resellers, Deepblu requires all Resellers and Ambassadors to adhere to below Minimum Advertised Price (MAP) Policy.<br />

                                    The MAP is set by Deepblu and may be changed at any time at our sole discretion.<br />

                                    Failure to comply with this MAP Policy, intentional and/or repeated failure to abide, may result in the immediate termination of your COSMIQ Reseller or Deepblu Ambassador status and the connected benefits.`
                                }
                            />

            </p>
          </FormGroup>

          <FormGroup>
            <Button
              bsStyle='primary'
              className='pull-center'
              onClick={this.saveAmbData}
              block>
              <FormattedHTMLMessage
                id={'general.NextStep'}
                defaultMessage={'Next'}
                            />
            </Button>
          </FormGroup>
        </div>
      )
    }

    if (this.state.ambContinue == 'n') {
      this.props.directRenderProFinalPage()
    }
  }

  renderProSpecific () {
    const { formatMessage } = this.props.intl

    if (this.props.showApplyPro) {
      return (
        <div className={cx('basicInfoContainer')}>
          <FormGroup>
            <Col sm={3}>
              <label className={cx('ControlLabel')}>
                <FormattedHTMLMessage
                  id={'diveProSpecific.certAgency'}
                  defaultMessage={'Certification Agency'}
                                />&#42;
                            </label>
            </Col>
            <Col sm={7} className={cx('inputFieldDiv')}>
              <Select
                name='certAgency'
                value={this.state.certOrg}
                options={this.state.certOrgSelect}
                onChange={this.handleCertOrg}
                disabled={this.props.ambContinue}
                            />
            </Col>
          </FormGroup>

          <FormGroup disabled={this.props.ambContinue}>
            <Col sm={3}>
              <label className={cx('ControlLabel')}>
                <FormattedHTMLMessage
                  id={'diveProSpecific.certLevel'}
                  defaultMessage={'Toppest Certification Level'}
                                />&#42;
                            </label>
            </Col>
            <Col sm={7} className={cx('inputFieldDiv')}>
              <Select
                name='certLevel'
                value={this.state.certLevel}
                options={this.state.certLevelSelect}
                onChange={this.handleCertLevel}
                disabled={this.props.ambContinue}
                            />
            </Col>
          </FormGroup>

          <FormGroup
            controlId='certNumber'
            style={{
              'display': this.state.certNumShow ? '' : 'none' }}
                    >
            <Col sm={3}>
              <label className={cx('ControlLabel')}>
                <FormattedHTMLMessage
                  id={'diveProSpecific.certNumber'}
                  defaultMessage={'Certification Number'}
                                />&#42;
                            </label>
            </Col>
            <Col sm={7} className={cx('inputFieldDiv')}>
              <FormControl
                type='text'
                onChange={this.setCertNum}
                disabled={this.props.ambContinue} />
            </Col>
          </FormGroup>

          <FormGroup controlId='licenseFontPic'>
            <Col sm={3}>
              <label className={cx('ControlLabel')}>
                <FormattedHTMLMessage
                  id={'diveProSpecific.certPic'}
                  defaultMessage={'License front Pic'}
                                />&#42;
                            </label>
            </Col>
            <Col sm={7} className={cx('inputFieldDiv')}>
              <FormControl
                type='file'
                onChange={this.setLicenseFrontPic}
                disabled={this.props.ambContinue} />
            </Col>
          </FormGroup>
          <Image responsive src={this.state.logoBase64ContentFront} style={{display: (this.state.logoBase64ContentFront) ? '' : 'none', marginTop: '10px', marginBottom: '20px'}} />

          <FormGroup controlId='ambassadorOption'>
            <Col sm={3}>
              <label className={cx('ControlLabel')}>
                <FormattedHTMLMessage
                  id={'diveProSpecific.wantToBeAmbOption'}
                  defaultMessage={'Want to be COSMIQ+ Sales Ambassador'}
                                />&#42;
                            </label>
            </Col>
            <Col sm={7} className={cx('inputFieldDiv')}>
              <Checkbox className={cx('checkboxStyle')}
                inline
                checked={this.state.ambyes}
                onChange={this.setAmbOption}
                value='y'
                disabled={this.props.ambContinue}>
                <span>
                  <FormattedMessage
                    id={'diveProSpecific.wanwantToApplyAmb'}
                    defaultMessage={'I Would Love to'}
                                    />
                </span>
              </Checkbox>
              <Checkbox className={cx('checkboxStyle')}
                inline
                checked={this.state.ambno}
                onChange={this.setAmbOption}
                value='n'
                disabled={this.props.ambContinue}>
                <span>
                  <FormattedMessage
                    id={'diveProSpecific.latlaterApplyAmb'}
                    defaultMessage={'May be later'}
                                    />
                </span>
              </Checkbox>
            </Col>
          </FormGroup>

          <FormGroup>
            <Button
              bsStyle='primary'
              className='pull-center'
              onClick={this.saveProData}
              block
              style={{
                display: this.props.ambContinue ? 'none' : ''
              }}>
              <FormattedMessage
                id={'general.NextStep'}
                defaultMessage={'Next'}
                            />
            </Button>
          </FormGroup>
        </div>
      )
    }
  }

  render () {
    const { formatMessage } = this.props.intl
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
            <Col sm={7} className={cx('inputFieldDiv')}>
              <FormControl
                type='text'
                placeholder={
                                    formatMessage(placeHolderMessage.firstNamePlaceHolderMessage)
                                }
                value={
                                    this.state.data.userInfo.firstName ? this.state.data.userInfo.firstName
                                    : ''
                                }
                disabled={this.props.fillExtraUserInfoSuccess}
                onChange={this.setUserRelatedTextInput} />
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
            <Col sm={7} className={cx('inputFieldDiv')}>
              <FormControl
                type='text'
                placeholder={
                                    formatMessage(placeHolderMessage.lastNamePlaceHolderMessage)
                                }
                value={
                                    this.state.data.userInfo.lastName ? this.state.data.userInfo.lastName
                                    : ''
                                }
                disabled={this.props.fillExtraUserInfoSuccess}
                onChange={this.setUserRelatedTextInput} />
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
            <Col sm={7} className={cx('inputFieldDiv')}>
              <Checkbox className={cx('checkboxStyle')} inline
                checked={this.state.male}
                onChange={this.setGender}
                disabled={this.props.fillExtraUserInfoSuccess}
                value='Male' >
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
                disabled={this.props.fillExtraUserInfoSuccess}
                value='Female' >
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
                disabled={this.props.fillExtraUserInfoSuccess}
                value='Other' >
                <span>
                  <FormattedHTMLMessage
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
                <FormattedHTMLMessage
                  id={'moreInfo.birthday'}
                  defaultMessage={'Birthday'}
                                />&#42;
                            </label>
            </Col>
            <Col sm={7} className={cx('inputFieldDiv')}>
              <DatePicker
                disabled={this.props.fillExtraUserInfoSuccess}
                selected={this.state.birthday}
                onChange={this.handleBirthday} />
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
            <Col sm={7} className={cx('inputFieldDiv')}>
              <Select
                name='nationality'
                value={
                                    (
                                        this.state.data.userInfo &&
                                        this.state.data.userInfo._mailAddress && this.state.data.userInfo._mailAddress.country
                                    )
                                    ? this.state.data.userInfo._mailAddress.country : ''
                                }
                disabled={this.props.fillExtraUserInfoSuccess}
                options={this.state.counrtySelect}
                onChange={this.handleNationality}
                            />
            </Col>
          </FormGroup>
          <FormGroup>
            <Button bsStyle='primary' className='pull-center'
              onClick={this.fillMoreAccountInfo}
              block
              style={{ display: this.props.showApplyPro ? 'none' : '' }}>
              <FormattedHTMLMessage
                id={'general.NextStep'}
                defaultMessage={'Next'}
                            />
            </Button>
          </FormGroup>
        </div>
        { this.renderProSpecific() }
        { this.renderChooseRenderAmbSpecifc() }
      </div>
    )
  }
}

RegistDiverPro.propTypes = {
  intl: intlShape.isRequired
}

export default injectIntl(RegistDiverPro)
// export default RegistDiverPro;
