
import QueryClientContextProvider from "@/context/query-client";
import { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";

const myFont = localFont({
  src: [
    {
      path: "./fonts/Helvetica-Bold.ttf",
      weight: "600",
    },
    {
      path: "./fonts/helvetica-light-587ebe5a59211.ttf",
      weight: "300",
    },
    {
      path: "./fonts/Helvetica.ttf",
      weight: "400",
    }
  ]
})



export const metadata: Metadata = {
  title: "Horus Financial Learning Academy",
  description: "Horus Financial Academy is a premier financial learning academy dedicated to equipping you with the knowledge and skills to navigate the financial markets. From foundational concepts to advanced strategies, we teach you how to analyze price momentum, identify key market levels, and make informed trading decisions using technical tools and real-world insights.",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${myFont.className} antialiased`}
      >
        {/* <SideBar/> */}
        <QueryClientContextProvider>
          {children}
        </QueryClientContextProvider>
      </body>
    </html>
  );
}
