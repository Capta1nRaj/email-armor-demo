import React, { Suspense } from 'react';
import ForgotPasswordPageContent from './ForgotPasswordPageContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Reset Your Forgotten Password",
    description: "Reset your ShaveLinks password easily. Enter your username to receive an OTP, then update your password securely. Ensure uninterrupted access to your account.",
    keywords: "forgot password, reset password, ShaveLinks, password recovery, OTP",
    twitter: {
        card: "summary_large_image"
    },
    openGraph: {
        images: 'https://shave-links-production.s3.ap-south-1.amazonaws.com/root-images/OpenGraphImage.png',
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
