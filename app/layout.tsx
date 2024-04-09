import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ptBR } from "@clerk/localizations";
import "./globals.css";
import ModalProvider from "@/components/modal-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Genius",
  description: "AI Plataform  ",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <ClerkProvider localization={ptBR}>
      <html lang="en">
        <body className={inter.className}>
          <ModalProvider/>
          {children}
          </body>
      </html>
    </ClerkProvider>  
  );
}
