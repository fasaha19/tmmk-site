import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@styles/globals.scss";
import { GlobalContextProvider } from "@context/context";

export const metadata: Metadata = {
  title: "TMMK",
  description: "Tamilnadu Muslim Munnetra Kazhagam",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* <Provider> */}
        <GlobalContextProvider>{children}</GlobalContextProvider>
        {/* </Provider> */}
      </body>
    </html>
  );
}
