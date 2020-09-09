import { createContext } from "react";

function noop() {}

export const AuthContext = createContext({
  userId: null,
  token: null,
  name: null,
  login: noop,
  logout: noop,
  isAuthenticated: false,
});
