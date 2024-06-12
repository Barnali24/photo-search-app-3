import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk'; // Corrected import statement
import usersReducer from './usersReducer'; // Make sure the path to your rootReducer is correct


// Create the Redux store with the rootReducer, middleware, and Redux DevTools
const store = createStore(
  usersReducer, // the root reducer
    applyMiddleware(thunk) // Apply thunk middleware
  
);

export default store;
