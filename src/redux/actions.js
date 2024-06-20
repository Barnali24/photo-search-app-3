import { login, signup } from '../services/authService'; // Import the login and signup functions

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';
export const ADD_USER_FAILURE = 'ADD_USER_FAILURE';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';



export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await login(username, password);
      dispatch({ type: LOGIN_SUCCESS, payload: user });
      return { authenticated: true };
    } catch (error) {
      dispatch({ type: LOGIN_FAILURE, payload: error.message });
      return { authenticated: false };
    }
  };
};



// addUser action creator using Redux Thunk
export const addUser = (username, email, password, role) => {
  return (dispatch) => {
    // Call the signup function and handle the promise
    signup(username, email, password, role)
      .then(user => {
        // Dispatch an action for successful signup
        dispatch({ type: ADD_USER_SUCCESS, payload: user });
      })
      .catch(error => {
        // Dispatch an action for failed signup
        dispatch({ type: ADD_USER_FAILURE, payload: error.message });
      });
  };
};


export const logoutUser = () => {
  return (dispatch) => {
    // Perform any necessary cleanup, such as removing tokens from storage
    // ...

    // Dispatch the logout success action
    dispatch({ type: LOGOUT_SUCCESS });
  };
};



