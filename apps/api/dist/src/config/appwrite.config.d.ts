import { Client } from 'node-appwrite';
export declare const client: Client;
export declare const uploadFile: (file: any) => Promise<{
    url: string;
    name: string;
}>;
export declare const getFileUrl: (fileId: string) => string;
