'use client';

import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { loginSchema } from '@/lib/validationSchemas';
import LoadingSpinner from './LoadingSpinner';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { EyeIcon, EyeSlashIcon, LockClosedIcon, AtSymbolIcon } from '@heroicons/react/24/outline'; // Icons
import Image from 'next/image';
import { Loading } from './Loading';
import { toast } from 'react-toastify';
import { setCookies, signIn } from '@/app/actions/AuthAction';
interface LoginFormProps {
    onSwitchToRegister: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister }) => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [loginError, setLoginError] = useState('');
    const [isConfirmed, setIsConfirmed] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            router.push('/dashboard');
        } else {
            localStorage.removeItem('token');
        }
    }, [router]);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: loginSchema,
        onSubmit: async (values) => {
            setIsProcessing(true);
            setLoginError('');
            setIsConfirmed(false);

            await new Promise((resolve) => setTimeout(resolve, 2000));

            if (values.email !== '' && values.password !== '') {
                try {
                    const result = await signIn(values.email, values.password);

                    if (result['responseCode'] === 200) {
                        await signInSuccess(result, setIsConfirmed);
                        router.push('/dashboard');
                    } else {
                        await signInFailed(result['responseMessage'], setIsProcessing, setLoginError);
                    }
                } catch (error: any) {
                    await signInFailed(error.message ? error.message : 'An error occurred.', setIsProcessing, setLoginError);
                }
            } else {
                await signInFailed('Invalid email or password.', setIsProcessing, setLoginError);
            }


        },
    });

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-md"
                key={isProcessing ? 'processing' : 'login'}
            >
                <div className="text-center mb-8">
                    {/* Logo/Icon from the video */}
                    <Image src="/logo.png" priority={true} width={100} height={100} alt="Logo" className="mx-auto h-24 w-auto mb-4" />
                    <h1 className="text-3xl font-bold text-gray-800">Welcome Back!</h1>
                    <p className="text-gray-600 mt-2">
                        Silahkan masuk menggunakan akun Anda
                    </p>
                </div>

                <form onSubmit={formik.handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="sr-only">Email</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 top-0 pl-3 flex items-center pointer-events-none h-9">
                                <AtSymbolIcon className={`h-5 w-5 text-gray-400 ${formik.touched.email && formik.errors.email ? 'top-0' : ''}`} />
                            </div>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Email"
                                className={`block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                            />
                            {formik.touched.email && formik.errors.email && (
                                <p className="mt-2 text-sm text-red-600">{formik.errors.email}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="sr-only">Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none h-9">
                                <LockClosedIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                className={`block w-full pl-10 pr-10 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                            />
                            <div className="absolute inset-y-0 right-0 top-0 pr-3 flex items-center cursor-pointer h-9"
                                onClick={() => togglePasswordVisibility()}>
                                {showPassword ? (
                                    <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                                ) : (
                                    <EyeIcon className="h-5 w-5 text-gray-400" />
                                )}
                            </div>
                            {formik.touched.password && formik.errors.password && (
                                <p className="mt-2 text-sm text-red-600">{formik.errors.password}</p>
                            )}
                        </div>
                    </div>



                    {loginError && (
                        <p className="mt-2 text-sm text-red-600 text-center">{loginError}</p>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={isProcessing || !formik.isValid || !formik.dirty}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isProcessing ? <LoadingSpinner /> : 'Login'}
                        </button>
                    </div>
                </form>



                <div className="mt-8 text-center text-sm text-gray-600">
                    Belum punya akun?{' '}
                    <button
                        type="button"
                        onClick={onSwitchToRegister}
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                        Daftar
                    </button>
                </div>
            </motion.div>
            <Loading isProcessing={isProcessing} isConfirmed={isConfirmed} />
        </>
    );
    async function signInSuccess(data: any, setIsConfirmed: React.Dispatch<React.SetStateAction<boolean>>) {
        setIsConfirmed(true);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        await setCookies(data);
    }
    async function signInFailed(message: string, setIsProcessing?: React.Dispatch<React.SetStateAction<boolean>>, setLoginError?: React.Dispatch<React.SetStateAction<string>>) {
        if (setIsProcessing && setLoginError) {
            setIsProcessing(false);
            setLoginError(message);
        } else {
            toast(message, { type: 'error' });
        }

    }


};

export default LoginForm;


