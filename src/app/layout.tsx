import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from "next/script"
import { CSPostHogProvider } from './providers'
import { Toaster } from "@/components/ui/toaster";

const bricolageGrotesque = Bricolage_Grotesque({
    subsets: ["latin"],
    variable: "--font-bricolage-grotesque",
});

export const metadata: Metadata = {
    title: " Alf Ajr",
    description: "Generated by us",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
            <Script async src="https://www.googletagmanager.com/gtag/js?id=G-Y7PRV5YXL8"></Script>
            <Script id='google-analytics'>
                {
                    `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', 'G-Y7PRV5YXL8');
                    `
                }
            </Script>   
            </head>
            
            <CSPostHogProvider>
                <body className={bricolageGrotesque.className}>
                    <Navbar />

                    {children}
                    <Footer />
                <Toaster/>
                </body>
            </CSPostHogProvider>
        </html>
    );
}
