import { combineReducers } from 'redux'

import RegistDiverFormReducer from 'Containers/RegistDiverForm/reducer'
import RegistDiverFormReducerExt from 'Containers/RegistDiverFormExt/reducer'
import RegistBusinessFormReducer from 'Containers/RegistBusinessForm/reducer'
import RegistBusinessFormReducerExt from 'Containers/RegistBusinessFormExt/reducer'

// the really useful reducers in here
import AdminContainerReducer from 'Containers/Admin/reducer'
import EventContainerReducer from 'Containers/Event/reducer'
import AdminMangeContainerReducer from 'Containers/AdminManage/reducer'


const rootReducer = combineReducers({
  RegistDiverFormReducer,
  RegistDiverFormReducerExt,
  RegistBusinessFormReducer,
  RegistBusinessFormReducerExt,
  EventContainerReducer,
  AdminContainerReducer,
  AdminMangeContainerReducer
})

export default rootReducer
