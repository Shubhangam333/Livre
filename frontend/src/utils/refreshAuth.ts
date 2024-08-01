import { client, setHeaderToken } from "./client";

export const fetchNewToken = async () => {
  const storedTokens = localStorage.getItem("tokens");

  const refreshToken = storedTokens
    ? JSON.parse(storedTokens).refreshToken
    : null;
  try {
    const newTokens: { accessToken: string; refreshToken: string } =
      await client
        .post("/auth/refresh-token", { refreshToken })
        .then((res) => res.data.tokens);
    return newTokens;
  } catch (error) {
    return null;
  }
};

export const refreshAuth = async (failedRequest: any) => {
  const newTokens = await fetchNewToken();
  if (newTokens) {
    failedRequest.response.config.headers.Authorization =
      "Bearer " + newTokens.accessToken;
    setHeaderToken(newTokens.accessToken);

    localStorage.setItem("tokens", JSON.stringify(newTokens));

    // you can set your token in storage too
    // setToken({ token: newToken });
    return Promise.resolve(newTokens);
  } else {
    // we can redirect to login page here
    // router.push("/login");

    localStorage.removeItem("tokens");
    localStorage.removeItem("user");
    return Promise.reject();
  }
};
