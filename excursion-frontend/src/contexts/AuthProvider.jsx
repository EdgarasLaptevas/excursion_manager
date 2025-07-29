import { api, clearAuth, setAuth } from "@/utils/api";
import { ApiError } from "@/utils/apiError";
import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [account, setAccount] = useState(() => {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      const decodedJwt = jwtDecode(jwt);
      if (decodedJwt.exp * 1000 < Date.now()) {
        localStorage.removeItem("jwt");
        return null;
      }
      return decodedJwt;
    }
    return null;
  });

  const login = async (data) => {
    try {
      const response = await api.post("/auth/token", data);
      const jwt = response.data.data;
      localStorage.setItem("jwt", jwt);
      setAccount(jwtDecode(jwt));
      setAuth(jwt);
      navigate("/");
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ?? error?.message ?? "Unknown error";
        const errorStatus = error?.response?.status
        throw new ApiError(errorMessage, errorStatus);
    }
  }; 

  const register = async ({ email, password}) => {
    return await api.post("/auth/register", {
      email,
      password,
    });
  };

  const logout = () => {
    setAccount(null);
    clearAuth();
    localStorage.removeItem("jwt");
    navigate("/home");
  };

  return (
    <AuthContext.Provider value={{account, login, logout, register}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext)
  
};