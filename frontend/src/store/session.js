import jwtFetch from './jwt';

const RECEIVE_CURRENT_USER = "session/RECEIVE_CURRENT_USER";
const RECEIVE_SESSION_ERRORS = "session/RECEIVE_SESSION_ERRORS";
const CLEAR_SESSION_ERRORS = "session/CLEAR_SESSION_ERRORS";
export const RECEIVE_USER_LOGOUT = "session/RECEIVE_USER_LOGOUT";
const REMOVE_CURRENT_USER = "session/REMOVE_CURRENT_USER";

// Dispatch receiveCurrentUser when a user logs in.
const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});
  
// Dispatch receiveErrors to show authentication errors on the frontend.
const receiveErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
});

// Dispatch logoutUser to clear the session user when a user logs out.
const logoutUser = () => ({
  type: RECEIVE_USER_LOGOUT
});

// Dispatch clearSessionErrors to clear any session errors.
export const clearSessionErrors = () => ({
  type: CLEAR_SESSION_ERRORS
});
 export const _getCurrentUser = (state) =>{
    if (!state) return null;
    else if (!state.session?.user) return null;
    else return state.session.user;

 }

export const getCurrentUser = () => async dispatch => {
    const res = await jwtFetch('/api/users/current');
    const user = await res.json();
    return dispatch(receiveCurrentUser({ user }));
  };

export const removeCurrentUser = (userId) => {
  return {
    type: REMOVE_CURRENT_USER,
    userId
  };
};

export const signup = user => startSession(user, '/api/users/signup');
export const login = user => startSession(user, '/api/users/login');


const startSession = (userInfo, route) => async dispatch => {
  
    try {  
      const res = await jwtFetch(route, {
        method: "POST",
        body: JSON.stringify(userInfo)
      });

      const user = await res.json();
      localStorage.setItem('jwtToken', user.token);
      return dispatch(receiveCurrentUser(user));
    } catch(err) {
      const res = await err.json();
      if (res.statusCode === 400) {
        return dispatch(receiveErrors(res.errors));
      }
    }
  };

  export const deleteUser = (userId) => async dispatch => {
    const res = await jwtFetch(`/api/users/${userId}`, {
      method: "DELETE"
    })
    dispatch(removeCurrentUser(userId))
  }

export const updateUser = (userData) => async dispatch => {
  const res = await jwtFetch(`/api/users/${userData._id}`, {
    method: "PATCH",
    body: JSON.stringify(userData)
  })
  const user = await res.json();
  dispatch(receiveCurrentUser({ user }))
}

export const logout = () => dispatch => {
    localStorage.removeItem('jwtToken');
    dispatch(logoutUser());
}

const initialState = {
    user: undefined
};


const nullErrors = null;

export const sessionErrorsReducer = (state = nullErrors, action) => {
  switch (action.type) {
    case RECEIVE_SESSION_ERRORS:
      return action.errors;
      case RECEIVE_CURRENT_USER:
        case CLEAR_SESSION_ERRORS:
          return nullErrors;
          default:
            return state;
          }
        };
        
        
const sessionReducer = (state = initialState, action) => {
  
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return { ...state, ...action.currentUser };
        case RECEIVE_USER_LOGOUT:
            return initialState;
        case REMOVE_CURRENT_USER:
          return initialState;
        default:
            return state;
    }
};

export default sessionReducer;