import {
    SET_LODDING,
    FETCH_INIT_DATA_SUCCESS,
    FETCH_DATA_SUCCESS,
    FETCH_DATA_FAIL,
    FETCH_DATA_BYTYPE_SUCCESS,

    CREATE_USER_SUCCESS,
    CREATE_USER_FAIL,
    LOGIN_USER_SUCCESS,
    FILL_EXTRAUSERINFO_SUCCESS,
    FILL_PROINFO_SUCCESS,
    CONTINUE_AMB_PROCESS,
    FILL_AMBINFO_SUCCESS,
    SUCCESS_APPLY_BUSINESS,
    SUCCESS_APPLY_RESELLER,

    GENERAL_FAIL,
    FINAL_FINISH,
    EXISTING_RESELLETR_FINAL
} from './constants'

import Immutable from 'immutable'
import swalTrigger from '~/src/utils/swalTrigger'

let moment = require('moment')
const start = moment().subtract(1, 'months').format('YYYY-MM-DD')
const end = moment().format('YYYY-MM-DD')

const initialState = {
  showLoad: false,
  data: {},
  showUserExtraInfo: false,
  showApplyPro: false,
  finish: false,
  userInfo: null,
  applyBusinessResult: false,
  finalFinish: false,
  userEmail: ''
}

export default function reducer (state = initialState, action) {
  let payload = action.payload

  switch (action.type) {
    case CREATE_USER_SUCCESS:
      return { ...state,
        showLoad: !state.showLoad,
        userInfo: payload.userInfo,
        userEmail: payload.userInfo
                .email,
        accessToken: payload.accessToken }
    case CREATE_USER_FAIL:
      return { ...state, showLoad: !state.showLoad, userInfo: payload }
    case LOGIN_USER_SUCCESS:
      return { ...state, showLoad: !state.showLoad, userInfo: payload.userInfo, userEmail: payload.userInfo.email, accessToken: payload.accessToken }

        // This api return data don't have userInfo
    case FILL_EXTRAUSERINFO_SUCCESS:
      return { ...state, showLoad: !state.showLoad, userInfo: payload, showCreateBusiness: true }

    case GENERAL_FAIL:
      return { ...state, showLoad: !state.showLoad }
    case FINAL_FINISH:
      return { ...state, showLoad: !state.showLoad, finalFinish: true, businessData: payload }
    case EXISTING_RESELLETR_FINAL:
      return { ...state, showLoad: !state.showLoad, resellerFinish: true, businessData: payload, existingReseller: true }

    case SUCCESS_APPLY_BUSINESS:
      return { ...state, showLoad: !state.showLoad, applyBusinessResult: true, businessData: payload }
    case SUCCESS_APPLY_RESELLER:
      return { ...state, showLoad: !state.showLoad, resellerFinish: true }

    case FILL_PROINFO_SUCCESS:
      return { ...state, showLoad: !state.showLoad, data: payload, finish: true }
    case CONTINUE_AMB_PROCESS:
      return { ...state, showLoad: !state.showLoad, data: payload, finish: true }
    case FILL_AMBINFO_SUCCESS:
      return { ...state, showLoad: !state.showLoad, data: payload, ambfinish: true }

    case SET_LODDING:
      return { ...state, showLoad: !state.showLoad }

    case FETCH_INIT_DATA_SUCCESS:
      return { ...state, initial: true, showLoad: !state.showLoad, data: payload.data.result }
    case FETCH_DATA_SUCCESS :
      return { ...state, data: payload.data.result }
    case FETCH_DATA_FAIL:
      return { ...state, showLoad: !state.showLoad }
    case FETCH_DATA_BYTYPE_SUCCESS:
      return { ...state, data: payload.data.result, dataType: action.dataType, showLoad: !state.showLoad }
    default:
      return state
  }
}
