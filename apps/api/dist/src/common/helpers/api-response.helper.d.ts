import { ApiListResponse, ApiMessageResponse, ApiResponse } from '../../types/api.types';
export declare const apiListResponse: <T>(res: ApiListResponse<T>) => ApiListResponse<T>;
export declare const apiResponse: <T>(res: ApiResponse<T>) => ApiResponse<T>;
export declare const apiMessageResponse: (message: string) => ApiMessageResponse;
