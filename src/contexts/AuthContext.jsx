import React, { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";

const AuthContext = createContext();

const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = ({ children }) => {
  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const values = { signup };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { useAuthContext, AuthContextProvider as default };
