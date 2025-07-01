"use client";
import { useEffect, useState } from "react";
import BarChartCard from "./components/BarChartCard"
import DonutChartCard from "./components/DonutChartCard"
import HeaderDashboard from "./components/HeaderDashboard"
import LineChartCard from "./components/LineChartCard"
import PostPerformanceCard from "./components/PostPerformanceCard"
import StatsCard from "./components/StatsCard"
import { getPerformance } from "../actions/DashboardAction";
import { formatCurrency, formatNumber } from "@/utils/constant";
import { checkAuth, getUser, removeCookies } from "../actions/AuthAction";
import { useRouter } from "next/navigation";

export const Dashboard = () => {
    const router = useRouter();
    const [performance, setPerformance] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [userSession, setUserSession] = useState({});

    useEffect(() => {
        async function getDataPerformance() {
            const result = await getPerformance();
            setPerformance(result);
            setLoading(false);
        }
        function authCheck() {
            return new Promise((resolve) => {
                resolve(checkAuth());
            });
        }

        authCheck().then(async (isAuthenticated) => {
            if (isAuthenticated) {
                const user = await getUser();
                if (user) {
                    setLoading(false);
                    setUserSession(JSON.parse(user));
                    getDataPerformance();
                } else {
                    setLoading(false);
                    setUserSession({});
                    window.localStorage.removeItem('token');
                    window.localStorage.removeItem('user');
                    await removeCookies('token');
                    await removeCookies('user');
                    router.push('/login');
                }

            } else {
                setLoading(false);
                setUserSession({});
                window.localStorage.removeItem('token');
                window.localStorage.removeItem('user');
                await removeCookies('token');
                await removeCookies('user');
                router.push('/login');
            }
        }).finally(() => setLoading(false));

    }, []);
    if (loading) return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto p-6 shadow-custom">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    <div className="md:col-span-3 lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-6 justify-between h-full">
                        <HeaderDashboard />

                        <StatsCard
                            title="Jumlah Pekerjaan"
                            value={formatNumber(0)}
                            label="Pekerjaan"
                            iconPath="M3 10a2 2 0 012-2h14a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6z"
                            iconBgColor="bg-blue-100"
                        />
                        <StatsCard
                            title="Total Remunerasi"
                            value={formatCurrency(0)}
                            iconPath="M8 13v-1c0-.537.106-1.042.298-1.503L5.5 8.5V7a1 1 0 011-1h4a1 1 0 011 1v1.5l-2.798 2.997c-.192.461-.298.966-.298 1.503zm8-5v1c0 .537-.106 1.042-.298 1.503L18.5 15V17a1 1 0 01-1 1h-4a1 1 0 01-1-1v-1.5l2.798-2.997c.192-.461.298-.966.298-1.503z" // Contoh path SVG panah dua arah
                            iconBgColor="bg-orange-100"
                        />

                        <StatsCard
                            title="Total Jam Kerja"
                            value={formatNumber(0)}
                            label="Jam"
                            iconPath="M3 6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V6z"
                            iconBgColor="bg-blue-100"
                        />

                        <StatsCard
                            title="Selesai"
                            value={formatNumber(0)}
                            label="Pekerjaan"
                            trend="down"
                            iconPath="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" // Contoh path SVG dokumen
                            iconBgColor="bg-purple-100"
                        />
                    </div>

                    <div className="md:col-span-1 lg:col-span-3">
                        <PostPerformanceCard />
                    </div>


                    <div className="md:col-span-3 lg:col-span-6">
                        <LineChartCard />
                    </div>


                </div>
            </div>
        </div>
    );
    return (

        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto p-6 shadow-custom">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    <div className="md:col-span-3 lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-6 justify-between h-full">
                        <HeaderDashboard />

                        <StatsCard
                            title="Jumlah Pekerjaan"
                            value={formatNumber(performance.total)}
                            label="Pekerjaan"
                            iconPath="M3 10a2 2 0 012-2h14a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6z"
                            iconBgColor="bg-blue-100"
                        />
                        <StatsCard
                            title="Total Remunerasi"
                            value={formatCurrency(performance.remunerasi)}
                            iconPath="M8 13v-1c0-.537.106-1.042.298-1.503L5.5 8.5V7a1 1 0 011-1h4a1 1 0 011 1v1.5l-2.798 2.997c-.192.461-.298.966-.298 1.503zm8-5v1c0 .537-.106 1.042-.298 1.503L18.5 15V17a1 1 0 01-1 1h-4a1 1 0 01-1-1v-1.5l2.798-2.997c.192-.461.298-.966.298-1.503z" // Contoh path SVG panah dua arah
                            iconBgColor="bg-orange-100"
                        />

                        <StatsCard
                            title="Total Jam Kerja"
                            value={formatNumber(performance.totalHours)}
                            label="Jam"
                            iconPath="M3 6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V6z"
                            iconBgColor="bg-blue-100"
                        />

                        <StatsCard
                            title="Selesai"
                            value={formatNumber(performance.completed)}
                            label="Pekerjaan"
                            trend="down"
                            iconPath="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" // Contoh path SVG dokumen
                            iconBgColor="bg-purple-100"
                        />
                    </div>

                    <div className="md:col-span-1 lg:col-span-3">
                        <PostPerformanceCard />
                    </div>


                    <div className="md:col-span-3 lg:col-span-6">
                        <LineChartCard />
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Dashboard