'use client';

import AuthLayout from '@/components/AuthLayout';
import RegisterForm from '@/components/RegisterForm';
import { useRouter } from 'next/navigation';
import { Fragment } from 'react'; // For react fragment when using AnimatePresence

export default function RegisterPage() {
    const router = useRouter();

    const handleSwitchToLogin = () => {
        router.push('/login');
    };

    return (
        <AuthLayout isLoginForm={false}>
            <RegisterForm onSwitchToLogin={handleSwitchToLogin} />
        </AuthLayout>
    );
}