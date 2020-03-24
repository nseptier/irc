import React, { ReactElement, useEffect, useState } from 'react';

import ConnexionForm from 'components/connexion-form';
import httpRequest from 'utils/http-request';
import { GRAPHQL_HTTP_URL } from 'utils/constants';

type JWT = string | null;
type AuthProps = {
  children: ReactElement,
};

export let accessToken: JWT = null;

const Auth = ({ children }: AuthProps) => {
  const [expiry, setExpiry] = useState(null);

  useEffect(() => {
    const refreshAccessToken = {
      query: `{
        refreshAccessToken {
          token
          tokenExpiry
        }
      }`,
    };

    async function refreshToken() {
      const options = { body: refreshAccessToken };
      const response = await httpRequest(GRAPHQL_HTTP_URL, options);
      const { data, errors } = await response.json();

      if (errors || response.status >= 400) return;

      accessToken = data.refreshAccessToken.token;
      setExpiry(data.refreshAccessToken.tokenExpiry);
    }

    if (expiry) {
      setTimeout(refreshToken, expiry! - Date.now() - 1000 * 60);
    } else {
      refreshToken();
    }
  }, [expiry]);

  async function onConnect(nickname: string) {
    const connect = {
      query: `mutation($name: String!) {
        connect(name: $name) {
          token
          tokenExpiry
          user {
            id
            name
          }
        }
      }`,
      variables: { name: nickname },
    };

    const response = await httpRequest(GRAPHQL_HTTP_URL, { body: connect });

    if (response.status >= 400) return;

    const payload = await response.json();
    const { token, tokenExpiry } = payload.data.connect;

    accessToken = token;
    setExpiry(tokenExpiry);
  }

  if (!accessToken) return <ConnexionForm onSubmit={onConnect} />;
  return children;
};

export default Auth;
