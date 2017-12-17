import {
  SINGLE_EVENT_Q_SUCCESS,
  UPDATE_QUESTIONS
} from './constants'
import swalTrigger from '~/src/utils/swalTrigger'

let moment = require('moment')
const start = moment().subtract(1, 'months').format('YYYY-MM-DD')
const end = moment().format('YYYY-MM-DD')

const initialState = {
  showEventPage: false,
  question: []
}

export default function reducer (state = initialState, action) {
  let payload = action.payload

  switch (action.type) {
    case SINGLE_EVENT_Q_SUCCESS:
      console.log(payload);
      return {
        ...state,
        showEventPage: true,
        question: payload
      }
    default:
      return state
  }
}
