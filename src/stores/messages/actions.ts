type AddMessageArgs = {
  body: string,
};

export const addMessage = (variables: AddMessageArgs) => ({
  type: '@messages/add',
  graphql: {
    query: `
      mutation($body: String!) {
        addMessage(body: $body) {
          message {
            author {
              id
              name
            }
            body
            createdAt
            id
          }
        }
      }
    `,
    variables,
  },
});
