import { combineReducers } from "redux";
import userReducer from "./reducers/login";
import newsReducer from "./reducers/news";

import { reducer as formReducer } from "redux-form";

export default combineReducers({
  user: userReducer,
  form: formReducer,
  news: newsReducer,
});
