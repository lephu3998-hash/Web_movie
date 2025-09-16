// src/context/UserContext.js
import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState(localStorage.getItem("userName") || "");
  const [userAvatar, setUserAvatar] = useState(localStorage.getItem("userAvatar") || "");
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  // đồng bộ với localStorage
  useEffect(() => {
    localStorage.setItem("userName", userName);
  }, [userName]);

  useEffect(() => {
    localStorage.setItem("userAvatar", userAvatar);
  }, [userAvatar]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <UserContext.Provider
      value={{
        userName,
        setUserName,
        userAvatar,
        setUserAvatar,
        favorites,
        setFavorites,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
