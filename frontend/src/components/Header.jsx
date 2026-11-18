import { NavLink, Link } from 'react-router-dom';
import styles from './Header.module.css';

function Header({ totalLocalPosts }) {
  const getNavLinkClass = ({ isActive }) =>
    isActive ? `${styles.navLink} ${styles.active}` : styles.navLink;

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.brand}>
          <span className={styles.brandTitle}>CommunityHub</span>
          <span className={styles.brandTag}>Season 12</span>
        </Link>
        <nav className={styles.nav} aria-label="Main navigation">
          <NavLink to="/" end className={getNavLinkClass}>Home</NavLink>
          <NavLink to="/posts" className={getNavLinkClass}>Posts</NavLink>
          <NavLink to="/create" className={getNavLinkClass}>
            Create Post
            {totalLocalPosts > 0 && (
              <span className={styles.localCount} aria-label={`${totalLocalPosts} local posts`}>
                {totalLocalPosts}
              </span>
            )}
          </NavLink>
          <NavLink to="/about" className={getNavLinkClass}>About</NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
