import { AnyAction } from 'redux';
import { combineReducers } from 'redux';
import { Messages } from './types';

function allIds(state: string[] = [], action: AnyAction): string[] {
  switch(action.type) {
    case '@messages/add--success':
      return [
        ...state,
        action.payload.data.addMessage.message.id,
      ];

    default: return state;
  }
}

function byId(state: Messages = {}, action: AnyAction): Messages {
  switch (action.type) {
    case '@messages/add--success':
      const { message } = action.payload.data.addMessage;

      return {
        ...state,
        [message.id]: message,
      };

    default: return state;
  }
}

export default combineReducers({
  allIds,
  byId,
});
