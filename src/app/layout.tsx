
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
  title: "Quantity Surveying – Zeitnah Group Of Institutions",
  description: `
  Zeitnah institute of quantity survey (ZIQS) is a premier organization established with an intention to mentor professionals with expertise in Quantity surveying Zeitnah’s team of experienced engineers mentors fresh graduates or diploma holders to skilled professionals in Quantity survey engineering through hands-on experience in GCC projects within a short period of time. This improves their value in construction industry and chances of getting hired in international job market. Diploma holders and graduates with civil engineering background can avail the benefits of ZIQS training.
  `,
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
        <QueryClientContextProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </QueryClientContextProvider>
      </body>
    </html>
  );
}
