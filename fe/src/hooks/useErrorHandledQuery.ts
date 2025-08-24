import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { notification } from 'antd';

// Helper function to show error notifications
export const showErrorNotification = (message: string, error: Error) => {
  notification.error({
    message: message,
    description: error.message || 'An unexpected error occurred',
    placement: 'topRight',
  });
};

// Type for API response that could be data or Error
type ApiResponse<T> = T | Error;

// Generic useErrorHandledQuery hook
export function useErrorHandledQuery<TData>(
  queryKey: unknown[],
  queryFn: () => Promise<ApiResponse<TData>>,
  options?: Omit<UseQueryOptions<TData, Error, TData>, 'queryKey' | 'queryFn'> & {
    errorMessage?: string;
  }
) {
  const { errorMessage = 'Error loading data', ...queryOptions } = options || {};
  
  return useQuery<TData, Error>({
    queryKey,
    queryFn: async () => {
      try {
        const result = await queryFn();
        
        // Check if result is an Error instance
        if (result instanceof Error) {
          throw result;
        }
        
        return result;
      } catch (error) {
        // Show error notification
        showErrorNotification(errorMessage, error as Error);
        throw error;
      }
    },
    ...queryOptions,
  });
}
