import { Merriweather, Nunito_Sans } from "next/font/google";


export const nunito = Nunito_Sans({
    variable: "--font-nunit-sans",
    subsets: ["latin"],
});

export const merri = Merriweather({
    variable: '--font-merri-weather',
    subsets: ['latin'],
    weight: ["300", "400", "700", "900"]
});