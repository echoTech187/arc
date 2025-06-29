"use client";
import React, { useState, useMemo, useEffect } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel, // Tambahan untuk sorting
    flexRender
} from '@tanstack/react-table';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import { autoTable } from 'jspdf-autotable';
import { removeCookies } from '@/app/actions/AuthAction';
import { useRouter } from 'next/navigation';


export default function DataTables({ ...props }) {
    const router = useRouter();
    const { dataUri, column, filterDataTemplate, columnVisible, options } = props;
    const [data, setData] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [columnFilters, setColumnFilters] = useState([]);
    const [sorting, setSorting] = useState([]);
    const [columnVisibility, setColumnVisibility] = useState(columnVisible || {});

    const columns = useMemo(
        () => column,
        []
    );

    const table = useReactTable({
        data,
        columns,
        state: {
            globalFilter,
            columnFilters,
            sorting,
            columnVisibility,
        },
        onGlobalFilterChange: setGlobalFilter,
        onColumnFiltersChange: setColumnFilters,
        onSortingChange: setSorting,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(), // Aktifkan sorting
        initialState: {
            pagination: {
                pageSize: 10, // Default rows per page seperti di gambar
            },
        },
    });
    async function signOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        await removeCookies('token');
        await removeCookies('user');
        router.push('/login');
    }

    useEffect(() => {
        async function fetchData() {
            const token = localStorage.getItem('token');
            if (!token) {
                await signOut();
            }
            try {
                const perPage = table.getState().pagination.pageSize ?? 10;
                const page = (table.getState().pagination.pageIndex ?? 0) + 1;
                const response = await fetch(dataUri + `?limit=` + perPage + `&skip=` + (page - 1) * perPage,
                    {
                        method: 'GET',
                        headers: {
                            'Authorization': 'Bearer ' + token,
                            'Access-Control-Allow-Origin': '* | http://localhost:3000',
                            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
                            'Content-Type': 'application/json'
                        }
                    }
                );
                const result = await response.json();
                if (result['responseCode'] === 200) {
                    setData(result['data']);
                    return result['data'];
                } else {
                    if (result['responseCode'] == 401) {
                        await signOut();

                    } else {
                        setData([]);
                        return result.responseMessage;
                    }

                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }

        }
        fetchData();
    }, [])
    const { pageSize, pageIndex } = table.getState().pagination;
    const totalRows = table.getFilteredRowModel().rows.length;
    const firstRowIndex = pageIndex * pageSize + 1;
    const lastRowIndex = Math.min((pageIndex + 1) * pageSize, totalRows);
    // --- Fungsi Ekspor Data ---

    const exportToExcel = () => {
        // Ambil data yang difilter dan terlihat saja
        const filteredAndVisibleRows = table.getFilteredRowModel().rows.map(row => {
            const rowData = {};
            table.getAllColumns().filter(column => column.id !== 'slug' && column.id !== 'select').forEach(column => {
                if (column.getIsVisible() && column.id !== 'actions') { // Tidak menginclude kolom actions
                    rowData[column.columnDef.header] = row.getValue(column.id);
                }
            });
            return rowData;
        });

        const worksheet = XLSX.utils.json_to_sheet(filteredAndVisibleRows);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'User Data');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(dataBlob, 'report-' + options.title + '.xlsx');
    };

    const exportToPdf = () => {
        const doc = new jsPDF();
        const tableColumn = [];
        const tableRows = [];

        // Ambil header kolom yang terlihat
        table.getHeaderGroups().map(headerGroup => {
            headerGroup.headers.forEach(header => {
                if (header.id !== 'slug' && header.id !== 'select') {
                    tableColumn.push(header.column.columnDef.header);
                }
            })
        });

        // Ambil data baris yang difilter dan terlihat
        table.getFilteredRowModel().rows.forEach(row => {
            const rowData = [];
            table.getVisibleFlatColumns().forEach(column => {
                if (column.id !== 'slug' && column.id !== 'select') {
                    // Perlakuan khusus untuk kolom 'fullName' agar hanya nama yang diekspor
                    if (column.id === 'fullName') {
                        rowData.push(row.original.fullName);
                    } else {
                        rowData.push(row.getValue(column.id));
                    }
                }
            });
            tableRows.push(rowData);
        });

        autoTable(doc, tableColumn, tableRows, {
            startY: 20,
            headStyles: { fillColor: [75, 85, 99] }, // Warna abu-abu gelap untuk header
            alternateRowStyles: { fillColor: [249, 250, 251] }, // Warna abu-abu muda untuk baris selang-seling
            styles: {
                fontSize: 8,
                cellPadding: 3,
                overflow: 'linebreak',
            },
            margin: { top: 10, left: 10, right: 10, bottom: 10 },
            didDrawPage: function (data) {
                // Footer halaman
                var str = "Page " + doc.internal.getNumberOfPages();
                doc.setFontSize(10);
                doc.text(str, data.settings.margin.left, doc.internal.pageSize.height - 5);
            }
        });

        doc.save('report-' + options.title + '.pdf');
    };

    // --- Akhir Fungsi Ekspor Data ---
    return (
        <div className="bg-white p-6 flex-1 shadow-custom rounded-lg">
            {/* Header Bagian Atas */}
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h1 className="text-2xl/7 h-13 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight mb-0">{options.title}</h1>
                    <p className="text-sm text-gray-500">
                        {options.subtitle}
                    </p>
                </div>
            </div>

            {/* Kontrol di atas Tabel */}
            <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-y border-gray-200 mb-4">
                <div className="flex items-center gap-3">
                    {/* Filter Role */}
                    {filterDataTemplate && filterDataTemplate.length > 0 && (
                        <div className="flex items-center gap-1">
                            <span className="text-gray-700 text-sm font-medium capitalize">{filterDataTemplate[0].column}:</span>
                            <select
                                value={
                                    (table.getColumn(filterDataTemplate[0].column)?.getFilterValue()) ?? ''
                                }
                                onChange={(e) =>
                                    table.getColumn(filterDataTemplate[0].column)?.setFilterValue(e.target.value || undefined)
                                }
                                className="p-1 border border-gray-300 rounded-md text-sm"
                            >
                                <option value="">All</option>
                                {filterDataTemplate[0].data.map((item) => (
                                    <option key={item.value} value={item.value}>
                                        {item.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}



                    {/* <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-sm font-medium">
                        
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add Filter
                    </button> */}
                </div>

                <div className="flex items-center gap-3">
                    {/* Global Search */}
                    <div className="relative">
                        <input
                            type="text"
                            value={globalFilter ?? ''}
                            onChange={e => setGlobalFilter(e.target.value)}
                            placeholder="Search..."
                            className="pl-8 pr-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 w-48"
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    {/* Hide/Show Columns (Dropdown) */}
                    <div className="relative inline-block text-left">
                        <button
                            id="column-visibility-btn"
                            className="px-3 py-1.5 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-sm font-medium"
                            onClick={() => {
                                const dropdown = document.getElementById('column-visibility-dropdown');
                                if (dropdown) dropdown.classList.toggle('hidden');
                            }}
                        >
                            Hide
                        </button>
                        <div
                            id="column-visibility-dropdown"
                            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10 hidden"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="column-visibility-btn"
                        >
                            <div className="py-1" role="none">
                                {table.getAllColumns().filter(column => column.id !== 'slug' && column.id !== 'select' && column.id !== 'id').map(column => (
                                    <label key={column.id} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                                        <input
                                            {...{
                                                type: 'checkbox',
                                                checked: column.getIsVisible(),
                                                onChange: column.getToggleVisibilityHandler(),
                                                className: 'form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out',

                                            }}
                                            className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                        />
                                        <span className="ml-2">{column.id}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>




                    {/* Export (Placeholder) */}
                    <button
                        id="export-btn"
                        className="px-3 py-1.5 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-sm font-medium"
                        onClick={() => {
                            const dropdown = document.getElementById('export-dropdown');
                            if (dropdown) dropdown.classList.toggle('hidden');
                        }}
                    >
                        Export
                    </button>
                    <div
                        id="export-dropdown"
                        className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10 hidden"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="export-btn"
                    >
                        <div className="py-1" role="none">
                            <button
                                onClick={() => { exportToExcel(); document.getElementById('export-dropdown')?.classList.add('hidden'); }}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                role="menuitem"
                            >
                                Export to Excel
                            </button>
                            <button
                                onClick={() => { exportToPdf(); document.getElementById('export-dropdown')?.classList.add('hidden'); }}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                role="menuitem"
                            >
                                Export to PDF
                            </button>
                        </div>
                    </div>
                    {
                        options.canAdd &&
                        (<button className="px-4 py-1.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm font-medium flex items-center gap-1" onClick={options.createButtonChange}>
                            {/* Icon for Add User */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            {options.addButtonText}
                        </button>)
                    }
                </div>
            </div>


            {/* Tabel */}
            <div className="overflow-x-auto max-w-full responsive">
                <table className="min-w-full divide-y divide-gray-200 text-xs" id={options.title.replace(/\s+/g, '').toLowerCase() + 'Table'}>
                    <thead className="bg-gray-50">
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th
                                        key={header.id}
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-nowrap"
                                        onClick={header.column.getCanSort() ? header.column.getToggleSortingHandler() : undefined}
                                    >
                                        <div className="flex items-center">
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                            {header.column.getCanSort() && (
                                                <span className="ml-2">
                                                    {header.column.getIsSorted() === 'asc' ? (
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                                                        </svg>
                                                    ) : header.column.getIsSorted() === 'desc' ? (
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                        </svg>
                                                    ) : (
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.293 9.707a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                                                        </svg>
                                                    )}
                                                </span>
                                            )}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {table.getRowModel().rows.length > 0 ? (
                            table.getRowModel().rows.map(row => (
                                <tr key={row.id}>
                                    {row.getVisibleCells().map(cell => (
                                        <td key={cell.id} className="px-6 py-4  text-xs text-gray-900">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length} className="px-6 py-4  text-center text-sm text-gray-500">
                                    Tidak ada data yang ditemukan.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

            </div>

            {/* Pagination dan Info Total Data */}
            <div className="flex flex-col sm:flex-row items-center justify-between mt-4">
                {/* Rows per page dan Info Total Data */}
                <div className="flex items-center gap-4 mb-3 sm:mb-0">
                    <div className="flex items-center gap-1">
                        <span className="text-gray-700 text-sm">Rows per page:</span>
                        <select
                            value={table.getState().pagination.pageSize}
                            onChange={e => {
                                table.setPageSize(Number(e.target.value));
                            }}
                            className="p-1 border border-gray-300 rounded-md text-sm"
                        >
                            {[5, 10, 20, 30, 40, 50].map(pageSizeOption => (
                                <option key={pageSizeOption} value={pageSizeOption}>
                                    {pageSizeOption}
                                </option>
                            ))}
                        </select>
                    </div>
                    <span className="text-gray-700 text-sm">
                        {firstRowIndex}-{lastRowIndex} of {totalRows} rows
                    </span>
                </div>

                {/* Tombol Paginasi */}
                <div className="flex items-center gap-1">
                    <button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="px-3 py-1 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 text-sm"
                    >
                        {'<'}
                    </button>

                    {/* Menampilkan angka halaman - disederhanakan, bisa lebih kompleks untuk banyak halaman */}
                    {Array.from({ length: table.getPageCount() }, (_, i) => i).map(
                        (page) => (
                            <button
                                key={page}
                                onClick={() => table.setPageIndex(page)}
                                className={`px-3 py-1 border border-gray-300 rounded-md text-sm ${table.getState().pagination.pageIndex === page
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                {page + 1}
                            </button>
                        )
                    )}

                    <button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="px-3 py-1 border border-gray-300 rounded-md bg-white dark:bg-gray-800 text-gray-700 hover:bg-gray-100 disabled:opacity-50 text-sm"
                    >
                        {'>'}
                    </button>
                </div>
            </div>
        </div>

    );
}
