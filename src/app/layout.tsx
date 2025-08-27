import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./component/Navbar";

export const metadata: Metadata = {
  title: "My Blog",
  description: "Simple blog with Next.js + Node.js backend",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
