import React from "react";
import { verifyJwtToken } from "@/libs/auth";
import Cookies from "universal-cookie";

const fromServer = async () => {
   const cookies = require("next/headers").cookies;
   const cookieList = cookies();

   const { value: token } = cookieList.get("token") ?? { value: null };
   if (token) {
      const verifiedToken = await verifyJwtToken(token);
      return verifiedToken;
   }

   return null;
};
export const useAuth = () => {
   const [auth, setAuth] = React.useState<any>(null);

   const getVerifiedToken = async () => {
      const cookies = new Cookies();
      const token = cookies.get("token") ?? null;
      const verifiedToken = await verifyJwtToken(token);
      setAuth(verifiedToken);
   };

   React.useEffect(() => {
      getVerifiedToken();
   }, []);

   return auth;
};

useAuth.fromServer = fromServer;
