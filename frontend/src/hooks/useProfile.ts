import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import { User } from "../types";

export const useProfile = () =>
  useQuery<User>({
    queryKey: ["profile"],
    queryFn: apiClient.profile,
    retry: false,
    staleTime: 10 * 60 * 1000,
    enabled: !!localStorage.getItem("tokens"),
  });
