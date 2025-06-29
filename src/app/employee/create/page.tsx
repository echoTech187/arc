'use client'
import Header from "@/components/Header";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { redirect } from "next/navigation";
import { getUser } from "@/app/actions/AuthAction";
import { toast } from "react-toastify";

import { FormEvent } from "react";
import { createEmployee } from "@/app/actions/EmployeeAction";


export default function CreateJob() {
    const backToList = () => {
        redirect('/employee');
    }

    async function handleEmployeeCreate(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        try {
            const user = await getUser();
            if (!user) return
            const userData = JSON.parse(user);
            formData.append('userId', userData.id);
            const response = await createEmployee(formData);
            if (response.responseStatus) {
                toast.success(response.responseMessage);
                setTimeout(() => {
                    redirect('/employee');
                }, 1000)
            } else {
                toast.error(response.responseMessage);
                // window.location.reload();
            }
        } catch (e) {
            toast.error(e?.toString() ?? 'Something went wrong');
            // window.location.reload();
        }

    }

    return (
        <>
            <Header {...{ title: "Tambah Pegawai Baru", subtitle: "(*) Tidak Boleh Kosong" }}>
                <button
                    type="button"
                    className="inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    onClick={backToList}
                >
                    <ChevronLeftIcon aria-hidden="true" className="mr-1.5 -ml-0.5 size-5" />
                    Kembali
                </button>
            </Header>
            <form method="POST" onSubmit={(e) => handleEmployeeCreate(e)} className="md:col-span-8 p-10">

                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="name">
                            Nama Lengkap *:
                        </label>
                        <input
                            required
                            min={1}
                            minLength={1}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Contoh : Muhammad Rizki"

                        />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="email">
                            Email *:
                        </label>
                        <input
                            required
                            min={0}
                            minLength={1}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="email"
                            name="email"
                            type="email" placeholder="Contoh : example@example"
                        />
                    </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="phone">
                            No. Telpon *:
                        </label>
                        <input
                            required
                            min={0}
                            minLength={0}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            id="phone"
                            name="phone"
                            type="number"
                            placeholder="Contoh : 087888888888"
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="password">
                            Password *:
                        </label>
                        <input
                            required
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Password"
                        />
                    </div>

                </div>

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
