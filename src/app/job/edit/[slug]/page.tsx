'use client'
import Header from "@/components/Header";
import FormRepeater from "@/components/FormRepeater";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { redirect } from "next/navigation";
import { detailJob, updateJob } from "@/app/actions/JobAction";
import { getUser } from "@/app/actions/AuthAction";
import { useEffect, useState, FormEvent, SetStateAction } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
import { Checkbox } from "@/components/CheckBox";
import { SelectTrigger, SelectValue, SelectContent, SelectItem, Select } from "@lifespikes/ui";
const QuillEditor = dynamic(() => import('@/components/TextEditor'), {
    ssr: false
});
export default function EditJob() {

    const { slug } = useParams();
    const [loading, setLoading] = useState(true);
    const [job, setJob] = useState<any[]>([]);
    const [jobAssignments, setJobAssignments] = useState([]);
    const [editorContent, setEditorContent] = useState<string>('');
    const [isShared, setIsShared] = useState<boolean>(false);
    const [hoursTotal, setHoursTotal] = useState<String>('0');
    const [selectedStatus, setSelectedStatus] = useState<string>('');
    const statusData = [
        { value: 'Draft', label: 'Draft' },
        { value: 'Pending', label: 'Pending' },
        { value: 'In Progress', label: 'In Progress' },
        { value: 'Ready Review', label: 'Ready Review' },
        { value: 'Request Approved', label: 'Request Approved' },
        { value: 'Approved', label: 'Approved' },
        { value: 'Rejected', label: 'Rejected' },
        { value: 'Completed', label: 'Completed' },
    ]

    const backToList = () => {
        redirect('/job');
    }
    useEffect(() => {

        async function getData() {
            const response = await detailJob(slug?.toString() ?? '');
            const data = await response;
            if (data.total > 0) {
                setJob(data.data)
                setEditorContent(data.data[0].description);
                setJobAssignments(data.data[0].job_assignments);
                setIsShared(data.data[0].is_shared === 'Y' ? true : false);
                setSelectedStatus(data.data[0].status);
                return data
            } else {
                redirect('/job');
            }

        }
        getData();
        // handleGetContent();
    }, [slug]);

    async function handleJobEdit(e: FormEvent<HTMLFormElement>) {
        try {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const user = await getUser();
            if (!user) return
            const userData = JSON.parse(user);
            formData.append('userId', userData.id);
            const response = await updateJob(slug?.toString() ?? '', formData);
            if (response.responseStatus) {
                toast.success(response.responseMessage);
                setTimeout(() => {
                    redirect('/job');
                }, 1000)
            } else {
                toast.error(response.responseMessage, { delay: 3000 });
                // window.location.reload();
            }
        } catch (e) {
            toast.error(e?.toString() ?? 'Something went wrong');
            // window.location.reload();
        }

    }
    function handleIsShared(value: boolean) {
        setIsShared(value);
    }
    function handleStatusChange(value: SetStateAction<string>) {
        setSelectedStatus(value);
    }
    if (loading && job.length === 0) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        )
    }
    return (
        <>
            <Header {...{ title: "Perbarui Pekerjaan", subtitle: "*) Tidak Boleh Kosong" }}>
                <button
                    type="button"
                    className="inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    onClick={backToList}
                >
                    <ChevronLeftIcon aria-hidden="true" className="mr-1.5 -ml-0.5 size-5" />
                    Kembali
                </button>
            </Header>
            <form method="PATCH" onSubmit={(e) => handleJobEdit(e)} className="md:col-span-8 p-10">
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="description">
                            Deskripsi Pekerjaan *:
                        </label>
                        <div className="pb-6">
                            <QuillEditor value={editorContent} onChange={setEditorContent} />
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="total_hours">
                            Jumlah Jam Kerja (Total) *:
                        </label>
                        <input
                            required
                            min={1}
                            minLength={1}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            id="total_hours"
                            name="total_hours"
                            type="number"
                            placeholder="Contoh : 10"
                            onChange={(e) => setHoursTotal(e.target.value)}
                            defaultValue={job[0]?.total_hours}
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="hourly_rate">
                            Tarif per Jam (Rp) *:
                        </label>
                        <input
                            required
                            min={0}
                            minLength={1}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="hourly_rate"
                            name="hourly_rate"
                            type="text" placeholder="Contoh : 100000"
                            defaultValue={job[0]?.hourly_rate}
                        />
                    </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="additional_cost">
                            Biaya Tambahan (Rp) :
                        </label>
                        <input
                            min={0}
                            minLength={0}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            id="additional_cost"
                            name="additional_cost"
                            type="number"
                            placeholder="Contoh : 100000"
                            defaultValue={job[0]?.additional_cost}
                        />
                    </div>
                    <div className="w-full md:w-1/3 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="process_date">
                            Tanggal Pengerjaan :
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="process_date"
                            name="process_date"
                            type="date"
                            placeholder="DD/MM/YYYY"
                            defaultValue={job[0]?.jobDate}
                        />
                    </div>
                    <div className="w-full md:w-1/3 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="process_date">
                            Status :
                        </label>
                        <Select name="status" onValueChange={handleStatusChange} value={selectedStatus} >
                            <SelectTrigger className="w-full bg-white">
                                <SelectValue placeholder="Pilih Status" />
                            </SelectTrigger>
                            <SelectContent className="min-w-sm bg-white">
                                {statusData.map((item, index) => (<SelectItem key={index} value={item.value}>{item.label}</SelectItem>))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 flex items-center gap-2">
                        <Checkbox onCheckedChange={handleIsShared} label="Dikerjakan oleh lebih dari satu pegawai?" _containerProps={{ className: 'flex items-center gap-2' }} defaultChecked={isShared} />
                        <input type="hidden" name="isShared" defaultValue={isShared ? '1' : '0'} id="isShared" />
                    </div>
                </div>
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 w-full">
                    Job Assignment
                </label>

                <FormRepeater defaultValue={jobAssignments} isShared={isShared} hoursWorked={hoursTotal === '0.00' ? job[0]?.total_hours : hoursTotal} />
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="flex justify-between w-full px-3">
                        <div className="md:flex md:items-center">
                            &nbsp;
                        </div>
                        <button
                            className="shadow bg-indigo-600 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-3 px-12 rounded cursor-pointer"
                            type="submit">
                            Simpan
                        </button>

                    </div>

                </div>

            </form>
        </>
    );
}
