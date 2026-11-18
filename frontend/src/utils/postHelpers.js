export const POST_CATEGORIES = ['General', 'Tech', 'Events', 'Help'];

export function validatePost(data) {
  const errors = {};
  const author = (data?.author || '').trim();
  const title = (data?.title || '').trim();
  const content = (data?.content || '').trim();

  if (!author) errors.author = 'Author name is required.';
  else if (author.length < 2) errors.author = 'Author name must be at least 2 characters.';

  if (!title) errors.title = 'Post title is required.';
  else if (title.length < 3) errors.title = 'Post title must be at least 3 characters.';

  if (!content) errors.content = 'Post content cannot be empty.';
  else if (content.length < 10) errors.content = 'Post content must be at least 10 characters.';

  return { isValid: Object.keys(errors).length === 0, errors };
}

export function createPostObject({ title, content, author, category = 'General' }) {
  const safeCategory = POST_CATEGORIES.includes(category) ? category : 'General';
  return {
    id: `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    title: title.trim(),
    content: content.trim(),
    author: author.trim(),
    category: safeCategory,
    baseLikes: 0,
    createdAt: new Date().toISOString(),
    isLocal: true,
  };
}

export function normalizeApiPost(apiPost) {
  const categoryIndex = (Number(apiPost.id) - 1) % POST_CATEGORIES.length;
  return {
    id: String(apiPost.id),
    title: apiPost.title || 'Untitled post',
    content: apiPost.body || '',
    author: `Community Member #${apiPost.userId}`,
    category: POST_CATEGORIES[categoryIndex] || 'General',
    baseLikes: (Number(apiPost.id) * 3) % 15,
    createdAt: null,
    isLocal: false,
  };
}

export function filterAndSearchPosts(posts, category = 'All', query = '') {
  if (!Array.isArray(posts)) return [];
  const normalizedQuery = query.trim().toLowerCase();

  return posts.filter((post) => {
    const matchesCategory = category === 'All' || post.category === category;
    if (!matchesCategory) return false;
    if (!normalizedQuery) return true;
    return [post.title, post.content, post.author]
      .some((value) => String(value || '').toLowerCase().includes(normalizedQuery));
  });
}

export function formatPostDate(isoString) {
  if (!isoString) return 'Date not provided';
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return 'Unknown date';
  return date.toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });
}
