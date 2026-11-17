import { useState } from 'react';

export default function CreatePost({ onCreatePost }) {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    if (!content.trim()) {
      setError('Write something before publishing your post.');
      return;
    }

    onCreatePost(content);
    setContent('');
    setError('');
  }

  return (
    <section className="composer card">
      <div className="section-title">
        <div>
          <p className="eyebrow">SHARE WITH EVERYONE</p>
          <h2>Create a post</h2>
        </div>
        <span className="composer-sparkle" aria-hidden="true">✦</span>
      </div>
      <form onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="post-content">What would you like to share?</label>
        <textarea
          id="post-content"
          value={content}
          onChange={(event) => {
            setContent(event.target.value);
            if (error) setError('');
          }}
          placeholder="What's happening in your community?"
          rows="3"
          maxLength="500"
          required
        />
        <div className="composer-bottom">
          <span className="character-count">{content.length}/500</span>
          <button className="primary-button" type="submit">Publish post <span aria-hidden="true">↗</span></button>
        </div>
        {error && <p className="form-error" role="alert">{error}</p>}
      </form>
    </section>
  );
}
