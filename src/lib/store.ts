import { writable } from 'svelte/store';

interface Project {
    token_id: string,
    block_limit: number,
    minimum_amount: number,
    total_amount: number,
    exchange_rate: number, 
    link: string
}

export const address = writable<string|null>(null);
export const network = writable<string|null>(null);
export const connected = writable<boolean>(false);
export const ergBalance = writable<string|null>(null);
export const project_detail = writable<Project|null>(null);