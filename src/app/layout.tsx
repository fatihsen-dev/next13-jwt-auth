import Header from "@/components/Header";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
   title: "NextJs JWT Auth",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <html lang="en">
         <body className={inter.className}>
            <Header />
            <main className="flex-1 flex items-center justify-center p-4">{children}</main>
         </body>
      </html>
   );
}
