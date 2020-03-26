import { AnyAction } from 'redux';
import { combineReducers } from 'redux';
import { Message, Messages } from './types';

function allIds(state: string[] = [], action: AnyAction): string[] {
  switch(action.type) {
    case '@messages/get--success':
      return action.payload.data.messages.map((message: Message) => (
        message.id
      ));

    case '@messages/onMessageAdded':
      return [
        ...state,
        action.payload.data.messageAdded.message.id,
      ];

    default: return state;
  }
}

function byId(state: Messages = {}, action: AnyAction): Messages {
  switch (action.type) {
    case '@messages/get--success':
      let nextState = {};

      action.payload.data.messages.forEach((message: Message) => {
        nextState = { ...nextState, [message.id]: message };
      });
      return nextState;

    case '@messages/onMessageAdded': {
      const { message } = action.payload.data.messageAdded;

      return { ...state, [message.id]: message };
    }

    default: return state;
  }
}

export default combineReducers({
  allIds,
  byId,
});
