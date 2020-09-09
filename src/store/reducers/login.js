import api from "../../api/api";
const USER_LOGIN_FETCHING = "USER_LOGIN_FETCHING";
const USER_SET_DATA = "USER_SET_DATA";
const USER_LOGIN_ERROR = "USER_LOGIN_ERROR";
const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";

const initialState = {
  successLogin: false,
  isFetching: false,
  errorLogin: false,
  user: {
    token: null,
    userId: null,
    name: null,
    email: null,
    password: null,
  },
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_FETCHING: {
      return { ...state, isFetching: action.isFetching };
    }
    case USER_SET_DATA: {
      return { ...state, user: action.data };
    }
    case USER_LOGIN_ERROR: {
      return { ...state, errorLogin: action.errorLogin };
    }
    case USER_LOGIN_SUCCESS: {
      return { ...state, successLogin: action.successLogin };
    }

    default:
      return state;
  }
};

// actions
const toggleIsFetching = (isFetching) => ({
  type: USER_LOGIN_FETCHING,
  isFetching,
});
const setUserDatas = (data) => ({
  type: USER_SET_DATA,
  data,
});
const userLoginError = (errorLogin) => ({
  type: USER_LOGIN_ERROR,
  errorLogin,
});
const userLoginSuccess = (successLogin) => ({
  type: USER_LOGIN_SUCCESS,
  successLogin,
});

export const userLogin = (email, password) => (dispatch) => {
  dispatch(toggleIsFetching(true));
  setTimeout(() => {
    const resault = api.apiUserLogin(email, password);

    if (resault !== "error") {
      dispatch(setUserDatas(resault));
      dispatch(toggleIsFetching(false));
      dispatch(userLoginSuccess(true));
      dispatch(userLoginSuccess(false));
    } else {
      dispatch(userLoginError(true));
      dispatch(toggleIsFetching(false));

      setTimeout(() => {
        dispatch(userLoginError(false));
      }, 1500);
    }
  }, 1500);
};

export default userReducer;
