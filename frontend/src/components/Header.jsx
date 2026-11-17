export default function Header() {
  return (
    <header className="topbar">
      <a className="brand" href="#home" aria-label="CommunityHub home">
        <span className="brand-mark">C</span>
        <span>CommunityHub</span>
      </a>
      <div className="topbar-right">
        <span className="online-dot" />
        <span className="topbar-label">Your community, together</span>
        <div className="small-avatar" aria-label="Anthony profile">AM</div>
      </div>
    </header>
  );
}
