import { useEffect, useState } from 'react';
import { formatPostDate, getInitials } from '../utils/postUtils.js';

const STORAGE_KEY = 'communityhub-post-interactions';

function loadInteractions() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

export default function PostList({ posts }) {
  const [interactions, setInteractions] = useState(loadInteractions);
  const [commentInputs, setCommentInputs] = useState({});

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(interactions));
  }, [interactions]);

  function toggleLike(postId) {
    setInteractions((current) => {
      const post = current[postId] || { liked: false, comments: [] };

      return {
        ...current,
        [postId]: {
          ...post,
          liked: !post.liked,
        },
      };
    });
  }

  function handleCommentChange(postId, value) {
    setCommentInputs((current) => ({
      ...current,
      [postId]: value,
    }));
  }

  function addComment(event, postId) {
    event.preventDefault();

    const content = (commentInputs[postId] || '').trim();

    if (!content) return;

    const newComment = {
      id: Date.now(),
      author: 'You',
      content,
      createdAt: new Date().toISOString(),
    };

    setInteractions((current) => {
      const post = current[postId] || { liked: false, comments: [] };

      return {
        ...current,
        [postId]: {
          ...post,
          comments: [...post.comments, newComment],
        },
      };
    });

    setCommentInputs((current) => ({
      ...current,
      [postId]: '',
    }));
  }

  if (posts.length === 0) {
    return (
      <section className="empty-state card">
        <div className="empty-icon">✎</div>
        <h2>No posts yet</h2>
        <p>Be the first to share something with your community.</p>
      </section>
    );
  }

  return (
    <section className="post-list" aria-label="Community posts">
      {posts.map((post) => {
        const interaction = interactions[post.id] || {
          liked: false,
          comments: [],
        };

        return (
          <article className="post-card card" key={post.id}>
            <div className="post-header">
              <div className="avatar">{getInitials(post.author)}</div>

              <div className="post-author">
                <strong>{post.author}</strong>
                <time dateTime={post.createdAt}>
                  {formatPostDate(post.createdAt)}
                </time>
              </div>

              <button
                className="more-button"
                type="button"
                aria-label="More post options"
                disabled
              >
                ···
              </button>
            </div>

            <p className="post-content">{post.content}</p>

            <div className="post-actions">
              <button
                type="button"
                className={interaction.liked ? 'liked' : ''}
                onClick={() => toggleLike(post.id)}
                aria-pressed={interaction.liked ? 'unlike post ' : 'like post'}
              >
                {interaction.liked ? '♥' : '♡'}
                <span>
                  {interaction.liked ? 'Liked' : 'Like'}
                </span>
              </button>

              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById(`comment-input-${post.id}`)
                    ?.focus()
                }
              >
                ▢ <span>Comment ({interaction.comments.length})</span>
              </button>

              <button type="button" disabled aria-label="Share post">
                ↗ <span>Share</span>
              </button>
            </div>

            <div className="comments-section">
              {interaction.comments.map((comment) => (
                <div className="comment" key={comment.id}>
                  <div className="comment-avatar">
                    {getInitials(comment.author)}
                  </div>

                  <div className="comment-content">
                    <strong>{comment.author}</strong>
                    <p>{comment.content}</p>
                    <time dateTime={comment.createdAt}>
                      {formatPostDate(comment.createdAt)}
                    </time>
                  </div>
                </div>
              ))}

              <form
                className="comment-form"
                onSubmit={(event) => addComment(event, post.id)}
              >
                <input
                  id={`comment-input-${post.id}`}
                  type="text"
                  maxLength={300}
                  placeholder="Write a comment..."
                  value={commentInputs[post.id] || ''}
                  onChange={(event) =>
                    handleCommentChange(post.id, event.target.value)
                  }
                  aria-label={`Write a comment on ${post.author}'s post`}
                />

                <button
                  type="submit"
                  disabled={!(commentInputs[post.id] || '').trim()}
                >
                  Send
                </button>
              </form>
            </div>
          </article>
        );
      })}
    </section>
  );
}