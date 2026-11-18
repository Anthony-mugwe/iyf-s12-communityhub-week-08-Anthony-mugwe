import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch.js';
import { useDebounce } from '../hooks/useDebounce.js';
import { POST_CATEGORIES, normalizeApiPost, filterAndSearchPosts } from '../utils/postHelpers.js';
import PostCard from '../components/PostCard.jsx';
import StatusMessage from '../components/StatusMessage.jsx';
import styles from './PostsPage.module.css';

function PostsPage({ localPosts, likedMap, onToggleLike }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery, 250);
  const { data: apiPosts, loading, error, refetch } = useFetch('https://jsonplaceholder.typicode.com/posts?_limit=20');
  const normalizedApiPosts = Array.isArray(apiPosts) ? apiPosts.map(normalizeApiPost) : [];
  const allPosts = [...localPosts, ...normalizedApiPosts];
  const filteredPosts = filterAndSearchPosts(allPosts, selectedCategory, debouncedQuery);
  const categories = ['All', ...POST_CATEGORIES];

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <div><h1 className={styles.heading}>Community Posts</h1><p className={styles.subheading}>Browse demo posts and posts created by members.</p></div>
        <Link to="/create" className={styles.createBtn}>+ New Post</Link>
      </div>
      <section className={styles.controls} aria-label="Search and filter posts">
        <div className={styles.searchGroup}>
          <label htmlFor="posts-search" className={styles.srLabel}>Search posts</label>
          <input id="posts-search" type="search" className={styles.searchInput}
            placeholder="Search by title, content, or author..." value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)} />
        </div>
        <div className={styles.categoryGroup} role="group" aria-label="Filter by category">
          {categories.map((category) => {
            const isActive = selectedCategory === category;
            return <button key={category} type="button"
              className={`${styles.filterBtn} ${isActive ? styles.activeFilter : ''}`}
              onClick={() => setSelectedCategory(category)} aria-pressed={isActive}>{category}</button>;
          })}
        </div>
      </section>
      {loading && <StatusMessage type="loading" message="Fetching posts from CommunityHub..." />}
      {error && <StatusMessage type="error" message={`Failed to load posts from server: ${error}`} onRetry={refetch} />}
      {!loading && !error && filteredPosts.length === 0 && <div className={styles.emptyState}>
        <p>No posts match your current search or category filter.</p>
        {(searchQuery || selectedCategory !== 'All') && <button type="button" className={styles.resetBtn}
          onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}>Reset Filters</button>}
      </div>}
      {!loading && filteredPosts.length > 0 && <>
        <p className={styles.resultsCount}>Showing {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'}</p>
        <div className={styles.postsGrid}>{filteredPosts.map((post) =>
          <PostCard key={post.id} post={post} isLiked={Boolean(likedMap[post.id])} onToggleLike={onToggleLike} />)}</div>
      </>}
    </div>
  );
}
export default PostsPage;
