import { Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch.js';
import { normalizeApiPost } from '../utils/postHelpers.js';
import PostCard from '../components/PostCard.jsx';
import StatusMessage from '../components/StatusMessage.jsx';
import styles from './HomePage.module.css';

function HomePage({ localPosts, likedMap, onToggleLike }) {
  const { data: apiPosts, loading, error, refetch } = useFetch('https://jsonplaceholder.typicode.com/posts?_limit=3');
  const normalizedApiPosts = Array.isArray(apiPosts) ? apiPosts.map(normalizeApiPost) : [];
  const featuredPosts = [...localPosts, ...normalizedApiPosts].slice(0, 3);

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Welcome to CommunityHub</h1>
        <p className={styles.heroSubtitle}>Discover discussions from across the community, share your own updates, and join conversations that matter.</p>
        <div className={styles.heroActions}>
          <Link to="/posts" className={styles.primaryBtn}>Explore All Posts</Link>
          <Link to="/create" className={styles.secondaryBtn}>Create a Post</Link>
        </div>
      </section>
      <section className={styles.highlights} aria-labelledby="highlights-heading">
        <h2 id="highlights-heading" className={styles.sectionHeading}>What You Can Do Here</h2>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}><h3>Live Community Feed</h3><p>Browse demo posts alongside posts you create locally.</p></div>
          <div className={styles.featureCard}><h3>Focused Discussions</h3><p>Open a post to read its details and community comments.</p></div>
          <div className={styles.featureCard}><h3>Search &amp; Like</h3><p>Search by keyword, filter by topic, and like posts.</p></div>
        </div>
      </section>
      <section aria-labelledby="recent-posts-heading">
        <div className={styles.sectionHeader}>
          <h2 id="recent-posts-heading" className={styles.sectionHeading}>Recent Posts</h2>
          <Link to="/posts" className={styles.viewAllLink}>View all posts →</Link>
        </div>
        {loading && <StatusMessage type="loading" message="Loading recent posts..." />}
        {error && <StatusMessage type="error" message={`Could not load remote posts: ${error}`} onRetry={refetch} />}
        {!loading && featuredPosts.length > 0 && <div className={styles.postsGrid}>
          {featuredPosts.map((post) => <PostCard key={post.id} post={post} isLiked={Boolean(likedMap[post.id])} onToggleLike={onToggleLike} />)}
        </div>}
        {!loading && !error && featuredPosts.length === 0 && <p>No posts yet. Create the first one.</p>}
      </section>
    </div>
  );
}
export default HomePage;
