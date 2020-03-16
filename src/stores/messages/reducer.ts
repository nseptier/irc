import { AnyAction } from 'redux';
import { combineReducers } from 'redux';
import { Message, Messages } from './types';

function allIds(state: string[] = [], action: AnyAction): string[] {
  switch(action.type) {
    case '@messages/add--success':
      return [
        ...state,
        action.payload.data.addMessage.message.id,
      ];

      case '@messages/get--success':
        return action.payload.data.messages.map((message: Message) => (
          message.id
        ));

    default: return state;
  }
}

function byId(state: Messages = {}, action: AnyAction): Messages {
  switch (action.type) {
    case '@messages/add--success':
      const { message } = action.payload.data.addMessage;

      return { ...state, [message.id]: message };

    case '@messages/get--success':
      let nextState = {};

      action.payload.data.messages.forEach((message: Message) => {
        nextState = { ...nextState, [message.id]: message };
      });
      return nextState;

    default: return state;
  }
}

export default combineReducers({
  allIds,
  byId,
});
