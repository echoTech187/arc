"use client";
import { getUser } from "@/app/actions/AuthAction";
import { getStatusCount } from "@/app/actions/DashboardAction";
import { useEffect, useState } from "react";
interface User {
    name: string
}
const HeaderDashboard = () => {
    const [user, setUser] = useState<User | null>(null);
    const [countStatus, setCountStatus] = useState<any>([]);
    useEffect(() => {
        async function getUserData() {
            const user = await getUser();
            if (user) {
                setUser(JSON.parse(user));
            }
        }
        getUserData();
        async function getCountStatus() {
            const countStatus = await getStatusCount();
            if (countStatus) {
                setCountStatus(countStatus);
            }
        }
        getCountStatus();
    }, []);
    useEffect(() => {
        function handleStorageChange() {
            const countStatus = localStorage.getItem('countStatus');
            if (countStatus) {
                setCountStatus(JSON.parse(countStatus));
            }
        }
        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        }
    }, []);
    return (
        <div className="relative grid-col-2 col-span-2 h-fit w-full max-w-full mx-auto bg-white overflow-hidden p-6 shadow-custom rounded-lg">
            {/* Overlay Blur */}
            <h1 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">Selamat Datang, {user?.name}</h1>
            <p className="text-gray-600 text-xs mb-6">Berikut status proyek di papan Anda bulan ini.</p>

            <div className="flex space-x-3 mb-2 text-sm">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-100 text-yellow-700">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span> {countStatus?.pending} Pending
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span> {countStatus?.process} In progress
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-700">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span> {countStatus?.review} Ready Review
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span> {countStatus?.completed} Completed
                </span>
            </div>
        </div>
    );
};

export default HeaderDashboard;