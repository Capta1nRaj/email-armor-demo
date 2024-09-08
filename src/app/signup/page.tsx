import React, { Suspense } from 'react';
import SignUpPageContent from './SignUpPageContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "",
    description: "",
    keywords: "sign up, boost your business, ShaveLinks, referral code, new user registration",
    twitter: {
        card: "summary_large_image"
    },
    openGraph: {
        images: '',
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