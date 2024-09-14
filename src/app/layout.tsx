import type { Metadata } from "next";
import { Toaster } from 'sonner'
import "./globals.css";
import SideBarAndTopBarLayout from "@/layout/SideBarAndTopBarLayout";

export const metadata: Metadata = {
  metadataBase: new URL("https://emailarmor.priyalraj.com"),
  title: {
    default: "Email Armor - Secure Sign-Up and Sign-In System",
    template: "%s - Email Armor",
  },
  description: "Email Armor is a Node.js/Next.js module that provides a secure and robust user sign-up and sign-in system with two-step verification and a built-in referral system.",
  keywords: "user sign-up, sign-in system, two-step verification, referral system, MongoDB, email verification, secure login, Next.js, Node.js",
  twitter: {
    title: "Email Armor - Secure Sign-Up and Sign-In System",
    description: "Empower your Next.js app with a secure and robust sign-up and sign-in system using Email Armor.",
    card: "summary_large_image"
  },
  openGraph: {
    title: "Email Armor - Secure User Authentication with Two-Step Verification",
    description: "Email Armor offers a powerful module for creating a secure sign-up and sign-in system, supporting two-step verification and a referral system, all with MongoDB.",
    images: 'https://raw.githubusercontent.com/Capta1nRaj/email-armor-docs/main/public/OpenGraphImage.png',
    url: "https://emailarmor.priyalraj.com",
  },
  alternates: {
    canonical: './',
  },
  icons: {
    icon: [
      //! Android Icons
      { rel: "icon", type: "image/png", sizes: "36x36", url: "/favicon/android-icon-36x36.png", },
      { rel: "icon", type: "image/png", sizes: "48x48", url: "/favicon/android-icon-48x48.png", },
      { rel: "icon", type: "image/png", sizes: "72x72", url: "/favicon/android-icon-72x72.png", },
      { rel: "icon", type: "image/png", sizes: "96x96", url: "/favicon/android-icon-96x96.png", },
      { rel: "icon", type: "image/png", sizes: "144x144", url: "/favicon/android-icon-144x144.png", },
      { rel: "icon", type: "image/png", sizes: "192x192", url: "/favicon/android-icon-192x192.png", },
      { rel: "icon", type: "image/png", sizes: "512x512", url: "/favicon/android-icon-512x512.png", },

      //! Apple Icons
      { rel: "apple-touch-icon", type: "image/ico", url: "/favicon/apple-icon.png", },
      { rel: "apple-touch-icon", sizes: "57x57", url: "/favicon/apple-icon-57x57.png", },
      { rel: "apple-touch-icon", sizes: "60x60", url: "/favicon/apple-icon-60x60.png", },
      { rel: "apple-touch-icon", sizes: "72x72", url: "/favicon/apple-icon-72x72.png", },
      { rel: "apple-touch-icon", sizes: "76x76", url: "/favicon/apple-icon-76x76.png", },
      { rel: "apple-touch-icon", sizes: "114x114", url: "/favicon/apple-icon-114x114.png", },
      { rel: "apple-touch-icon", sizes: "120x120", url: "/favicon/apple-icon-120x120.png", },
      { rel: "apple-touch-icon", sizes: "144x144", url: "/favicon/apple-icon-144x144.png", },
      { rel: "apple-touch-icon", sizes: "152x152", url: "/favicon/apple-icon-152x152.png", },
      { rel: "apple-touch-icon", sizes: "180x180", url: "/favicon/apple-icon-180x180.png", },

      //! Favion Icons
      { rel: "icon", type: "image/ico", url: "/favicon/favicon.ico", },
      { rel: "icon", type: "image/png", sizes: "16x16", url: "/favicon/favicon-16x16.png", },
      { rel: "icon", type: "image/png", sizes: "32x32", url: "/favicon/favicon-32x32.png", },
      { rel: "icon", type: "image/png", sizes: "96x96", url: "/favicon/favicon-96x96.png", },
    ],

    //! Other Icons
    other: [{ rel: 'apple-touch-icon-precomposed', url: '/favicon/apple-icon-precomposed.png', },],
  },
  manifest: '/favicon/manifest.json',
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body>
        <Toaster position="top-right" expand={true} richColors />
        <SideBarAndTopBarLayout>
          {children}
        </SideBarAndTopBarLayout>
      </body>
    </html>
  );
}
