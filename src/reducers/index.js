import { combineReducers } from 'redux'

import RegistDiverFormReducer from 'Containers/RegistDiverForm/reducer'
import RegistDiverFormReducerExt from 'Containers/RegistDiverFormExt/reducer'
import RegistBusinessFormReducer from 'Containers/RegistBusinessForm/reducer'
import RegistBusinessFormReducerExt from 'Containers/RegistBusinessFormExt/reducer'

const rootReducer = combineReducers({
  RegistDiverFormReducer,
  RegistDiverFormReducerExt,
  RegistBusinessFormReducer,
  RegistBusinessFormReducerExt
})

export default rootReducer
