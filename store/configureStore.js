import { createStore, applyMiddleware } from "redux";
import {app} from "../reducers/farma";
import thunkMiddleware from "redux-thunk";

export default function configureStore(initialState = {}) {
  const store = createStore(
    app,
    applyMiddleware(
      thunkMiddleware
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
