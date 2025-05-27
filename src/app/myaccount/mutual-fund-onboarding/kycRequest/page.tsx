"use client"
import React, { useEffect } from 'react';

export default function Page() {
    useEffect(() => {
        window.location.href = 'https://wealthup-frontend-copy.vercel.app/myaccount/mutual-fund-onboarding?requestType=kycRequest';
    }, []);

    return (
        <div>
            Redirecting...
        </div>
    );
}
