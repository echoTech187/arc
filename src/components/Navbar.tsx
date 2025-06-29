"use client";
import { removeCookies } from "@/app/actions/AuthAction";
import { useRouter } from "next/navigation";
import { PowerIcon } from "@heroicons/react/24/outline";
export const Navbar = ({ userSession }: { userSession: any }) => {
    const router = useRouter();
    function sidebarHandler() {
        throw new Error("Function not implemented.")
    }
    async function signOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        await removeCookies('token');
        await removeCookies('user');
        router.push('/login');
    }

    return <header className="fixed z-50 md:relative top-0 flex h-16  items-center justify-between p-4  dark:bg-gray-800 dark:text-gray-100 border-b border-gray-100  dark:border-gray-600 w-full ">
        <div className="flex items-center">
            <button onClick={() => { sidebarHandler() }} data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>


        </div>

        <div className="flex items-center button-group gap-2">
            <div className="w-full rounded-full">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <img className="h-8 w-8 rounded-full object-cover" src="https://images.unsplash.com/photo-1566753323558-f4e0952af115?q=80&w=1921&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="profile" />

                    </div>
                </div>
            </div>
            <button onClick={signOut} className="inline-flex items-center p-2 justify-center text-sm font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                <PowerIcon className="w-6 h-6" />
            </button>
        </div>

    </header>
}

export default Navbar