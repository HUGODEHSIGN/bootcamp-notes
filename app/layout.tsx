import "./globals.css";
import Providers from "./providers";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { Metadata } from "next";
import { Montserrat as FontSans } from "next/font/google";

import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";

import { cn } from "../lib/utils";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <div className="mx-6 sm:mx-12 md:mx-24 lg:mx-48">{children}</div>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
