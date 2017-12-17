import {
  SINGLE_EVENT_Q_SUCCESS
} from './constants'

import eventAPI from '~/src/utils/api-caller/event-api.js'
import questionAPI from '~/src/utils/api-caller/question-api.js'
import swal from '~/src/utils/swalTrigger'

export function enterEvent (fetchObj) {
  return (dispatch, actions) => {
    eventAPI.fetchOneEvent(fetchObj)
      .then(res => {
        if (res.data.statusCode == 200) {
          console.log(res.data.result)
          dispatch(fetchOneEventQ(res.data.result._id))
        } else {
          reject(new Error('FETCH_SINGLEEVENT_FAIL'))
        }
      })
      .catch(err => {
        swal.triggerGeneralAlert('fail', 'enter event fail.')
      })
  }
}

export function fetchOneEventQ (eventId) {
  return (dispatch, actions) => {
    questionAPI.fetchQ(eventId)
      .then(res => {
        if (res.data.statusCode == 200) {
          console.log('hello ....',res.data.result)
          dispatch({
            type: SINGLE_EVENT_Q_SUCCESS,
            payload: res.data.result
          })
        } else {
          reject(new Error('FETCH_SINGLEEVENT_FAIL'))
        }
      })
      .catch(err => {
        swal.triggerGeneralAlert('fail', 'fetch questions from the event fail.')
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

export function deleteQestion (deleteObj) {
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
