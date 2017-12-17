import {
  FETCH_SUCCESS,
  SELECTED_EVENT,
  CLOSE_EDITMODAL,
  SAVE_EDITED_QUESTION_SUCCESS,
  SAVE_EDITED_QUESTION_FAIL
} from './constants'

import eventAPI from '~/src/utils/api-caller/event-api.js'
import questionAPI from '~/src/utils/api-caller/question-api.js'
import swal from '~/src/utils/swalTrigger'

export function createEvent (queryObj) {
  return (dispatch, actions) => {
    eventAPI.createEvent(queryObj)
      .then(res => {
        if (res.data.statusCode == 200) {
          dispatch(fetchEvents())
        } else {
          reject(new Error('CREATEEVENT_FAIL'))
        }
      })
      .catch(err => {
        swal.triggerGeneralAlert('fail', 'create new event fail.')
      })
  }
}

export function fetchEvents () {
  return (dispatch, actions) => {
    eventAPI.fetchEvents()
      .then(res => {
        dispatch({
          type: FETCH_SUCCESS,
          payload: res.data.result
        })
      })
  }
}

export function saveEditResult (saveObj) {
  return (dispatch, actions) => {
    questionAPI.saveEditResult(saveObj)
      .then(res => {
        console.log(res)

        dispatch(editEvent(saveObj.eventId))
      })
      .catch(err => {
        swal.triggerGeneralAlert('fail', 'save edited content fail.')
      })
  }
}

export function deleteQestion(deleteObj){
  return (dispatch, actions) => {
    questionAPI.deleteQestion(deleteObj)
      .then(res => {
        console.log(res)

        dispatch(editEvent(deleteObj.eventId))
      })
      .catch(err => {
        swal.triggerGeneralAlert('fail', 'delete question fail.')
      })
  }
}

export function editEvent (eventId) {
  return (dispatch, actions) => {
    questionAPI.fetchQ(eventId)
      .then(res => {
        console.log(res.data.result)

        if (res.data.statusCode == 200) {
          dispatch({
            type: SELECTED_EVENT,
            questions: res.data.result
          })
        }
      })
      .catch(err => {
        swal.triggerGeneralAlert('fail', 'fetch questions from that event fail.')
      })
  }
}

export function closeEditModal () {
  return (dispatch, actions) => {
    dispatch({
      type: CLOSE_EDITMODAL,
      payload: false
    })
  }
}
