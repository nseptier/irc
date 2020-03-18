import graphqlQueries from 'utils/middlewares/graphql-queries';
import graphqlSubscriptions from 'utils/middlewares/graphql-subscriptions';
import reducer from 'stores/index';
import { applyMiddleware, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const middlewares = [
  graphqlQueries,
  graphqlSubscriptions,
];
const configureStore = (): Store => {
  const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middlewares)),
  );

  if (process.env.NODE_ENV !== 'production' && module.hot) {
      module.hot.accept('stores/index', () => store.replaceReducer(reducer));
  }
  return store;
}

export default configureStore;
