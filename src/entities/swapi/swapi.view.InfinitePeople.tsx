import InfiniteScroll from 'react-infinite-scroller';
import { Swapi, type SwapiInterfaces, Person } from '@entities/swapi';

/**
 * A component that implements infinite scrolling to load and display a list of
 * people from the SWAPI.
 *
 * The `InfinitePeople` component fetches people data from the SWAPI using the
 * `SWAPI_ENTITY.viewModel().List` method and displays it using the `Person`
 * component. It uses the `react-infinite-scroller` library to implement infinite
 * scrolling behavior, allowing more people to be loaded as the user scrolls down
 * the page.
 *
 * @returns A React functional component that renders a list of people with
 * infinite scrolling support.
 *
 * @example
 * ```tsx
 * // MyComponent.tsx
 * import { InfinitePeople } from './path/to/InfinitePeople';
 *
 * const MyComponent = () => {
 *   return (
 *     <div>
 *       <h1>Star Wars Characters</h1>
 *       <InfinitePeople />
 *     </div>
 *   );
 * };
 * ```
 */
export const InfinitePeople = () => {
  const viewModel = Swapi.ViewModel();
  const { data, isError, error, isLoading, isFetching, fetchNextPage, hasNextPage } = viewModel.List;

  return (
    <div>
      <h1>Infinite Loading</h1>

      {(isLoading || isFetching) && <p>Loading...</p>}

      {isError && <span>Error: {error.message}</span>}

      {data != null && !isLoading && !isError && (
        <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
          {data.pages.map((pageData: SwapiInterfaces.APIResponse<SwapiInterfaces.Person>) =>
            pageData.results.map((person: SwapiInterfaces.Person) => (
              <Person key={person.name} name={person.name} eyeColor={person.eyeColor} hairColor={person.hairColor} />
            )),
          )}
        </InfiniteScroll>
      )}
    </div>
  );
};
