import {
  FETCH_SUCCESS,
  SELECTED_EVENT,
  CLOSE_EDITMODAL,
  SAVE_EDITED_QUESTION_SUCCESS,
  SAVE_EDITED_QUESTION_FAIL
} from './constants'

const initialState = {
  events: [],
  selectedEvent: null,
  questions : [],
  showEditModal: false
}

export default function reducer (state = initialState, action) {
  let payload = action.payload
  let type = action.type

  switch (type) {
    case FETCH_SUCCESS:
      return {
        ...state,
        events: payload
      }
      break
    case SELECTED_EVENT:
      return {
        ...state,
        questions: action.questions,
        showEditModal: true
      }
    case CLOSE_EDITMODAL:
      return {
        ...state,
        showEditModal: false
      }
    case SAVE_EDITED_QUESTION_SUCCESS:
      return {
        ...state
      }
    case SAVE_EDITED_QUESTION_FAIL:
      return {
        ...state
      }
    default:
      return state
  }
}
