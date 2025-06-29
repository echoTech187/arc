import { getToken } from "./AuthAction";

export async function getStatusCount() {
    try {
        const api = process.env.NEXT_PUBLIC_API_URL;
        const token = await getToken();
        const res = await fetch(api + '/dashboard/status', {
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
export async function getPerformance() {
    try {
        const api = process.env.NEXT_PUBLIC_API_URL;
        const token = await getToken();
        const res = await fetch(api + '/dashboard/performance', {
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

export async function getChart(type: string) {
    try {
        const api = process.env.NEXT_PUBLIC_API_URL;
        const token = await getToken();
        const res = await fetch(api + '/dashboard/chart/' + type, {
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