export function createPost({ id, author, content, createdAt = new Date().toISOString() }) {
  const cleanContent = String(content ?? '').trim();
  const cleanAuthor = String(author ?? '').trim();

  if (!cleanContent) {
    throw new Error('Post content cannot be empty.');
  }

  return {
    id,
    author: cleanAuthor || 'Community member',
    content: cleanContent,
    createdAt,
  };
}

export function formatPostDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Just now';

  return new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
}

export function getInitials(name) {
  const words = String(name ?? '').trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return 'CM';
  return words.slice(0, 2).map((word) => word[0].toUpperCase()).join('');
}
