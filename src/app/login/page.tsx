'use client';

import AuthLayout from '@/components/AuthLayout';
import LoginForm from '@/components/LoginForm';
import { useRouter } from 'next/navigation';
import { Fragment } from 'react';

export default function LoginPage() {
    const router = useRouter();

    const handleSwitchToRegister = () => {
        router.push('/register');
    };

    return (
        <AuthLayout isLoginForm={true}>
            <LoginForm onSwitchToRegister={handleSwitchToRegister} />
        </AuthLayout>
    );
}