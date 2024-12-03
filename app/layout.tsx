import "./globals.css";
import { Public_Sans } from "next/font/google";

import { Navbar } from "@/components/Navbar";
import SessionWrapper from "@/components/SessionWrapper";

const publicSans = Public_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionWrapper>
      <html lang="pt-br">
        <head>
          <title>Chat DPEMT</title>
          <link rel="shortcut icon" href="/images/favicon.ico" />
          <meta
            name="description"
            content="ChatBot da Defensoria Pública de Mato Grosso"
          />
          <meta
            property="og:title"
            content="ChatBot Defensoria Pública de Mato Gross"
          />
        </head>
        <body className={publicSans.className}>
          <div className="flex flex-col h-[100vh]">
            <Navbar />
            {children}
          </div>
        </body>
      </html>
    </SessionWrapper>
  );
}
