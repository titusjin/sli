import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGIN_INPUT_NOT_COMPLETE
} from './constants'

const initialState = {
  login: false,
  loginIncompolete: false,
  userData: {},
  token: ''
}

export default function reducer (state = initialState, action) {
  let payload = action.payload

  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        login: true,
        token: payload
      }
      break
    case LOGIN_FAIL:
      return { ...state, login: false }
    case LOGIN_INPUT_NOT_COMPLETE:
      return { ...state, login: false, loginIncompolete: true}
    default:
      return state
  }
}
