import { type QueryFunctionContext } from '@tanstack/react-query';

import { type SwapiInterfaces } from './index';

/**
 * A custom hook that provides a function to fetch data from the SWAPI
 * (Star Wars API).
 *
 * The `useApiClient` hook contains a `list` function, which can be used to fetch
 * data from the SWAPI. The `list` function accepts an optional `context` parameter
 * of type `Partial<QueryFunctionContext>`, which can be used to pass additional
 * query context when calling the function.
 *
 * @returns An object containing the `list` function to interact with the SWAPI.
 *
 * @example
 * ```tsx
 * import { useApiClient } from './path/to/useApiClient';
 *
 * const MyComponent = () => {
 *   const apiClient = useApiClient();
 *
 *   const fetchData = async () => {
 *     // Fetch data from the SWAPI
 *     const data = await apiClient.list({ pageParam: 'https://swapi.dev/api/people/1/' });
 *     // Handle the fetched data
 *   };
 *
 *   // Other component logic and rendering
 * };
 * ```
 */
export const useApiClient = () => {
  /**
   * Fetches data from the SWAPI (Star Wars API) based on the specified context.
   *
   * @param context - An optional object of type `Partial<QueryFunctionContext>`
   * that can be used to pass additional query context when calling the function.
   * The context may include parameters like `pageParam` to determine the endpoint
   * to fetch.
   *
   * @returns A promise that resolves to an object of type
   * `SwapiInterfaces.APIResponse<SwapiInterfaces.Person>`, representing the
   * response from the SWAPI.
   */
  const list = async (
    context?: Partial<QueryFunctionContext>,
  ): Promise<SwapiInterfaces.APIResponse<SwapiInterfaces.Person>> => {
    const response = await fetch(context?.pageParam);

    return await response.json();
  };

  return { list };
};
