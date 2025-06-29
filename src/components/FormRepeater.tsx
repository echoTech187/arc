import { PlusCircleIcon } from '@heroicons/react/20/solid';
import TrashIcon from '@heroicons/react/20/solid/TrashIcon';
import { ChangeEvent, useEffect, useState } from 'react';

const FormRepeater = ({ defaultValue, isShared, hoursWorked }: any) => {
    const [fields, setFields] = useState([{ value: { id: '', user_id: '', hours_worked: '0', custom_hourly_rate: '0' } }]);
    const [employees, setEmployees] = useState([]);
    const [contributedHours, setContributedHours] = useState<number>(0);
    const [errorMessage, setErrorMessage] = useState('');
    useEffect(() => {
        function getJobAssignment() {
            const job_assignment = [];
            for (let i = 0; i < defaultValue.length; i++) {
                const id = defaultValue[i]['id'];
                const user_id = defaultValue[i]['user_id'];
                const hours_worked = defaultValue[i]['hours_worked'];
                const custom_hourly_rate = '0';
                job_assignment.push({
                    value: {
                        id,
                        user_id,
                        hours_worked,
                        custom_hourly_rate
                    }
                });

            }
            setFields(job_assignment);
            return job_assignment
        }
        async function getUserData() {
            const token = localStorage.getItem('token');
            if (!token) {
                return;
            }
            const api = process.env.NEXT_PUBLIC_API_URL;
            const response = await fetch(api + '/user', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '* ',
                    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE'
                },
                method: 'GET',
            });
            const data = await response.json();

            setEmployees(data['data']);
        }
        getUserData();
        getJobAssignment()
    }, []);
    const addField = () => {
        setFields([...fields, { value: { id: '', user_id: '', hours_worked: '0', custom_hourly_rate: '0' } }]);
    };

    const removeField = () => {
        if (fields.length > 1) {
            setFields(fields.slice(0, -1));
        }
    };
    function changeHoursWorked(e: ChangeEvent<HTMLInputElement>, index: number): void {
        const newFields = [...fields];
        newFields[index].value.hours_worked = e.target.value;
        setFields(newFields);
        const total = newFields.reduce((acc, field) => acc + parseInt(field.value.hours_worked), 0);
        if (total > parseInt(hoursWorked)) {
            setErrorMessage('Total kontribusi jam kerja melebihi jam kerja yang diberikan');
            return;
        } else {
            setErrorMessage('');
            setContributedHours(total);
        }


    }
    return (
        <div>
            {errorMessage !== '' ? <p className='text-red-600'>{errorMessage}</p> : null}
            {(defaultValue.length > 0) ?
                fields.map((field, index) => (
                    <div key={index}>
                        <div className="card block w-full p-6 mb-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                            <div className="card-title flex items-center justify-between">
                                <p className="text-md font-medium text-gray-400 dark:text-white mb-4">{!isShared ? 'Pegawai yang Terlibat' : 'Pegawai yang Terlibat & Kontribusi Jam Kerja'} </p>
                                {index > 0 ? <TrashIcon aria-hidden="true" className="mr-1.5 -ml-0.5 size-5 text-red-600 cursor-pointer" onClick={removeField} /> : null}
                            </div>
                            <div className="card-body">
                                <div className="flex flex-wrap -mx-3 mb-6">
                                    <div className={`w-full px-3 mb-6 md:mb-0 ${isShared ? ' md:w-1/2 ' : ''}`}>
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                            htmlFor="grid-first-name">
                                            Employee
                                        </label>
                                        <input type="hidden" name="job_assignment_id" value={defaultValue[index]?.id ?? field.value.id} />
                                        <select
                                            id={`employee${index + 1}`}
                                            name="employee"
                                            aria-placeholder='Select employee'
                                            value={defaultValue[index]?.user_id ?? field.value.user_id}
                                            onChange={(e) => {
                                                const newFields = [...fields];
                                                newFields[index].value.user_id = e.target.value;
                                                setFields(newFields);
                                            }}
                                            className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'>
                                            <option value=''>Select employee</option>
                                            {employees.map((employee, w) => (

                                                <option key={w} value={employee['id']}>{employee['name']}</option>
                                            ))}
                                        </select>
                                    </div>
                                    {isShared ?
                                        <div className={`w-full md:w-1/2 px-3${!isShared ? ' hidden' : ''}`} >
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                htmlFor="grid-last-name">
                                                Jam Kontibusi*
                                            </label>
                                            <input required
                                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                id={`hours_worked${index + 1}`}
                                                name="hours_worked"
                                                type="number"
                                                min={0}
                                                minLength={1}
                                                placeholder="Contoh : 8" defaultValue={defaultValue[index]?.hours_worked ?? field.value.hours_worked} />
                                        </div> :
                                        <div className={`w-full md:w-1/2 px-3${!isShared ? ' hidden' : ''}`} >
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                htmlFor="grid-last-name">
                                                Jam Kontibusi*
                                            </label>
                                            <input
                                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                id={`hours_worked${index + 1}`}
                                                name="hours_worked"
                                                type="number"
                                                min={0}
                                                minLength={1}
                                                placeholder="Contoh : 8" defaultValue={defaultValue[index]?.hours_worked ?? defaultValue[index]?.hours_worked} />
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                )) :

                <div key={0}>
                    <div className="card block w-full p-6 mb-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                        <div className="card-title flex items-center justify-between">
                            <p className="text-md font-medium text-gray-400 dark:text-white mb-4">{!isShared ? 'Pegawai yang Terlibat' : 'Pegawai yang Terlibat & Kontribusi Jam Kerja'} </p>
                            {0 > 0 ? <TrashIcon aria-hidden="true" className="mr-1.5 -ml-0.5 size-5 text-red-600 cursor-pointer" onClick={removeField} /> : null}
                        </div>
                        <div className="card-body">
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className={`w-full px-3 mb-6 md:mb-0 ${isShared ? ' md:w-1/2 ' : ''}`}>

                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="grid-first-name">
                                        Pegawai*
                                    </label>
                                    <select
                                        id={`employee${0 + 1}`}
                                        name="employee"
                                        required
                                        aria-placeholder='Select employee'
                                        className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'>
                                        <option value=''>Pilih Pegawai</option>
                                        {employees.map((employee, w) => (

                                            <option key={w} value={employee['id']}>{employee['name']}</option>
                                        ))}
                                    </select>
                                </div>
                                {isShared ?
                                    <div className={`w-full md:w-1/2 px-3${!isShared ? ' hidden' : ''}`} >
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                            htmlFor="grid-last-name">
                                            Jam Kontribusi*
                                        </label>
                                        <input required
                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            id={`hours_worked${0 + 1}`}
                                            name="hours_worked"
                                            onChange={(e) => changeHoursWorked(e, 0)}
                                            type="number"
                                            min={0}
                                            minLength={1}
                                            placeholder="Contoh : 8" />
                                    </div> :
                                    <div className={`w-full md:w-1/2 px-3${!isShared ? ' hidden' : ''}`} >
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                            htmlFor="grid-last-name">
                                            Jam Kontribusi*
                                        </label>
                                        <input required
                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            id={`hours_worked${0 + 1}`}
                                            name="hours_worked"
                                            type="number"
                                            min={0}
                                            minLength={1}
                                            placeholder="Contoh : 8" defaultValue={hoursWorked} />
                                    </div>
                                }

                            </div>
                        </div>
                    </div>
                </div>

            }
            {!isShared ? null :
                <div className={`items-center justify-center flex w-full${contributedHours >= parseInt(hoursWorked) && parseInt(hoursWorked) !== 0 ? ' hidden' : ''}`}>
                    <button type='button' onClick={addField} className="flex items-center uppercase cursor-pointer tracking-wide text-gray-700 text-xs font-bold mb-6 max-w-fit bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 px-4 py-2">
                        <PlusCircleIcon aria-hidden="true" className="mr-1.5 -ml-0.5 size-8 text-indigo-600" /><span>Add Employee Assignment</span>
                    </button>
                </div>
            }
        </div>
    );
};

export default FormRepeater;