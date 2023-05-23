"use client";
import { useRouter, useSearchParams } from "next/navigation";

export default function Page() {
   const router = useRouter();
   const searchParams = useSearchParams();

   const handleSubmit = async (e: any) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const email = formData.get("email");
      const password = formData.get("password");

      try {
         const user = await fetch("/api/login", {
            method: "POST",
            body: JSON.stringify({
               email,
               password,
            }),
         });
         const { success } = await user.json();

         if (success) {
            const nextUrl = searchParams.get("next");
            router.push(nextUrl ? nextUrl : "/");
         }
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
         <h1 className="mx-auto font-bold text-2xl">Login</h1>
         <input placeholder="Email" className="outline-none border rounded-sm border-black px-1 py-0.5" name="email" type="email" />
         <input
            placeholder="Password"
            className="outline-none border rounded-sm border-black px-1 py-0.5"
            name="password"
            type="password"
         />
         <button className="bg-blue-500 text-white rounded-sm py-1">Login</button>
      </form>
   );
}
