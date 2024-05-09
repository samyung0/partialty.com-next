"use client";
import { createContext, useEffect, useState } from "react";
import { getUser } from "~/server/profiles";
import { User } from "~/definition/auth";

interface UserInteraface {
  user: User;
  loading: boolean;
}

export const clientAuthContext = createContext<UserInteraface>({
  user: null,
  loading: true,
});

export const ClientAuthContext = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<UserInteraface>({
    user: null,
    loading: true,
  });
  useEffect(() => {
    void (async () => {
      setState({
        user: await getUser(),
        loading: false,
      });
    })();
  }, []);

  return <clientAuthContext.Provider value={state}>{children}</clientAuthContext.Provider>;
};
