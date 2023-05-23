import { jwtVerify } from "jose";

export const getJwtSecretKey = () => {
   const secretKey = process.env.JWT_SECRET_KEY;

   if (!secretKey) {
      throw new Error("JWT_SECRET_KEY is not defined");
   }

   return new TextEncoder().encode(secretKey);
};

export async function verifyJwtToken(token: string) {
   if (process.env.JWT_SECRET_KEY) {
      try {
         const { payload } = await jwtVerify(token, getJwtSecretKey);

         return payload;
      } catch (error) {
         return null;
      }
   }
}
