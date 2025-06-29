'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AuthLayoutProps {
    children: React.ReactNode;
    isLoginForm?: boolean; // To distinguish between login and register for left panel content/animation
}

const leftPanelContent = {
    login: {
        title: "Selamat datang di ARCE",
        description: "We also updated the format of products and rewards.",
        // You'd have more specific content/images here based on the video
        image: "/images/Illustration1.png", // Example image
    },
    register: {
        title: "Change The Quality Of Your Life",
        description: "A balanced diet and smart eats will fill your life with happiness and joy.",
        image: "/images/Illustration2.png", // Example image
    },
};

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, isLoginForm = true }) => {
    const [panelType, setPanelType] = useState(isLoginForm ? 'login' : 'register');

    useEffect(() => {
        setPanelType(isLoginForm ? 'login' : 'register');
    }, [isLoginForm]);

    const currentContent = isLoginForm ? leftPanelContent.login : leftPanelContent.register;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-bl from-blue-500 to-indigo-600 p-4 relative overflow-hidden">
            {/* Background shape/gradient, if any */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 opacity-10"></div>

            <motion.div
                className="flex w-full max-w-6xl bg-white rounded-lg shadow-xl overflow-hidden relative"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                style={{
                    minHeight: '600px', // Adjust as needed
                    // For a page curl effect, you'd need more complex CSS transforms or a dedicated library
                }}
            >
                {/* Left Panel - Blue Side */}
                <div className="w-1/2 bg-blue-600 p-8 flex-col justify-between relative overflow-hidden hidden md:flex">
                    {/* Confetti-like dots - simple CSS circles */}
                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                        <span className="absolute w-2 h-2 bg-white rounded-full top-10 left-10 animate-pulse"></span>
                        <span className="absolute w-3 h-3 bg-white rounded-full bottom-20 left-40 animate-pulse delay-100"></span>
                        <span className="absolute w-2 h-2 bg-white rounded-full top-1/2 right-10 animate-pulse delay-200"></span>
                        <span className="absolute w-4 h-4 bg-white rounded-full bottom-10 right-1/4 animate-pulse delay-300"></span>
                        {/* Add more as desired */}
                    </div>

                    <div className="relative flex flex-col justify-between items-center-safe z-10 h-full text-white text-center">
                        {/* Images/Cards on the left side - would be dynamic based on video */}
                        <div className="grid grid-cols-1 gap-4 my-8">
                            {/* These would be actual image components */}
                            <motion.img
                                key={`img1-${panelType}`}
                                src={currentContent.image} // Replace with actual images from video
                                alt="Feature 1"
                                className="w-full h-80 my-auto object-contain"
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -50 }}
                                transition={{ duration: 0.5 }}
                            />

                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={panelType} // Key for re-animating when content changes
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="my-8"
                            >
                                <h2 className="text-xl font-bold mb-2">{currentContent.title}</h2>
                                <p className="text-sm">{currentContent.description}</p>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Right Panel - White Side (Form) */}
                <div className="w-full md:w-1/2 p-8 flex flex-col justify-center items-center">
                    {children}
                </div>
            </motion.div>
        </div>
    );
};

export default AuthLayout;