import * as React from "react";

const UserContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "login": {
      localStorage.setItem("userId", action.id);
      localStorage.setItem("token", action.token);
      return {
        ...state,
        userId: action.id,
        userToken: action.token,
        error: null,
      };
    }
    case "logout": {
      localStorage.removeItem("userId");
      localStorage.removeItem("token");
      return { ...state, userId: "", userToken: "", error: null };
    }
    case "loadUserData": {
      return {
        ...state,
        userToken: action.token,
        userId: state.userId,
      };
    }
    case "nonetwork": {
      return { ...state, error: "No Network Connection" };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function GobalStorage() {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error("context not found");
  }
  return context;
}

function UserProvider({ children }) {
  const [state, dispatch] = React.useReducer(userReducer, {
    userId: localStorage.getItem("userId") || "",
    userToken: localStorage.getItem("token") || "",
    error: null,
  });

  const value = { state, dispatch };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export { UserProvider, GobalStorage };
