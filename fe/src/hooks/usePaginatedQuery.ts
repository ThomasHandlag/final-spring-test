import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { showErrorNotification } from "./useErrorHandledQuery";

// Interface for paginated response
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    currentPage: number;
    pageSize: number;
    totalPages: number;
  };
}

// Generic usePaginatedQuery hook
export function usePaginatedQuery<TData>(
  queryKey: unknown[],
  queryFn: (
    page: number,
    pageSize: number
  ) => Promise<PaginatedResponse<TData> | Error>,
  options?: Omit<
    UseQueryOptions<PaginatedResponse<TData>, Error, PaginatedResponse<TData>>,
    "queryKey" | "queryFn"
  > & {
    errorMessage?: string;
    initialPage?: number;
    initialPageSize?: number;
  }
) {
  const {
    errorMessage = "Error loading data",
    initialPage = 1,
    initialPageSize = 10,
    ...queryOptions
  } = options || {};

  return useQuery<PaginatedResponse<TData>, Error>({
    queryKey: [...queryKey, initialPage, initialPageSize],
    queryFn: async () => {
      try {
        // The page and pageSize are included in the options when the hook is called
        const result = await queryFn(initialPage, initialPageSize);

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
