import fetch from 'cross-fetch';

type Options = {
  [key: string]: any,
};

const httpRequest = (url: string, { body, headers }: Options) => fetch(url, {
  body: JSON.stringify(body),
  credentials: 'include',
  headers: {
    ...headers,
    'Content-Type': 'application/json',
  },
  method: 'post',
  mode: 'cors',
});

export default httpRequest;
