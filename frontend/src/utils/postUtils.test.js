import { describe, expect, it } from 'vitest';
import { createPost, formatPostDate, getInitials } from './postUtils.js';

describe('createPost', () => {
  it('trims content and author', () => {
    expect(createPost({ id: 1, author: ' Alex ', content: ' Hello ' })).toMatchObject({
      id: 1,
      author: 'Alex',
      content: 'Hello',
    });
  });

  it('uses a default author when author is blank', () => {
    expect(createPost({ id: 2, author: ' ', content: 'A post' }).author).toBe('Community member');
  });

  it('rejects empty post content', () => {
    expect(() => createPost({ id: 3, author: 'Alex', content: '  ' })).toThrow(
      'Post content cannot be empty.',
    );
  });
});

describe('formatPostDate', () => {
  it('returns Just now for an invalid date', () => {
    expect(formatPostDate('not-a-date')).toBe('Just now');
  });
});

describe('getInitials', () => {
  it('returns initials from the first two words', () => {
    expect(getInitials('Anthony Mugwe Developer')).toBe('AM');
  });

  it('returns fallback initials for an empty name', () => {
    expect(getInitials('')).toBe('CM');
  });
});
