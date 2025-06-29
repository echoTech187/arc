'use client'
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function formatCurrency(number: number) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
    }).format(number);
}

export function formatNumber(number: number) {
    return new Intl.NumberFormat("id-ID").format(number);
}

export function formatDateTime(date: Date) {
    return new Intl.DateTimeFormat("id-ID", {
        dateStyle: "medium",
        timeStyle: "short",
    }).format(date);
}

export function formatDate(date: Date) {
    return new Intl.DateTimeFormat("id-ID", {
        dateStyle: "medium",
    }).format(date);
}

export function formatTime(date: Date) {
    return new Intl.DateTimeFormat("id-ID", {
        timeStyle: "short",
    }).format(date);
}

export function convertPhoneNumber(phoneNumber: string) {
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        const intlCode = match[1] ? '+1 ' : '';
        return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
    return phoneNumber;
}

export const Mode = {
    EDIT: 'edit',
    CREATE: 'create'
}