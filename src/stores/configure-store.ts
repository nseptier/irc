import { applyMiddleware, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import graphqlQueries from 'utils/middlewares/graphql-queries';
import graphqlSubscriptions from 'utils/middlewares/graphql-subscriptions';
import rootReducer from 'stores/root-reducer';

const middlewares = [
  graphqlQueries,
  graphqlSubscriptions,
];
const configureStore = (): Store => {
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middlewares)),
  );

  if (process.env.NODE_ENV !== 'production' && module.hot) {
      module.hot.accept(
        'stores/index',
        () => store.replaceReducer(rootReducer),
      );
  }
  return store;
}

export default configureStore;
