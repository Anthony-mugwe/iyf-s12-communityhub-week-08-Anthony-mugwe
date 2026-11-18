import { useParams, Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch.js';
import { normalizeApiPost, formatPostDate } from '../utils/postHelpers.js';
import StatusMessage from '../components/StatusMessage.jsx';
import styles from './PostDetailPage.module.css';

function PostDetailPage({ localPosts, likedMap, onToggleLike }) {
  const { id } = useParams();
  const localPost = localPosts.find((item) => String(item.id) === String(id));
  const postUrl = localPost ? null : `https://jsonplaceholder.typicode.com/posts/${encodeURIComponent(id)}`;
  const commentsUrl = localPost ? null : `https://jsonplaceholder.typicode.com/posts/${encodeURIComponent(id)}/comments`;
  const { data: apiPost, loading: postLoading, error: postError, refetch: refetchPost } = useFetch(postUrl);
  const { data: comments, loading: commentsLoading, error: commentsError } = useFetch(commentsUrl);
  const post = localPost || (apiPost?.id ? normalizeApiPost(apiPost) : null);
  const isLiked = post ? Boolean(likedMap[post.id]) : false;
  const totalLikes = post ? (post.baseLikes || 0) + (isLiked ? 1 : 0) : 0;

  return (
    <div className={styles.page}>
      <Link to="/posts" className={styles.backLink}>← Back to Posts</Link>
      {postLoading && <StatusMessage type="loading" message="Loading post details..." />}
      {postError && <StatusMessage type="error" message={`Could not load this post: ${postError}`} onRetry={refetchPost} />}
      {!postLoading && !postError && !post && <StatusMessage type="error" message="Sorry, we could not find a post with that ID." />}
      {post && <article className={styles.article}>
        <div className={styles.meta}>
          <span className={styles.categoryBadge}>{post.category}</span>
          {post.isLocal && <span className={styles.localBadge}>Your Post</span>}
          <span className={styles.date}>{formatPostDate(post.createdAt)}</span>
        </div>
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.author}>Written by {post.author}</p>
        <div className={styles.body}><p>{post.content}</p></div>
        <div className={styles.actions}>
          <button type="button" className={`${styles.likeBtn} ${isLiked ? styles.liked : ''}`}
            onClick={() => onToggleLike(post.id)} aria-pressed={isLiked}>
            {isLiked ? 'Liked' : 'Like this post'} ({totalLikes})
          </button>
        </div>
      </article>}
      {post && !localPost && <section className={styles.commentsSection} aria-labelledby="comments-heading">
        <h2 id="comments-heading" className={styles.commentsHeading}>Comments</h2>
        {commentsLoading && <StatusMessage type="loading" message="Loading comments..." />}
        {commentsError && <StatusMessage type="error" message={`Could not load comments: ${commentsError}`} />}
        {!commentsLoading && !commentsError && Array.isArray(comments) && comments.length > 0 &&
          <ul className={styles.commentList}>{comments.map((comment) =>
            <li key={comment.id} className={styles.commentCard}>
              <div className={styles.commentHeader}><strong>{comment.name}</strong><span className={styles.commentEmail}>{comment.email}</span></div>
              <p className={styles.commentBody}>{comment.body}</p>
            </li>)}</ul>}
        {!commentsLoading && !commentsError && Array.isArray(comments) && comments.length === 0 && <p>No comments yet.</p>}
      </section>}
    </div>
  );
}
export default PostDetailPage;
