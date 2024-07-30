import React, { useContext, useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import { Tokens } from "../types";
import { setHeaderToken } from "../utils/client";

type AppContext = {
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
  tokens: Tokens | null;
  setTokens: (tokens: Tokens | null) => void;
};

const AppContext = React.createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [tokens, setTokens] = useState<Tokens | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const { isError, data, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: apiClient.profile,
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!localStorage.getItem("tokens"),
  });

  console.log(isError, data, isLoading);

  useEffect(() => {
    // Load tokens from local storage when the app initializes
    const storedTokens = localStorage.getItem("tokens");
    if (storedTokens) {
      setTokens(JSON.parse(storedTokens));
      setHeaderToken(JSON.parse(storedTokens).accessToken);
    }
  }, []);

  //   useEffect(() => {
  //     if (data) {
  //       setUser(data);
  //       setIsLoggedIn(true);
  //     }
  //   }, [data]);

  return (
    <AppContext.Provider
      value={{
        isLoggedIn: !isError,
        tokens,
        setTokens,
        setIsLoggedIn,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContext;
};
