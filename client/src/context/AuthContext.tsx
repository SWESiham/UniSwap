import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: any }) => {  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getMe = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log(token);
        if (!token) {
          setLoading(false);
          return;
        }
        const me = await axios.get("http://localhost:5000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log(me);
        setUser(me.data);
      } catch (error) {
        console.error("Error:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getMe();
  }, []);

  return (
    <>
      <AuthContext.Provider value={{ user, setUser, loading }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};
