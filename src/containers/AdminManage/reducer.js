import {
} from './constants'

const initialState = {
  events: []
}

export default function reducer (state = initialState, action) {
  let payload = action.payload

  switch (action.type) {
    case FETCH_SUCCESS:
      return {
        ...state,
        events: payload
      }
      break
    default:
      return state
  }
}
