import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeContext from "./context/theme";
import { Toaster } from "@/components/ui/toaster";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MemoMind",
  description: "Your personal note-taking app",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <ThemeContext>
        <body className={inter.className}>
          <Toaster />
          {children}
        </body>
      </ThemeContext>
    </html>
  );
}

export default RootLayout;
