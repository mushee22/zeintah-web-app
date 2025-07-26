
import QueryClientContextProvider from "@/context/query-client";
import { Metadata } from "next";
import localFont from 'next/font/local';
import { ToastProvider } from "@/components/ui/toast-provider";
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
  title: "Zientnah Financial Learning Academy",
  description: "Zientnah Financial Academy is a premier financial learning academy committed to empowering individuals with comprehensive financial education. We provide expert guidance on market analysis, trading strategies, and investment principles to help you build a strong foundation for successful trading and investing. Our academy focuses on practical skills development through hands-on learning and real market scenarios.",
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
          <ToastProvider>
            {children}
          </ToastProvider>
        </QueryClientContextProvider>
      </body>
    </html>
  );
}
