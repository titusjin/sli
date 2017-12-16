import {
  FETCH_SUCCESS,
  SELECTED_EVENT,
  CLOSE_EDITMODAL
} from './constants'

import eventAPI from '~/src/utils/api-caller/event-api.js'

const mockEvent = [
  {
    eventName: 'First',
    eventId: '123',
    startTime: '1483200000000', // 2017-01-01T00:00:00+0800
    endTime: '1512143999000'    // 2017-12-01T23:59:59+0800
  },
  {
    eventName: 'Second',
    eventId: '456',
    startTime: '1483200000000',
    endTime: '1512143999000'
  }
]

const mockEventQuestions = [
  {
    eventId: '123',
    questionId: '0000',
    content: 'how\'s the weather ?',
    username: 'shop',
    thumbUpCount: 1,
    timestamp: '1483330000000'
  },
  {
    eventId: '123',
    questionId: '1111',
    content: 'test ?',
    username: 'back',
    thumbUpCount: 0,
    timestamp: '1522143999000'
  }
]

export function createEvent (queryObj) {
  return (dispatch, actions) => {
    eventAPI.createEvent(queryObj)
      .then(res => {
        if(res.data.statusCode == 200){
          fetchEvents();
        }
      })
      .catch(err => {
        console.log(err);
      })
  }
}

export function fetchEvents () {
  return (dispatch, actions) => {
    // TODO change to call API
    eventAPI.fetchEvents()
      .then(res => {
        dispatch({
          type: FETCH_SUCCESS,
          payload: res.data.result
        })
      })


    // dispatch({
    //   type: FETCH_SUCCESS,
    //   payload: mockEvent
    // })
  }
}

export function editEvent (eventId) {
  return (dispatch, actions) => {
    // TODO api search event with eventId
    let selectedEvent = mockEvent.forEach(e => {
      if (e.eventId == eventId) {
        return
      }
    })

    dispatch({
      type: SELECTED_EVENT,
      payload: selectedEvent,
      questions: mockEventQuestions
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
