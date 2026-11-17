import { useEffect, useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Sidebar from './components/Sidebar.jsx';
import CreatePost from './components/CreatePost.jsx';
import PostList from './components/PostList.jsx';
import { createPost } from './utils/postUtils.js';

const starterPosts = [
  {
    id: 1,
    author: 'CommunityHub Team',
    content:
      'Welcome to CommunityHub! This is a space to connect, share ideas and support one another. Introduce yourself!',
    createdAt: '2026-11-01T09:00:00.000Z',
    category: 'General',
  },
  {
    id: 2,
    author: 'Alex Kimani',
    content:
      'Small progress is still progress. What is one thing you learned this week that you are proud of?',
    createdAt: '2026-11-02T12:30:00.000Z',
    category: 'Learning',
  },
  {
    id: 3,
    author: 'Jane Wanjiku',
    content:
      'I have been learning React and JavaScript. Building small projects every day is helping me improve!',
    createdAt: '2026-11-03T10:00:00.000Z',
    category: 'Technology',
  },
  {
    id: 4,
    author: 'Brian Otieno',
    content:
      'What technology skills are you currently learning? Let us share resources and help each other.',
    createdAt: '2026-11-04T08:00:00.000Z',
    category: 'Technology',
  },
];

const communityGroups = [
  {
    id: 'web-development',
    name: 'Web Development',
    icon: '💻',
    description: 'Learn HTML, CSS, JavaScript, React and build amazing projects.',
    members: 125,
    category: 'Technology',
  },
  {
    id: 'technology',
    name: 'Technology & Innovation',
    icon: '🚀',
    description: 'Discuss new technologies, software, AI and creative ideas.',
    members: 89,
    category: 'Technology',
  },
  {
    id: 'learning',
    name: 'Learning Together',
    icon: '📚',
    description: 'Share resources and support each other.',
    members: 210,
    category: 'Education',
  },
];

const GROUP_STORAGE_KEY = 'communityhub-joined-groups';

function loadJoinedGroups() {
  try {
    const saved = localStorage.getItem(GROUP_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

const pages = ['home', 'explore', 'groups', 'saved'];
const categories = ['All', 'Technology', 'Learning', 'General'];

function getCategory(post) {
  if (post.category) return post.category;

  const content = post.content.toLowerCase();

  if (
    content.includes('code') ||
    content.includes('javascript') ||
    content.includes('react') ||
    content.includes('technology') ||
    content.includes('programming')
  ) {
    return 'Technology';
  }

  if (
    content.includes('learn') ||
    content.includes('study') ||
    content.includes('course')
  ) {
    return 'Learning';
  }

  return 'General';
}

function ExplorePost({ post, saved, onToggleSave }) {
  return (
    <article className="card explore-post">
      <div className="explore-post-header">
        <div>
          <strong>{post.author}</strong>
          <p className="eyebrow">{getCategory(post)}</p>
        </div>

        <button
          type="button"
          className="save-button"
          onClick={() => onToggleSave(post.id)}
          aria-label={saved ? 'Remove saved post' : 'Save post'}
          aria-pressed={saved}
        >
          {saved ? '♥ Saved' : '♡ Save'}
        </button>
      </div>

      <p className="explore-post-content">{post.content}</p>

      <div className="explore-post-footer">
        <span>Community discussion</span>
        <span>
          {post.createdAt
            ? new Date(post.createdAt).toLocaleDateString()
            : 'Recently'}
        </span>
      </div>
    </article>
  );
}

export default function App() {
  const [posts, setPosts] = useState(starterPosts);
  const [savedIds, setSavedIds] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [joinedGroups, setJoinedGroups] = useState(loadJoinedGroups());

  const [page, setPage] = useState(() => {
    const initialPage = window.location.hash.replace('#', '');
    return pages.includes(initialPage) ? initialPage : 'home';
  });

  useEffect(() => {
    function handleHashChange() {
      const nextPage = window.location.hash.replace('#', '') || 'home';
      setPage(pages.includes(nextPage) ? nextPage : 'home');
    }

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem(GROUP_STORAGE_KEY, JSON.stringify(joinedGroups));
  }, [joinedGroups]);

  function navigate(nextPage) {
    if (!pages.includes(nextPage)) return;

    if (window.location.hash === `#${nextPage}`) {
      setPage(nextPage);
    } else {
      window.location.hash = nextPage;
    }
  }

  function toggleGroup(groupId) {
    setJoinedGroups((currentGroups) =>
      currentGroups.includes(groupId)
        ? currentGroups.filter((id) => id !== groupId)
        : [...currentGroups, groupId]
    );
  }

  function handleCreatePost(content) {
    const newPost = createPost({
      id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}`,
      author: 'Anthony Mugwe',
      content,
    });

    setPosts((currentPosts) => [
      { ...newPost, category: getCategory(newPost) },
      ...currentPosts,
    ]);

    navigate('home');
  }

  function toggleSave(postId) {
    setSavedIds((currentIds) =>
      currentIds.includes(postId)
        ? currentIds.filter((id) => id !== postId)
        : [...currentIds, postId]
    );
  }

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        post.content.toLowerCase().includes(search.toLowerCase()) ||
        post.author.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === 'All' || getCategory(post) === category;

      return matchesSearch && matchesCategory;
    });
  }, [posts, search, category]);

  const savedPosts = posts.filter((post) =>
    savedIds.includes(post.id)
  );

  return (
    <div className="app-shell">
      <Header />

      <div className="page-layout">
        <Sidebar />

        <main className="main-content">
          {page === 'home' && (
            <>
              <section className="welcome-banner">
                <div>
                  <p className="eyebrow">YOUR SPACE TO CONNECT</p>
                  <h1>Good morning, Anthony ✦</h1>
                  <p>Discover what your community is sharing today.</p>
                </div>

                <div className="banner-art" aria-hidden="true">
                  <span>✳</span>
                  <span>✦</span>
                  <span>✧</span>
                </div>
              </section>

              <div className="feed-heading">
                <div>
                  <p className="eyebrow">COMMUNITY FEED</p>
                  <h2>Latest updates</h2>
                </div>

                <span className="post-count">
                  {posts.length} posts
                </span>
              </div>

              <CreatePost onCreatePost={handleCreatePost} />
              <PostList posts={posts} />
            </>
          )}

          {page === 'explore' && (
            <section className="explore-page">
              <div className="feed-heading">
                <div>
                  <p className="eyebrow">DISCOVER SOMETHING NEW</p>
                  <h1>Explore Community</h1>
                  <p>Find ideas, conversations and people to learn from.</p>
                </div>
              </div>

              <div className="explore-search card">
                <label htmlFor="explore-search">
                  Search community posts
                </label>

                <input
                  id="explore-search"
                  type="search"
                  placeholder="Search posts or authors..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </div>

              <div className="category-filters" aria-label="Post categories">
                {categories.map((item) => (
                  <button
                    type="button"
                    key={item}
                    className={`category-button ${
                      category === item ? 'active' : ''
                    }`}
                    aria-pressed={category === item}
                    onClick={() => setCategory(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="feed-heading">
                <div>
                  <p className="eyebrow">COMMUNITY DISCUSSIONS</p>
                  <h2>Discover posts</h2>
                </div>

                <span className="post-count">
                  {filteredPosts.length} found
                </span>
              </div>

              {filteredPosts.length > 0 ? (
                <div className="explore-post-list">
                  {filteredPosts.map((post) => (
                    <ExplorePost
                      key={post.id}
                      post={post}
                      saved={savedIds.includes(post.id)}
                      onToggleSave={toggleSave}
                    />
                  ))}
                </div>
              ) : (
                <div className="card empty-state">
                  <h3>No posts found</h3>
                  <p>Try another search term or select a different category.</p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearch('');
                      setCategory('All');
                    }}
                  >
                    Clear filters
                  </button>
                </div>
              )}

              <section className="trending-section">
                <p className="eyebrow">TRENDING TOPICS</p>
                <h2>Popular discussions</h2>

                <div className="trending-topics">
                  <button
                    type="button"
                    onClick={() => {
                      setSearch('React');
                      setCategory('All');
                    }}
                  >
                    #React
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSearch('learning');
                      setCategory('All');
                    }}
                  >
                    #Learning
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSearch('technology');
                      setCategory('All');
                    }}
                  >
                    #Technology
                  </button>
                </div>
              </section>
            </section>
          )}

          {page === 'groups' && (
            <section className="groups-page">
              <div className="feed-heading">
                <div>
                  <p className="eyebrow">FIND YOUR PEOPLE</p>
                  <h1>Community Groups</h1>
                  <p>Connect with people who share your interests.</p>
                </div>
                <span className="post-count">
                  {joinedGroups.length} joined
                </span>
              </div>

              <div className="groups-intro card">
                <span className="groups-intro-icon">🤝</span>
                <div>
                  <h2>Grow together</h2>
                  <p>
                    Join a group, exchange ideas, share knowledge and
                    learn from other community members.
                  </p>
                </div>
              </div>

              <div className="groups-grid">
                {communityGroups.map((group) => {
                  const joined = joinedGroups.includes(group.id);

                  return (
                    <article className="group-card card" key={group.id}>
                      <div className="group-card-top">
                        <span className="group-icon">{group.icon}</span>
                        <span className="group-category">{group.category}</span>
                      </div>

                      <h2>{group.name}</h2>
                      <p>{group.description}</p>

                      <div className="group-members">
                        <span>👥</span>
                        <strong>{group.members + (joined ? 1 : 0)}</strong>
                        <span>members</span>
                      </div>

                      <button
                        type="button"
                        className={`group-button ${joined ? 'joined' : ''}`}
                        onClick={() => toggleGroup(group.id)}
                        aria-pressed={joined}
                      >
                        {joined ? '✓ Joined — Leave group' : '+ Join group'}
                      </button>
                    </article>
                  );
                })}
              </div>
            </section>
          )}

          {page === 'saved' && (
            <section className="saved-page">
              <div className="feed-heading">
                <h1>Saved Posts</h1>
                <span>{savedPosts.length} saved</span>
              </div>

              {savedPosts.length > 0 ? (
                <div className="explore-post-list">
                  {savedPosts.map((post) => (
                    <ExplorePost
                      key={post.id}
                      post={post}
                      saved
                      onToggleSave={toggleSave}
                    />
                  ))}
                </div>
              ) : (
                <div className="card empty-state">
                  <h2>No saved posts yet</h2>
                  <p>Visit Explore to save posts.</p>
                </div>
              )}
            </section>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}