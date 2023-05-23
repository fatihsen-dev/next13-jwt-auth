import { getJwtSecretKey } from "@/libs/auth";
import { SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
   const body = await request.json();

   if (body.email === "admin@gmail.com" && body.password === "admin") {
      // generate a token
      const token = await new SignJWT({
         username: body.username,
         role: "admin",
      })
         .setProtectedHeader({
            alg: "HS256",
         })
         .setIssuedAt()
         .setExpirationTime("30m")
         .sign(getJwtSecretKey());

      // set the cookie
      const response = NextResponse.json({
         success: true,
      });

      response.cookies.set({
         name: "token",
         value: token,
         path: "/",
      });

      return response;
   }

   return NextResponse.json({
      success: false,
   });
}
