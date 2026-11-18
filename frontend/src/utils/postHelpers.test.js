import { describe, it, expect } from 'vitest';
import {
  validatePost, createPostObject, normalizeApiPost,
  filterAndSearchPosts, formatPostDate,
} from './postHelpers.js';

describe('validatePost', () => {
  it('accepts complete post data', () => {
    expect(validatePost({
      author: 'Amina', title: 'Welcome to CommunityHub',
      content: 'Excited to build our React project together this season!',
    }).isValid).toBe(true);
  });

  it('reports errors for invalid fields', () => {
    const result = validatePost({ author: 'A', title: 'Hi', content: 'Too short' });
    expect(result.isValid).toBe(false);
    expect(result.errors.author).toBeDefined();
    expect(result.errors.title).toBeDefined();
    expect(result.errors.content).toBeDefined();
  });
});

describe('post creation and API normalization', () => {
  it('trims and creates a local post', () => {
    const post = createPostObject({
      author: ' Brian ', title: ' React Router ',
      content: ' Multi-page navigation works smoothly. ', category: 'Tech',
    });
    expect(post.id.startsWith('local-')).toBe(true);
    expect(post.isLocal).toBe(true);
    expect(post.author).toBe('Brian');
    expect(post.category).toBe('Tech');
  });

  it('normalizes API posts without inventing a publication date', () => {
    const post = normalizeApiPost({
      id: 2, userId: 5, title: 'Sample Title', body: 'Sample Body',
    });
    expect(post.id).toBe('2');
    expect(post.content).toBe('Sample Body');
    expect(post.author).toBe('Community Member #5');
    expect(post.createdAt).toBeNull();
  });
});

describe('filterAndSearchPosts', () => {
  const posts = [
    { id: '1', title: 'React Hooks', content: 'Custom hooks guide', author: 'Amina', category: 'Tech' },
    { id: '2', title: 'Saturday Meetup', content: 'Join our event', author: 'Brian', category: 'Events' },
    { id: '3', title: 'CSS Modules', content: 'Scoped styles in React', author: 'Clara', category: 'Tech' },
  ];

  it('combines category and keyword filters', () => {
    expect(filterAndSearchPosts(posts, 'Tech', 'hooks')).toHaveLength(1);
  });

  it('returns all posts for the default filter', () => {
    expect(filterAndSearchPosts(posts)).toHaveLength(3);
  });
});

describe('formatPostDate', () => {
  it('handles missing and invalid dates', () => {
    expect(formatPostDate(null)).toBe('Date not provided');
    expect(formatPostDate('invalid')).toBe('Unknown date');
  });
});
