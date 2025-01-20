import Nav from "@/components/note/Nav";
import React from "react";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased overflow-x-hidden`}>
        <Nav />
        {children}
      </body>
    </html>
  );
}
