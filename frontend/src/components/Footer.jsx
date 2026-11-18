import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.copy}>CommunityHub &copy; {new Date().getFullYear()} · IYF Weekend Academy Season 12</p>
        <div className={styles.links}>
          <Link to="/posts">Browse Posts</Link>
          <Link to="/create">Write a Post</Link>
          <Link to="/about">About</Link>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
