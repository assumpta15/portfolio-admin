import { createContext, useEffect, useState } from "react";
//import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(
    localStorage.getItem("adminToken")
  );

  const login = (token) => {
    localStorage.setItem("adminToken", token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    setToken(null);
  };

  useEffect(() => {
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (Date.now() >= payload.exp * 1000) {
        logout();
      }
    } catch {
      logout();
    }
  }
}, [token]);


  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
