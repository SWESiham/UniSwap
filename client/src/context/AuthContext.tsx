import { api } from "../services/api";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: any }) => {  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getMe = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setLoading(false);
          return;
        }
        const me = await api.get("/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });


        setUser(me.data.user);
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
