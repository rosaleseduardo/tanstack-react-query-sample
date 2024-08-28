import { QueryClient } from '@tanstack/react-query';

/**
 * A custom hook that returns a new instance of `QueryClient`.
 *
 * The `QueryClient` is the core object used to interact with the React Query library.
 * It manages the caching, fetching, and invalidation of queries.
 *
 * @returns A new instance of `QueryClient` that can be used to manage queries and cache data.
 *
 * @example
 * ```tsx
 * import { useQueryClient } from './path/to/useQueryClient';
 *
 * const MyComponent = () => {
 *   const client = useQueryClient();
 *
 *   // Use the client to fetch and manage queries
 *   // ...
 * };
 * ```
 * @see [OfficialDocumentation](https://tanstack.com/query/v4/docs/react/reference/QueryClient)
 */
export const useQueryClient = () => {
  const client = new QueryClient();

  return client;
};
