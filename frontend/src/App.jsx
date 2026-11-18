import { Routes, Route } from 'react-router-dom';
import { useLocalStorage } from './hooks/useLocalStorage.js';
import { createPostObject } from './utils/postHelpers.js';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import PostsPage from './pages/PostsPage.jsx';
import PostDetailPage from './pages/PostDetailPage.jsx';
import CreatePostPage from './pages/CreatePostPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

function App() {
  const [localPosts, setLocalPosts] = useLocalStorage('communityhub_local_posts', []);
  const [likedMap, setLikedMap] = useLocalStorage('communityhub_likes', {});

  function handleAddPost(formData) {
    const newPost = createPostObject(formData);
    setLocalPosts((previousPosts) => [newPost, ...previousPosts]);
    return newPost;
  }

  function handleToggleLike(postId) {
    setLikedMap((previousLikes) => ({
      ...previousLikes,
      [postId]: !previousLikes[postId],
    }));
  }

  return (
    <div className="app-layout">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Header totalLocalPosts={localPosts.length} />
      <main id="main-content" className="main-container" tabIndex="-1">
        <Routes>
          <Route path="/" element={<HomePage localPosts={localPosts} likedMap={likedMap} onToggleLike={handleToggleLike} />} />
          <Route path="/posts" element={<PostsPage localPosts={localPosts} likedMap={likedMap} onToggleLike={handleToggleLike} />} />
          <Route path="/posts/:id" element={<PostDetailPage localPosts={localPosts} likedMap={likedMap} onToggleLike={handleToggleLike} />} />
          <Route path="/create" element={<CreatePostPage onAddPost={handleAddPost} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
export default App;
