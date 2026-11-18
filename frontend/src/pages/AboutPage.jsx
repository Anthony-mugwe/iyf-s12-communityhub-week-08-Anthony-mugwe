import { Link } from 'react-router-dom';
import styles from './AboutPage.module.css';

function AboutPage() {
  return (
    <div className={styles.page}>
      <section className={styles.card}>
        <h1 className={styles.heading}>About CommunityHub</h1>
        <p className={styles.lead}>CommunityHub is a collaborative web application built during <strong>IYF Weekend Academy Season 12</strong> (Weeks 8–12). Our goal is to create an accessible space where community members can publish updates, explore discussions, and connect with peers.</p>
      </section>
      <div className={styles.grid}>
        <section className={styles.card}>
          <h2 className={styles.subheading}>Frontend Architecture (Week 9)</h2>
          <ul className={styles.list}>
            <li>React function components with <code>useState</code> and <code>useEffect</code></li>
            <li>Client-side routing with <code>react-router-dom</code></li>
            <li>Custom hooks: <code>useFetch</code>, <code>useLocalStorage</code>, and <code>useDebounce</code></li>
            <li>Responsive, scoped styling with CSS Modules</li>
          </ul>
        </section>
        <section className={styles.card}>
          <h2 className={styles.subheading}>MVP Roadmap</h2>
          <ul className={styles.list}>
            <li><strong>Posts:</strong> Create, search, filter, and inspect posts</li>
            <li><strong>Comments:</strong> View demo discussions on each API post</li>
            <li><strong>Profiles:</strong> Member bios and activity overview (upcoming)</li>
            <li><strong>Authentication:</strong> Secure login and backend API (Weeks 10–12)</li>
          </ul>
        </section>
      </div>
      <div className={styles.ctaBox}><p>Ready to jump in?</p><Link to="/create" className={styles.ctaBtn}>Write Your First Post</Link></div>
    </div>
  );
}
export default AboutPage;
