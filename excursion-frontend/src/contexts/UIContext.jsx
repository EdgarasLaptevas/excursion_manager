import { UIStatus } from "@/constants/UIStatus";
import { createContext, useContext, useState } from "react";

export const UIContext = createContext(null);

export const UIProvider = ({ children }) => {
  const { Loading, Success, Error } = UIStatus;

  const [status, setStatus] = useState(UIStatus.Idle);

  const isLoading = status === Loading;
  const isSuccess = status === Success;
  const isError = status === Error;

  return (
    <UIContext.Provider
      value={{ status, setStatus, isLoading, isSuccess, isError }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  return useContext(UIContext);
};
