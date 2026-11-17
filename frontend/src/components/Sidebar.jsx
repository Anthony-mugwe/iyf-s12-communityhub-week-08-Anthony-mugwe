import { useEffect, useState } from 'react';

const links = [
  { icon: '⌂', label: 'Home', page: 'home' },
  { icon: '◎', label: 'Explore', page: 'explore' },
  { icon: '♧', label: 'Groups', page: 'groups' },
  { icon: '♡', label: 'Saved', page: 'saved' },
];

export default function Sidebar() {
  const [activePage, setActivePage] = useState(
    () => window.location.hash.replace('#', '') || 'home'
  );

  useEffect(() => {
    function updatePage() {
      setActivePage(
        window.location.hash.replace('#', '') || 'home'
      );
    }

    window.addEventListener('hashchange', updatePage);

    return () => {
      window.removeEventListener('hashchange', updatePage);
    };
  }, []);

  return (
    <aside className="sidebar" aria-label="Main navigation">
      <p className="sidebar-heading">MENU</p>

      <nav>
        {links.map((link) => (
          <a
            className={`nav-link ${
              activePage === link.page ? 'active' : ''
            }`}
            href={`#${link.page}`}
            key={link.page}
            aria-current={
              activePage === link.page ? 'page' : undefined
            }
          >
            <span className="nav-icon" aria-hidden="true">
              {link.icon}
            </span>
            {link.label}
          </a>
        ))}
      </nav>

      <div className="sidebar-card">
        <div className="sidebar-card-icon">✦</div>
        <strong>Good things grow together.</strong>
        <p>Share an idea, ask a question or celebrate a win.</p>
      </div>
    </aside>
  );
}