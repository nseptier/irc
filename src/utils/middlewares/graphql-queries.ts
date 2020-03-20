import fetch from 'cross-fetch';
import { AnyAction, Dispatch, MiddlewareAPI } from 'redux';
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

      next(buildAction('pending'));

      try {
        const url = new URL(GRAPHQL_HTTP_URL);
        const response = await fetch(
          url.toString(),
          {
            body: JSON.stringify(action.graphql),
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'post',
            mode: 'cors',
          }
        );
        const payload = await response.json();

        if (response.status >= 400) {
          return next(buildAction('failure', { payload }));
        }
        if (payload.errors) {
          return next(buildAction(
            'failure',
            {
              errors: payload.errors.map((error: Error) => error.message),
                payload,
            },
          ));
        }
        next(buildAction('success', { payload }));
      } catch (error) {
        next(buildAction('failure', { error: error.message } ));
      }
    }
  )
);
