"use client";
import { ColumnDef } from "@tanstack/react-table";
import { convertPhoneNumber } from "@/utils/constant";
import { redirect } from "next/navigation";
import { DeleteIcon, DetailIcon, EditIcon } from "@/utils/icon";
import { toast } from "react-toastify";
import { SetStateAction, useState } from "react";
import JobDetailSidebar from "./EmployeeDetailSidebar"
import DataTables from "@/components/DataTables";
import { deleteEmployee } from "../actions/EmployeeAction";
export const JobPage = () => {
    const api = process.env.NEXT_PUBLIC_API_URL;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const handleRowClick = (data: SetStateAction<null>) => {
        setSelectedData(data);
        setIsSidebarOpen(true);
    };
    const options = {
        title: "Daftar Pegawai",
        subtitle: "Daftar data pegawai yang tersedia.",
        addButtonText: 'Tambah',
        canAdd: true,
        createButtonChange: () => redirect('/employee/create')
    }
    const handleCloseSidebar = () => {
        setIsSidebarOpen(false);
        setSelectedData(null);
    };


    async function handleDelete(id: any) {
        try {
            const response = await deleteEmployee(id);
            if (response.responseStatus) {
                toast.success(response.responseMessage);
                setTimeout(() => {
                    window.location.reload();
                }, 1000)
            } else {
                toast.error(response.responseMessage, { delay: 3000 });
                window.location.reload();
            }
        } catch (e) {
            toast.error(e?.toString() ?? 'Something went wrong');
            window.location.reload();
        }
    }
    const columns: ColumnDef<any>[] = [

        {
            accessorKey: 'Nama Lengkap',
            header: 'Nama Lengkap',
            cell: ({ row }) => {
                const user = row.original.name;
                return (<div className="flex items-center gap-2">
                    <div className="flex -space-x-2 rtl:space-x-reverse items-center">
                        <div title={user} className="relative border border-blue-200 inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-blue-100 rounded-full dark:bg-gray-600 cursor-pointer">
                            <span className="font-medium text-xs text-gray-600  dark:text-gray-300">{user.substr(0, 2).toUpperCase()}</span>
                        </div>
                    </div>
                    {user}
                </div>)
            },
            enableResizing: true

        },
        {
            accessorKey: 'Email',
            header: 'Email',
            accessorFn: (row) => row.email,
        },
        {
            accessorKey: 'No Telpon',
            header: 'No Telpon',
            cell: ({ row }) => {
                return convertPhoneNumber(row.original.phone)
            },
        },
        {
            accessorKey: 'Tgl Daftar',
            header: 'Tgl Daftar',
            cell: ({ row }) => {
                return new Date(row.original.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
            }
        },
        {
            accessorKey: 'Oleh',
            header: 'Oleh',
            cell: ({ row }) => {
                return row.original.createdBy;
            }
        },
        {
            accessorKey: 'action',
            header: 'Action',
            cell: ({ row }) => {
                return <>
                    <div className="flex gap-2">

                        <button
                            className="text-gray-500 hover:text-indigo-600"
                            type="button" onClick={() => redirect(`employee/edit/${row.original.slug}`)}>
                            <EditIcon />
                        </button>
                        {/* <button
                            className="text-gray-500 hover:text-indigo-600"
                            type="button" onClick={() => handleRowClick(row.original)} >

                            <DetailIcon />
                        </button> */}
                        <button
                            className="text-gray-500 hover:text-indigo-600"
                            type="button" onClick={() => handleDelete(row.original.slug)}>
                            <DeleteIcon />
                        </button>
                    </div>
                </>;
            }
        }
    ];
    return (
        <>
            <div className="w-full">
                <DataTables column={columns} dataUri={api + '/employee'} options={options} />
                {isSidebarOpen && (
                    <JobDetailSidebar data={selectedData} onClose={handleCloseSidebar} />
                )}
            </div>

        </>
    );


}

export default JobPage