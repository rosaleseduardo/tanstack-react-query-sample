/**
 * Represents a blog post object containing information about a single blog post.
 */
export interface Post {
  /**
   * The unique identifier for the blog post.
   */
  id: number;

  /**
   * The title of the blog post.
   */
  title: string;

  /**
   * The body content of the blog post.
   */
  body: string;
}

/**
 * Represents a comment object containing information about a comment on a post.
 */
export interface Comment {
  /**
   * The body of the comment, containing the actual comment content.
   */
  body: string;

  /**
   * The email address of the user who made the comment.
   */
  email: string;

  /**
   * The unique identifier for the comment.
   */
  id: number;

  /**
   * The name of the user who made the comment.
   */
  name: string;

  /**
   * The ID of the post to which the comment belongs.
   */
  postId: number;
}
