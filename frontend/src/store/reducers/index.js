import { connectRouter } from 'connected-react-router'
import { combineReducers } from 'redux'

import user from './user'
import history from '../../routes/history'

export default combineReducers({
  user,
  router: connectRouter(history)
})