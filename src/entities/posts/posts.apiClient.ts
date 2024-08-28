import { type PostInterfaces } from './index';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

/**
 * A custom hook that provides functions to interact with the JSONPlaceholder API.
 *
 * The `useApiClient` hook contains methods to fetch data from the JSONPlaceholder API
 * and perform various operations related to posts and comments. The API endpoints used are:
 * - `/posts` for fetching posts
 * - `/comments` for fetching comments
 *
 * @returns An object containing functions to interact with the JSONPlaceholder API.
 *
 * @example
 * ```tsx
 * // MyComponent.tsx
 * import { useApiClient } from './path/to/useApiClient';
 *
 * const MyComponent = () => {
 *   const apiClient = useApiClient();
 *
 *   const fetchPosts = async () => {
 *     const posts = await apiClient.listPosts(1);
 *     // Handle the fetched posts
 *   };
 *
 *   // Other component logic and rendering
 * };
 * ```
 */
export const useApiClient = () => {
  /**
   * Fetches a list of posts from the JSONPlaceholder API.
   *
   * @param pageIndex - The page index to fetch. Each page contains up to 10 posts.
   *
   * @returns A promise that resolves to an array of `PostInterfaces.Post`.
   */
  const listPosts = async (pageIndex: number): Promise<PostInterfaces.Post[]> => {
    const response = await fetch(`${BASE_URL}/posts?_limit=10&_page=${pageIndex}`);

    return await response.json();
  };

  /**
   * Fetches a list of comments for a specific post from the JSONPlaceholder API.
   *
   * @param postId - The ID of the post for which to fetch comments.
   *
   * @returns A promise that resolves to an array of `PostInterfaces.Comment`.
   */
  const listComments = async (postId: number): Promise<PostInterfaces.Comment[]> => {
    const response = await fetch(`${BASE_URL}/comments?postId=${postId}`);

    return await response.json();
  };

  /**
   * Updates a post with a new title using the JSONPlaceholder API.
   *
   * @param postId - The ID of the post to update.
   *
   * @returns A promise that resolves when the update is successful.
   */
  const update = async (postId: number) => {
    const response = await fetch(`${BASE_URL}/posts/${postId}`, {
      method: 'PATCH',
      body: JSON.stringify({ title: 'REACT QUERY FOREVER!!!!' }),
    });

    return await response.json();
  };

  /**
   * Removes a post using the JSONPlaceholder API.
   *
   * @param postId - The ID of the post to remove.
   *
   * @returns A promise that resolves when the post is successfully deleted.
   */
  const remove = async (postId: number) => {
    const response = await fetch(`${BASE_URL}/posts/${postId}`, {
      method: 'DELETE',
    });

    return await response.json();
  };

  return { listPosts, listComments, update, remove };
};
