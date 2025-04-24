import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/themeProvider";
import { Toaster } from "@/components/ui/sonner";
import { auth } from "@/auth";
import { LogOut } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Outfit manager",
  description: "A wardrobe management application",
};

// TODO: can this be async?
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <header className="flex  justify-between p-4 border-b">
            <h1 className="text-3xl ">WM</h1>
            {session && (
              <a href="logout">
                <LogOut />
              </a>
            )}
          </header>
          <main className="px-4 my-4 mx-auto w-full max-w-5xl">{children}</main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
