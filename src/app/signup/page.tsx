import React, { Suspense } from 'react';
import SignUpPageContent from './SignUpPageContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Sign Up",
    description: "Join Email Armor today!",
    keywords: "sign up, referral code, new user registration",
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
        canonical: '/signup',
    }
};

const SignUpPage = () => (
    <Suspense>
        <SignUpPageContent />
    </Suspense>
);

export default SignUpPage;