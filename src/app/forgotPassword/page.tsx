import React, { Suspense } from 'react';
import ForgotPasswordPageContent from './ForgotPasswordPageContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Reset Your Forgotten Password",
    description: "Reset your Emil Armor password easily. Enter your username or email to receive an OTP, then update your password securely.",
    keywords: "forgot password, reset password, email armor, password recovery, OTP",
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
        canonical: '/forgotPassword',
    }
};

const ForgotPasswordPage = () => (
    <Suspense>
        <ForgotPasswordPageContent />
    </Suspense>
);

export default ForgotPasswordPage;
