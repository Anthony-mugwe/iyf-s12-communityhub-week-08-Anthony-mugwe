import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { POST_CATEGORIES, validatePost } from '../utils/postHelpers.js';
import styles from './CreatePostPage.module.css';

function CreatePostPage({ onAddPost }) {
  const navigate = useNavigate();
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('General');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState({});
  const [createdPostId, setCreatedPostId] = useState(null);

  useEffect(() => {
    if (!createdPostId) return undefined;
    const timerId = setTimeout(() => navigate(`/posts/${createdPostId}`), 1200);
    return () => clearTimeout(timerId);
  }, [createdPostId, navigate]);

  function handleSubmit(event) {
    event.preventDefault();
    const validation = validatePost({ author, title, content });
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    const newPost = onAddPost({ author, title, category, content });
    setAuthor('');
    setTitle('');
    setCategory('General');
    setContent('');
    setErrors({});
    setCreatedPostId(newPost.id);
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.heading}>Create a New Post</h1>
        <p className={styles.subheading}>Share an announcement, technical tip, or question with CommunityHub.</p>
        {createdPostId && <div className={styles.successBanner} role="status" aria-live="polite">
          <p>Post published! Taking you to your post...</p><Link to={`/posts/${createdPostId}`}>View now</Link>
        </div>}
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.row}>
            <div className={styles.group}>
              <label htmlFor="create-author">Your Name</label>
              <input id="create-author" type="text" value={author} onChange={(e) => setAuthor(e.target.value)}
                placeholder="e.g. Wanjiku" aria-invalid={Boolean(errors.author)}
                aria-describedby={errors.author ? 'author-error' : undefined} />
              {errors.author && <p id="author-error" className={styles.errorText} role="alert">{errors.author}</p>}
            </div>
            <div className={styles.group}>
              <label htmlFor="create-category">Category</label>
              <select id="create-category" value={category} onChange={(e) => setCategory(e.target.value)}>
                {POST_CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
          </div>
          <div className={styles.group}>
            <label htmlFor="create-title">Title</label>
            <input id="create-title" type="text" value={title} onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your post a clear title" aria-invalid={Boolean(errors.title)}
              aria-describedby={errors.title ? 'title-error' : undefined} />
            {errors.title && <p id="title-error" className={styles.errorText} role="alert">{errors.title}</p>}
          </div>
          <div className={styles.group}>
            <label htmlFor="create-content">Content</label>
            <textarea id="create-content" rows="5" value={content} onChange={(e) => setContent(e.target.value)}
              placeholder="Write your post details here (at least 10 characters)..."
              aria-invalid={Boolean(errors.content)} aria-describedby={errors.content ? 'content-error' : undefined} />
            {errors.content && <p id="content-error" className={styles.errorText} role="alert">{errors.content}</p>}
          </div>
          <div className={styles.actions}>
            <Link to="/posts" className={styles.cancelLink}>Cancel</Link>
            <button type="submit" className={styles.submitBtn}>Publish Post</button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default CreatePostPage;
