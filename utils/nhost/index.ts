import { NhostClient } from "@nhost/nhost-js";
import { useNhostAuth } from "@nhost/react-auth";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { meAtom } from "utils/jotai";

const nhost = new NhostClient({
  autoRefreshToken: true,
  autoLogin: true,
  backendUrl:
    process.env.PUBLIC_NHOST_BACKEND_URL ??
    "https://whflujlkvojfebejcjmk.nhost.run",
});

console.log("gql", nhost.graphql.getUrl());

export const useAuth = () => {
  const { isAuthenticated, isLoading } = useNhostAuth();
  const [me, setMe] = useAtom(meAtom);
  const user = nhost.auth.getUser();

  useEffect(() => {
    if (!me && user) {
      setMe(user);
    }
  }, [me, setMe, user]);

  return {
    user,
    isAuthenticated,
    isLoading,
  };
};

export default nhost;
