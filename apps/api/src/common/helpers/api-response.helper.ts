import {
  ApiListResponse,
  ApiMessageResponse,
  ApiResponse,
} from '../../types/api.types';

export const apiListResponse = <T>(
  res: ApiListResponse<T>,
): ApiListResponse<T> => {
  return res;
};

export const apiResponse = <T>(res: ApiResponse<T>): ApiResponse<T> => {
  return res;
};

export const apiMessageResponse = (message: string): ApiMessageResponse => ({
  message,
});
