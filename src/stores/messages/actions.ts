type AddMessageArgs = {
  body: string,
};

const messageProps = `
  fragment props on Message {
    author {
      id
      name
    }
    body
    createdAt
    event
    id
    system
  }
`;

export const addMessage = (variables: AddMessageArgs) => ({
  type: '@messages/add',
  graphql: {
    query: `
      mutation($body: String!) {
        addMessage(body: $body) {
          message {
            id
          }
        }
      }
    `,
    variables,
  },
});

export const getMessages = () => ({
  type: '@messages/get',
  graphql: {
    query: `
      {
        messages {
          ...props
        }
      }
      ${messageProps}
    `,
  },
});

export const listenToAddedMessages = () => ({
  type: '@messages/onMessageAdded',
  subscription: {
    query: `
      subscription {
        messageAdded {
          message {
            ...props
          }
        }
      }
      ${messageProps}
    `,
  },
});
