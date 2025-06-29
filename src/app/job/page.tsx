"use client";
import { ColumnDef } from "@tanstack/react-table";
import { CheckboxPrimitive } from "@lifespikes/ui";
import { formatCurrency, formatNumber } from "@/utils/constant";
import { redirect } from "next/navigation";
import { DeleteIcon, DetailIcon, EditIcon } from "@/utils/icon";
import { decodeEntity } from "html-entities";
import { toast } from "react-toastify";
import { deleteJob } from "../actions/JobAction";
import { SetStateAction, useEffect, useState } from "react";
import JobDetailSidebar from "./JobDetailSidebar"
import DataTables from "@/components/DataTables";
import { checkAuth, getUser } from "../actions/AuthAction";
import Loading from "../dashboard/loading";
export const JobPage = () => {
    const api = process.env.NEXT_PUBLIC_API_URL;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const [columnVisible, setColumnVisible] = useState({});
    const [loading, setLoading] = useState(true);
    const [canAdd, setCanAdd] = useState(true);
    const [canEdit, setCanEdit] = useState(true);
    const [canDelete, setCanDelete] = useState(true);

    useEffect(() => {
        async function authCheck() {
            return new Promise(async (resolve) => {
                resolve(checkAuth());
                const user = await getUser();
                if (user) {
                    const session = JSON.parse(user);
                    console.log(session.role_id);
                    if (session.role_id === 1) {
                        setCanAdd(true);
                        setCanEdit(true);
                        setCanDelete(true);
                        setColumnVisible({});
                        setLoading(false);
                    } else {
                        setCanAdd(false);
                        setCanEdit(true);
                        setCanDelete(false);
                        setColumnVisible({
                            Pegawai: false
                        });
                        setLoading(false);
                    }
                }
            });
        }
        authCheck();
    }, []);
    const handleRowClick = (data: SetStateAction<null>) => {
        setSelectedData(data);
        setIsSidebarOpen(true);
    };
    const options = {
        title: "Daftar Pekerjaan",
        subtitle: "Catatan pekerjaan yang dibuat beserta dengan kontribusi dari masing-masing pegawai dan remunerasi dari setiap pekerjaan.",
        addButtonText: 'Tambah',
        canAdd: canAdd,
        createButtonChange: () => redirect('/job/create')
    }
    const handleCloseSidebar = () => {
        setIsSidebarOpen(false);
        setSelectedData(null);
    };
    const filterDataTemplate = [
        {
            column: 'Status',
            data: [
                { value: 'Draft', label: 'Draft' },
                { value: 'Pending', label: 'Pending' },
                { value: 'In Progress', label: 'In Progress' },
                { value: 'Ready Review', label: 'Ready Review' },
                { value: 'Request Approved', label: 'Request Approved' },
                { value: 'Approved', label: 'Approved' },
                { value: 'Rejected', label: 'Rejected' },
                { value: 'Completed', label: 'Completed' },
            ]
        }];

    async function handleDelete(id: any) {
        try {
            const response = await deleteJob(id);
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
            accessorKey: 'Description',
            header: 'Description',
            cell: ({ row }) => {
                return <div dangerouslySetInnerHTML={{ __html: decodeEntity(row.original.description) }}></div>
            },
            enableResizing: true

        },
        {
            accessorKey: 'Tanggal Mulai',
            header: 'Tanggal Mulai',
            accessorFn: (row) => new Date(row.jobDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
        },
        {
            accessorKey: 'Pegawai',
            header: 'Pegawai',
            cell: ({ row }) => {
                const data = row.original.meta_user_assignments;

                if (data) {
                    return (
                        <div className="flex -space-x-2 rtl:space-x-reverse">
                            {
                                data.map((user: any, i: any) => {
                                    return (<div key={i} title={user} className="relative border border-blue-200 inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-blue-100 rounded-full dark:bg-gray-600 cursor-pointer">
                                        <span className="font-medium text-xs text-gray-600  dark:text-gray-300">{user.substr(0, 2)}</span>
                                    </div>);
                                })
                            }
                        </div>
                    )

                } else {
                    return <span className="font-medium text-xs text-gray-600  dark:text-gray-300">-</span>;
                }
            },
        },
        {
            accessorKey: 'Jumlah Jam Kerja',
            header: 'Jumlah Jam Kerja',
            cell: ({ row }) => {
                return formatNumber(row.original.total_hours);
            }
        },
        {
            accessorKey: 'Tarif per Jam',
            header: 'Tarif per Jam',
            cell: ({ row }) => {
                return formatCurrency(row.original.hourly_rate);
            }
        },
        {
            accessorKey: 'Biaya Tambahan',
            header: 'Biaya Tambahan',
            cell: ({ row }) => {
                return formatCurrency(row.original.additional_cost);
            }
        },
        {
            accessorKey: 'Total Remunerasi',
            header: 'Total Remunerasi',
            cell: ({ row }) => {
                const data = row.original.job_assignments;

                let calculated_remuneration = 0;
                for (let i = 0; i < data.length; i++) {
                    calculated_remuneration += parseInt(data[i].calculated_remuneration);
                }

                return formatCurrency(calculated_remuneration + parseInt(row.original.additional_cost));
            }
        },
        {
            accessorKey: 'Status',
            header: 'Status',
            cell: ({ row }) => {
                if (row.original.status.toLowerCase() === 'pending') {
                    return <span className="px-2 text-nowrap inline-flex text-xs leading-5 font-medium rounded-full bg-yellow-100 text-yellow-600">
                        {row.original.status}
                    </span>
                }
                if (row.original.status.toLowerCase() === 'approved') {
                    return <span className="px-2 text-nowrap inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-600">
                        {row.original.status}
                    </span>
                } else if (row.original.status.toLowerCase() === 'in progress') {
                    return <span className="px-2 text-nowrap inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-orange-600">
                        {row.original.status}
                    </span>
                } else if (row.original.status.toLowerCase() === 'ready review') {
                    return <span className="px-2 text-nowrap inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-cyan-600">
                        {row.original.status}
                    </span>
                } else if (row.original.status.toLowerCase() === 'request approved') {
                    return <span className="px-2 text-nowrap inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-600">
                        {row.original.status}
                    </span>
                } else if (row.original.status.toLowerCase() === 'rejected') {
                    return <span className="px-2 text-nowrap inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-600">
                        {row.original.status}
                    </span>
                } else if (row.original.status.toLowerCase() === 'completed') {
                    return <span className="px-2 text-nowrap inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-black">
                        {row.original.status}
                    </span>
                } else {
                    return <span className="px-2 text-nowrap inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-600">
                        {row.original.status}
                    </span>
                }
            },
            enableGlobalFilter: true,
            accessorFn: (row) => row.status
        },
        {
            accessorKey: 'Tanggal Buat',
            header: 'Tanggal Buat',
            enableGlobalFilter: true,
            accessorFn: (row) => new Date(row.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
        },
        {
            accessorKey: 'slug',
            header: 'Action',
            cell: ({ row }) => {
                return <>
                    <div className="flex gap-2 items-center justify-center">
                        {canEdit &&
                            (<button
                                className="text-gray-500 hover:text-indigo-600"
                                type="button" onClick={() => redirect(`job/edit/${row.original.slug}`)}>
                                <EditIcon />
                            </button>)
                        }
                        <button
                            className="text-gray-500 hover:text-indigo-600"
                            type="button" onClick={() => handleRowClick(row.original)} >

                            <DetailIcon />
                        </button>
                        {canDelete &&
                            (<button
                                className="text-gray-500 hover:text-indigo-600"
                                type="button" onClick={() => handleDelete(row.original.slug)}>
                                <DeleteIcon />
                            </button>)
                        }
                    </div>
                </>
                    ;
            }
        }
    ];
    if (loading) {
        return <Loading />
    }
    return (
        <>
            <div className="w-full">
                <DataTables column={columns} dataUri={api + '/job'} filterDataTemplate={filterDataTemplate} options={options} columnVisible={columnVisible} />
                {isSidebarOpen && (
                    <JobDetailSidebar data={selectedData} onClose={handleCloseSidebar} />
                )}
            </div>

        </>
    );


}

export default JobPage