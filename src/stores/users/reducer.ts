import { AnyAction } from 'redux';
import { combineReducers } from 'redux';
import { User } from './types';

const initialState: User | null = null;

function current(state = initialState, action: AnyAction): User | null {
  switch (action.type) {
    case '@users/get-current-user--success':
      return action.payload.data.currentUser;

    case '@users/connect--success':
      return action.payload.data.connect.user;

    default: return state;
  }
}

export default combineReducers({
  current,
});
