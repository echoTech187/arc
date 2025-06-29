// dataDetailSidebar.jsx
import { CalendarIcon, ChevronLeftIcon } from '@heroicons/react/20/solid';
import React from 'react';
import { formatCurrency, formatNumber } from "@/utils/constant";

const JobDetailSidebar = ({ data, onClose }) => {
    if (!data) return null;
    const VerticalTimeline = ({ events }) => {
        console.log(events);
        return events.length === 0 ? <div className="relative">
            <p className="text-sm text-gray-400 leading-relaxed text-center">No events found.</p></div> : (
            <div className="relative pl-6"> {/* Padding kiri untuk garis dan titik */}
                {/* Garis vertikal utama */}
                <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-gray-200"></div>

                {events.map((event, index) => (
                    <div key={index} className="mb-8 relative">
                        {/* Titik timeline */}
                        <div className="absolute left-0 top-0 mt-1.5 w-4 h-4 rounded-full bg-indigo-600 border-2 border-white transform -translate-x-1/2"></div>

                        <div className="ml-6"> {/* Konten event di sebelah kanan titik */}
                            <p className="text-xs font-semibold text-gray-500 uppercase">
                                {event.type}
                            </p>
                            <p className="text-sm font-semibold text-indigo-600 mb-1">
                                {event.date}
                            </p>
                            <h3 className="text-base font-bold text-gray-800 mb-2">
                                {event.title}
                            </h3>
                            <p className="text-sm text-gray-700 leading-relaxed">
                                {event.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        );
    };
    const getRemunerationTotal = () => {
        let total = 0;
        data.job_assignments.map((remuneration) => {
            total += parseInt(remuneration.calculated_remuneration);
        });
        console.log(total);
        return formatCurrency(parseInt(total) + parseInt(data.additional_cost));
    }
    return (

        <div
            className="fixed inset-0 z-99 flex justify-end" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} onClick={onClose}
        >
            <div
                className="relative bg-white dark:bg-gray-800 w-80  h-full overflow-y-auto transform transition-transform duration-300 ease-in-out"
                onClick={(e) => e.stopPropagation()}
            >

                <div className="p-6 border-b border-gray-200">
                    <button
                        onClick={onClose}
                        className="absolute top-4 left-4 text-gray-400 hover:text-gray-600"
                    >

                        <ChevronLeftIcon className="w-6 h-6" />

                    </button>
                    <div className="flex items-center justify-end h-3">
                        {
                            data.status === 'pending' ? (
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-600">
                                    {data.status}
                                </span>
                            ) :
                                data.status === 'approved' ? (
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-600">
                                        {data.status}
                                    </span>
                                ) : data.status === 'progress' ? (
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-orange-600">
                                        {data.status}
                                    </span>
                                ) : data.status === 'review' ? (
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-cyan-600">
                                        {data.status}
                                    </span>
                                ) : data.status === 'request_approved' ? (
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-600">
                                        {data.status}
                                    </span>
                                ) : data.status === 'rejected' ? (
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-600">
                                        {data.status}
                                    </span>
                                ) : data.status === 'completed' ? (
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-black">
                                        {data.status}
                                    </span>
                                ) : (
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-600">
                                        {data.status}
                                    </span>
                                )
                        }
                        <button
                            onClick={onClose}
                            className="ml-2 text-gray-400 hover:text-gray-600 hidden"
                        >
                            {/* Close Icon (X) */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    {/* data Info */}
                    <div className="mt-4 gap-2 flex flex-col items-start">


                        <div>
                            <h3 className="text-sm font-semibold text-gray-800 truncate max-w-68 w-full" onClick={onClose} dangerouslySetInnerHTML={{ __html: data.description }}></h3>
                            <p className="text-xs text-gray-500 flex items-center my-1 gap-2"><CalendarIcon className="w-4 h-4 inline" />{new Date(data.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })} <span className="text-gray-600 text-xs font-stretch-semi-condensed italic">Oleh {data.createdBy}</span></p>

                        </div>
                        <div className="flex -space-x-2 rtl:space-x-reverse">
                            {data.job_assignments.map((assignment, index) => (
                                <div key={index} className="relative border border-blue-200 inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-blue-100 rounded-full dark:bg-gray-600">
                                    <span className="font-medium text-xs text-gray-600  dark:text-gray-300">{assignment.name.substr(0, 2).toUpperCase()}</span>
                                </div>
                            ))}


                        </div>
                    </div>
                </div>


                <div className="px-6 py-3">
                    <div className="space-y-4">
                        <h6>Pegawai yang Terlibat</h6>
                        {
                            data.job_assignments.length === 0 ? (
                                <div className="relative">
                                    <p className="text-sm text-gray-400 leading-relaxed text-center">Belum ada pegawai yang terlibat.</p>
                                </div>
                            ) :
                                data.job_assignments.map((assignment, index) => (

                                    <div key={index} className="">
                                        <div className="">
                                            <p className="text-sm font-medium text-gray-800">{assignment.name}</p>
                                            <table className="border-collapse w-full">
                                                <tbody>
                                                    <tr className="">
                                                        <td className='text-xs font-light'>
                                                            Jam Kontribusi
                                                        </td>
                                                        <td>:</td>
                                                        <td className="text-right text-xs">{formatNumber(assignment.hours_worked)} Jam</td>
                                                    </tr>
                                                    <tr className="">
                                                        <td className='text-xs font-light'>
                                                            Tarif Per Jam
                                                        </td>
                                                        <td>:</td>
                                                        <td className="text-right text-xs">{formatCurrency(data.hourly_rate)} </td>
                                                    </tr>
                                                    <tr className="">
                                                        <td className='text-xs font-light'>
                                                            Jumlah Remunerasi
                                                        </td>
                                                        <td>:</td>
                                                        <td className="text-right text-xs">{formatCurrency(assignment.calculated_remuneration)}</td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                        </div>
                                    </div>
                                ))}
                        <div className="flex justify-between border-t border-gray-200 py-2 w-full mb-0">
                            <p className="text-xs font-light text-left">Biaya Tambahan</p>
                            <p className="text-xs font-light text-right">
                                {formatCurrency(data.additional_cost)}
                            </p>
                        </div>
                        <div className="flex justify-between border-t border-gray-200 py-2 w-full mb-0">
                            <p className="text-xs font-light text-left">Total Remunerasi</p>
                            <p className="text-sm  font-bold text-right">
                                {getRemunerationTotal()}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-200 px-6 py-3">
                    <VerticalTimeline events={data.events ?? []} />
                </div>
            </div >
        </div >
    );
};

export default JobDetailSidebar;