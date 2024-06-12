import { LOGIN_SUCCESS, LOGIN_FAILURE, ADD_USER_SUCCESS, ADD_USER_FAILURE, LOGOUT_SUCCESS } from './actions';

const initialState = {
  users: [],
  currentUser: null,
  error: null, 
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER_SUCCESS:
   
      return {
        ...state,
        users: [...state.users, action.payload],
        error: null, 
      };
    case ADD_USER_FAILURE:

      return {
        ...state,
        error: action.payload,
      };
    case LOGIN_SUCCESS:
  
      return {
        ...state,
        currentUser: action.payload,
        error: null, 
      };
    case LOGIN_FAILURE:
      
      return {
        ...state,
        currentUser: null,
        error: action.payload, 
      };
      case LOGOUT_SUCCESS:
        return {
          ...state,
          currentUser: null, // Clear the current user
        };
    default:
      return state;
  }
};

export default usersReducer;
