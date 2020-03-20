type ConnectArgs = {
  name: string,
};

export const connect = (variables: ConnectArgs) => ({
  type: '@users/connect',
  graphql: {
    query: `
      mutation($name: String!) {
        connect(name: $name) {
          user {
            id
            name
          }
        }
      }
    `,
    variables
  },
});

export const getCurrentUser = () => ({
  type: '@users/get-current-user',
  graphql: {
    query: `
      {
        currentUser {
          id
          name
        }
      }
    `,
  },
});

export const listenToConnectedUsers = () => ({
  type: '@users/onUserConnected',
  subscription: {
    query: `
      subscription {
        userConnected {
          message {
            author {
              name
            }
            createdAt
            event
            id
            system
          }
          user {
            id
            name
          }
        }
      }
    `,
  },
});
