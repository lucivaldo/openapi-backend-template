import type { Metadata } from "next";

import { AppProvider } from "@/providers/AppProvider";
import { Roboto } from 'next/font/google';


const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

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
    <html lang="pt-br">
      <body className={roboto.variable} >
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
