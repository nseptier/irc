import { AnyAction, Dispatch, MiddlewareAPI } from 'redux';

type TokenResponse = {
  token: string,
  tokenExpiry: number,
};

const refreshAccessToken = {
  type: '@auth/refresh-token',
  graphql: {
    query: `
      {
        refreshAccessToken {
          token
          tokenExpiry
        }
      }
    `,
  },
};

let accessToken: string | null = null;

export const getAuthToken = (): string | null => accessToken;

export default (store: MiddlewareAPI) => (
  (next: Dispatch) => (
    async (action: AnyAction) => {
      function refreshToken({ token, tokenExpiry }: TokenResponse): void {

        // Automatically refresh token 60 seconds before it expires
        setTimeout(
          () => next(refreshAccessToken),
          tokenExpiry - Date.now() - 1000 * 60,
        );
        accessToken = token;
      };

      if (action.type === '@auth/refresh-token--success') {
        refreshToken(action.payload.data.refreshAccessToken);
      } else if (action.type === '@users/connect--success') {
        refreshToken(action.payload.data.connect);
      }
      next(action);
    }
  )
);
