import { JSX } from 'react/jsx-runtime';

export default function Header({ title, subtitle, children }: Readonly<{ title: string; subtitle?: string | undefined | null; children: JSX.Element | JSX.Element[] }>) {
    return (
        <div className="flex lg:flex lg:items-center lg:justify-between p-8 mt-20 md:mt-0">
            <div className="min-w-0 flex-1">
                <h2 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                    {title}
                </h2>
                <p className='text-xs text-gray-500'>{subtitle}</p>

                {/* <div className="hidden mt-1 flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                        <BriefcaseIcon aria-hidden="true" className="mr-1.5 size-5 shrink-0 text-gray-400" />
                        Full-time
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                        <MapPinIcon aria-hidden="true" className="mr-1.5 size-5 shrink-0 text-gray-400" />
                        Remote
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                        <CurrencyDollarIcon aria-hidden="true" className="mr-1.5 size-5 shrink-0 text-gray-400" />
                        $120k &ndash; $140k
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                        <CalendarIcon aria-hidden="true" className="mr-1.5 size-5 shrink-0 text-gray-400" />
                        Closing on January 9, 2020
                    </div>
                </div> */}
            </div>
            <div className="m-auto flex lg:mt-0 lg:ml-4 justify-items-center justify-end-safe">
                {/* <span className="hidden sm:block">
                    <button
                        type="button"
                        className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
                    >
                        <PencilIcon aria-hidden="true" className="mr-1.5 -ml-0.5 size-5 text-gray-400" />
                        Edit
                    </button>
                </span>

                <span className="ml-3 hidden sm:block">
                    <button
                        type="button"
                        className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
                    >
                        <LinkIcon aria-hidden="true" className="mr-1.5 -ml-0.5 size-5 text-gray-400" />
                        View
                    </button>
                </span> */}

                <span className="sm:ml-3">
                    {
                        children
                    }
                </span>

                {/* Dropdown */}
                {/* <Menu as="div" className="relative ml-3 sm:hidden">
                    <MenuButton className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:ring-gray-400">
                        More
                        <ChevronDownIcon aria-hidden="true" className="-mr-1 ml-1.5 size-5 text-gray-400" />
                    </MenuButton>

                    <MenuItems
                        transition
                        className="absolute right-0 z-10 mt-2 -mr-1 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                    >
                        <MenuItem>
                            <a
                                href="#"
                                className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                            >
                                Edit
                            </a>
                        </MenuItem>
                        <MenuItem>
                            <a
                                href="#"
                                className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                            >
                                View
                            </a>
                        </MenuItem>
                    </MenuItems>
                </Menu> */}
            </div>
        </div>
    )
}
