import { useInfiniteQuery } from '@tanstack/react-query';
import { Swapi } from '@entities/swapi';

const BASE_URL = 'https://swapi.dev/api/people/';

/**
 * Custom hook that provides a view model function for querying SWAPI people data.
 *
 * @returns An object containing the view model function for listing people from
 * SWAPI.
 *
 * @remarks
 * The `useViewModel` hook is designed to work with `@tanstack/react-query` and a
 * provided API client. It returns a view model function for fetching paginated
 * data of SWAPI people.
 */
export const useViewModel = () => {
  const apiClient = Swapi.ApiClient();

  /**
   * Fetches a paginated list of people from SWAPI.
   *
   * @param pageParam - The URL or endpoint to fetch the people data from.
   * Defaults to the base URL.
   *
   * @returns An object representing the query result containing paginated data
   * of SWAPI people.
   *
   * @remarks
   * The `List` function uses `useInfiniteQuery` from `@tanstack/react-query` to
   * perform the query.
   *
   * The query key is ['sw-people'], and it is used as a dependency array by
   * `@tanstack/react-query`.
   *
   * The `pageParam` parameter specifies the URL or endpoint to fetch the people
   * data.
   *
   * The `getNextPageParam` option is provided to extract the 'next' page URL
   * from the last page of the result.
   *
   * The `List` function returns an `InfiniteQueryResult` object containing the
   * paginated data and query status.
   */
  const List = useInfiniteQuery(
    ['sw-people'],
    async ({ pageParam = BASE_URL }) => await apiClient.list({ pageParam }),
    {
      getNextPageParam: (lastPage) => lastPage.next ?? undefined,
    },
  );

  return { List };
};
