import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { Sidebar } from "@/components/sidebar";

const inter = Montserrat({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Header />
        <div className="flex min-h-[100vh] bg-black">
          <Sidebar />
          <main className="bg-darkGrey flex flex-grow">{children}</main>
        </div>
      </body>
    </html>
  );
}
