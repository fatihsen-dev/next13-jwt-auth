import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

export default async function Header() {
   const user = await useAuth.fromServer();

   return (
      <header className="flex items-center justify-between p-4">
         <Link href="/">LOGO</Link>
         <ul className="flex items-center space-x-3">
            <li>
               <Link href="/panel">Panel</Link>
            </li>
            <li>{user ? <Link href="/profile">Profile</Link> : <Link href="/login">Login</Link>}</li>
         </ul>
      </header>
   );
}
