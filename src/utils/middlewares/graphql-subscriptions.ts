import { AnyAction, Dispatch, MiddlewareAPI } from 'redux';
import { GRAPHQL_WS_URL } from 'utils/constants';

type WebSockets = { [key: string]: WebSocket };

const GQL = {
  CONNECTION_ACK: 'connection_ack',
  CONNECTION_INIT: 'connection_init',
  DATA: 'data',
  START: 'start',
};
const websockets: WebSockets = {};

export default (store: MiddlewareAPI) => (
  (next: Dispatch) => (
    async (action: AnyAction) => {
      if (!action.subscription) return next(action);
      if (websockets[action.type]) return;

      const ws = new WebSocket(GRAPHQL_WS_URL, 'graphql-ws');

      websockets[action.type] = ws;
      ws.onopen = () => ws.send(JSON.stringify({
        type: GQL.CONNECTION_INIT,
      }));
      ws.onmessage = event => {
        const response = JSON.parse(event.data);

        switch (response.type) {
          case GQL.CONNECTION_ACK:
            ws.send(JSON.stringify({
            type: GQL.START,
            id: action.type,
            payload: action.subscription,
          }))
          break;

          case GQL.DATA:
            store.dispatch({
            type: action.type,
            payload: response.payload,
          })
          break;
        }
      };
    }
  )
);
