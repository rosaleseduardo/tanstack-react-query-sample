import { useEffect, useState } from 'react';
import { MAX_PAGE_INDEX, PostDetail, Post, type PostInterfaces } from '@entities/posts';

/**
 * A component that displays a list of blog posts and supports pagination.
 *
 * The `Posts` component fetches a list of blog posts from the API using the
 * `POST_ENTITY.viewModel().ListPosts` method. It displays the fetched posts
 * along with pagination controls to navigate between different pages of posts.
 * The component also allows the user to view the details of a selected blog post
 * by rendering the `PostDetail` component.
 *
 * @returns A React functional component that renders the list of blog posts and
 * pagination controls.
 *
 * @example
 * ```tsx
 * import { Posts } from './path/to/Posts';
 *
 * const MyComponent = () => {
 *   return (
 *     <div>
 *       <h1>Blog Posts</h1>
 *       <Posts />
 *     </div>
 *   );
 * };
 * ```
 */

export const Posts = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [selectedPost, setSelectedPost] = useState<PostInterfaces.Post>();
  const { ListPosts, prefetchNextPage } = Post.ViewModel();

  const { data, isError, isLoading } = ListPosts(currentPage);

  useEffect(() => {
    if (currentPage < MAX_PAGE_INDEX) prefetchNextPage(currentPage);
  }, [currentPage, prefetchNextPage]);

  return (
    <>
      {isError && <h3>Oops! Something went wrong</h3>}
      {isLoading && <h3> Loading ... </h3>}
      {data != null && (
        <>
          <ul>
            {data.map((post: PostInterfaces.Post) => (
              <li
                key={post.id}
                className="post-title"
                onClick={() => {
                  setSelectedPost(post);
                }}
              >
                {post.title}
              </li>
            ))}
          </ul>
          <div className="pages">
            <button
              disabled={currentPage <= 1}
              onClick={() => {
                setCurrentPage((previousPage) => previousPage - 1);
              }}
            >
              Previous page
            </button>
            <span>Page {currentPage}</span>
            <button
              disabled={currentPage >= MAX_PAGE_INDEX}
              onClick={() => {
                setCurrentPage((previousPage) => previousPage + 1);
              }}
            >
              Next page
            </button>
          </div>
          <hr />
          {selectedPost != null && <PostDetail post={selectedPost} />}
        </>
      )}
    </>
  );
};
