export interface ApiListResponse<T> {
    data: T[];
    message?: string;
    meta: {
        page: number;
        limit: number;
        total: number;
    };
}
export interface ListResponse<T> {
    data: T;
    meta: {
        page: number;
        limit: number;
        total: number;
    };
}
export interface ApiResponse<T> {
    data: T;
    message?: string;
}
export type ApiMessageResponse = {
    message: string;
};
export type KpiItem = {
    id: string;
    icon: string;
    title: string;
    value: string | number;
    description: string;
    link?: string;
};
