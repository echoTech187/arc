'use client';

import React, { useState } from 'react';
import { useFormik } from 'formik';
import { registerSchema } from '@/lib/validationSchemas';
import LoadingSpinner from './LoadingSpinner';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { EyeIcon, EyeSlashIcon, LockClosedIcon, AtSymbolIcon } from '@heroicons/react/24/outline';
import { Loading } from './Loading';
import Image from 'next/image';

interface RegisterFormProps {
    onSwitchToLogin: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin }) => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [registerError, setRegisterError] = useState('');
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: registerSchema,
        onSubmit: async (values) => {
            setIsProcessing(true);
            setRegisterError('');
            setRegistrationSuccess(false);
            setIsConfirmed(false);

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 2000));

            if (values.email === 'user@example.com') {
                setIsProcessing(false);
                setRegisterError('This email is already registered.');
            } else {

                console.log('Registration successful:', values);
                setRegistrationSuccess(true);
                setIsProcessing(false);
                setIsConfirmed(true);
                setTimeout(() => {
                    router.push('/login');
                }, 1500);
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
                className="w-full max-w-md" key={isConfirmed ? 'confirmed' : 'register'}
            >
                <div className="text-center mb-8">
                    <Image src="/logo.png" priority={true} width={100} height={100} alt="Logo" className="mx-auto h-24 w-auto mb-4" />
                    <h1 className="text-3xl font-bold text-gray-800">Join Us Today!</h1>
                    <p className="text-gray-600 mt-2">
                        Create an account to start your journey with us.
                    </p>
                </div>

                {registrationSuccess && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
                        role="alert" key={'registration-success'}
                    >
                        <strong className="font-bold">Success!</strong>
                        <span className="block sm:inline ml-2">Your account has been created. Redirecting...</span>
                    </motion.div>
                )}

                <form onSubmit={formik.handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="sr-only">Email</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <AtSymbolIcon className="h-5 w-5 text-gray-400" />
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
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
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
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}>
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

                    <div>
                        <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <LockClosedIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder="Confirm Password"
                                className={`block w-full pl-10 pr-10 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.confirmPassword}
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                {showConfirmPassword ? (
                                    <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                                ) : (
                                    <EyeIcon className="h-5 w-5 text-gray-400" />
                                )}
                            </div>
                            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                                <p className="mt-2 text-sm text-red-600">{formik.errors.confirmPassword}</p>
                            )}
                        </div>
                    </div>

                    {registerError && (
                        <p className="mt-2 text-sm text-red-600 text-center">{registerError}</p>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={isProcessing || !formik.isValid || !formik.dirty}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isProcessing ? <LoadingSpinner /> : 'Register'}
                        </button>
                    </div>
                </form>


                <div className="mt-8 text-center text-sm text-gray-600">
                    Sudah punya akun?{' '}
                    <button
                        type="button"
                        onClick={onSwitchToLogin}
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                        Login
                    </button>
                </div>
            </motion.div>
            <Loading isProcessing={isProcessing} isConfirmed={isConfirmed} />
        </>
    );
};

export default RegisterForm;