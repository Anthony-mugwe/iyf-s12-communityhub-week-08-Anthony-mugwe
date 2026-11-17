export default function PageLayout({ header, children, footer }) {
  return (
    <div className="exercise-layout">
      <header>{header}</header>
      <main>{children}</main>
      <footer>{footer}</footer>
    </div>
  );
}
