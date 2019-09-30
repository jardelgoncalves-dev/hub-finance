import { SET_CURRENT_USER } from '../actions/types'
import isEmpty from 'lodash/isEmpty'

const INITIAL_STATE = {
  user: {},
  isAuthenticated: false
}

export default function user (state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { user: action.user, isAuthenticated: !isEmpty(action.user) }
    default: return state
  }
}