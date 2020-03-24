import { combineReducers } from 'redux';
import messages from 'stores/messages/reducer';
import users from 'stores/users/reducer';

export default combineReducers({
  messages,
  users,
});
