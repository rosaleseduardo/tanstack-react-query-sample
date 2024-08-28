import { useQuery, useMutation } from '@tanstack/react-query';
import { MAX_PAGE_INDEX, type PostInterfaces, Post } from '@entities/posts';
import { Core } from '@core';

/**
 * Custom hook that provides view model functions for querying and mutating data
 * related to posts and comments.
 *
 * @returns An object containing view model functions.
 *
 * @remarks
 * The `useViewModel` hook is designed to work with `@tanstack/react-query` and
 * a provided API client. It returns view model functions for fetching and
 * manipulating data for posts and comments.
 *
 * The `useQueryClient` hook returns the current `QueryClient` instance.
 * {@link https://tanstack.com/query/v4/docs/react/reference/useQueryClient}
 */
export const useViewModel = () => {
  const queryClientUtils = Core.Util.useQueryClient();
  const apiClient = Post.ApiClient();

  /**
   * Fetches a paginated list of posts based on the given `pageIndex`.
   *
   * @param pageIndex - The index of the page to fetch posts from.
   *
   * @returns An object representing the query result containing an array of
   * `Post` objects.
   *
   * @remarks
   * The `pageIndex` parameter is used as a query key and treated as a
   * dependency array by `@tanstack/react-query`. When `pageIndex` changes, a new
   * query is created to fetch data for the corresponding page.
   *
   * The `keepPreviousData` option is set to true to ensure that past data is
   * cached, allowing users to navigate back to previous pages.
   */
  const ListPosts = (pageIndex: number) =>
    useQuery<PostInterfaces.Post[]>(
      ['posts', pageIndex],
      async () => await apiClient.listPosts(pageIndex !== MAX_PAGE_INDEX ? pageIndex + 1 : MAX_PAGE_INDEX),
      /** Only useful when the background does not change */
      { keepPreviousData: true },
    );

  /**
   * Fetches comments for a specific post identified by the given `postId`.
   *
   * @param postId - The ID of the post for which to fetch comments.
   *
   * @returns An object representing the query result containing an array of
   * `Comment` objects.
   *
   * @remarks
   * The `postId` parameter is used as a query key and treated as a dependency
   * array by `@tanstack/react-query`. When `postId` changes, a new query is
   * created to fetch comments for the corresponding post.
   */
  const ListComments = (postId: number) =>
    useQuery<PostInterfaces.Comment[]>(['comments', postId], async () => await apiClient.listComments(postId));

  /**
   * Mutates data to delete a post with the specified `postId`.
   *
   * @param postId - The ID of the post to be deleted.
   *
   * @returns A function to be called to trigger the post deletion mutation.
   *
   * @remarks
   * The mutation function is created using `useMutation` from
   * `@tanstack/react-query` will contain a `mutate` method that can invoked in
   * order to trigger the function that will update the data on the service.
   */
  const DeletePost = useMutation(apiClient.remove, {
    onSuccess: async () => {
      await queryClientUtils.invalidate(['posts']);
    },
  });

  /**
   * Mutates data to update a post with the specified `postId`.
   *
   * @param postId - The ID of the post to be updated.
   *
   * @returns A function to be called to trigger the post deletion mutation.
   *
   * @remarks
   * The mutation function is created using `useMutation` from
   * `@tanstack/react-query` will contain a `mutate` method that can invoked in
   * order to trigger the function that will update the data on the service.
   */
  const UpdatePost = useMutation(apiClient.update, {
    onSuccess: async () => {
      await queryClientUtils.invalidate(['posts']);
    },
  });

  /**
   * Prefetches data for the next page of posts based on the current `currentPage`.
   *
   * @param currentPage - The current page index.
   *
   * @returns A Promise representing the prefetch operation.
   */
  const prefetchNextPage = async (currentPage: number) => {
    await queryClientUtils.prefetch(['posts', currentPage + 1], async () => await apiClient.listPosts(currentPage + 1));
  };

  return { ListPosts, ListComments, DeletePost, UpdatePost, prefetchNextPage };
};
