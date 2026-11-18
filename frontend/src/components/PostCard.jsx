import { Link } from 'react-router-dom';
import { formatPostDate } from '../utils/postHelpers.js';
import styles from './PostCard.module.css';

function PostCard({ post, isLiked, onToggleLike }) {
  const totalLikes = (post.baseLikes || 0) + (isLiked ? 1 : 0);
  const previewText = post.content.length > 140
    ? `${post.content.slice(0, 140).trim()}...`
    : post.content;

  return (
    <article className={styles.card}>
      <div className={styles.meta}>
        <div className={styles.badges}>
          <span className={styles.categoryBadge}>{post.category}</span>
          {post.isLocal && <span className={styles.localBadge}>Your Post</span>}
        </div>
        <span className={styles.date}>{formatPostDate(post.createdAt)}</span>
      </div>
      <h2 className={styles.title}><Link to={`/posts/${post.id}`} className={styles.titleLink}>{post.title}</Link></h2>
      <p className={styles.excerpt}>{previewText}</p>
      <div className={styles.footer}>
        <span className={styles.author}>By {post.author}</span>
        <div className={styles.actions}>
          <button type="button" className={`${styles.likeBtn} ${isLiked ? styles.liked : ''}`}
            onClick={() => onToggleLike(post.id)} aria-pressed={isLiked}
            aria-label={isLiked ? `Unlike "${post.title}"` : `Like "${post.title}"`}>
            {isLiked ? 'Liked' : 'Like'} ({totalLikes})
          </button>
          <Link to={`/posts/${post.id}`} className={styles.readMore}>Read More</Link>
        </div>
      </div>
    </article>
  );
}
export default PostCard;
