import { Post, type PostInterfaces } from '@entities/posts';

/**
 * A component that displays the details of a blog post, along with its comments.
 *
 * The `PostDetail` component takes a `post` prop of type `PostInterfaces.Post`,
 * which represents the blog post object containing information about the post.
 *
 * The component displays the post's title, body, and a list of comments. It also
 * allows the user to delete the post or update its title using the provided
 * `viewModel` from `POST_ENTITY`.
 *
 * @param props - The blog post object to display. It should conform to the
 * `PostInterfaces.Post` interface.
 *
 * @returns A React functional component that renders the details of the blog
 * post and its comments.
 *
 * @example
 * ```tsx
 * // MyComponent.tsx
 * import { PostDetail } from './path/to/PostDetail';
 * import { samplePost } from './path/to/samplePost';
 *
 * const MyComponent = () => {
 *   return (
 *     <div>
 *       <h1>Blog Post Details</h1>
 *       <PostDetail post={samplePost} />
 *     </div>
 *   );
 * };
 * ```
 */
export const PostDetail = ({ post }: { post: PostInterfaces.Post }) => {
  const viewModel = Post.ViewModel();
  const commentsQuery = viewModel.ListComments(post.id);
  const deleteMutation = viewModel.DeletePost;
  const updateMutation = viewModel.UpdatePost;

  return (
    <>
      {commentsQuery.isError && <h3>Oops! Something went wrong</h3>}
      {commentsQuery.isLoading && <h3> Loading ... </h3>}
      {commentsQuery.data != null && (
        <>
          <h3 style={{ color: 'blue' }}>{post.title}</h3>
          <button
            onClick={() => {
              viewModel.DeletePost.mutate(post.id);
            }}
          >
            Delete
          </button>
          {deleteMutation.isError && <p style={{ color: 'red' }}> Error deleting the post </p>}
          {deleteMutation.isLoading && <p style={{ color: 'purple' }}> Deleting the post </p>}
          {deleteMutation.isSuccess && <p style={{ color: 'green' }}> Post has (not) been deleted </p>}
          <button
            onClick={() => {
              updateMutation.mutate(post.id);
            }}
          >
            Update title
          </button>
          {updateMutation.isError && <p style={{ color: 'red' }}> Error updating the post </p>}
          {updateMutation.isLoading && <p style={{ color: 'purple' }}> Updating the post </p>}
          {updateMutation.isSuccess && <p style={{ color: 'green' }}> Post has (not) been updated </p>}
          <p>{post.body}</p>
          <h4>Comments</h4>
          {commentsQuery.data.map((comment: PostInterfaces.Comment) => (
            <li key={comment.id}>
              {comment.email}: {comment.body}
            </li>
          ))}
        </>
      )}
    </>
  );
};
