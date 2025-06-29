import { BookmarkIcon, ChevronRightIcon, HomeModernIcon, UsersIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export const Sidebar = ({ userSession }: { userSession: any }) => {
    return (
        <aside id="default-sidebar" className={`relative top-0 left-0 z-40 min-w-64 min-h-full transition-transform translate-x-0 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-600`} aria-label="Sidebar">
            <div className=" px-3 py-3 h-16 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                <h1 className="text-2xl font-bold my-auto w-fit text-center border-2 border-blue-500 px-2 rounded-md"><span className="text-indigo-600">A</span><span className="text-purple-600">R</span><span className="text-lime-600">C</span><span className="text-blue-600">E</span></h1>
            </div>
            <div className="relative mb-6">
                <div className=" h-16 mb-10">

                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-8">
                    <img src="https://images.unsplash.com/photo-1566753323558-f4e0952af115?q=80&w=1921&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Profile Picture" className="w-20 h-20 rounded-full border-4 border-white shadow-md object-cover dark:border-gray-700" />
                </div>
            </div>

            <div className="text-center mt-2"> <h3 className="text-lg font-semibold text-gray-800 mb-0">{userSession?.name}</h3> <p className="text-xs text-gray-500 mb-0">@{userSession?.accessType}</p> </div>

            <div className=" py-2 ">
                <ul className="space-y-2 my-4 pl--2 font-medium text-gray-600">
                    <li>
                        <Link href="/dashboard" className="flex items-center py-2 px-4 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <HomeModernIcon className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                            <span className="flex-1 text-sm ms-3 whitespace-nowrap flex justify-between items-center">
                                <span className="text-gray-900 dark:text-white text-xs">Dashboard</span>
                                <span className="text-gray-400"><ChevronRightIcon className="w-4 h-4" /></span>
                            </span>
                        </Link>
                    </li>

                    <li>
                        <Link href="/job" className="flex items-center py-2 px-4 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <BookmarkIcon className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                            <span className="flex-1 text-sm ms-3 whitespace-nowrap flex justify-between items-center">
                                <span className="text-gray-900 dark:text-white text-xs">Pekerjaan</span>
                                <span className="text-gray-400"><ChevronRightIcon className="w-4 h-4" /></span>
                            </span>

                        </Link>
                    </li>
                    {userSession.role_id === 1 ?
                        <li>
                            <Link href="/employee" className="flex items-center py-2 px-4 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <UsersIcon className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                <span className="flex-1 text-sm ms-3 whitespace-nowrap flex justify-between items-center">
                                    <span className="text-gray-900 dark:text-white text-xs">Pegawai</span>
                                    <span className="text-gray-400"><ChevronRightIcon className="w-4 h-4" /></span>
                                </span>
                            </Link>
                        </li>
                        : null
                    }
                </ul>
            </div>
        </aside>
    );
}

export default Sidebar