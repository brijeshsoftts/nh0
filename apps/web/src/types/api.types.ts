export interface Pagination {
  page: number;
  limit: number;
  total: number;
}

export interface ApiListResponse<T> {
  data: T[];
  message?: string;
  meta: Pagination;
}

export interface ListResponse<T> {
  data: T;
  meta: Pagination;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export type ApiMessageResponse = { message: string };

export type ListParams = {
  page?: number;
  limit?: number;
  search?: string;
};
