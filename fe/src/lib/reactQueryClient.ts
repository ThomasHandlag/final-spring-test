import { QueryClient } from '@tanstack/react-query';

// Create a client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // Only retry failed queries once by default
      refetchOnWindowFocus: true,
      staleTime: 1 * 60 * 1000, // 5 minutes
    },
    mutations: {
      // Global onError handler for all mutations
      onError: (error: Error) => {
        console.error('Mutation error:', error);
        // You can add global error handling here
        // For example, display a toast notification
      },
    },
  },
});
