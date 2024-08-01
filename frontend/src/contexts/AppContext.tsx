import React, { useContext, useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import { Tokens, User } from "../types";
import { setHeaderToken } from "../utils/client";

export type AppContext = {
  isLoggedIn: boolean;
  tokens: Tokens | null;
  setTokens: (tokens: Tokens | null) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
};

const AppContext = React.createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const storedTokens = localStorage.getItem("tokens");
  const [tokens, setTokens] = useState<Tokens | null>(
    storedTokens ? JSON.parse(storedTokens) : null
  );
  const storedUser = localStorage.getItem("user");
  const [user, setUser] = useState<User | null>(
    storedUser ? JSON.parse(storedUser) : null
  );

  const { data, isLoading, isError } = useQuery<User>({
    queryKey: ["profile"],
    queryFn: apiClient.profile,
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!tokens,
  });

  useEffect(() => {
    const storedTokens = localStorage.getItem("tokens");
    if (storedTokens) {
      setHeaderToken(JSON.parse(storedTokens).accessToken);
    } else {
      setHeaderToken("");
    }
  }, []);

  useEffect(() => {
    if (!isLoading && data) {
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      // setIsLoggedIn(true);
    }
  }, [data, isLoading]);

  useEffect(() => {
    if (!isLoading && isError) {
      setUser(null);
      setTokens(null);
      localStorage.removeItem("user");
      localStorage.removeItem("tokens");
    }
  }, [isError, isLoading]);

  return (
    <AppContext.Provider
      value={{
        isLoggedIn: user ? true : false,
        tokens,
        setTokens,
        user,
        setUser,
        loading: isLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error("useAppContext() must be used within a UserProvider");
  }
  return context as AppContext;
};
