export default function InfoCard({ title, description }) {
  return (
    <article className="card">
      <h2>{title}</h2>
      <p>{description}</p>
    </article>
  );
}
