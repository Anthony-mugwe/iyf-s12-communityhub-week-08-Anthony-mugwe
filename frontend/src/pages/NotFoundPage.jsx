import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

function NotFoundPage() {
  return (
    <section className={styles.box}>
      <h1 className={styles.title}>404 — Page Not Found</h1>
      <p className={styles.text}>The page you are looking for does not exist or may have moved.</p>
      <Link to="/" className={styles.homeBtn}>Return Home</Link>
    </section>
  );
}
export default NotFoundPage;
