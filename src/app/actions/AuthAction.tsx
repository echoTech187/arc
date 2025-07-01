"use server";
import { cookies } from "next/headers";
import { v7 as uuid } from 'uuid';

export async function signIn(email: string, password: string) {
    const values = { email, password };
    const api = process.env.NEXT_PUBLIC_API_URL;

    const response = await fetch(api + '/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
    });

    const result = await response.json();
    return result;
}
export async function signOut() {

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    await removeCookies('token');
    await removeCookies('user');
    return true
}
export async function signUp(email: string, password: string, username: string) {
    const values = { email, password, username };
    const api = process.env.NEXT_PUBLIC_API_URL;

    const user = email.split('@')[0];
    const postData = {
        slug: uuid,
        username: user,
        name: values.username,
        email: values.email,
        password: values.password
    }
    const response = await fetch(api + '/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
    });

    const result = await response.json();
    return result;
}

export async function checkAuth() {
    const token = (await cookies()).get('token')?.value;

    if (token) {
        return true;
    }
    return false;
}

export async function getToken() {
    const token = (await cookies()).get('token')?.value;
    return token;
}

export async function getUser() {
    const user = (await cookies()).get('user')?.value;

    return user;
}

export async function setCookies(data: any) {
    (await cookies()).set('token', data.token);
    (await cookies()).set('user', JSON.stringify(data.data));
}
export async function removeCookies(item: string) {
    (await cookies()).delete(item);
}

