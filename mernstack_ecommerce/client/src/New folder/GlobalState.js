import React, { createContext, useEffect, useState } from "react";
import ProductAPI from "./api/ProductAPI";
import UserAPI from "./api/UserAPI";
import axios from "axios";

export const GlobaLState = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false);

  const refreshToken = async () => {
    try {
      const refresh = await axios.post('/user/refresh_token');
      setToken(refresh.data.accesstoken);
    } catch (error) {
      console.error('Token refresh failed:', error);
      localStorage.removeItem('firstLogin');
      setToken(false);
    }
  }; // Missing closing brace was here

  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin');
    if (firstLogin) {
      refreshToken();
    }
  }, []);

  const state = {
    token: [token, setToken],
    productAPI: ProductAPI(),
    userAPI: UserAPI(token)
  };

  return (
    <GlobaLState.Provider value={state}>
      {children}
    </GlobaLState.Provider>
  );
};
