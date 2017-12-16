import { combineReducers } from 'redux'

// the really useful reducers in here
import AdminContainerReducer from 'Containers/Admin/reducer'
import EventContainerReducer from 'Containers/Event/reducer'
import AdminMangeContainerReducer from 'Containers/AdminManage/reducer'


const rootReducer = combineReducers({
  EventContainerReducer,
  AdminContainerReducer,
  AdminMangeContainerReducer
})

export default rootReducer
