"use client"
import { Suspense, useEffect, useState } from "react"
import { Navbar } from "./Navbar"
import { Sidebar } from "./Sidebar"
import { Loading } from "./Loading"
import { ToastContainer } from "react-toastify"
import { useRouter } from "next/navigation"
import { checkAuth, getUser, removeCookies } from "@/app/actions/AuthAction"

type AppProps = {
    children: React.ReactNode,
    title?: string

}

export const AppLayout = ({ ...props }: AppProps) => {
    const router = useRouter();
    const [userSession, setUserSession] = useState({});
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(true);
    const [isConfirmed, setIsConfirmed] = useState(false);

    useEffect(() => {
        function authCheck() {
            return new Promise((resolve) => {
                resolve(checkAuth());
            });
        }

        authCheck().then(async (isAuthenticated) => {
            if (isAuthenticated) {
                const user = await getUser();
                if (user) {
                    setIsLoading(false);
                    setIsConfirmed(true);
                    setUserSession(JSON.parse(user));
                } else {
                    setIsLoading(false);
                    setUserSession({});
                    window.localStorage.removeItem('token');
                    window.localStorage.removeItem('user');
                    await removeCookies('token');
                    await removeCookies('user');
                    router.push('/login');
                }

            } else {
                setIsLoading(false);
                setUserSession({});
                window.localStorage.removeItem('token');
                window.localStorage.removeItem('user');
                await removeCookies('token');
                await removeCookies('user');
                router.push('/login');
            }
        }).finally(() => setIsLoading(false));
    }, [router]);

    if (isLoading) {
        return (
            <Loading isProcessing={isLoading} isConfirmed={isConfirmed} />
        );
    }
    return (
        <><div className="flex justify-start items-stretch min-h-screen max-w-screen">
            <Sidebar userSession={userSession} />
            <div className="flex-1 overflow-x-auto">
                <Navbar userSession={userSession} />
                <Suspense fallback={<Loading isProcessing={true} isConfirmed={false} />}>
                    {props.children}
                </Suspense>
            </div>
        </div>
            <ToastContainer />
        </>
    )
}