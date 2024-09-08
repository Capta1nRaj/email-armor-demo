import React, { Suspense } from 'react';
import SignInPageContent from './SignInPageContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "",
    description: "",
    keywords: "sign in, ShaveLinks, user login, access account, dashboard",
    twitter: {
        card: "summary_large_image"
    },
    openGraph: {
        images: '',
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
