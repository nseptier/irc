import { AnyAction, Dispatch, MiddlewareAPI } from 'redux';

import httpRequest from 'utils/http-request';
import { accessToken } from 'components/auth';
import { GRAPHQL_HTTP_URL } from 'utils/constants';

type Error = {
  message: string,
  [key: string]: string,
};
type Data = { [key: string]: string };

export default (store: MiddlewareAPI) => (
  (next: Dispatch) => (
    async (action: AnyAction) => {
      if (!action.graphql) return next(action);

      function buildAction(
        status: string,
        data?: Data
      ): AnyAction {
        const nextAction: AnyAction = {
          ...action,
          ...data,
          type: `${action.type}--${status}`,
        };

        delete nextAction.graphql;
        return nextAction;
      }

      store.dispatch(buildAction('pending'));

      try {
        const response = await httpRequest(
          GRAPHQL_HTTP_URL,
          {
            body: action.graphql,
            headers: {
              ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
            },
          }
        );
        const payload = await response.json();

        if (response.status >= 400) {
          return store.dispatch(buildAction('failure', { payload }));
        }
        if (payload.errors) {
          return store.dispatch(buildAction(
            'failure',
            {
              errors: payload.errors.map((error: Error) => error.message),
                payload,
            },
          ));
        }
        store.dispatch(buildAction('success', { payload }));
      } catch (error) {
        store.dispatch(buildAction('failure', { error: error.message } ));
      }
    }
  )
);
