import React from "react";
import { Route, Routes } from "react-router-dom";
import SignInSignUp from "./Components/SignInSignUp/SignInSignUp";
import Home from "./Components/Home/Home";
import Register from "./Components/Register/Register";
import Setting from "./Components/Setting/Setting";
import { GobalStorage } from "./Context/GobalStorage";

function MainRouter() {
  const { state } = GobalStorage();

  const validataion = state?.userToken;
  if (validataion === "" || validataion === undefined) {
    return (
      <Routes>
        <Route path="/">
          <Route index element={<SignInSignUp />} />
        </Route>
      </Routes>
    );
  } else {
    return (
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="Register" element={<Register />} />
          <Route path="Setting" element={<Setting />} />
        </Route>
      </Routes>
    );
  }
}

export default MainRouter;
