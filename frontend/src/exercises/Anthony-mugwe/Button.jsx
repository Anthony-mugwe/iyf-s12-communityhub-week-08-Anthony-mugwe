export default function Button({
  children,
  onClick,
  variant = 'primary',
}) {
  return (
    <button
      type="button"
      className={`button button-${variant}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}