import { useState, createContext, useContext } from "react";
import * as userService from "../services/userService";
import { toast } from "react-toastify";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(userService.getUser());

  // Funkcija za prijavu iz sustava:

  const login = async (email, password) => {
    try {
      const user = await userService.login(email, password);
      setUser(user);
      toast.success("Uspješno ste prijavljeni!");
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  // Funkcija za registraciju:
  const register = async (data) => {
    try {
      const user = await userService.register(data);
      setUser(user);
      toast.success("Uspješna registracija!");
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  // Funkcija za odjavu iz sustava:
  const logout = () => {
    userService.logout();
    setUser(null);
    toast.success("Uspješno ste se odjavili!");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
