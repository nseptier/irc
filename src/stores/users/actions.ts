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
