import graphqlMiddleware from 'utils/graphql-middleware';
import reducer from 'stores/index';
import { applyMiddleware, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const configureStore = (): Store => {
  const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(graphqlMiddleware)),
  );

  if (process.env.NODE_ENV !== 'production' && module.hot) {
      module.hot.accept('stores/index', () => store.replaceReducer(reducer));
  }
  return store;
}

export default configureStore;
