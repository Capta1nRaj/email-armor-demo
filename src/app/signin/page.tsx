import React, { Suspense } from 'react';
import SignInPageContent from './SignInPageContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Sign In to Your Account",
    description: "Sign in to Email Armor to gain full access!",
    keywords: "sign in, email armor, user login, access account, dashboard",
    twitter: {
        card: "summary_large_image"
    },
    openGraph: {
        title: "Email Armor - Secure User Authentication with Two-Step Verification",
        description: "Email Armor offers a powerful module for creating a secure sign-up and sign-in system, supporting two-step verification and a referral system, all with MongoDB.",
        images: 'https://raw.githubusercontent.com/Capta1nRaj/email-armor-docs/main/public/OpenGraphImage.png',
        url: "https://emailarmor.priyalraj.com",
    },
    alternates: {
        canonical: '/signin',
    }
};

const SignInPage = () => (
    <Suspense>
        <SignInPageContent />
    </Suspense>
);

export default SignInPage;
