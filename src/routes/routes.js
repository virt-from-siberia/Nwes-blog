//external
import React, { useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "../pages/Home/Home";
import News from "../pages/News/News";

export const useRoutes = (isAuthenticated, showPopap, setShowPopap) => {
  return (
    <>
      <Switch>
        <Route path='/' exact>
          <Home
            isAuthenticated={isAuthenticated}
            showPopap={showPopap}
            setShowPopap={setShowPopap}
          />
        </Route>
        <Route path='/news' exact>
          <News isAuthenticated={isAuthenticated} />
        </Route>
        {/*Несуществующий роут -> редирект */}
        <Redirect to='/' />
      </Switch>
    </>
  );
};

export default useRoutes;
