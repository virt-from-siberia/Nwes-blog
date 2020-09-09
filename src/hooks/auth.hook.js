import { useState, useCallback, useEffect } from "react";

const storageName = "userData";

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [ready, setReady] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);

  const login = useCallback((userToken, id, name) => {
    setToken(userToken);
    setUserId(id);
    setUserName(name);

    localStorage.setItem(
      storageName,
      JSON.stringify({
        userId: id,
        token: userToken,
        name,
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setUserName(null);
    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));
    if (data && data.token) {
      login(data.token, data.userId, data.name);
    }
    setReady(true);
  }, [login]);

  return {
    login: login,
    logout: logout,
    token: token,
    userId: userId,
    ready: ready,
    name: userName,
  };
};
