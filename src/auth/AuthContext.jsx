import { createContext, useContext, useState } from "react";
import axios from "../api/axios";
import { redirect } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem('access') ? true : false);

  const login = async (username, password) => {
    const res = await axios.post('/login/', { username, password });
    console.log(res.data);
    localStorage.setItem('access', res.data.access);
    localStorage.setItem('refresh', res.data.refresh);
    setUser(true);
  };

  const signup = async (username, password) => {
    await axios.post('/signup/', { username, password });
  };

  const logout = async () => {
    await axios.post('/logout/', {
      refresh: localStorage.getItem('refresh')
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('access')}` }
    });
    localStorage.clear();
    setUser(false);
    redirect('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
