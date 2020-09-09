//external
import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useDispatch } from "react-redux";
//internal
import { useRoutes } from "./routes/routes";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";

import NavBar from "./components/NavBar";
import Login from "./components/Login";
import "./styles/style.scss";

function App() {
  const { token, login, name, logout, ready, userId } = useAuth();
  const isAuthenticated = !!token;
  const [showPopap, setShowPopap] = useState(false);
  const dispatch = useDispatch();
  const routes = useRoutes(isAuthenticated, showPopap, setShowPopap);

  if (!ready) {
    return <h1>loading</h1>;
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        isAuthenticated,
        name,
        userId,
      }}
    >
      <Router>
        <NavBar
          setShowPopap={setShowPopap}
          showPopap={showPopap}
          isAuthenticated={isAuthenticated}
        />
        {showPopap ? (
          <Login
            setShowPopap={setShowPopap}
            showPopap={showPopap}
            dispatch={dispatch}
          />
        ) : null}
        {routes}
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
