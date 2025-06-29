"use server";
import { getToken } from "./AuthAction";

export async function getEmployees() {
    const api = process.env.NEXT_PUBLIC_API_URL;
    const token = await getToken();
    const response = await fetch(api + '/employee', {
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

export async function getEmployee(id: string) {
    const api = process.env.NEXT_PUBLIC_API_URL;
    const token = await getToken();
    const response = await fetch(api + '/employee/' + id, {
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

export async function createEmployee(data: FormData) {
    const api = process.env.NEXT_PUBLIC_API_URL;
    const token = await getToken();


    const postData = {
        name: data.get('name'),
        email: data.get('email'),
        phone: data.get('phone'),
        password: data.get('password')
    };

    const response = await fetch(api + '/employee', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '* ',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        },
        body: JSON.stringify(postData)
    });
    const result = await response.json();
    return result;
}

export async function updateEmployee(id: string, data: any) {
    const api = process.env.NEXT_PUBLIC_API_URL;
    const token = await getToken();
    const postData = {
        name: data.get('name'),
        email: data.get('email'),
        phone: data.get('phone'),
        password: data.get('password')
    };
    const response = await fetch(api + '/employee/' + id, {
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

export async function deleteEmployee(id: string) {
    const api = process.env.NEXT_PUBLIC_API_URL;
    const token = await getToken();
    const response = await fetch(api + '/employee/' + id, {
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
        const res = await fetch(api + '/employee/' + slug, {
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