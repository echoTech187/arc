"use server";
import { getToken } from "./AuthAction";

export async function getJobs() {
    const api = process.env.NEXT_PUBLIC_API_URL;
    const token = await getToken();
    const response = await fetch(api + '/job?limit=5&skip=0', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }
    });
    const result = await response.json();

    return result;
}

export async function getJob(id: string) {
    const api = process.env.NEXT_PUBLIC_API_URL;
    const token = await getToken();
    const response = await fetch(api + '/jobs/' + id, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }
    });
    const result = await response.json();
    return result;
}

export async function createJob(data: FormData) {
    const api = process.env.NEXT_PUBLIC_API_URL;
    const token = await getToken();
    const isShared = data.get('isShared') === '1' ? true : false;
    const hoursRate = data.get('hourly_rate') as string;
    const employees = data.getAll('employee');
    const hours_worked = data.getAll('hours_worked');
    const additionalCost = data.get('additional_cost') === '' ? '0' : data.get('additional_cost') as string;
    let job_assignment = [];
    for (let i = 0; i < employees.length; i++) {
        const user_id = employees[i];
        let hoursWorked = isShared ? hours_worked[i] as string : data.get('total_hours') as string;

        const calculatedRemuneration = (parseInt(hoursWorked) * parseInt(hoursRate));
        job_assignment.push({
            user_id,
            hoursWorked,
            calculatedRemuneration
        });

    }

    const postData = {
        userId: data.get('userId'),
        description: data.get('description'),
        totalHours: data.get('total_hours'),
        additionalCost: additionalCost,
        hourlyRate: hoursRate,
        isShared: isShared,
        job_assignment: job_assignment,
        jobDate: data.get('process_date'),
    };
    const response = await fetch(api + '/job', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '* ',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        },
        body: JSON.stringify(postData)
    });
    const result = await response.json();
    console.log(result);
    return result;
}

export async function updateJob(id: string, data: any) {
    const api = process.env.NEXT_PUBLIC_API_URL;
    const token = await getToken();
    const isShared = data.get('isShared') === '1' ? true : false;
    const hoursRate = data.get('hourly_rate') as string;
    const employees = data.getAll('employee');
    const hours_worked = data.getAll('hours_worked');
    const additionalCost = data.get('additional_cost') === '' ? '0' : data.get('additional_cost') as string;
    let job_assignment = [];
    for (let i = 0; i < employees.length; i++) {
        const user_id = employees[i];
        let hoursWorked = isShared ? hours_worked[i] as string : data.get('total_hours') as string;

        const calculatedRemuneration = (parseInt(hoursWorked) * parseInt(hoursRate));
        job_assignment.push({
            user_id,
            hoursWorked,
            calculatedRemuneration
        });

    }

    const postData = {
        userId: data.get('userId'),
        description: data.get('description'),
        totalHours: data.get('total_hours'),
        additionalCost: additionalCost,
        hourlyRate: hoursRate,
        isShared: isShared,
        status: data.get('status'),
        job_assignment: job_assignment,
        jobDate: data.get('process_date'),
    };
    const response = await fetch(api + '/job/' + id, {
        method: 'PATCH',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        },
        body: JSON.stringify(postData)
    });
    const result = await response.json();
    return result;
}

export async function deleteJob(id: string) {
    const api = process.env.NEXT_PUBLIC_API_URL;
    const token = await getToken();
    const response = await fetch(api + '/job/' + id, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }
    });
    const result = await response.json();
    return result;
}

export const detailJob = async (slug: String) => {
    try {
        const api = process.env.NEXT_PUBLIC_API_URL;
        const token = await getToken();
        const res = await fetch(api + '/job/' + slug, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Access-Control-Allow-Origin': '* | http://localhost:3000',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE'
            }
        });
        const result = await res.json();
        return result;
    } catch (e) {
        return {
            responseCode: 500,
            responseMessage: (e as Error).message,
            responseStatus: false
        }
    }
}