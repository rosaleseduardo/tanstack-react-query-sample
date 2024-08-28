import { type QueryKey, useQueryClient as TanstackQueryClient } from '@tanstack/react-query';

/**
 * A custom React Query hook providing utility functions to interact with the
 * client instance.
 *
 * @remarks
 * This hook wraps around `useQueryClient` from `@tanstack/react-query` to provide
 * additional functionality.
 *
 * @returns An object containing the utility functions `prefetch` and `invalidate`.
 *
 * @example
 * ```tsx
 * import { useQueryClientUtilities } from './path/to/useQueryClientUtilities';
 *
 * const MyComponent = () => {
 *   const queryClientUtils = useQueryClientUtilities();
 *
 *   // Prefetch data for a specific key
 *   queryClientUtils.prefetch(['myData'], fetchData);
 *
 *   // Invalidate query for a specific key
 *   queryClientUtils.invalidate(['myData']);
 *
 *   // Rest of the component code
 * };
 * ```
 */
export const useQueryClient = () => {
  const client = TanstackQueryClient();

  /**
   * Prefetches data for a specific query key using the provided method.
   *
   * @param key - The query key associated with the data to be prefetched.
   *
   * @param method - The function to fetch the data. This should return a Promise.
   *
   * @returns A Promise representing the prefetch operation.
   */
  const prefetch = async (key: QueryKey, method: () => unknown) => {
    await client.prefetchQuery(key, method);
  };

  /**
   * Invalidates the query for a specific key.
   *
   * @param key - The query key associated with the data to be invalidated.
   *
   * By calling `invalidateQueries` effects on `onSuccess` handler:
   *    - Marks query as `stale`.
   *    - Triggers re-fetch if `query` currently being rendered.
   *
   * {@link https://tanstack.com/query/v4/docs/react/guides/query-invalidation}
   */
  const invalidate = async (key: QueryKey) => {
    await client.invalidateQueries({ queryKey: key, exact: true });
  };

  return { prefetch, invalidate };
};
